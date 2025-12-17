// Wait until the entire page has loaded before running the code
window.addEventListener('load', function () {

    // 1. Get references to the loader and main content elements
    // The loader is the split curtain that shows when the page is loading
    // The content is the main div that contains all visible page content
    var loader = document.getElementById('split-loader');
    var content = document.getElementById('main-content');

    // 2. Delay for a short time (500ms) before triggering the animations
    // This gives the user a smooth transition from loader to content
    setTimeout(function () {
        loader.classList.add('loaded'); // Moves the split curtains apart
        content.classList.add('visible'); // Fades the main content into view
    }, 500);

    // 3. Optional cleanup: hide the loader completely after animation finishes (2 seconds)
    setTimeout(function () {
        loader.style.display = 'none'; // Remove loader from layout
    }, 2000);
});

// ------------------------------------------------------------------------------------
// Notification functions
// These functions handle showing and closing modal popups for messages and success
// ------------------------------------------------------------------------------------

// Show an error or info message in the notification modal
function showMessage(message) {
    notificationMessage.textContent = message; // Set the message text
    notificationModal.showModal();             // Open the modal dialog
}

// Close the notification modal
function closeNotificationWindow() {
    notificationModal.close();
}

// Show a success message in the success modal
function showSuccessMessage(message) {
    successMessage.textContent = message; // Set the success message
    successModal.showModal();             // Open the success modal dialog
}

// Close the success modal
function closeSuccessWindow() {
    successModal.close();
}

// ------------------------------------------------------------------------------------
// Payment modal handling functions
// ------------------------------------------------------------------------------------

// Open the payment dialog
function openPaymentWindow() {
    document.getElementById('paymentModal').showModal();
}

// Close the payment dialog
function closePaymentWindow() {
    document.getElementById('paymentModal').close();
}

// Payment confirmation logic
function paymentConfirmation() {

    // Retrieve all necessary inputs from the payment form
    var date = document.getElementById("DateMonth").value;
    var city = document.getElementById("city").value;
    var cvv = document.getElementById("CVV").value;
    var CardNum = document.getElementById("CardNum").value;

    // Validate card number
    if (CardNum == "" || CardNum.length < 16) {
        showMessage("Enter a valid Card Number");
        return;
    }

    // Validate expiration date
    if (date == "") {
        showMessage("Enter an expiring date");
        return;
    }

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

    // Validate CVV
    if (cvv == "" || cvv.length < 3) {
        showMessage("Enter a valid CVV");
        return;
    }

    // Get user's first and last names
    var fname = document.getElementById('fname').value.trim();
    var lname = document.getElementById('lname').value.trim();

    // Determine selected sport from radio buttons
    var array = document.getElementsByName("sport");
    var selectedItem = "";
    for (i = 0; i < array.length; i++) {
        if (array[i].checked) {
            selectedItem = array[i].value;
            break;
        }
    }

    // Get chosen date and times
    var date = document.getElementById("schedule-date").value;
    var timeFrom = document.getElementById("alarm-timeF").value;
    var timeTo = document.getElementById("alarm-timeT").value;

    // Show success message and close payment modal
    showSuccessMessage("Payment confirmed! Your court booking is complete. You can see your reservation detail at the end of the page.");
    closePaymentWindow();

    // Display booking summary in the page
    var textForDisplay = "Hello " + fname + ' ' + lname + "</br>You have successfully reserved a " + selectedItem + " Field in " + city + " city";
    textForDisplay += "</br>In: " + date + "</br>Time: from " + timeFrom + " to " + timeTo + "</br>Thank you for booking with us. Have fun! ";
    document.getElementById('res').innerHTML = textForDisplay;
}

