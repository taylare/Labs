const customizeButton = () => {
    bookButton.style.backgroundColor = "#bf90f9";
    bookButton.style.color = "white";
    bookButton.style.borderRadius = "10pt";
    bookButton.style.borderColor = "#bf90f9";
    bookButton.style.borderStyle = "solid";

    cancelButton.style.backgroundColor = "#aab8ff";
    cancelButton.style.color = "white";
    cancelButton.style.borderRadius = "10pt";
    cancelButton.style.borderColor = "#aab8ff";
    cancelButton.style.borderStyle = "solid";

     // check if sisterResortButton exists before styling it
     if (typeof sisterResortButton !== 'undefined') {
        sisterResortButton.style.backgroundColor = "#ff5cfa";
        sisterResortButton.style.color = "white";
        sisterResortButton.style.borderRadius = "10pt";
        sisterResortButton.style.borderColor = "#ff5cfa";
        sisterResortButton.style.borderStyle = "solid";
    }
};

class Hotel {
    constructor(name, city, rooms, booked) {
        this._name = name;
        this._city = city;
        this._rooms = rooms;
        this._booked = booked;
        this._gym = true;
        this._roomTypes = [];
        this._swimmingPool = true;
        this._airportShuttle = true;
        this._restaurants = new Map([
            ["Donde La Arepa", "Colombian"],
            ["Casa Ramen", "Japanese"],
            ["Andiamo Trattoria", "Italian"]
        ]);
        // binding methods to make sure 'this' always points to the current instance of the class
        this.bookRoom = this.bookRoom.bind(this);
        this.cancelRoom = this.cancelRoom.bind(this);
        this.showSisterResort = this.showSisterResort.bind(this);
    }

    // getters

    get name() {
        return this._name;
    }

    get city() {
        return this._city;
    }

    get rooms() {
        return this._rooms;
    }

    get booked() {
        return this._booked;
    }

    // setters
    set name(name) {
        this._name = name;
    }

    set city(city) { 
        this._city = city;
    }

    set rooms(rooms) {
        this._rooms = rooms;
    }

    set booked(booked) {
        this._booked = booked;
    }


    
    bookRoom() {
        if (this._booked < this._rooms) {
            this._booked++; //increment for every time the book room button is clicked
            const bookedRoomsElement = document.getElementById("bookedRooms");
            bookedRoomsElement.innerText = `There are ${this._booked}/${this._rooms} rooms booked`;
        } else {
            const bookedRoomsElement = document.getElementById("bookedRooms");
            bookedRoomsElement.innerText = `All rooms are booked. Cannot book more rooms.`;
        }
    }

    cancelRoom() {
        if (this._booked > 0) {
            this._booked--; //decrement every time the cancel button is clicked
            const bookedRoomsElement = document.getElementById("bookedRooms");
            bookedRoomsElement.innerText = `There are ${this._booked}/${this._rooms} rooms booked`;
        }
    }

    addRoomType(roomType) {
        this._roomTypes.push(roomType); //adding roomtype to the array
    }

    displayRestaurants() {
        const restaurantsElement = document.getElementById("restaurants");
        let restaurantsHTML = "<strong>Restaurants Available:</strong><br>";
        for (let [name, cuisine] of this._restaurants) {
            restaurantsHTML += `${name} - ${cuisine}<br>`;
            console.log(`${name} - ${cuisine}`);
        }
        restaurantsElement.innerHTML = restaurantsHTML;
    }

    displayHotelInfo() {
        const hotelNameElement = document.getElementById("hotelName");
        const hotelInfoElement = document.getElementById("hotelInfo");

        hotelNameElement.innerHTML = `<h2>${this._name}</h2>`;
        hotelInfoElement.innerHTML = `<h3>Hotel Info</h3><strong>${this._name}</strong> located in <strong>${this._city}</strong>.<br>`;
        hotelInfoElement.innerHTML += `<strong>The available room types are: </strong>${this._roomTypes.join(", ")}.<br>`;
        hotelInfoElement.innerHTML += `<strong>Hotel has a shuttle? </strong>${this._airportShuttle}<br>`;
        hotelInfoElement.innerHTML += `<strong>Hotel has a swimming pool? </strong>${this._swimmingPool}<br>`;
        hotelInfoElement.innerHTML += `<strong>Hotel has a gym? </strong>${this._gym}<br>`;

        console.log(`Hotel Name: ${this._name}`);
        console.log(`Location: ${this._city}`);
        console.log(`Room Types: ${this._roomTypes}`);
    }

