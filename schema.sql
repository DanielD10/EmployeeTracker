DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
)

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(6),
  department_id INT(30),
  PRIMARY KEY (id)
)

CREATE TABLE employees(
     id INT NOT NULL AUTO_INCREMENT,
     first_name VARCHAR(30),
     last_name VARCHAR(30),
     role_id INT(10),
     manager_id INT(10) NULL,
     PRIMARY KEY (id)
)

INSERT INTO departments (name)
VALUES ("Production"), ("Research and Development"), ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Director", 100000, 3), ("Research Director", 80000, 2), ("Web Developer", 75000, 2), ("Production Manager", 120000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Daniel", "Mckiney", 3, NULL), ("Robert","Salas", 2, 1), ("Michael", "Jacks", 2, NULL), ("Rich", "Richy", 1, 1), ("Sarah", "Miller", 4, 4), ("Bianca", "Robles", 2, 4);






