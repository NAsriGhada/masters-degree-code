// //! cart.js (v1 - refactored)
// // Cart logic moved into a class (encapsulation). No discount strategy yet.

// class ShoppingCart {
//   constructor() {
//     this.items = [];
//     this.total = 0; // keeping total like v0 for now (small safe step)
//   }

//   addProduct(name, price) {
//     this.items.push({ name, price });
//     this.total += price;
//     console.log("Added: " + name);
//   }

//   removeProduct(name) {
//     for (let i = 0; i < this.items.length; i++) {
//       if (this.items[i].name === name) {
//         this.total -= this.items[i].price;
//         this.items.splice(i, 1);
//         console.log("Removed: " + name);
//         return true;
//       }
//     }
//     console.log("Not found: " + name);
//     return false;
//   }

//   applyDiscount(type) {
//     // still "bad-ish" logic kept on purpose, we move it later to Strategy
//     if (type === "10%") {
//       this.total = this.total - this.total * 0.1;
//     } else if (type === "5$") {
//       this.total = this.total - 5;
//     }
//   }

//   printCart() {
//     console.log("\n=== CART ===");
//     for (let i = 0; i < this.items.length; i++) {
//       console.log(this.items[i].name + " - $" + this.items[i].price);
//     }
//     console.log("TOTAL: $" + this.total);
//   }
// }

// module.exports = { ShoppingCart };


// ! cart.js (v3 - refactored)
// Cart now stores Product objects.
// Total is computed from items (single source of truth).

// class ShoppingCart {
//   constructor() {
//     this.items = [];
//     this.discountType = null;
//   }

//   addProduct(product) {
//     this.items.push(product);
//     console.log("Added: " + product.name);
//   }

//   removeProductByName(name) {
//     for (let i = 0; i < this.items.length; i++) {
//       if (this.items[i].name === name) {
//         this.items.splice(i, 1);
//         console.log("Removed: " + name);
//         return true;
//       }
//     }
//     console.log("Not found: " + name);
//     return false;
//   }

//   applyDiscount(type) {
//     this.discountType = type;
//   }

//   getSubtotal() {
//     let sum = 0;
//     for (const item of this.items) {
//       sum += item.price;
//     }
//     return sum;
//   }

//   getTotal() {
//     let total = this.getSubtotal();

//     if (this.discountType === "10%") {
//       total = total - total * 0.1;
//     } else if (this.discountType === "5$") {
//       total = total - 5;
//     }

//     return total;
//   }

//   printCart() {
//     console.log("\n=== CART ===");
//     if (this.items.length === 0) {
//       console.log("(empty)");
//     } else {
//       for (let i = 0; i < this.items.length; i++) {
//         const p = this.items[i];
//         console.log(`${p.name} - $${p.price} (id: ${p.id})`);
//       }
//     }
//     console.log("SUBTOTAL: $" + this.getSubtotal());
//     console.log("TOTAL: $" + this.getTotal());
//   }
// }

// module.exports = { ShoppingCart };


// ! cart.js (v5 - uses Strategy for discounts)

const { NoDiscount } = require("./discount");

class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = new NoDiscount(); // default strategy
  }

  addProduct(product) {
    this.items.push(product);
    console.log("Added: " + product.name);
  }

  removeProductByName(name) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === name) {
        this.items.splice(i, 1);
        console.log("Removed: " + name);
        return true;
      }
    }
    console.log("Not found: " + name);
    return false;
  }

  setDiscountStrategy(discountStrategy) {
    this.discount = discountStrategy;
  }

  getSubtotal() {
    let sum = 0;
    for (const item of this.items) {
      sum += item.price;
    }
    return sum;
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    return this.discount.apply(subtotal);
  }

  printCart() {
    console.log("\n=== CART ===");
    if (this.items.length === 0) {
      console.log("(empty)");
    } else {
      for (const p of this.items) {
        console.log(`${p.name} - $${p.price} (id: ${p.id})`);
      }
    }
    console.log("Discount: " + this.discount.getLabel());
    console.log("SUBTOTAL: $" + this.getSubtotal());
    console.log("TOTAL: $" + this.getTotal());
  }
}

module.exports = { ShoppingCart };

