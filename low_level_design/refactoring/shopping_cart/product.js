// !product.js (v3 - refactored)
// Simple Product model (no Builder yet)

// class Product {
//   constructor(id, name, price, category = "General") {
//     this.id = id;
//     this.name = name;
//     this.price = price;
//     this.category = category;
//   }
// }

// module.exports = { Product };

// ! product.js (v4 - Builder pattern)
// Product model + ProductBuilder for flexible creation

// class Product {
//   constructor({ id, name, price, category }) {
//     this.id = id;
//     this.name = name;
//     this.price = price;
//     this.category = category;
//   }
// }

// class ProductBuilder {
//   constructor() {
//     this.data = { category: "General" };
//   }

//   setId(id) {
//     this.data.id = id;
//     return this;
//   }

//   setName(name) {
//     this.data.name = name;
//     return this;
//   }

//   setPrice(price) {
//     this.data.price = price;
//     return this;
//   }

//   setCategory(category) {
//     this.data.category = category;
//     return this;
//   }

//   build() {
//     // minimal validation (simple)
//     if (!this.data.id) throw new Error("Product id is required");
//     if (!this.data.name) throw new Error("Product name is required");
//     if (typeof this.data.price !== "number" || this.data.price < 0) {
//       throw new Error("Product price must be a non-negative number");
//     }

//     return new Product(this.data);
//   }
// }

// module.exports = { Product, ProductBuilder };


// !product.js (v6 - Builder + Observer)
class Product {
  constructor({ id, name, price, category }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;

    // Observer: list of subscriber functions
    this.subscribers = [];
  }

  // Observer: subscribe to price drop
  subscribeToPriceDrop(callback) {
    this.subscribers.push(callback);
  }

  // Observer: notify subscribers
  notifyPriceDrop(oldPrice, newPrice) {
    for (const fn of this.subscribers) {
      fn({
        productId: this.id,
        name: this.name,
        oldPrice,
        newPrice,
      });
    }
  }

  // When price changes, notify only if it DROPS
  setPrice(newPrice) {
    const oldPrice = this.price;
    this.price = newPrice;

    if (newPrice < oldPrice) {
      this.notifyPriceDrop(oldPrice, newPrice);
    }
  }
}

class ProductBuilder {
  constructor() {
    this.data = { category: "General" };
  }

  setId(id) {
    this.data.id = id;
    return this;
  }

  setName(name) {
    this.data.name = name;
    return this;
  }

  setPrice(price) {
    this.data.price = price;
    return this;
  }

  setCategory(category) {
    this.data.category = category;
    return this;
  }

  build() {
    if (!this.data.id) throw new Error("Product id is required");
    if (!this.data.name) throw new Error("Product name is required");
    if (typeof this.data.price !== "number" || this.data.price < 0) {
      throw new Error("Product price must be a non-negative number");
    }
    return new Product(this.data);
  }
}

module.exports = { Product, ProductBuilder };


