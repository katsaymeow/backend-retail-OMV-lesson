-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(250) NOT NULL
);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    price DECIMAL(12,2) NOT NULL -- need to have validation here
    stock INT NOT NULL DEFAULT 10, -- need to have validation here
    category_id INT,
    FOREIGN KEY(category_id)
    REFERENCES category(id)
);

CREATE TABLE tag (
    id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(150) NOT NULL
);

CREATE TABLE productTag (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    FOREIGN KEY (product_id)
    REFERENCES product(id),
    tag_id INT,
    FOREIGN KEY (tag_id)
    REFERENCES tag(id)
);

