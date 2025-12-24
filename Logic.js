// ***Business Logic Tier - logic related to the presentation tier***//

// ------------------------------------------------------------------------------------
// Validation Logic for Step 1 (Personal Details)
// ------------------------------------------------------------------------------------
function handlePersonalStep() {
  var fname = document.getElementById("fname").value.trim();
  var lname = document.getElementById("lname").value.trim();

  //  Get Email Value
  var email = document.getElementById("uEmail").value.trim();

  var pnumber = document.getElementById("PNumber").value.trim();
  var id = document.getElementById("Id").value.trim();
  var address = document.getElementById("Address").value.trim();

  var nameRegex = /^[A-Za-zא-ת]+$/;
  var idRegex = /^[0-9]{9}$/;
  var phoneRegex = /^[0-9]{10}$/;

  //  Email Validation Regex (Checks for @ and dot)
  var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  // Open Admin Page
  if (id == "123456789") {
    showAdmin();

    //Open Admin Test
  } else if (id == "000000000") {
    goToReservation();
  }
  //Chek as regular
  else {
    if (
      fname == "" &&
      lname == "" &&
      email == "" &&
      pnumber == "" &&
      id == "" &&
      address == ""
    ) {
      showMessage("Please enter your details to continue");
      return;
    }

    if (fname == "" || fname.length < 2 || !nameRegex.test(fname)) {
      showMessage("Invalid first name (at least 2 letters)");
      return;
    }
    if (lname == "" || lname.length < 2 || !nameRegex.test(lname)) {
      showMessage("Invalid last name (at least 2 letters)");
      return;
    }

    //  Validate Email
    if (email == "") {
      showMessage("Please enter your email address.");
      return;
    }
    if (!emailRegex.test(email)) {
      showMessage("Invalid email format! It must contain '@' and a '.' (dot).");
      return;
    }

    if (!phoneRegex.test(pnumber)) {
      showMessage("Invalid phone number (10 digits)");
      return;
    }
    if (!idRegex.test(id)) {
      showMessage("Invalid ID (9 digits)");
      return;
    }
    if (address.length < 5) {
      showMessage("Invalid address (min 5 chars)");
      return;
    }

    // Call presentation function to switch pages
    goToReservation();
  }
}

// ------------------------------------------------------------------------------------
// Validation Logic for Step 2 (Court Details) & Payment Prep
// ------------------------------------------------------------------------------------
function validateAndPay() {
  var array = document.getElementsByName("sport");
  var selectedItem = "";
  for (i = 0; i < array.length; i++) {
    if (array[i].checked) {
      selectedItem = array[i].value;
      break;
    }
  }
  if (selectedItem == "") {
    showMessage("Please pick a court from the right side.");
    return;
  }
  var city = document.getElementById("city").value;
  var date = document.getElementById("schedule-date").value;
  var timeFrom = document.getElementById("alarm-timeF").value;
  var timeTo = document.getElementById("alarm-timeT").value;

  if (city == "") {
    showMessage("Choose City");
    return;
  }
  if (!date) {
    showMessage("Please choose a schedule date");
    return;
  }

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var chosen = new Date(date);
  if (chosen < today) {
    showMessage("The selected date has passed.");
    return;
  }

  if (!timeFrom || !timeTo) {
    showMessage("Choose start and end times");
    return;
  }

  var dateStart = new Date("2000-01-01T" + timeFrom + ":00");
  var dateEnd = new Date("2000-01-01T" + timeTo + ":00");
  var diff = dateEnd - dateStart;

  if (diff <= 0) {
    showMessage("Start time must be earlier than end time");
    return;
  }

  // Calculate Price
  var diffInMinutes = diff / (1000 * 60);
  var pricePerMinutes;
  if (selectedItem == "football") pricePerMinutes = 5;
  else if (selectedItem == "basketball") pricePerMinutes = 4;
  else if (selectedItem == "VallyBall") pricePerMinutes = 3;
  else pricePerMinutes = 2;

  var minutes = diffInMinutes % 60;
  var hours = Math.floor(diffInMinutes / 60);
  var totalPrice = diffInMinutes * pricePerMinutes;

  document.getElementById("price").innerHTML =
    "Reservation: " +
    hours +
    "h " +
    minutes +
    "m<br>Field: " +
    selectedItem +
    "<br>Total: " +
    totalPrice +
    "₪";

  openPaymentWindow();
}

