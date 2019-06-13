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
    bamazonMenu();
    //queryAllItems();
});

function bamazonMenu(){
    inquirer.prompt({
        name: "menuSelection",
        type: "list",
        message: "Which function do you wish to perform?",
        choices: ["Make a purchase","Exit"]
    }).then(function(answer){
     if(answer.menuSelection === "Make a purchase"){
    queryAllItems();}
     else 
     {console.log("Thank you for visiting Bamazon. Have a nice day!")
     connection.end()}

    })
}


function queryAllItems(){
    var allBamazonItems = "SELECT * FROM products"
    connection.query(allBamazonItems,function(err,res){
        if (err) throw err;
        console.table(res)
        // for(var i = 0; res.length; i++){
        //     console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + "|" + res[i].stock_quantity);
        // }
    //connection.end();
    selectedItem();
    });
}

function selectedItem(){
    inquirer.prompt([{
        name: "selectedItem",
        type: "input",
        message: "Input the ID of the Item you Wish to Purchase on Table:",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    },{
        name: "selectedUnits",
        type: "input",
        message: "How many Units of the Selected Item do you Wish to Purchase?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    }]).then(function(answer){
       // console.log(answer.selectedItem)
       var stockQuantity = []
       var price = []
      
       // if(answer.selectedUnits > stock_quatity){console.log("HIII")}
        var selectedID = "SELECT * FROM products WHERE ?"
        connection.query(selectedID,{
            item_id:  answer.selectedItem
        },function(err, res){
            if(err) throw err;
            // Object.keys(res).forEach(function(key){
            //     var row = res[key]
            //     console.log(row.stock_quantity)
            // })
        stockQuantity.push(res[0].stock_quantity)
        price.push(res[0].price)
        var stockQuantityNum = parseInt(stockQuantity)
        var priceNum = parseFloat(price)
        var newStockQuantity = stockQuantityNum - answer.selectedUnits
        var newPrice = answer.selectedUnits * priceNum
        // console.log(stockQuantityNum)
        // console.log(newStockQuantity)
        // console.log(stockQuantity)
        // console.log(price+ "here")
        // console.log(priceNum + "hurr")
        // console.log(newPrice + "hurry")
        if(stockQuantityNum < parseInt(answer.selectedUnits)){
            console.log('\n')
            console.log("Sorry, Insufficient Quantity. Please select a smaller quantity to complete purchase:")
            console.log('\n')
            queryAllItems();
         }
        else{
            console.log(newStockQuantity)
       var selectedID = "UPDATE products SET ? WHERE ?"   
        connection.query(selectedID,[{
            stock_quantity: newStockQuantity,
         },{
            item_id:  answer.selectedItem
         }],function(err, res){
        //  var newStockQuantity = parseInt(stockQuantity) - answer.selectedUnits
             if(err) throw err;
             //console.table(res)
             // console.log(newStockQuantity)
        //     // console.log(selectedUnits)
        //console.log(newPrice)
        console.log(`Thank you for your purchase. \n Your total is $${newPrice.toFixed(2)}. \n Visit us again soon! ` )
        connection.end();
        })
        }
        })
       
    })
}


// function unitsOfItem(){
//     inquirer.prompt({
//         name: "unitsOfItem",
//         type: "input",
//         message: "How many Units of the Item Listed on Table do you Wish to Purchase?",
//     }).then(function(answer){
//         var units = "UPDATE products WHERE ?"
//         connection.query(units,{

//         },function(err,res){
//             if(err) throw err;
            
//         })
// }
