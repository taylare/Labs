/**********************customizing the button***************/

function customizeButton() {
  calculateButton.style.backgroundColor = "#e185ff";
  calculateButton.style.color = "white";
  calculateButton.style.borderRadius = "10pt";
  calculateButton.style.borderColor = "#e185ff";
  calculateButton.style.borderStyle = "solid";

  calculateButton2.style.backgroundColor = "#e185ff";
  calculateButton2.style.color = "white";
  calculateButton2.style.borderRadius = "10pt";
  calculateButton2.style.borderColor = "#e185ff";
  calculateButton2.style.borderStyle = "solid";

  calculateButton3.style.backgroundColor = "#e185ff";
  calculateButton3.style.color = "white";
  calculateButton3.style.borderRadius = "10pt";
  calculateButton3.style.borderColor = "#e185ff";
  calculateButton3.style.borderStyle = "solid";

  calculateButton4.style.backgroundColor = "#e185ff";
  calculateButton4.style.color = "white";
  calculateButton4.style.borderRadius = "10pt";
  calculateButton4.style.borderColor = "#e185ff";
  calculateButton4.style.borderStyle = "solid";
}

/****************CALCUATE MIDDLE AND MEAN****************/

// Display the entered prices
var pricesElement = document.getElementById("result");
var calculateButton = document.getElementById("calculateButton");

// Add an event listener to the button
calculateButton.addEventListener("click", calculateAndDisplay);

function calculateAndDisplay() {
  // Get input prices
  var price1 = parseFloat(prompt("Enter price for room 1:"));
  var price2 = parseFloat(prompt("Enter price for room 2:"));
  var price3 = parseFloat(prompt("Enter price for room 3:"));

  // Validate if the prices are valid numbers
  if (isNaN(price1) || isNaN(price2) || isNaN(price3)) {
    alert("Incorrect - Please enter valid prices.");
    return;
  }

  // Calculate the middle price
  var middlePrice = calculateMiddle(price1, price2, price3);

  // Calculate the mean price
  var meanPrice = calculateMean(price1, price2, price3);

  // Display the entered prices
  pricesElement.innerHTML = `3 prices are: $${price1}, $${price2}, $${price3}<br>`;

  // Display the middle price with red font if it's an even number
  pricesElement.innerHTML += `Middle: $<span style="color: ${middlePrice % 2 === 0 ? 'red' : 'black'}">${middlePrice}</span><br>`;

  // Display the median price
  pricesElement.innerHTML += `Mean: $${meanPrice}`;
}

function calculateMiddle(num1, num2, num3) {
  if ((num1 >= num2 && num1 <= num3) || (num1 <= num2 && num1 >= num3)) {
    return num1;
  } else if ((num2 >= num1 && num2 <= num3) || (num2 <= num1 && num2 >= num3)) {
    return num2;
  } else {
    return num3;
  }
}

function calculateMean(num1, num2, num3) {
  return (num1 + num2 + num3) / 3;
}

customizeButton();

/*********************HOW FULL THE HOTEL IS*************************/

function checkOccupancy() {
  var inputElement = document.getElementById("occupancyInput");
  var resultElement = document.getElementById("result2");

  // Validate input
  var occupancy = parseInt(inputElement.value);
  if (isNaN(occupancy) || occupancy < 0 || occupancy > 100) {
      resultElement.innerHTML = "Incorrect - not between 0-100";
      resultElement.style.color = "red";
  } else {
      var color, message;
      if (occupancy >= 90) {
          color = "green";
          message = "Booked!";
      } else if (occupancy >= 80) {
          color = "blue";
          message = "Booked!";
      } else if (occupancy >= 65) {
          color = "yellow";
          message = "Booked!";
      } else if (occupancy >= 51) {
          color = "black";
          message = "Booked!";
      } else {
          color = "red";
          message = "Booked!";
      }

      // Display result
      resultElement.innerHTML = `<span style="color: ${color};">${occupancy}%</span> ${message}`;
      resultElement.style.color = "black";
  }
}
document.getElementById("calculateButton2").addEventListener("click", checkOccupancy);

customizeButton();

/************ITERATION**************/
function generatePattern() {
  var inputElement2 = document.getElementById("iteration");
  var userInput = inputElement2.value;

  // Clear previous results
  var resultElement = document.getElementById("result3");
  document.getElementById("result3").innerHTML = '';
  resultElement.style.color = "aqua";

  // Loop to generate the pattern
  for (var i = 1; i <= 9; i++) {
    // Check if i is less than or equal to 5
    if (i <= 5) {
      count = i;  
    } else {
      count = 10 - i;  
    }
  // Loop to print each line
    for (var j = 1; j <= count; j++) {
      document.getElementById("result3").innerHTML += userInput;
    }
    document.getElementById("result3").innerHTML += "<br>";
  }
  document.getElementById("result3").innerHTML += "<br>";
}

document.getElementById("calculateButton3").addEventListener("click", generatePattern);


/*************WHO'S FASTEST?**********/

function compareSpeeds() {
  // Get the speeds from the input boxes
  var alexaSpeed = parseFloat(document.getElementById('alexaSpeed').value);
  var siriSpeed = parseFloat(document.getElementById('siriSpeed').value);

  // Check if both speeds are valid numbers
  if (isNaN(alexaSpeed) || isNaN(siriSpeed)) {
    alert("Please enter valid speeds!");
  }

  document.getElementById('alexaSpeedResult').innerHTML = `Alexa's speed is: <span style='color: blue;'>${alexaSpeed}</span>`;
  document.getElementById('siriSpeedResult').innerHTML = `Siri's speed is: <span style='color: red;'>${siriSpeed}</span>`;

  // Determine the winner and display the result
  var winnerElement = document.getElementById('winner');
  var message, color;
  if (alexaSpeed > siriSpeed) {
    color = "blue";
    message = " Gets there first!";
    winnerElement.innerHTML = `<span style="color: ${color};">Alexa</span> ${message}`;
  } else if (siriSpeed > alexaSpeed) {
    color = "red";
    message = " Gets there first!";
    winnerElement.innerHTML = `<span style="color: ${color};">Siri</span> ${message}`;
  } else {
    winnerElement.innerHTML = "It's a tie!";
    winnerElement.style.color = "black";
  }
}

document.getElementById("calculateButton4").addEventListener("click", compareSpeeds);
customizeButton();
 

