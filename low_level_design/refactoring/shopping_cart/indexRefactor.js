// //! index.js (v1 - refactored)
// // index.js only coordinates (no business logic)

// const { ShoppingCart } = require("./cart");

// const cart = new ShoppingCart();

// // Same demo as v0 (same behavior)
// cart.addProduct("Mouse", 20);
// cart.addProduct("Keyboard", 50);
// cart.applyDiscount("10%");
// cart.removeProduct("Mouse");
// cart.printCart();


// ! indexRefacto.js (v3 - refactored runner)

// const { ShoppingCart } = require("./cart");
// const { Product } = require("./product");

// const cart = new ShoppingCart();

// const mouse = new Product("p1", "Mouse", 20, "Accessories");
// const keyboard = new Product("p2", "Keyboard", 50, "Accessories");

// cart.addProduct(mouse);
// cart.addProduct(keyboard);

// cart.applyDiscount("10%");
// cart.removeProductByName("Mouse");

// cart.printCart();


// ! indexRefacto.js (v4 - using Builder)

// const { ShoppingCart } = require("./cart");
// const { ProductBuilder } = require("./product");

// const cart = new ShoppingCart();

// const mouse = new ProductBuilder()
//   .setId("p1")
//   .setName("Mouse")
//   .setPrice(20)
//   .setCategory("Accessories")
//   .build();

// const keyboard = new ProductBuilder()
//   .setId("p2")
//   .setName("Keyboard")
//   .setPrice(50)
//   .setCategory("Accessories")
//   .build();

// cart.addProduct(mouse);
// cart.addProduct(keyboard);

// cart.applyDiscount("10%");
// cart.removeProductByName("Mouse");

// cart.printCart();


// ! indexRefacto.js (v5 - Strategy in action)

// const { ShoppingCart } = require("./cart");
// const { ProductBuilder } = require("./product");
// const { PercentageDiscount } = require("./discount");

// const cart = new ShoppingCart();

// const mouse = new ProductBuilder()
//   .setId("p1")
//   .setName("Mouse")
//   .setPrice(20)
//   .setCategory("Accessories")
//   .build();

// const keyboard = new ProductBuilder()
//   .setId("p2")
//   .setName("Keyboard")
//   .setPrice(50)
//   .setCategory("Accessories")
//   .build();

// cart.addProduct(mouse);
// cart.addProduct(keyboard);

// // Strategy:
// cart.setDiscountStrategy(new PercentageDiscount(10));

// cart.removeProductByName("Mouse");
// cart.printCart();


// !indexRefacto.js (v6 - Observer demo + cart still works)

const { ShoppingCart } = require("./cart");
const { ProductBuilder } = require("./product");
const { PercentageDiscount } = require("./discount");

const cart = new ShoppingCart();

const mouse = new ProductBuilder()
  .setId("p1")
  .setName("Mouse")
  .setPrice(20)
  .setCategory("Accessories")
  .build();

// Observer subscription (user notification)
mouse.subscribeToPriceDrop((event) => {
  console.log(
    `🔔 Price drop! ${event.name}: $${event.oldPrice} -> $${event.newPrice}`
  );
});

const keyboard = new ProductBuilder()
  .setId("p2")
  .setName("Keyboard")
  .setPrice(50)
  .setCategory("Accessories")
  .build();

cart.addProduct(mouse);
cart.addProduct(keyboard);

// Strategy still works:
cart.setDiscountStrategy(new PercentageDiscount(10));

// Trigger price drop notification:
mouse.setPrice(15);

cart.printCart();
