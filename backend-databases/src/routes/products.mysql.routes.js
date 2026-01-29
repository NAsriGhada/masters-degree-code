import { Router } from "express";
import {
  createProductSQL,
  getAllProductsSQL,
  getOneProductSQL,
  updateProductSQL,
  deleteProductSQL,
} from "../controllers/SQLcontroller.js";

export const mysqlProductsRouter = Router();

mysqlProductsRouter.post("/", createProductSQL);
mysqlProductsRouter.get("/", getAllProductsSQL);
mysqlProductsRouter.get("/:id", getOneProductSQL);
mysqlProductsRouter.put("/:id", updateProductSQL);
mysqlProductsRouter.delete("/:id", deleteProductSQL);