// ------------------------------------------------------------------------------------
// Finalize Payment and Save Data (Calls DataAccess + Email SaaS)
// ------------------------------------------------------------------------------------
function finalizePayment() {
  var CardNum = document.getElementById("CardNum").value;
  var date = document.getElementById("DateMonth").value;
  var cvv = document.getElementById("CVV").value;

  if (CardNum.length < 16) {
    showMessage("Invalid Card Number");
    return;
  }
  if (date == "") {
    showMessage("Enter expiry date");
    return;
  }
  if (cvv.length < 3) {
    showMessage("Invalid CVV");
    return;
  }

  var today = new Date();
  var chosen = new Date(date);
  var todayYear = today.getFullYear();
  var todayMonth = today.getMonth();
  var chosenYear = chosen.getFullYear();
  var chosenMonth = chosen.getMonth();

  if (
    chosenYear < todayYear ||
    (chosenYear == todayYear && chosenMonth < todayMonth)
  ) {
    showMessage("The selected month has already expired.");
    return;
  }

  // --- 1. GET DATA FROM FORM ---
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;

  //  Get Email
  var email = document.getElementById("uEmail").value;

  var pnumber = document.getElementById("PNumber").value;
  var id_val = document.getElementById("Id").value;
  var address = document.getElementById("Address").value;
  var city = document.getElementById("city").value;
  var dateSched = document.getElementById("schedule-date").value;
  var t1 = document.getElementById("alarm-timeF").value;
  var t2 = document.getElementById("alarm-timeT").value;
  var notice = document.getElementById("Notes").value;

  var array = document.getElementsByName("sport");
  var sport = "";
  for (i = 0; i < array.length; i++) {
    if (array[i].checked) sport = array[i].value;
  }

  // Re-calculate Price
  var dateStart = new Date("2000-01-01T" + t1 + ":00");
  var dateEnd = new Date("2000-01-01T" + t2 + ":00");
  var diffInMinutes = (dateEnd - dateStart) / (1000 * 60);

  var pricePerMinutes;
  if (sport == "football") pricePerMinutes = 5;
  else if (sport == "basketball") pricePerMinutes = 4;
  else if (sport == "VallyBall") pricePerMinutes = 3;
  else pricePerMinutes = 2;
  var totalPrice = diffInMinutes * pricePerMinutes;

  // --- 3. CALL DATA ACCESS TIER (Save to LocalStorage with Email) ---
  processInfo(
    id_val,
    fname,
    lname,
    email,
    pnumber,
    address,
    city,
    sport,
    dateSched,
    t1,
    t2,
    notice
  );

  // --- 4.  AUTOMATIC EMAIL SAAS (Send to Manager)  ---
  var templateParams = {
    fname: fname,
    lname: lname,
    PNumber: pnumber,
    Id: id_val,
    Address: address,
    sport: sport,
    city: city,
    dateSched: dateSched,
    t1: t1,
    t2: t2,
    totalPrice: totalPrice + "₪",
    notice: notice,
    user_email: email, // Sending user's email to admin
  };

  // Using your specific IDs
  emailjs.send("service_mp452qp", "template_96nig2a", templateParams);

  // --- 5. CLOSE UI ---
  closePaymentWindow();

  var summaryHtml =
    "<strong>Name:</strong> " +
    fname +
    " " +
    lname +
    "<br>" +
    "<strong>Email:</strong> " +
    email +
    "<br>" +
    "<strong>Sport:</strong> " +
    sport +
    "<br>" +
    "<strong>Location:</strong> " +
    city +
    "<br>" +
    "<strong>Date:</strong> " +
    dateSched +
    "<br>" +
    "<strong>Time:</strong> " +
    t1 +
    " - " +
    t2;

  document.getElementById("final-summary").innerHTML = summaryHtml;
  showConfirmationPage();
}

// ------------------------------------------------------------------------------------
// Admin / Management Functions
// ------------------------------------------------------------------------------------
function getAllReservations() {
  var clientsTable = getBookersDb();
  var textPrint = "";

  for (i = 0; i < clientsTable.length; i++) {
    var client = clientsTable[i];
    var fullName = client[1] + " " + client[2];

    textPrint += "<b>ID:</b> " + client[0] + "</br>";
    textPrint += "<b>Name:</b> " + fullName + "</br>";
    textPrint += "<b>Email:</b> " + client[11] + "</br>"; // Showing Email
    textPrint += "<b>Court:</b> " + client[6] + "</br>";
    textPrint += "<b>City:</b> " + client[5] + "</br>";
    textPrint += "<b>Date:</b> " + client[7] + "</br>";
    textPrint += "<b>Time:</b> " + client[8] + " - " + client[9] + "</br>";
    textPrint += "<b>Notice:</b> " + client[10] + "</br>"; // Updated index
    textPrint += "<b>Phone:</b> " + client[3] + "<hr>"; // Updated index
  }

  if (textPrint == "") textPrint = "No reservations found.";
  document.getElementById("res").innerHTML = textPrint;
}

function removeIdFunc() {
  var id = document.getElementById("removeId").value;
  if (id == "") {
    showMessage("Please provide your ID to cancel the reservation!");
    return;
  }
  var idRegex = /^[0-9]{9}$/;
  if (!idRegex.test(id)) showMessage("Invalid ID: must be 9 digits only");
  else removeIdFromDb(id);
}

// Weather SaaS
async function getWeatherSaaS(cityName) {
  var display = document.getElementById("weather-result");
  display.innerHTML = "Loading Weather... ⏳";

  const cityCoords = {
    Mazraa: { lat: 33.0, lon: 35.14 },
    Furedes: { lat: 32.6, lon: 34.95 },
    Sakhnin: { lat: 32.86, lon: 35.3 },
    "Deir el Asad": { lat: 32.93, lon: 35.23 },
    Karmiel: { lat: 32.91, lon: 35.29 },
    Acre: { lat: 32.93, lon: 35.08 },
    Nahariya: { lat: 33.0, lon: 35.09 },
    Haifa: { lat: 32.79, lon: 34.98 },
  };
  const coords = cityCoords[cityName];

  if (!coords) {
    display.innerHTML = "Location not found.";
    return;
  }

  try {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const temp = data.current_weather.temperature;
    const googleSearchUrl =
      "https://www.google.com/search?q=weather+" + cityName;

    display.innerHTML = `
            <a href="${googleSearchUrl}" target="_blank" class="weather-link">
                ☁️ Weather in ${cityName}: ${temp}°C (Click for Google Report)
            </a>
        `;
  } catch (error) {
    console.error("Weather Fetch Error:", error);
    display.innerHTML = "⚠️ Weather service unavailable.";
  }
}
