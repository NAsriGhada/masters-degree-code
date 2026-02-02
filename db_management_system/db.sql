-- Core tables
CREATE TABLE customers (
  customer_id   UUID PRIMARY KEY,
  full_name     TEXT NOT NULL,
  phone         TEXT,
  address       TEXT,
  home_branch   TEXT NOT NULL CHECK (home_branch IN ('Tunis','Sousse','Sfax'))
);

-- Vertical fragmentation: auth separated
CREATE TABLE customer_auth (
  customer_id    UUID PRIMARY KEY REFERENCES customers(customer_id),
  email          TEXT UNIQUE NOT NULL,
  password_hash  TEXT NOT NULL,
  last_login_at  TIMESTAMP
);

CREATE TABLE accounts (
  account_id    UUID PRIMARY KEY,
  customer_id   UUID NOT NULL REFERENCES customers(customer_id),
  branch        TEXT NOT NULL CHECK (branch IN ('Tunis','Sousse','Sfax')),
  balance_cents BIGINT NOT NULL CHECK (balance_cents >= 0),
  version       BIGINT NOT NULL DEFAULT 1 -- for optimistic locking
);

CREATE TABLE ledger_transactions (
  tx_id           UUID PRIMARY KEY,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  from_account_id UUID NOT NULL REFERENCES accounts(account_id),
  to_account_id   UUID NOT NULL REFERENCES accounts(account_id),
  amount_cents    BIGINT NOT NULL CHECK (amount_cents > 0),
  branch          TEXT NOT NULL CHECK (branch IN ('Tunis','Sousse','Sfax'))
);

-- Horizontal fragmentation (views per branch)
CREATE VIEW customers_tunis  AS SELECT * FROM customers WHERE home_branch='Tunis';
CREATE VIEW customers_sousse AS SELECT * FROM customers WHERE home_branch='Sousse';
CREATE VIEW customers_sfax   AS SELECT * FROM customers WHERE home_branch='Sfax';

-- =========================
-- Example 1: NAIVE TRANSFER (UNSAFE)
-- =========================
BEGIN;

SELECT balance_cents FROM accounts WHERE account_id = :from;

-- app computes new balance and writes it (can cause lost update)
UPDATE accounts
SET balance_cents = :new_balance
WHERE account_id = :from;

UPDATE accounts
SET balance_cents = balance_cents + :amount
WHERE account_id = :to;

INSERT INTO ledger_transactions(tx_id, from_account_id, to_account_id, amount_cents, branch)
VALUES (:tx_id, :from, :to, :amount, :branch);

COMMIT;

-- =========================
-- Example 2: PESSIMISTIC LOCKING (SAFE)
-- =========================
BEGIN;

-- Lock both rows before updating
SELECT account_id, balance_cents
FROM accounts
WHERE account_id IN (:from, :to)
FOR UPDATE;

-- Withdraw only if sufficient funds
UPDATE accounts
SET balance_cents = balance_cents - :amount
WHERE account_id = :from AND balance_cents >= :amount;

-- Deposit
UPDATE accounts
SET balance_cents = balance_cents + :amount
WHERE account_id = :to;

INSERT INTO ledger_transactions(tx_id, from_account_id, to_account_id, amount_cents, branch)
VALUES (:tx_id, :from, :to, :amount, :branch);

COMMIT;

-- =========================
-- Example 3: OPTIMISTIC LOCKING (SAFE, needs retry)
-- =========================
BEGIN;

SELECT balance_cents, version
FROM accounts
WHERE account_id = :from;

UPDATE accounts
SET balance_cents = balance_cents - :amount,
    version = version + 1
WHERE account_id = :from
  AND version = :expected_version
  AND balance_cents >= :amount;

-- if 0 rows updated => conflict => retry

UPDATE accounts
SET balance_cents = balance_cents + :amount,
    version = version + 1
WHERE account_id = :to
  AND version = :expected_version_to;

INSERT INTO ledger_transactions(tx_id, from_account_id, to_account_id, amount_cents, branch)
VALUES (:tx_id, :from, :to, :amount, :branch);

COMMIT;
