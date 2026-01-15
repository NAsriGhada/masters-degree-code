# Shopping Cart System – Refactoring & Design Patterns Report

## 1. Introduction

This project focuses on improving an initially messy implementation of an online Shopping Cart System through **iterative refactoring** and the gradual integration of **design patterns**.  
The objective was to transform poorly structured code into a **clean, modular, and maintainable system** while preserving behavior at each refactoring step.

The work followed an Agile-like cycle:
> Refactor → Test → Improve → Repeat

---

## 2. Iteration 0 – Initial Bad Code (Baseline)

The initial implementation was intentionally poorly designed:

### Problems Identified
- All logic was placed inside a single file (`index.js`)
- Use of global variables (`cart`, `total`)
- Tight coupling between cart, product, discount, and UI logic
- Hard-coded discount logic using `if/else`
- High risk of bugs due to duplicated state

This version served as the **baseline** for refactoring and was preserved for comparison.

---

## 3. Iteration 1 – Encapsulation of Cart Logic

### Changes Made
- Introduced a `ShoppingCart` class
- Moved cart state (`items`, `total`) and behavior into the class
- Removed global variables from `index.js`

### Why
- To encapsulate state and protect it from uncontrolled access
- To centralize cart-related responsibilities

### Result
- Same behavior as Iteration 0
- Improved structure and readability

This step demonstrated **encapsulation**, a core object-oriented principle.

---

## 4. Iteration 2 – Removing Duplicated State

### Changes Made
- Removed the stored `total` property
- Introduced `getSubtotal()` and `getTotal()` methods
- Total is now calculated dynamically from cart items

### Why
- Storing `total` caused duplication and potential inconsistencies
- Using a single source of truth reduces bugs

### Result
- Safer, more reliable cart calculations
- Still no change in external behavior

This step reinforced **refactoring without changing functionality**.

---

## 5. Iteration 3 – Introducing the Product Model

### Changes Made
- Created a `Product` class
- Replaced raw objects (`{ name, price }`) with `Product` instances
- Cart now stores consistent product objects

### Why
- Improves data consistency
- Prepares the system for future extensions
- Separates product responsibility from cart logic

This iteration improved **data modeling** and code clarity.

---

## 6. Iteration 4 – Builder Pattern (Product Creation)

### Pattern Applied: Builder

### Changes Made
- Introduced `ProductBuilder`
- Allowed step-by-step product creation
- Centralized validation logic in one place

### Why
- Avoids complex constructors with many parameters
- Makes object creation readable and flexible
- Allows optional fields (e.g., category)

### Result
- Cleaner product instantiation
- Better scalability for future product attributes

---

## 7. Iteration 5 – Strategy Pattern (Discounts)

### Pattern Applied: Strategy

### Changes Made
- Removed `if/else` discount logic
- Created interchangeable discount strategies:
  - `NoDiscount`
  - `PercentageDiscount`
  - `FixedDiscount`
- Cart now delegates discount calculation to a strategy object

### Why
- Open/Closed Principle: add new discounts without modifying cart logic
- Eliminates conditional complexity
- Improves flexibility and testability

### Result
- Discount behavior is modular and extensible
- Cleaner `ShoppingCart` implementation

---

## 8. Iteration 6 – Observer Pattern (Price Drop Notifications)

### Pattern Applied: Observer

### Changes Made
- Products can register subscribers (listeners)
- Subscribers are notified when a product’s price drops
- Product does not know who listens to it (loose coupling)

### Why
- Enables notifications without hard dependencies
- Allows future extensions (email, UI alerts, logging)
- Decouples event producers from consumers

### Result
- Reactive behavior added cleanly
- No impact on cart logic

---

## 9. Clean Code Principles Applied

Throughout the project, the following principles were applied:

- **Single Responsibility Principle**
- **Encapsulation**
- **Separation of Concerns**
- **Open/Closed Principle**
- **Readable naming conventions**
- **Small, focused methods**
- **Incremental, safe refactoring**

Each iteration kept the code runnable and testable.

---

## 10. Conclusion

This project demonstrates how a poorly structured system can be systematically improved through **iterative refactoring** and **design pattern integration**.

By separating responsibilities, removing duplication, and applying appropriate patterns (Builder, Strategy, Observer), the final system is:
- Easier to maintain
- Easier to extend
- Safer to modify
- Aligned with real-world software engineering practices

The iterative approach ensured continuous improvement without breaking functionality, closely reflecting professional Agile development workflows.

---

## 11. File Structure (Final)
```text
shopping_cart/
├── index.js            # Iteration 0 (bad code – baseline)
├── indexRefacto.js     # Refactored runner (v1 → v6)
├── cart.js             # ShoppingCart logic
├── product.js          # Product + Builder + Observer
├── discount.js         # Strategy implementations
└── REPORT.md           # This report
