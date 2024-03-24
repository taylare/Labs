//prompt user for name
var userName = prompt("Please enter your name:");
document.getElementById("hello").innerHTML = "Hello, " + userName + ". How many Rooms do you want to book?!";
document.write("Hello, " + userName + ". Nice to meet you again.");

//prompt user for numbers
var amountStr = prompt("Enter the amount of the room:");
var taxRateStr = prompt("Enter the tax rate (%):");
var numRoomsStr = prompt("Enter the number of rooms:");

// Convert string inputs to integers
var amount = parseInt(amountStr);
var taxRate = parseInt(taxRateStr);
var numRooms = parseInt(numRoomsStr);

var total = (amount + (amount * taxRate / 100)) * numRooms;

document.getElementById("amount").textContent = "$" + amount.toFixed(2);
document.getElementById("taxRate").textContent = taxRate + "%";
document.getElementById("numRooms").textContent = numRooms;
document.getElementById("totalAmount").textContent = "$" + total.toFixed(2);