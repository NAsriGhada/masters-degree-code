// Encapsulated cart; no globals leaked except `Cart`
const Cart = (() => {
  const items = []; // private

  const fmt = new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
  });
  const byName = (name) => items.findIndex((i) => i.name === name);

  function addItem(name, qty, price) {
    if (!name || qty <= 0 || price < 0) throw new Error("Invalid item data");
    const idx = byName(name);
    if (idx === -1) items.push({ name, qty, unitPrice: price });
    else items[idx].qty += qty;
  }

  function removeItem(name) {
    const idx = byName(name);
    if (idx !== -1) items.splice(idx, 1);
  }

  function clear() {
    items.length = 0;
  }

  function getTotal() {
    return items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);
  }

  function view() {
    if (items.length === 0) {
      const msg = "Cart is empty.";
      console.log(msg);
      return msg;
    }
    const lines = items.map(
      (i) => `${i.name} (x${i.qty}) - ${fmt.format(i.qty * i.unitPrice)}`
    );
    const total = `Total: ${fmt.format(getTotal())}`;
    const output = [...lines, total].join("\n");
    console.log(output);
    return output;
  }

  // public surface
  return Object.freeze({
    addItem,
    removeItem,
    clear,
    view,
    getTotal,
    size: () => items.length,
    // safe snapshot
    toJSON: () => items.map((i) => ({ ...i })),
  });
})();

// === Example (uncomment to try) ===
Cart.addItem("Apple", 2, 1.5);
Cart.addItem("Orange", 3, 2.0);
Cart.view();
Cart.removeItem("Apple");
Cart.view();

module.exports = { Cart };
