// ***Business Logic Tier - logic related to the presentation tier***//

// ------------------------------------------------------------------------------------
// Validation Logic for Step 1 (Personal Details)
// ------------------------------------------------------------------------------------
function handlePersonalStep() {
    var fname = document.getElementById('fname').value.trim();
    var lname = document.getElementById('lname').value.trim();
    var pnumber = document.getElementById('PNumber').value.trim();
    var id = document.getElementById('Id').value.trim();
    var address = document.getElementById('Address').value.trim();
    
    var nameRegex = /^[A-Za-zא-ת]+$/;
    var idRegex = /^[0-9]{9}$/;
    var phoneRegex = /^[0-9]{10}$/;

    if (fname == '' || fname.length < 2 || !nameRegex.test(fname)) {
        showMessage('Invalid first name (at least 2 letters)'); return;
    }
    if (lname == '' || lname.length < 2 || !nameRegex.test(lname)) {
        showMessage('Invalid last name (at least 2 letters)'); return;
    }
    if (!phoneRegex.test(pnumber)) {
        showMessage("Invalid phone number (10 digits)"); return;
    }
    if (!idRegex.test(id)) {
        showMessage("Invalid ID (9 digits)"); return;
    }
    if (address.length < 5) {
        showMessage("Invalid address (min 5 chars)"); return;
    }

    // Call presentation function to switch pages
    goToReservation();
}

// ------------------------------------------------------------------------------------
// Validation Logic for Step 2 (Court Details) & Payment Prep
// ------------------------------------------------------------------------------------
function validateAndPay() {
    // Check Sport
    var array = document.getElementsByName("sport");
    var selectedItem = "";
    for (i = 0; i < array.length; i++) {
        if (array[i].checked) { selectedItem = array[i].value; break; }
    }
    if (selectedItem == '') {
        showMessage("Please pick a court from the right side."); return;
    }

    // Check Dates
    var date = document.getElementById("schedule-date").value;
    var timeFrom = document.getElementById("alarm-timeF").value;
    var timeTo = document.getElementById("alarm-timeT").value;

    if (!date) { showMessage("Please choose a schedule date"); return; }

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var chosen = new Date(date);
    if (chosen < today) {
        showMessage("The selected date has passed."); return;
    }

    if (!timeFrom || !timeTo) {
        showMessage("Choose start and end times"); return;
    }

    var dateStart = new Date("2000-01-01T" + timeFrom + ":00");
    var dateEnd = new Date("2000-01-01T" + timeTo + ":00");
    var diff = dateEnd - dateStart;

    if (diff <= 0) {
        showMessage("Start time must be earlier than end time"); return;
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

    // Update Modal Text in Presentation
    document.getElementById("price").innerHTML = "Reservation: " + hours + "h " + minutes + "m<br>Field: " + selectedItem + "<br>Total: " + totalPrice + "₪";
    
    openPaymentWindow();
}

// ------------------------------------------------------------------------------------
// Finalize Payment and Save Data (Calls DataAccess)
// ------------------------------------------------------------------------------------
function finalizePayment() {
    var CardNum = document.getElementById("CardNum").value;
    var date = document.getElementById("DateMonth").value;
    var cvv = document.getElementById("CVV").value;

    if (CardNum.length < 16) { showMessage("Invalid Card Number"); return; }
    if (date == "") { showMessage("Enter expiry date"); return; }
    if (cvv.length < 3) { showMessage("Invalid CVV"); return; }
    
    // Check if the selected date is in the future
    var today = new Date();
    var chosen = new Date(date);
    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth();
    var chosenYear = chosen.getFullYear();
    var chosenMonth = chosen.getMonth();

    if (chosenYear < todayYear || (chosenYear == todayYear && chosenMonth < todayMonth)) {
        showMessage("The selected month has already expired. Please choose a future month.");
        return;
    }
    
    // --- SAVE TO DATABASE (LocalStorage) ---
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var pnumber = document.getElementById('PNumber').value;
    var id = document.getElementById('Id').value;
    var address = document.getElementById('Address').value;
    var city = document.getElementById("city").value;
    var dateSched = document.getElementById("schedule-date").value;
    var t1 = document.getElementById("alarm-timeF").value;
    var t2 = document.getElementById("alarm-timeT").value;
    var notice = document.getElementById('Notes').value;
    
    var array = document.getElementsByName("sport");
    var sport = "";
    for (i = 0; i < array.length; i++) { if (array[i].checked) sport = array[i].value; }

    // Call DataAccess Tier
    processInfo(id, fname, lname, pnumber, address, city, sport, dateSched, t1, t2, notice);

    closePaymentWindow();

    // Prepare Summary Data
    var summaryHtml = "<strong>Name:</strong> " + fname + " " + lname + "<br>" +
                      "<strong>Sport:</strong> " + sport + "<br>" +
                      "<strong>Location:</strong> " + city + "<br>" +
                      "<strong>Date:</strong> " + dateSched + "<br>" +
                      "<strong>Time:</strong> " + t1 + " - " + t2;

    // Inject Summary and Switch Views (Presentation)
    document.getElementById("final-summary").innerHTML = summaryHtml;
    showConfirmationPage();
}

// ------------------------------------------------------------------------------------
// Admin / Management Functions (From New Code)
// ------------------------------------------------------------------------------------

// Display all reservations stored in localStorage
function getAllReservations(){
    // Get all reservations as a 2D array from Data Access tier
    var clientsTable = getBookersDb();

    // This string will hold the HTML output
    var textPrint = '';

    // Loop over all reservations
    for(i = 0; i < clientsTable.length; i++){
        var client = clientsTable[i];
        var fullName = client[1] + ' ' + client[2];

        textPrint += '<b>ID:</b> ' + client[0] + '</br>';
        textPrint += '<b>Name:</b> ' + fullName + '</br>';
        textPrint += '<b>Court:</b> ' + client[6] + '</br>';
        textPrint += '<b>City:</b> ' + client[5] + '</br>';
        textPrint += '<b>Date:</b> ' + client[7] + '</br>';
        textPrint += '<b>Time:</b> ' + client[8] + ' - ' + client[9] + '</br>';
        textPrint += '<b>Notice:</b> ' + client[10] + '</br>';
        textPrint += '<b>Phone:</b> ' + client[3] + '<hr>'; 
    }

    if(textPrint == '') textPrint = "No reservations found.";
    // Show all reservations inside the result paragraph
    document.getElementById('res').innerHTML = textPrint;
}

// Handle cancel-reservation button click
function removeIdFunc() {
    var id = document.getElementById('removeId').value;
    if(id == ''){
        showMessage("Please provide your ID to cancel the reservation!");
        return;
    }
    var idRegex = /^[0-9]{9}$/;
    if (!idRegex.test(id)) 
        showMessage("Invalid ID: must be 9 digits only");
    else
        removeIdFromDb(id);
}

// remove a client from localStorage
function removeIdFromDb(id) {
    if(localStorage.getItem(id) !== null) {
        localStorage.removeItem(id);  // remove the entry
        showSuccessMessage("Reservation cancelled successfully");
        getAllReservations(); // Refresh list if open
    }
    else
        showMessage("No reservation found for this ID !!");
}