import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/NoSQLcontroller.js";

export const mongoProductsRouter = Router();

mongoProductsRouter.post("/", createProduct);
mongoProductsRouter.get("/", getAllProducts);
mongoProductsRouter.get("/:id", getOneProduct);
mongoProductsRouter.put("/:id", updateProduct);
mongoProductsRouter.delete("/:id", deleteProduct);
