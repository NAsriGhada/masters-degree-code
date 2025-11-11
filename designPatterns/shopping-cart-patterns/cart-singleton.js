class ShoppingCart {
  static #instance;
  #items = [];
  #fmt = new Intl.NumberFormat("fr-TN", { style: "currency", currency: "TND" });

  static getInstance() {
    if (!this.#instance) this.#instance = new ShoppingCart();
    return this.#instance;
  }

  addItem(name, qty, price) {
    if (!name || qty <= 0 || price < 0) throw new Error("Invalid item data");
    const idx = this.#items.findIndex((i) => i.name === name);
    if (idx === -1) this.#items.push({ name, qty, unitPrice: price });
    else this.#items[idx].qty += qty;
  }
  removeItem(name) {
    const idx = this.#items.findIndex((i) => i.name === name);
    if (idx !== -1) this.#items.splice(idx, 1);
  }
  clear() {
    this.#items.length = 0;
  }
  getTotal() {
    return this.#items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  }
  view() {
    if (this.#items.length === 0) return "Cart is empty.";
    const lines = this.#items.map(
      (i) => `${i.name} (x${i.qty}) - ${this.#fmt.format(i.qty * i.unitPrice)}`
    );
    return [...lines, `Total: ${this.#fmt.format(this.getTotal())}`].join("\n");
  }
}

// Usage:
const cart = ShoppingCart.getInstance();
module.exports = { ShoppingCart };
