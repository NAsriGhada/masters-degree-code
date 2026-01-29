import express from "express";
import { mongoProductsRouter } from "./routes/products.mongo.routes.js";
import { mysqlProductsRouter } from "./routes/products.mysql.routes.js";

export const app = express();
app.use(express.json());

// Mount both so you can compare easily:
app.use("/mongo/products", mongoProductsRouter);
app.use("/mysql/products", mysqlProductsRouter);

// Basic health
app.get("/health", (req, res) => res.json({ ok: true }));

// Simple error wrapper (optional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ status: "error", message: "SERVER_ERROR" });
});
