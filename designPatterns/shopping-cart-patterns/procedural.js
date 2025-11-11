// === Global state ===
let cart = []; // [{ name, qty, unitPrice }]

// === Helpers ===
const fmt = new Intl.NumberFormat("fr-TN", {
  style: "currency",
  currency: "TND",
});

function getTotal() {
  return cart.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
}

function findIndexByName(name) {
  return cart.findIndex((i) => i.name === name);
}

// === API (procedural) ===
function addItem(name, qty, price) {
  if (!name || qty <= 0 || price < 0) throw new Error("Invalid item data");
  const idx = findIndexByName(name);
  if (idx === -1) cart.push({ name, qty, unitPrice: price });
  else cart[idx].qty += qty;
}

function removeItem(name) {
  const idx = findIndexByName(name);
  if (idx !== -1) cart.splice(idx, 1);
}

function clearCart() {
  cart = [];
}

function viewCart() {
  if (cart.length === 0) {
    console.log("Cart is empty.");
    return "Cart is empty.";
  }

  const lines = cart.map(
    (i) => `${i.name} (x${i.qty}) - ${fmt.format(i.qty * i.unitPrice)}`
  );
  const total = `Total: ${fmt.format(getTotal())}`;
  const output = [...lines, total].join("\n");
  console.log(output);
  return output;
}

// === Example (uncomment to try) ===
addItem("Apple", 2, 1.5);
addItem("Orange", 3, 2.0);
viewCart();
removeItem("Apple");
viewCart();

// Export for tests (optional, Node)
module.exports = {
  addItem,
  removeItem,
  clearCart,
  viewCart,
  getTotal,
  _state: () => cart,
};
