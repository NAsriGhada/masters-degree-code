
# 📌 Hotel Management Database System

This README file explains the design and implementation of a **Hotel Management Database System** using **MySQL Workbench**. The purpose of this project is to model the database schema and relationships for managing hotel data, including hotels, rooms, categories, employees, and room types.

---

## 📚 Overview

The database consists of five main entities:

- **HOTEL**
- **TYPE**
- **ROOM**
- **CATEGORY**
- **EMPLOYEE**

These entities are related in various ways to accurately represent how data is connected in a real-world hotel management system.

---

## 🔍 Entity Descriptions

### 🏨 1. HOTEL
- Represents a hotel entity.
- Contains attributes: `Hotel_Id` (Primary Key), `Hotel_name`.
- **Relationships:**
  - Has many `Rooms` (**1..N**).
  - Has many `Types` (**1..N**).
  - Employs many `Employees` (**1..N**).

### 🛏️ 2. TYPE
- Represents different types of rooms available in a hotel (e.g., Suite, Deluxe Room).
- Contains attributes: `Type_Id` (Primary Key), `Type_Name`, `Hotel_Id` (Foreign Key).
- **Relationships:**
  - Belongs to exactly one `Hotel` (**1..1**).
  - A `Hotel` can have many `Types` (**1..N**).

### 🚪 3. ROOM
- Represents individual rooms in a hotel.
- Contains attributes: `Room_Id` (Primary Key), `Floor`, `Hotel_Id` (Foreign Key).
- **Relationships:**
  - Belongs to exactly one `Hotel` (**1..1**).
  - A `Hotel` can have many `Rooms` (**1..N**).
  - Is associated with many `Categories` (**1..N**).

### 🏷️ 4. CATEGORY
- Represents the categories of rooms available (e.g., Economy, Luxury).
- Contains attributes: `Category_Id` (Primary Key), `Category_Name`, `Price`, `Beds_numbers`, `Room_Id` (Foreign Key).
- **Relationships:**
  - Each `Category` is related to one `Room` (**1..1**).
  - A `Room` can have multiple `Categories` (**1..N**).

### 👨‍💼 5. EMPLOYEE
- Represents the employees working at a hotel.
- Contains attributes: `Employee_Id` (Primary Key), `Employee_Name`, `Employee_Speciality`, `Hotel_Id` (Foreign Key), `Leader_Id` (Self-Referencing Foreign Key).
- **Relationships:**
  - Belongs to one `Hotel` (**1..1**).
  - A `Hotel` can have many `Employees` (**1..N**).
  - **Self-Referencing Relationship:** One `Employee` can lead multiple `Employees` but can only be led by one `Employee`.

---

## 🔗 Relationship Summary

| Relationship       | Cardinality (From) | Cardinality (To) | Type          |
|-------------------|--------------------|------------------|---------------|
| `Hotel → Type`     | `1..1` (Hotel)     | `1..N` (Type)     | One-to-Many    |
| `Hotel → Room`     | `1..N` (Hotel)     | `1..1` (Room)     | One-to-Many    |
| `Hotel → Employee` | `1..N` (Hotel)     | `1..1` (Employee) | One-to-Many    |
| `Room → Category`  | `1..1` (Room)      | `1..N` (Category) | One-to-Many    |
| `Employee → Employee (Leads)` | `1..1` (Leader) | `1..N` (Led Employees) | One-to-One (Self-Referencing) |

---

## 💡 Explanation of Cardinalities

- **1..1 (One-to-One):** One entity is associated with only one other entity.
- **1..N (One-to-Many):** One entity can have multiple associations with another entity.
- **Self-Referencing Relationship:** An entity that has a relationship with itself to form a hierarchy (like a manager leading employees).

---

## 📌 Implementation in MySQL Workbench

- The schema was designed using **MySQL Workbench** with tables and relationships created using the EER Diagram tool.
- All foreign keys and relationships are properly implemented.

---
