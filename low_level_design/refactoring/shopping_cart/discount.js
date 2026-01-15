// ! discount.js (v5 - Strategy pattern)
// Different discount behaviors, same interface: apply(subtotal)

class NoDiscount {
  getLabel() {
    return "No discount";
  }
  apply(subtotal) {
    return subtotal;
  }
}

class PercentageDiscount {
  constructor(percent) {
    this.percent = percent;
  }
  getLabel() {
    return `${this.percent}% off`;
  }
  apply(subtotal) {
    return subtotal - subtotal * (this.percent / 100);
  }
}

class FixedDiscount {
  constructor(amount) {
    this.amount = amount;
  }
  getLabel() {
    return `$${this.amount} off`;
  }
  apply(subtotal) {
    const result = subtotal - this.amount;
    return result < 0 ? 0 : result;
  }
}

module.exports = { NoDiscount, PercentageDiscount, FixedDiscount };
