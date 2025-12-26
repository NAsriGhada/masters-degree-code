// orders.js
import { ObjectId } from "mongodb";

export const orderExample = {
  _id: new ObjectId(),

  orderNumber: "ORD-2025-0000123", // unique
  userId: new ObjectId(), // references users._id

  // snapshots keep the order history stable even if the user later edits their profile/address
  customerSnapshot: {
    name: "Ghada",
    email: "user@mail.com",
    phone: "+47...",
  },

  shippingAddressSnapshot: {
    label: "Home",
    line1: "...",
    city: "...",
    zip: "...",
    country: "NO",
  },

  // embed order items for 1-read order details
  items: [
    {
      productId: new ObjectId(),
      sku: "SKU-123",
      title: "Wireless Headphones",
      unitPrice: 129.99,
      quantity: 2,
    },
    {
      productId: new ObjectId(),
      sku: "SKU-555",
      title: "USB-C Charger",
      unitPrice: 19.99,
      quantity: 1,
    },
  ],

  totals: {
    subtotal: 279.97,
    shipping: 10.0,
    tax: 0.0,
    grandTotal: 289.97,
    currency: "USD",
  },

  status: "PAID", // PLACED | PAID | PACKED | SHIPPED | DELIVERED | CANCELED

  delivery: {
    carrier: "DHL",
    trackingNumber: "TRACK-123456",
    lastUpdatedAt: new Date(),
  },

  createdAt: new Date(),
  updatedAt: new Date(),
};
