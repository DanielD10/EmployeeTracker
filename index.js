var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port:3030,
    user:"root",
    password: process.env.PASSWORD,
    database: "employee_db"
});