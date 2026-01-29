import { mysqlPool } from "../db/mysql.js";

function validateBody(body) {
  const nameOk = typeof body?.name === "string" && body.name.trim().length > 0;
  const priceOk =
    typeof body?.price === "number" && Number.isFinite(body.price);
  if (!nameOk) return { ok: false, message: "NAME_REQUIRED" };
  if (!priceOk) return { ok: false, message: "PRICE_REQUIRED_NUMBER" };
  return { ok: true };
}

export const createProductSQL = async (req, res) => {
  const v = validateBody(req.body);
  if (!v.ok)
    return res.status(400).json({ status: "fail", message: v.message });

  const { name, price, category, inStock } = req.body;

  const sql = `
    INSERT INTO products (name, price, category, inStock)
    VALUES (?, ?, ?, ?)
  `;
  const params = [
    name.trim(),
    price,
    typeof category === "string" ? category.trim() : null,
    typeof inStock === "boolean" ? inStock : true,
  ];

  const [result] = await mysqlPool.execute(sql, params);

  // Fetch inserted row (nice for consistent response)
  const [rows] = await mysqlPool.execute(
    "SELECT * FROM products WHERE id = ?",
    [result.insertId],
  );

  return res.status(201).json({ status: "success", data: rows[0] });
};

export const getAllProductsSQL = async (req, res) => {
  const [rows] = await mysqlPool.execute(
    "SELECT * FROM products ORDER BY createdAt DESC",
  );
  return res
    .status(200)
    .json({ status: "success", results: rows.length, data: rows });
};

export const getOneProductSQL = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ status: "fail", message: "INVALID_ID" });

  const [rows] = await mysqlPool.execute(
    "SELECT * FROM products WHERE id = ?",
    [id],
  );
  if (rows.length === 0)
    return res.status(404).json({ status: "fail", message: "NOT_FOUND" });

  return res.status(200).json({ status: "success", data: rows[0] });
};

export const updateProductSQL = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ status: "fail", message: "INVALID_ID" });

  // Build dynamic SET safely (still parameterized)
  const fields = [];
  const values = [];

  if (typeof req.body?.name === "string") {
    fields.push("name = ?");
    values.push(req.body.name.trim());
  }
  if (typeof req.body?.price === "number") {
    fields.push("price = ?");
    values.push(req.body.price);
  }
  if (typeof req.body?.category === "string") {
    fields.push("category = ?");
    values.push(req.body.category.trim());
  }
  if (req.body?.category === null) {
    fields.push("category = ?");
    values.push(null);
  }
  if (typeof req.body?.inStock === "boolean") {
    fields.push("inStock = ?");
    values.push(req.body.inStock);
  }

  if (fields.length === 0) {
    return res
      .status(400)
      .json({ status: "fail", message: "NO_FIELDS_TO_UPDATE" });
  }

  values.push(id);

  const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
  const [result] = await mysqlPool.execute(sql, values);

  if (result.affectedRows === 0)
    return res.status(404).json({ status: "fail", message: "NOT_FOUND" });

  const [rows] = await mysqlPool.execute(
    "SELECT * FROM products WHERE id = ?",
    [id],
  );
  return res.status(200).json({ status: "success", data: rows[0] });
};

export const deleteProductSQL = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ status: "fail", message: "INVALID_ID" });

  const [result] = await mysqlPool.execute(
    "DELETE FROM products WHERE id = ?",
    [id],
  );

  if (result.affectedRows === 0)
    return res.status(404).json({ status: "fail", message: "NOT_FOUND" });

  return res.status(200).json({ status: "success", message: "DELETED" });
};
