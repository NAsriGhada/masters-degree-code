import express from "express";
import { Pool } from "pg";
import crypto from "crypto";

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Run a function inside a DB transaction
async function withTx(fn) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const res = await fn(client);
    await client.query("COMMIT");
    return res;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// View balance (read)
app.get("/balance/:accountId", async (req, res) => {
  const { accountId } = req.params;
  const r = await pool.query(
    "SELECT account_id, balance_cents FROM accounts WHERE account_id = $1",
    [accountId],
  );
  if (r.rowCount === 0)
    return res.status(404).json({ error: "ACCOUNT_NOT_FOUND" });
  res.json(r.rows[0]);
});

// Transfer (pessimistic locking)
app.post("/transfer", async (req, res) => {
  const { fromAccountId, toAccountId, amountCents, branch } = req.body;

  if (
    !fromAccountId ||
    !toAccountId ||
    !Number.isInteger(amountCents) ||
    amountCents <= 0
  ) {
    return res.status(400).json({ error: "INVALID_INPUT" });
  }

  try {
    const result = await withTx(async (client) => {
      // Lock both account rows (consistent order reduces deadlocks)
      const ids = [fromAccountId, toAccountId].sort();
      await client.query(
        `SELECT account_id
         FROM accounts
         WHERE account_id = ANY($1::uuid[])
         FOR UPDATE`,
        [ids],
      );

      // Withdraw with sufficient funds check
      const w = await client.query(
        `UPDATE accounts
         SET balance_cents = balance_cents - $1
         WHERE account_id = $2 AND balance_cents >= $1
         RETURNING balance_cents`,
        [amountCents, fromAccountId],
      );
      if (w.rowCount === 0) return { ok: false, error: "INSUFFICIENT_FUNDS" };

      // Deposit
      await client.query(
        `UPDATE accounts
         SET balance_cents = balance_cents + $1
         WHERE account_id = $2`,
        [amountCents, toAccountId],
      );

      // Ledger record
      const txId = crypto.randomUUID();
      await client.query(
        `INSERT INTO ledger_transactions(tx_id, from_account_id, to_account_id, amount_cents, branch)
         VALUES ($1, $2, $3, $4, $5)`,
        [txId, fromAccountId, toAccountId, amountCents, branch ?? "Tunis"],
      );

      return { ok: true, txId };
    });

    if (!result.ok) return res.status(409).json(result);
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

// Optional: optimistic transfer (with retry)
app.post("/transfer-optimistic", async (req, res) => {
  const { fromAccountId, toAccountId, amountCents, branch } = req.body;

  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const out = await withTx(async (client) => {
        const fromRow = await client.query(
          "SELECT balance_cents, version FROM accounts WHERE account_id=$1",
          [fromAccountId],
        );
        const toRow = await client.query(
          "SELECT version FROM accounts WHERE account_id=$1",
          [toAccountId],
        );

        if (fromRow.rowCount === 0 || toRow.rowCount === 0) {
          return { ok: false, error: "ACCOUNT_NOT_FOUND" };
        }

        const { balance_cents: bal, version: vFrom } = fromRow.rows[0];
        const { version: vTo } = toRow.rows[0];
        if (bal < amountCents)
          return { ok: false, error: "INSUFFICIENT_FUNDS" };

        const u1 = await client.query(
          `UPDATE accounts
           SET balance_cents = balance_cents - $1, version = version + 1
           WHERE account_id=$2 AND version=$3`,
          [amountCents, fromAccountId, vFrom],
        );
        const u2 = await client.query(
          `UPDATE accounts
           SET balance_cents = balance_cents + $1, version = version + 1
           WHERE account_id=$2 AND version=$3`,
          [amountCents, toAccountId, vTo],
        );

        if (u1.rowCount === 0 || u2.rowCount === 0) {
          throw new Error("OPTIMISTIC_CONFLICT");
        }

        const txId = crypto.randomUUID();
        await client.query(
          `INSERT INTO ledger_transactions(tx_id, from_account_id, to_account_id, amount_cents, branch)
           VALUES ($1, $2, $3, $4, $5)`,
          [txId, fromAccountId, toAccountId, amountCents, branch ?? "Tunis"],
        );

        return { ok: true, txId };
      });

      if (!out.ok) return res.status(409).json(out);
      return res.status(201).json({ ...out, attempt });
    } catch (e) {
      if (String(e?.message) === "OPTIMISTIC_CONFLICT" && attempt < MAX_RETRIES)
        continue;
      return res
        .status(500)
        .json({ error: "INTERNAL_ERROR", details: String(e?.message ?? e) });
    }
  }
});

app.listen(3000, () => console.log("API on http://localhost:3000"));
