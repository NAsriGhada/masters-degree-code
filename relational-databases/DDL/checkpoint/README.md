# SQL DDL Checkpoint – Relational Model

## 📋 Objective

This project demonstrates the creation of a relational database model using SQL, based on a given schema and constraints.

You can view the diagrams used in this checkpoint:

- [Relational Model Diagram](https://i.imgur.com/aZeHhHe.png)
- [Data Types & Constraints Table](https://i.imgur.com/vx1xFvS.png)

---

## 🗃️ Tables Created

- **CUSTOMERS**
- **PRODUCT**
- **ORDERS**

Each table was created using SQL DDL commands while respecting:
- Primary keys
- Foreign keys
- NOT NULL constraints
- CHECK constraints (e.g., positive price)
- Data types (e.g., `VARCHAR2`, `NUMBER`)

---

## ⚙️ Additional Modifications

After table creation, the following changes were made:

- Added `Category` column to `Product` (`VARCHAR2(20)`)
- Added `Order_date` column to `Orders` (`DATE DEFAULT SYSDATE`)

---

## ▶️ How to Run

1. Open your SQL environment (e.g., Oracle SQL Developer).
2. Copy and paste the SQL code from the `schema.sql` file.
3. Execute all statements to create and alter the tables.

---

## ✅ Notes

- Composite primary key used in `Orders` (`Customer_id`, `Product_id`)
- Foreign keys ensure referential integrity between tables
- `DESC TableName;` was used to confirm structure

---


