// Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// ShoppingCartItem class
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  // Method to calculate total price of the item
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart class
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Add item to the cart
  addItem(product, quantity) {
    // Check if product already exists in the cart
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
  }

  // Remove item from the cart
  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  // Get total of items inside the cart
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Display cart items
  displayCart() {
    if (this.items.length === 0) {
      console.log("Your cart is empty.");
      return;
    }
    console.log("Shopping Cart:");
    this.items.forEach((item) => {
      console.log(
        `${item.product.name} - $${item.product.price} x ${
          item.quantity
        } = $${item.getTotalPrice()}`
      );
    });
    console.log(`Total Price: $${this.getTotalPrice()}`);
  }
}

// Testing the shopping cart

// Creating products
const product1 = new Product(1, "Laptop", 1000);
const product2 = new Product(2, "Phone", 500);
const product3 = new Product(3, "Headphones", 100);

// Creating a shopping cart
const cart = new ShoppingCart();

// Adding items to the cart
cart.addItem(product1, 1);
cart.addItem(product2, 2);
cart.addItem(product3, 3);

// Displaying the cart
cart.displayCart();

// Removing an item from the cart
cart.removeItem(2);

console.log("\nAfter removing the phone:");
cart.displayCart();
