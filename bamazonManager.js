var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "SharonLearnsSQL1!",
    database: "bamazon_db"
})

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    managerView();
    //queryAllItems();
});

function managerView(){
inquirer.prompt({
name: "menu",
type: "list",
message: "Which function do you wish to perform?", 
choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
}).then(function(answer){
switch(answer.menu){
    case "View Products for Sale":
    viewProducts();
    break;
    case "View Low Inventory":
    viewLowInventory();
    break;
    case "Add to Inventory":
    addToInventory();
    break;
    case "Add New Product":
    addNewProduct();
    break;
    case "Exit":
    connection.end();
    break;
}
})
}

function viewProducts(){
var viewProducts = "SELECT * FROM products"
connection.query(viewProducts, function(err,res){
    if (err) throw err
    console.table(res);
    console.log(`------------------------------------------------ \n`)
    managerView();
})

}

function viewLowInventory(){
var viewLowInventory = "SELECT * FROM products WHERE stock_quantity < 5"
connection.query(viewLowInventory, function(err, res){
   if (err) throw err
    console.table(res);
    console.log(`------------------------------------------------ \n`)
    managerView();
})

}


function addToInventory(){
    var viewProducts = "SELECT * FROM products"
    connection.query(viewProducts, function(err,res){
        if (err) throw err
        console.table(res);
    inquirer.prompt([{
        name: "idOfItem",
        type: "input",
        message: "Enter the ID of the Item you wish to replenish from Table above:",
        validate: function(value) {
           if (isNaN(value) === false) {
             return true;
           }
           return false;
         }
   
    },{  
    name: "addStock",
    type: "input",
    message: "How many more units would you like to add to selected Item?",
    validate: function(value) {
       if (isNaN(value) === false) {
         return true;
       }
       return false;
     }
   
    }]).then(function(answer){  
  var currentStock = []      
  var selectedID = "SELECT * from products WHERE ? "
  connection.query(selectedID,{
    item_id: answer.idOfItem
  },function(err, res){
     if (err) throw err
     currentStock.push(res[0].stock_quantity) 
  //   console.log(res[0].stock_quantity)
     //console.log(currentStock)     
   //console.log(stock_quantity)       
  // console.log(res[0].stock_quantity)
var addedStock = answer.addStock 
var addStockItems = "UPDATE products SET ? WHERE ?"
    connection.query(addStockItems,[{
    stock_quantity: parseInt(currentStock) + parseInt(addedStock)
},{
    item_id: answer.idOfItem
}],function(err){
    if (err) throw err
    console.log(`------------------------------------------------ \n`)
    console.log(`Stock Quantity Updated! \n`)
   // console.log(`------------------------------------------------ \n`)
    var stockUpdatedQuery = "SELECT * FROM products WHERE ?"
    connection.query(stockUpdatedQuery,{
        item_id: answer.idOfItem
    },function(err, res){
        if(err) throw err
        console.table(res)
        console.log(`------------------------------------------------ \n`)
        managerView()
    })
})
}) 
})
})
}


function addNewProduct(){
inquirer.prompt([{
    name: "newItemName",
    type: "input",
    message: "Please Input Name of new item you wish to add to the table:"
},
{
    name: "newItemDepartment",
    type: "input",
    message: "Please Input Department of new item you wish to add to the table: "
},
{
    name: "newItemPrice",
    type: "input",
    message: "What is the Price of the new Item?",
    validate: function(value) {
       if (isNaN(value) === false) {
         return true;
       }
       return false;
}
},{
    name: "newItemStock",
    type: "input",
    message: "What is the stock quantity of the new Item?",
    validate: function(value) {
       if (isNaN(value) === false) {
         return true;
       }
       return false;
}
}]).then(function(answer){
var addNewProduct = "INSERT INTO products SET ?"
connection.query(addNewProduct,{
product_name: answer.newItemName,
department_name: answer.newItemDepartment,
price: answer.newItemPrice,
stock_quantity: answer.newItemStock
},function(err){
    if(err) throw err;
    console.log(`------------------------------------------------ \n`)
    console.log(`\n Your new Product has been added to the table! \n`)
    viewProducts();
})
})

}