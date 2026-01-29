import mongoose from "mongoose";
import { Product } from "../models/Product.mongo.js";

function validateBody(body) {
  const nameOk = typeof body?.name === "string" && body.name.trim().length > 0;
  const priceOk =
    typeof body?.price === "number" && Number.isFinite(body.price);
  if (!nameOk) return { ok: false, message: "NAME_REQUIRED" };
  if (!priceOk) return { ok: false, message: "PRICE_REQUIRED_NUMBER" };
  return { ok: true };
}

export const createProduct = async (req, res) => {
  const v = validateBody(req.body);
  if (!v.ok)
    return res.status(400).json({ status: "fail", message: v.message });

  const { name, price, category, inStock } = req.body;

  const product = await Product.create({
    name: name.trim(),
    price,
    category: typeof category === "string" ? category.trim() : undefined,
    inStock: typeof inStock === "boolean" ? inStock : undefined,
  });

  return res.status(201).json({ status: "success", data: product });
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  return res
    .status(200)
    .json({ status: "success", results: products.length, data: products });
};

export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ status: "fail", message: "INVALID_ID" });

  const product = await Product.findById(id);
  if (!product)
    return res.status(404).json({ status: "fail", message: "NOT_FOUND" });

  return res.status(200).json({ status: "success", data: product });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ status: "fail", message: "INVALID_ID" });

  const patch = {};
  if (typeof req.body?.name === "string") patch.name = req.body.name.trim();
  if (typeof req.body?.price === "number") patch.price = req.body.price;
  if (typeof req.body?.category === "string")
    patch.category = req.body.category.trim();
  if (req.body?.category === null) patch.category = null;
  if (typeof req.body?.inStock === "boolean") patch.inStock = req.body.inStock;

  const updated = await Product.findByIdAndUpdate(id, patch, {
    new: true,
    runValidators: true,
  });

  if (!updated)
    return res.status(404).json({ status: "fail", message: "NOT_FOUND" });
  return res.status(200).json({ status: "success", data: updated });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ status: "fail", message: "INVALID_ID" });

  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted)
    return res.status(404).json({ status: "fail", message: "NOT_FOUND" });

  return res.status(200).json({ status: "success", message: "DELETED" });
};
