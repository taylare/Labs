// Array of hotel rooms
let hotelRooms = [
    { type: "Standard", description: "Single room with a bed", price: 159, image: "includes/images/standard.png" },
    { type: "Double", description: "Double room with a bed", price: 229, image: "includes/images/double.png" },
    { type: "Penthouse", description: "King Size Bed <br> Bar <br> Jacuzzi", price: 359, image: "includes/images/penthouse.png" }
];

// Function to create a card for a hotel room
function createHotelRoomCard(room) {
    let cardContainer = document.createElement("div"); //creating div to contain the card
    cardContainer.classList.add("container"); //adding container class 
    cardContainer.innerHTML = `
        <div class="row justify-content-center"> <!-- Center the row -->
            <div class="col-md-6">
                <div class="card mb-3" >
                    <div class="row g-0">
                        <div class="col-md-6">
                            <img src="${room.image}" class="img-fluid rounded-start w-100" alt="Room ${room.type} Image" style="object-fit: cover;">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body d-flex flex-column h-100"> 
                                <div>
                                    <h3 class="card-title" style="border-bottom: 1px solid #e1e1e1; padding-bottom: 10px;">${room.type}</h3> <!-- Add bottom border -->
                                    <br>
                                    <p class="card-text">${room.description}</p>
                                    <h4 class="card-text">$${room.price}</h4>
                                </div>
                                <div class="mt-auto text-end"> <!-- Align button to the right -->
                                    <button class="btn" id="${room.type}">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Customize the button
    let button = cardContainer.querySelector(`#${room.type}`);
    button.style.backgroundColor = "#ff5cfa";
    button.style.color = "white";
    button.style.borderRadius = "10pt";
    button.style.borderColor = "#ff5cfa";
    button.style.borderStyle = "solid";

    return cardContainer;
}

// Function to display hotel rooms
function displayHotelRooms() {
    let hotelRoomsContainer = document.getElementById("hotelRooms");
    for (let i = 0; i < hotelRooms.length; i++) {
        let room = hotelRooms[i]; //calling room object at index i
        let card = createHotelRoomCard(room); //creating card for room at index i
        hotelRoomsContainer.appendChild(card); //append the card to the container  
       
        // Add event listener to the button
        let button = card.querySelector(`#${room.type}`); 
        button.addEventListener("click", () => {
            alert(`Your room is: $${room.price} per night`);
        });
    };
}

// Call the function to display hotel rooms
displayHotelRooms();

let rowCount = 2;

document.getElementById("myButton").addEventListener("click", function() {
    let table = document.getElementById("sampleTable");
    let row = table.insertRow();      // adding row to the table
    let cell1 = row.insertCell(0);    // adding cell on the left
    let cell2 = row.insertCell(1);    // adding cell on the right
    cell1.innerHTML = `Row${rowCount} cell1`; 
    cell2.innerHTML = `Row${rowCount} cell2`;

    rowCount++;
});


