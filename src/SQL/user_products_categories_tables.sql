--Criação das tabelas de Usuários, categorias e products

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    use_in_menu BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enabled BOOLEAN DEFAULT 0,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    use_in_menu BOOLEAN DEFAULT 0,
    stock INT DEFAULT 0,
    description TEXT,
    price FLOAT NOT NULL,
    price_with_discount FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- resto das tabelas

CREATE TABLE images(
id INT PRIMARY KEY AUTO_INCREMENT,
product_id INT,
FOREIGN KEY(product_id) REFERENCES products(id),
enabled BOOL DEFAULT 0,
path VARCHAR(255) NOT NULL
);

CREATE TABLE product_options(
id INT PRIMARY KEY AUTO_INCREMENT,
product_id INT,
FOREIGN KEY(product_id) REFERENCES products(id),
title VARCHAR(50) NOT NULL,
shape ENUM('square', 'circle') DEFAULT 'square',
radius INT DEFAULT 0,
type ENUM('text', 'color') DEFAULT 'text',
values VARCHAR(255) NOT NULL
);

CREATE TABLE product_categories(
product_id INT NOT NULL,
FOREIGN KEY(product_id) REFERENCES products(id),
category_id INT NOT NULL,
FOREIGN KEY(category_id) REFERENCES categories(id)
);