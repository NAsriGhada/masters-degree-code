// products.js
import { ObjectId } from "mongodb";

export const productExample = {
  _id: new ObjectId(),

  sku: "SKU-123", // unique
  title: "Wireless Headphones",
  description: "Over-ear wireless headphones with noise cancellation.",

  categories: ["audio", "wireless"],
  brand: "Nomadica",

  price: 129.99,
  currency: "USD",

  images: [
    "https://example.com/images/sku-123/front.png",
    "https://example.com/images/sku-123/side.png",
  ],

  // flexible product specs (NoSQL advantage)
  attributes: {
    color: "black",
    batteryHours: 30,
    noiseCancelling: true,
  },

  stock: 340,
  isActive: true,

  createdAt: new Date(),
  updatedAt: new Date(),
};
