// indexes.js

export const indexes = {
  users: [{ keys: { email: 1 }, options: { unique: true } }],

  products: [
    { keys: { sku: 1 }, options: { unique: true } },

    // Basic Mongo text search (or replace with Atlas Search in real deployments)
    {
      keys: {
        title: "text",
        description: "text",
        brand: "text",
        categories: "text",
      },
    },

    // Browse/filter patterns
    { keys: { categories: 1, price: 1 } },
    { keys: { brand: 1, price: 1 } },
  ],

  orders: [
    { keys: { orderNumber: 1 }, options: { unique: true } },
    { keys: { userId: 1, createdAt: -1 } }, // user order history
    { keys: { status: 1, updatedAt: -1 } }, // fulfillment/ops dashboard
  ],
  
};

// refactor/indexes.js
export const refactorIndexes = {
  daily_product_sales: [
    { keys: { date: 1, unitsSold: -1 } },   // top sellers for a date
    { keys: { productId: 1, date: -1 } },   // trends for a product
    { keys: { sku: 1, date: -1 } },
  ],
  daily_category_sales: [
    { keys: { date: 1, revenue: -1 } },     // top categories by revenue
    { keys: { category: 1, date: -1 } },
  ],
};
