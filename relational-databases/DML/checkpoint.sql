-- DDL for creating tables
CREATE TABLE Customer (
    Customer_id VARCHAR(10) PRIMARY KEY,
    Customer_name VARCHAR(50),
    Customer_tel VARCHAR(15)
);

CREATE TABLE Product (
    Product_id VARCHAR(10) PRIMARY KEY,
    Product_name VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10, 2)
);

CREATE TABLE Orders (
    Customer_id VARCHAR(10),
    Product_id VARCHAR(10),
    OrderDate DATE,
    Quantity INT,
    Total_amount DECIMAL(10, 2),
    PRIMARY KEY (Customer_id, Product_id),
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id),
    FOREIGN KEY (Product_id) REFERENCES Product(Product_id)
);

-- DML for inserting data into tables
-- Customer table
INSERT INTO Customer (Customer_id, customer_name, customer_tel)
VALUES ('C01', 'ALI', '71321009');

INSERT INTO Customer (Customer_id, customer_name, customer_tel)
VALUES ('C02', 'ASMA', '77345823');

-- Product table
INSERT INTO Product (Product_id, product_name, category, price)
VALUES ('P01', 'Samsung Galaxy S20', 'Smartphone', 3299);

INSERT INTO Product (Product_id, product_name, category, price)
VALUES ('P02', 'ASUS Notebook', 'PC', 4599);

-- Orders table
INSERT INTO Orders (Customer_id, Product_id, OrderDate, quantity, total_amount)
VALUES ('C01', 'P02', NULL, 2, 9198);

INSERT INTO Orders (Customer_id, Product_id, OrderDate, quantity, total_amount)
VALUES ('C02', 'P01', '28-05-2020', 1, 3299);
