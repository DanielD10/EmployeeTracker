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
      choices: ["add Department", "add Role", "add Employee", "Exit"],
    })
    // if they choose to add a department then ask for department name.
    .then(function (answer) {
      console.log(answer);
      if (answer.name === "add Department") {
        inquirer
          .prompt({
            name: "Department",
            type: "input",
            message: "What is your Department Name:",
          })
          .then(function (answer) {
            console.log(answer);
            //add department to database with connection query
            connection.query(
              "INSERT INTO departments SET ?",
              {
                name: answer.Department,
              },

              function (err, res) {
                if (err) throw err;
                start();
              }
            );
          });
      } else if (answer.name === "add Role") {
        inquirer
          .prompt([
            {
              name: "title",
              type: "input",
              message: "What is your job title?",
            },
            {
              name: "salary",
              type: "input",
              message: "What is your year Salary?",
            },
            {
              name: "department_id",
              type: "list",
              message: "What department are you in?",
              choices: ["Production", "Research & development", "Marketing"],
            },
          ])
          .then(function (answer) {
            var department_id;
            if (answer.department_id === "Production") {
              department_id = 1;
            } else if (answer.department_id === "Research & development") {
              department_id = 2;
            } else {
              department_id = 3;
            }
            console.log(answer);
            connection.query("INSERT INTO roles SET ?", {
              title: answer.title,
              salary: answer.salary,
              department_id: department_id,
            },
            function(err,res){
                if(err) throw err;
                start();
            }
            
            );
          });
        // ask for role questions
      } else if (answer.name === "add Employee") {
          inquirer
          .prompt([
              {
                name: "first_name",
                type: "input",
                message: "What is your first name?" 
              },
              {
                  name:"last_name",
                  type: "input",
                  message: "What is your last name?"
              },
              {
                  name: "role",
                  type: "list",
                  message: "What is your role?",
                  choices: ["Marketing Director", "Research Director", "Web Developer", "Production Manager"]
              },
              {
                name: "manager",
                type: "list",
                message: "Do you have a manager?",
                choices: ["Daniel Mckiney", "Sarah Miller", "None"]
              }
          ]).then(function (answer) {
            var role_id;
            if (answer.role === "Marketing Director") {
              role_id = 1;
            } else if (answer.role === "Research Director") {
              role_id = 2;
            } else if (answer.role === "Web Developer") {
                role_id = 3;
            } else {
              role_id = 4;
            }
            var manager_id;
            if (answer.manager === "Daniel Mckiney") {
              manager_id = 1;
            } else if (answer.manager === "Sarah Miller") {
                manager_id = 2;
            }else {
                manager_id = null
            }
            connection.query("INSERT INTO employees SET ?", {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: role_id,
                manager_id: manager_id
              },
              function(err,res){
                  if(err) throw err;
                  start();
              }
              
              )
          })
        }
        else if (answer.name === "Exit") {
                connection.end();
      }
    });
}

//repromt users add deparment or roles or employees or exit
