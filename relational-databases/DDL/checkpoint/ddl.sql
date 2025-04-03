CREATE TABLE
    Product (
        Product_id VARCHAR(20) CONSTRAINT pk_product PRIMARY KEY,
        Product_name VARCHAR(20) CONSTRAINT cons_product NOT NULL,
        Price Number CONSTRAINT cons_price CHECK (Price > 0),
    );

DESC Product;

CREATE TABLE
    Costumers (
        Costumer_id VARCHAR(20) CONSTRAINT pk_costumer PRIMARY KEY,
        Costumer_name VARCHAR(20) CONSTRAINT cons_costumer NOT NULL,
        Costumer_tel NUMBER CONSTRAINT cons_tel,
    );

DESC Costumers;

CREATE TABLE
    Orders (
        Customer_id VARCHAR2 (20),
        Product_id VARCHAR2 (20),
        Quantity NUMBER,
        Total_amount NUMBER,
        CONSTRAINT pk_order PRIMARY KEY (Customer_id, Product_id),
        CONSTRAINT fk_customer FOREIGN KEY (Customer_id) REFERENCES Customers (Customer_id),
        CONSTRAINT fk_product FOREIGN KEY (Product_id) REFERENCES Product (Product_id)
    );

DESC Orders;

ALTER TABLE Product ADD Category VARCHAR(20);

ALTER TABLE Orders ADD Order_date DATE DEFAULT SYSDATE;