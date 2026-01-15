// ! index.js (v0 - BAD CODE)
// Everything is mixed: cart logic, product logic, discount logic, printing.
// Tight coupling + duplication on purpose.

const cart = [];
let total = 0;

function addProduct(name, price) {
  cart.push({ name, price });
  total += price;
  console.log("Added: " + name);
}

function removeProduct(name) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      total -= cart[i].price;
      cart.splice(i, 1);
      console.log("Removed: " + name);
      return;
    }
  }
  console.log("Not found: " + name);
}

function printCart() {
  console.log("\n=== CART ===");
  for (let i = 0; i < cart.length; i++) {
    console.log(cart[i].name + " - $" + cart[i].price);
  }
  console.log("TOTAL: $" + total);
}

// BAD discount logic: random ifs in main file
function applyDiscount(type) {
  if (type === "10%") {
    total = total - total * 0.1;
  } else if (type === "5$") {
    total = total - 5;
  }
}

// Demo
addProduct("Mouse", 20);
addProduct("Keyboard", 50);
applyDiscount("10%");
removeProduct("Mouse");
printCart();