// ------------------------------------------------------------------------------------
// Input validation function for all forms before payment
// ------------------------------------------------------------------------------------
function checkValidation() {

    // Retrieve all personal input values
    var fname = document.getElementById('fname').value.trim();
    var lname = document.getElementById('lname').value.trim();
    var pnumber = document.getElementById('PNumber').value.trim();
    var id = document.getElementById('Id').value.trim();
    var address = document.getElementById('Address').value.trim();

    // Determine selected sport
    var array = document.getElementsByName("sport");
    var selectedItem = "";
    for (i = 0; i < array.length; i++) {
        if (array[i].checked) {
            selectedItem = array[i].value;
            break;
        }
    }

    // Regular expressions for input validation
    var nameRegex = /^[A-Za-zא-ת]+$/; // Only English or Hebrew letters
    var idRegex = /^[0-9]{9}$/;      // Exactly 9 digits for ID
    var phoneRegex = /^[0-9]{10}$/;  // Exactly 10 digits for phone number

    // Initialize modal elements
    notificationModal = document.getElementById('notificationModal');
    notificationMessage = document.getElementById('notificationMessage');
    successModal = document.getElementById('successModal');
    successMessage = document.getElementById('successMessage');

    // Check if sport is selected
    if (selectedItem == '') {
        showMessage("Please enter your court.");
        return;
    }

    // Check first name validity
    if (fname == '' || fname.length < 2 || !nameRegex.test(fname)) {
        showMessage('Invalid first name (at least 2 characters required), only letters');
        return;
    }

    // Check last name validity
    if (lname == '' || lname.length < 2 || !nameRegex.test(lname)) {
        showMessage('Invalid last name (at least 2 characters required), only letters');
        return;
    }

    // Check phone number format
    if (!phoneRegex.test(pnumber)) {
        showMessage("Invalid phone number: must be 10 digits only");
        return;
    }

    // Check ID format
    if (!idRegex.test(id)) {
        showMessage("Invalid ID: must be 9 digits only");
        return;
    }

    // Check address length
    if (address.length < 5) {
        showMessage("Invalid address: at least 5 characters");
        return;
    }

    // Check if date and times are chosen
    var date = document.getElementById("schedule-date").value;
    var timeFrom = document.getElementById("alarm-timeF").value;
    var timeTo = document.getElementById("alarm-timeT").value;

    if (!date) {
        showMessage("Please choose a schedule date");
        return;
    }

    // Validate that chosen date is not in the past
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's date to midnight
    var chosen = new Date(date);

    if (chosen < today) {
        showMessage("The selected date has already expired. Please choose a future date.");
        return;
    }

    // Check that both start and end times are chosen
    if (!timeFrom || !timeTo) {
        showMessage("You must choose start and end times");
        return;
    }

    // Calculate time difference to ensure start < end
    var dateStart = new Date("2000-01-01T" + timeFrom + ":00");
    var dateEnd = new Date("2000-01-01T" + timeTo + ":00");
    var diff = dateEnd - dateStart;

    if (diff <= 0) {
        showMessage("Start time must be earlier than end time");
        return;
    }

    // Calculate price based on sport and duration
    var diffInMinutes = diff / (1000 * 60);
    var pricePerMinutes;
    if (selectedItem == "football") pricePerMinutes = 5;
    else if (selectedItem == "basketball") pricePerMinutes = 4;
    else if (selectedItem == "VallyBall") pricePerMinutes = 3;
    else pricePerMinutes = 2; // Tennis

    var minutes = diffInMinutes % 60;
    var hours = Math.floor(diffInMinutes / 60);
    var totalPrice = diffInMinutes * pricePerMinutes;

    document.getElementById("price").innerText = "\nYou have reserved: " + hours + " Hours and " + minutes + " Minutes " +
        "in the " + selectedItem + " field" + "\nyou should pay: " + totalPrice + "₪";

    // Open the payment modal after all validation passes
    openPaymentWindow();
}

// ------------------------------------------------------------------------------------
// Clear all form fields
// ------------------------------------------------------------------------------------
function cleanForm() {
    // Reset sport selection
    var sports = document.getElementsByName('sport');
    for (var i = 0; i < sports.length; i++) {
        sports[i].checked = false;
    }

    // Clear personal information fields
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('PNumber').value = '';
    document.getElementById('Id').value = '';
    document.getElementById('Address').value = '';

    // Reset court city selection
    document.getElementById('city').value = 'Mazraa';

    // Clear schedule date and times
    document.getElementById('schedule-date').value = '';
    document.getElementById('alarm-timeF').value = '';
    document.getElementById('alarm-timeT').value = '';

    // Clear result display and notes
    document.getElementById('res').innerHTML = '';
    document.getElementById('Notes').value = '';
}

//this function changes the URL inside the Iframe via 
//which radio we are pressing
function ChangeSite(newUrl){
    var myIframe=document.getElementById('Frame');
    myIframe.src =newUrl;
    myIframe.style.display = "block";

}
