// Function to customize button styles
function customizeButton() {
    // Style settings for countSpacesBtn
    countSpacesBtn.style.backgroundColor = "#bf90f9";
    countSpacesBtn.style.color = "white";
    countSpacesBtn.style.borderRadius = "10pt";
    countSpacesBtn.style.borderColor = "#bf90f9";
    countSpacesBtn.style.borderStyle = "solid";

    // Style settings for countLettersBtn
    countLettersBtn.style.backgroundColor = "#aab8ff";
    countLettersBtn.style.color = "white";
    countLettersBtn.style.borderRadius = "10pt";
    countLettersBtn.style.borderColor = "#aab8ff";
    countLettersBtn.style.borderStyle = "solid";

     // Style settings for calculateWageBtn
    calculateWageBtn.style.backgroundColor = "#ff5cfa";
    calculateWageBtn.style.color = "white";
    calculateWageBtn.style.borderRadius = "10pt";
    calculateWageBtn.style.borderColor = "#ff5cfa";
    calculateWageBtn.style.borderStyle = "solid";

    // Style settings for checkNumberBtn
    checkNumberBtn.style.backgroundColor = "#98dd73";
    checkNumberBtn.style.color = "white";
    checkNumberBtn.style.borderRadius = "10pt";
    checkNumberBtn.style.borderColor = "#98dd73";
    checkNumberBtn.style.borderStyle = "solid";
  
}
/********COUNT INPUT*************/

document.getElementById('countSpacesBtn').addEventListener('click', countSpaces);
document.getElementById('countLettersBtn').addEventListener('click', countLetters);

// Function to count spaces in input string
function countSpaces() {
    let inputString = document.getElementById('spaceInput').value;
    let spaceCount = (inputString.match(/ /g) || []).length; //inputString.match(/ /g) finds all occurrences of space characters (' ') in the inputString. The || [] ensures that if no matches are found, an empty array is used to prevent errors.
    document.getElementById('spaceResult').innerHTML = "There are <span style='color:red;'>" + spaceCount + "</span> space(s) in the client's name";
}
customizeButton();

function countLetters() {
    let inputString = document.getElementById('letterInput').value;
    let charToCount = document.getElementById('charInput').value.toLowerCase(); // Convert to lowercase for case-sensitivity
    let charCount = (inputString.split(charToCount).length - 1);  // Split the input string by the character to count and then count the resulting array's length
    document.getElementById('letterResult').innerHTML = "There are <span style='color:red;'>" + charCount + "</span> '" + charToCount + "'(s) in the client's name";
}
customizeButton();

/****************DATE FUNCTIONS*****************/

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function calculateMonthlySalary() {
    //inputs
    let dateString = document.getElementById('birthdayInput').value;
    // Parse the input date string as UTC
    let dateInput = new Date(dateString);
    let year = dateInput.getUTCFullYear();
    let month = dateInput.getUTCMonth() + 1; // Months are zero-based, so add 1

    // Calculate the number of days in the month
    let totalDays = daysInMonth(year, month);
        
    // Initialize variables for weekdays count and total salary
    let weekdaysCount = 0;
    let totalSalary = 0;
    // BC minimum hourly wage
    let minimumHourlyWage = 16.75;

    // Loop through each day of the month
    for (let d = 1; d <= totalDays; ++d) {
        // Create a Date object for the current day
        let currentDate = new Date(year, month - 1, d); // Adjust month to be zero-based
        // Check if the current day is a weekday (Monday to Friday)
        if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
            weekdaysCount++;
        }
    }

    document.querySelector('.bdayResult').innerText = dateInput.toUTCString().substring(0, 16); //toUTCString sets it to the correct timezone instead of back a day, substring(0,16) cuts off the text so it doesn't include "00:00:00 GMT"
    document.querySelector('.daysResult').innerText = totalDays;
    document.querySelector('.workDaysResult').innerText = weekdaysCount;
    document.querySelector('.minWageResult').innerText = minimumHourlyWage.toFixed(2); //minimum hourly wage formatted to two decimal places

    // Calculate the totalSalary based on weekdaysCount, assuming 8 hours per day and minimumHourlyWage per hour, formatted to two decimal places:
    totalSalary = weekdaysCount * 8 * minimumHourlyWage; 
    document.querySelector('.salaryResult').innerText = totalSalary.toFixed(2);

    // Set color styles
    document.querySelector('.bdayResult').style.color = 'red';
    document.querySelector('.daysResult').style.color = 'blue';
    document.querySelector('.workDaysResult').style.color = 'darkgreen';
    document.querySelector('.minWageResult').style.color = 'green';
    document.querySelector('.salaryResult').style.color = 'orange';
}

document.getElementById('calculateWageBtn').addEventListener('click', calculateMonthlySalary);

/***ERROR HANDLING***/

// Function to check if a number is in range
function isItInRange() {
    var inputValue = parseFloat(document.getElementById('numberInput').value);
    try {
        if (inputValue <= 0) {
            throw new Error(`<span style='color: red'>Error - Your Number: </span><span style='color: black;'>${inputValue}</span><span style='color: red'> must be Greater than Zero </span>`);
        } else if (inputValue <= 2) {
            throw new Error();
        } else if (inputValue == 3) {
            document.getElementById('errorResult').innerHTML = `Your Number value is: <strong>${inputValue}</strong><br>Your Value is over 2: <span style='color: purple;'><strong>${inputValue}</strong></span>`;
        } else if (inputValue >= 4) {
                document.getElementById('errorResult').innerHTML = `Your Number value is: <strong>${inputValue}</strong><br>Your Number is greater than 2: <span style='color: blue;'><strong>${inputValue}</strong></span><br><span style='color: red;'>Your Number is in the correct range.</span>`;
            } 
        
    } catch (error) {
        document.getElementById('errorResult').innerHTML = `Your Number value is: <strong>${inputValue}</strong><span style='color: black;'><br>Your Number is less than 2: <span style='color: blue;'><strong>${inputValue}</strong></span><br>${error.message}</span>`;
    }
}

// Event listener for the button to check the number range
document.getElementById('checkNumberBtn').addEventListener('click', isItInRange);
