-- 1. Display all the data of customers
SELECT * FROM Customer;

-- 2. Display the product_name and category for products with price between 5000 and 10000
SELECT product_name, category
FROM Product
WHERE Price BETWEEN 5000 AND 10000;

-- 3. Display all the data of products sorted in descending order of price
SELECT * 
FROM Product
ORDER BY Price DESC;

-- 4. Display the total number of orders, the average amount, the highest total amount and the lower total amount
SELECT 
    COUNT(*) AS total_orders,
    AVG(total_amount) AS average_amount,
    MAX(total_amount) AS highest_amount,
    MIN(total_amount) AS lowest_amount
FROM Orders;

-- 5. Display the customer_id which has more than 2 orders
SELECT Customer_id
FROM Orders
GROUP BY Customer_id
HAVING COUNT(*) > 2;

-- 6. For each month of the 2020 year, display the number of orders
-- Works for SQLite using STRFTIME() to format date
SELECT 
    STRFTIME('%Y-%m', OrderDate) AS month,
    COUNT(*) AS number_of_orders
FROM Orders
WHERE STRFTIME('%Y', OrderDate) = '2020'
GROUP BY month
ORDER BY month;


-- 7. For each order, display the product_name, the customer_name and the date of the order
SELECT 
    Product.product_name,
    Customer.customer_Name,
    Orders.OrderDate
FROM Orders
JOIN Customer ON Orders.Customer_id = Customer.Customer_id
JOIN Product ON Orders.Product_id = Product.Product_id;


-- 8. Display all the orders made three months ago
-- Works for SQLite using DATE() and INTERVAL
SELECT *
FROM Orders
WHERE STRFTIME('%Y-%m', order_date) = STRFTIME('%Y-%m', DATE('now', '-3 months'));

-- 10. Display customers (customer_id) who have never ordered a product
SELECT Customer_id
FROM Customer
WHERE Customer_id NOT IN (
    SELECT DISTINCT Customer_id FROM Orders
);
