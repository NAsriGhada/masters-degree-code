// refactor/daily_product_sales.js
import { ObjectId } from "mongodb";

export const dailyProductSales = {
  _id: "2025-12-26|SKU-123", // unique per day + product
  date: "2025-12-26",

  productId: new ObjectId(),
  sku: "SKU-123",
  title: "Wireless Headphones", // snapshot for reporting

  unitsSold: 530,
  revenue: 68849.7,
  ordersCount: 410,

  updatedAt: new Date(),
};