    displayBookedRooms() {
        const bookedRoomsElement = document.getElementById("bookedRooms");
        const message = `There are ${this._booked}/${this._rooms} rooms booked`;
        bookedRoomsElement.innerText = message;
        bookedRoomsElement.style.color = "#d90166";
        console.log(message);
    }

    displayButtons() {
        const buttonsContainer = document.getElementById("buttons");
        let sisterResortButton = '';
        if (!(this instanceof Resort)) { //if the hotel is displayed, show the "see our sister resort" button
            sisterResortButton = `<button id="sisterResortButton" class="btn btn-info">See our sister resort</button>`;
        }
        buttonsContainer.innerHTML = `
            <button id="bookButton" class="btn btn-primary">Book Room</button>
            <button id="cancelButton" class="btn btn-danger">Cancel Room</button>
            ${sisterResortButton} 
        `; //will display button if valid

        // apply styles to the buttons
        customizeButton();
        document.getElementById("bookButton").addEventListener("click", this.bookRoom);
        document.getElementById("cancelButton").addEventListener("click", this.cancelRoom);
        if (!(this instanceof Resort)) {  //if it's the hotel, it will show the sisterResort button, and once clicked it will display the sister resort
            document.getElementById("sisterResortButton").addEventListener("click", this.showSisterResort);
        }
    }

    // show sister resort when button is clicked
    showSisterResort() {
        // hide the restaurant info:
        const restaurantsElement = document.getElementById("restaurants");
        restaurantsElement.innerHTML = ""; // removes restaurant info

        //accessing the Resort object
        this._sisterResort.displayResortInfo(); 
        this._sisterResort.displayButtons();
        this._sisterResort.displayBookedRooms();
    }
}

class Resort extends Hotel {
    constructor(name, city, rooms, booked, gym, resortType, beachFront, kidsClub) {
        super(name, city, rooms, booked, gym);
        this._resortType = resortType;
        this._beachFront = beachFront;
        this._kidsClub = kidsClub;
        this._bar = false;
    }

    displayResortInfo() { 
        const hotelNameElement = document.getElementById("hotelName");
        const hotelInfoElement = document.getElementById("hotelInfo");

        hotelNameElement.innerHTML = `<h2>${this._name}</h2>`;
        hotelInfoElement.innerHTML = `<h3>Resort Info:</h3>`;
        hotelInfoElement.innerHTML += `<strong>${this._name}</strong> located in <strong>${this._city}</strong>.<br>`;
        hotelInfoElement.innerHTML += `<strong>Is it on the beach?</strong> ${this._beachFront}<br>`;
        hotelInfoElement.innerHTML += `<strong>Does it have a bar?</strong> ${this._bar}<br>`;
        hotelInfoElement.innerHTML += `<strong>Does it have a kids club?</strong> ${this._kidsClub}<br>`;
        hotelInfoElement.innerHTML += `<br><em><strong>NEWS!</strong> There is a new bar being built.</em><br>`;
        hotelInfoElement.innerHTML += `<strong>Does it have a bar?</strong> ${true}<br>`;

        console.log(`Resort Name: ${this._name}`);
        console.log(`Location: ${this._city}`);
        console.log(`Beach Front: ${this._beachFront}`);
        console.log(`Has Bar: ${this._bar}`);
        console.log(`Has Kids Club: ${this._kidsClub}`);
    }  
}

// instance of the hotel
const hotel = new Hotel("Sheraton Hotel", "Sydney, Australia", 20, 4, true);
hotel.addRoomType("Single");
hotel.addRoomType("Double");
hotel.addRoomType("Suite");

// instance of the resort
const sisterResort = new Resort("Marriott Resort", "Sydney, Australia", 30, 10, true, "family", true, true);

// assigning the sister resort to the hotel to link them together
hotel._sisterResort = sisterResort;

hotel.displayHotelInfo();
hotel.displayButtons();
hotel.displayRestaurants();
hotel.displayBookedRooms();

