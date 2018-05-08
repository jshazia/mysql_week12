var mysql = require("mysql");
var inquirer = require("inquirer");
const {table} = require('table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    run();

});

function run() {
    inquirer
        .prompt([
            {
                name: "initialquestion",
                type: "list",
                message: "Choose a task",
                choices: ["View Inventory","Buy Item","View Low Inventory","Add to Inventory","Add New Product"]
            }
        ])
        .then(function(answer){
            switch(answer.initialquestion){
                case "View Inventory":
                    displayItems();
                    break;
                case "Buy Item":
                    buy();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                default:
                    console.log('End of choices');
                    connection.end();
            }
        })
}
function addProduct(){}
function addInventory(){}
function lowInventory(){}

function displayItems() {

        connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, res) {
            if (err) throw err;

            for (var i = 0; i < res.length; i++) {
                console.log(res[i]);
                console.log("-----------------------------------");

            }
            run();

        })

}

function buy() {
   var questions = [{
        name: "productid",
        type: "input",
        message: "What is the item_id of the product you would like to buy?",
        // choices: ["1","2","3","4","5","6","7","8","9","10"]
        },
        {
            name: "numberOfUnits",
            type: "input",
            message: "How many units would you like to buy?"


        }];
       inquirer.prompt(questions).then(function(answer) {

           connection.query(
               "SELECT * FROM products WHERE item_id =" + answer.productid, function(err, res) {
                   if (err) throw (err);
                   var selectProduct = answer.productid - 1;

                   if (res[selectProduct].stock_quantity === 0) {
                       console.log("Sorry we're out of stock");
                       run();
                   }
                   else if (res[selectProduct].stock_quantity < answer.numberOfUnits) {
                       console.log("sorry we don't have that many in stock, there are only " + res[0].stock_quantity + " remaining!");
                       run();
                   }
                   else {
                       var updateStock = res[selectProduct].stock_quantity - answer.numberOfUnits;
                       var itemPrice = res[selectProduct].price;
                       var totalPrice = answer.numberOfUnits * itemPrice;
                       var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";

                       connection.query(query, [updateStock, answer.productid], function(err, res) {
                           if (err) throw err;

                           console.log("You just bought " + answer.numberOfUnits + " items");
                           console.log("Your total cost is: " + totalPrice);
                           run ();

                       });




                   }

               })

           })
      }