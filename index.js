var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "employee_db",
});
process.on("uncaughtException", function (err) {
  console.log(err);
});
connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  //prompt the user if they would like to add deparment or roles or employees,and an option to exit
  inquirer
    .prompt({
      name: "name",
      type: "list",
      message: "What would you like to do?",
      choices: ["add Deparment", "add Role", "add Employee", "Exit"],
    })
    // if they choose to add a department then ask for department name.
    .then(function (answer) {
      if (answer.name === "add Department") {
        inquirer
          .prompt({
            name: "Department",
            type: "input",
            message: "What is your Department Name",
          })
          .then(function (answer) {
            //add department to database with connection query
            connection.query(
              "INSERT INTO departments SET ?",
              {
                name: answer.name,
              },

              function (err, res) {
                if (err) throw err;
              }
            );
          });
      }
      
    });
}

//repromt users add deparment or roles or employees or exit