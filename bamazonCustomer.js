var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
    connection.query("SELECT * FROM products;", function(err, res) {
        console.table([
            {
                product_name: 'apple',
                department_name: 'fruits',
                price: 1.34,
                stock_quantity: 12
            }, {

                product_name: 'lettuce',
                department_name: 'vegetables',
                price: 0.25,
                stock_quantity: 63

            }, {

                product_name: 'shampoo',
                department_name: 'bath',
                price: 5.45,
                stock_quantity: 134

            }, {

                product_name: 'shirt',
                department_name: 'clothing',
                price: 2.28,
                stock_quantity: 76

            }, {

                product_name: 'hat',
                department_name: 'clothing',
                price: 1.36,
                stock_quantity: 9

            }, {

                product_name: 'watermelon',
                department_name: 'fruits',
                price: 1.00,
                stock_quantity: 42

            }, {

                product_name: 'carrot',
                department_name: 'vegetables',
                price: 0.42,
                stock_quantity: 45

            }, {

                product_name: 'conditioner',
                department_name: 'bath',
                price: 3.78,
                stock_quantity: 37

            }, {

                product_name: 'ipod',
                department_name: 'electronics',
                price: 100.45,
                stock_quantity: 98

            }, {

                product_name: 'headphones',
                department_name: 'electronics',
                price: 78.39,
                stock_quantity: 82

            }
        ]);
        run();
    });

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

                   if (res[0].stock_quantity === 0) {
                       console.log("Sorry we're out of stock");
                       run();
                   }
                   else if (res[0].stock_quantity < answer.numberOfUnits) {
                       console.log("sorry we don't have that many in stock, there are only " + res[0].stock_quantity + " remaining!");
                       run();
                   }
                   else {
                       console.log("You just bought " + answer.numberOfUnits + " " + res[0].product_name);

                       run();
                   }
               })

           })
      }