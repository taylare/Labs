const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
// When the user clicks the button, open the modal
loginBtn.addEventListener("click", function() {
	modal.style.display = "block";
});
// Function to handle logout
function logout() {
	// Hide user info card and greeting
	document.getElementById("userInfoCard").style.display = "none";
	document.getElementById("userGreetings").style.display = "none";
	// Toggle visibility of login and logout buttons
	loginBtn.style.display = "block";
	logoutBtn.style.display = "none";
	// Refresh the page
	window.location.reload();
}
// Logout button functionality
logoutBtn.addEventListener("click", logout);
const form = document.getElementById("loginForm");
form.addEventListener("submit", function(event) { //add an event listener for the "submit" event
	event.preventDefault(); //prevent the dault form submission behaviour
	const firstName = document.getElementById("firstName").value.trim();
	const lastName = document.getElementById("lastName").value.trim();
	const email = document.getElementById("email").value.trim();
	const age = document.getElementById("age").value.trim();
	const postalCode = document.getElementById("postalCode").value.trim();
	const phoneNumber = document.getElementById("phoneNumber").value.trim();
	// Validation logic
	let isValid = true;
	// Validate First Name
	if (firstName === "") {
		const firstNameError = document.getElementById("firstNameError");
		firstNameError.textContent = "First Name cannot be blank";
		firstNameError.style.color = "red";
		isValid = false;
	} else if (/\s/.test(firstName)) {
		const firstNameError = document.getElementById("firstNameError");
		firstNameError.textContent = "First Name cannot contain spaces";
		firstNameError.style.color = "red";
		isValid = false;
	} else {
		document.getElementById("firstNameError").textContent = "";
	}
	// Validate Last Name
	if (lastName === "") {
		const lastNameError = document.getElementById("lastNameError");
		lastNameError.textContent = "Last Name cannot be blank";
		lastNameError.style.color = "red";
		isValid = false;
	} else if (/\s/.test(lastName)) {
		const lastNameError = document.getElementById("lastNameError");
		lastNameError.textContent = "Last Name cannot contain spaces";
		lastNameError.style.color = "red";
		isValid = false;
	} else {
		document.getElementById("lastNameError").textContent = "";
	}
	// Validate Email
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(email)) {
		const emailError = document.getElementById("emailError");
		emailError.textContent = "Invalid Email format";
		emailError.style.color = "red";
		isValid = false;
	} else {
		document.getElementById("emailError").textContent = "";
	}
	// Validate Age
	const ageNumber = parseInt(age);
	if (isNaN(ageNumber) || ageNumber < 0 || ageNumber > 120) {
		const ageError = document.getElementById("ageError");
		document.getElementById("ageError").textContent = "Age must be a number between 0 and 120";
		ageError.style.color = "red";
		isValid = false;
	} else {
		document.getElementById("ageError").textContent = "";
	}
	// Validate Postal Code
	const postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
	if (!postalCodePattern.test(postalCode)) {
		const postalCodeError = document.getElementById("postalCodeError");
		document.getElementById("postalCodeError").textContent = "Invalid Postal Code format";
		postalCodeError.style.color = "red";
		isValid = false;
	} else {
		document.getElementById("postalCodeError").textContent = "";
	}
	// Validate Phone Number
	const phonePattern = /^\d{3}[- ]?\d{3}[- ]?\d{4}$/;
	if (!phonePattern.test(phoneNumber)) {
		const phoneNumberError = document.getElementById("phoneNumberError");
		phoneNumberError.textContent = "Invalid Phone Number format";
		phoneNumberError.style.color = "red";
		isValid = false;
	} else {
		document.getElementById("phoneNumberError").textContent = "";
	}
	if (isValid) {
		// Display user info card and update greetings
		const userInfoCard = document.getElementById("userInfoCard");
		userInfoCard.style.display = "block";
		document.getElementById("userGreetings").textContent = `Hello, ${firstName} ${lastName} `;
		document.getElementById("userGreetings").style.display = "inline";
		// Display validated information
		document.getElementById("nameDisplay").textContent = `${firstName} ${lastName}`;
		document.getElementById("emailDisplay").textContent = email;
		document.getElementById("ageDisplay").innerHTML = `Age: <span style="color: red;">${age}</span>`;
		document.getElementById("postalCodeDisplay").innerHTML = `Postal Code: <span style="color: blue;">${postalCode}</span>`;
		document.getElementById("phoneNumberDisplay").innerHTML = `Phone Number: <span style="color: green;">${phoneNumber}</span>`;
		closeModal(); // Close the modal after validation
		// Toggle visibility of login and logout buttons
		loginBtn.style.display = "none";
		logoutBtn.style.display = "block";
	}
});
// Function to close modal
function closeModal() {
	modal.style.display = "none";
}