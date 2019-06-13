
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100),
price DECIMAL(10,2),
stock_quantity,
primary key(item_id)
); 

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Echo (2nd Generation) - Smart speaker with Alexa","Electronics",64.99,40); 
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("iPhone 7 128 GB Unlocked","Electronics",254.99,3); 
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Bluetooth Headphones Letsfit Waterproof Sports","Electronics",19.99,100); 
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Aztec Secret - Indian Healing Clay","Beauty and Personal Care",10.00,50); 
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Oral-B White Pro 1000 Power Electric Toothbrush","Beauty and Personal Care",39.94,40); 
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("iRobot Roomba 675 Robot Vacuum","Home and Kitchen",248.00,100); 
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Nespresso ENV155T Deluxe Coffee snf Espresso Maker","Home and Kitchen",138.96,5); 
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Super Smash Bros. Ultimate","Video Games",49.94,50); 
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Red Dead Redemption 2","Video Games",34.99,50); 
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("God of War","Video Games",19.99,40);
