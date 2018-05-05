DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL (10,2),
  stock_quantity INTEGER(11),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('apple', 'fruits', 1.34, 12),
('lettuce', 'vegetables', 0.25, 63),
('shampoo', 'bath', 5.45, 134),
('shirt', 'clothing', 2.28, 76),
('hat', 'clothing', 1.36, 9),
('watermelon', 'fruits', 1.00, 42),
('carrot', 'vegetables', 0.42, 45),
('conditioner', 'bath', 3.78, 37),
('ipod', 'electronics', 100.45, 98),
('headphones', 'electronics', 78.39, 82);

SELECT * FROM bamazon.products;