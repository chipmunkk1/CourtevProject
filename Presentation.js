
// ***Presentation Tier***
//   Contains only UI components and visual design, without business or data logic.

/* ============================================================================
   Initialization & Global Listeners
   ============================================================================
*/

// Wait until the entire page has loaded before running the code
window.addEventListener('load', function () {
    var loader = document.getElementById('split-loader');
    var content = document.getElementById('main-content');

    /* Animation delay for the loader */
    setTimeout(function () {
        loader.classList.add('loaded');
        content.classList.add('visible');
    }, 500);

    /* Completely hide the loader after animation finishes */
    setTimeout(function () {
        loader.style.display = 'none';
    }, 2000);
});

// Initialize the VANTA Globe background effect
document.addEventListener("DOMContentLoaded", () => {
    VANTA.GLOBE({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0xcacaca
    });
});

/* ============================================================================
   Page Navigation Functions
   ============================================================================
*/

// Switch from Page 1 to Page 2
function goToReservation() {
    document.getElementById('page-personal').classList.add('hidden');
    document.getElementById('page-reservation').classList.remove('hidden');
}

// Switch from Page 2 back to Page 1
function goBackToPersonal() {
    document.getElementById('page-reservation').classList.add('hidden');
    document.getElementById('page-personal').classList.remove('hidden');
    document.getElementById('Frame').style.display = 'none'; // Hide iframe
}

// Switch to Confirmation Page
function showConfirmationPage() {
    document.getElementById('page-reservation').classList.add('hidden');
    document.getElementById('Frame').style.display = 'none';
    document.getElementById('page-confirmation').classList.remove('hidden');
}

/* ============================================================================
   Iframe / External Site Functions
   ============================================================================
*/

function changeSite(newUrl) {
    var myIframe = document.getElementById('Frame');
    myIframe.src = newUrl;
    myIframe.style.display = "block";
}

/* ============================================================================
   Map & City Logic
   ============================================================================
   Handles the logic when a user selects a city from the dropdown.
*/
function handleCityChange(cityName) {

    /* References to DOM elements */
    var locationText = document.getElementById("location");
    var mapFrame = document.getElementById("Maps");
    var weatherResult = document.getElementById("weather-result");

    /* CRITICAL CHECK:
       If the selected value is empty (i.e., user selected "Select a city..."),
       we strictly hide all results and clear the text.
    */
    if (cityName === "") {
        // 1. Hide Weather Result
        weatherResult.style.display = "none";
        weatherResult.innerHTML = "";

        // 2. Hide Map Frame
        mapFrame.style.display = "none";
        changeMaps(""); // Clear src

        // 3. Clear Location Text
        locationText.innerHTML = "";

        // 4. Exit function immediately
        return;
    }

    /* If we are here, a valid city was selected.
       Make sure the elements are visible again.
    */
    weatherResult.style.display = "block";

    /* Call external weather service  */

    getWeatherSaaS(cityName);


    /* Update Location Text and Map URL based on selection */
    if (cityName === "Mazraa") {
        locationText.innerHTML = "This is Mazraa Fields location";
        changeMaps("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4917.794587179426!2d35.102059016762674!3d32.98593406301759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151dcee9f30b255b%3A0xcc229d9ef6d27ba7!2z2KfZhNmF2KzZhNizINin2YTYpdmC2YTZitmF2Yog2KfZhNmF2LLYsdi52Kk!5e1!3m2!1sar!2sil!4v1766316066444!5m2!1sar!2sil");
    }
    else if (cityName === "Furedes") {
        locationText.innerHTML = "This is Furedes Fields location";
        changeMaps("https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d561.7016147387158!2d34.955050622225194!3d32.602050604236226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sar!2sil!4v1766317533802!5m2!1sar!2sil");
    }
    else if (cityName === "Sakhnin") {
        locationText.innerHTML = "This is Sakhnin Fields location";
        changeMaps("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1051.6621131540535!2d35.31002207452097!3d32.86742059066215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c369b1d0a965d%3A0x378a0209b2323604!2sDoha%20Stadium!5e1!3m2!1sar!2sil!4v1766318122418!5m2!1sar!2sil");
    }
    else if (cityName === "Deir el Asad") {
        locationText.innerHTML = "This is Deir el Asad Fields location";
        changeMaps("https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8529.113792192937!2d35.26658677980753!3d32.94024673270791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sar!2sil!4v1766389714651!5m2!1sar!2sil");
    }
    else if (cityName === "Karmiel") {
        locationText.innerHTML = "This is Karmiel Fields location";
        changeMaps("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8955.489624187843!2d35.30288490097184!3d32.917042072359244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c3158a74fcfb5%3A0x5af9891e3caf2262!2z2YXZhNi52Kg!5e1!3m2!1sar!2sil!4v1766318393826!5m2!1sar!2sil");
    }
    else if (cityName === "Acre") {
        locationText.innerHTML = "This is Acre Fields location";
        changeMaps("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.8184824873993!2d35.07438532418561!3d32.924644773602246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151dc929cfbf3a97%3A0x9b0ae6584918f08!2sFootball%20field!5e1!3m2!1sar!2sil!4v1766318439632!5m2!1sar!2sil");
    }
    else if (cityName === "Nahariya") {
        locationText.innerHTML = "This is Nahariya Fields location";
        changeMaps("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27811.062359964635!2d35.12800787804345!3d33.01190238223784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151dce4336d1da9f%3A0x47e1c5e5b4fcd045!2z15DXmdem15jXk9eZ15XXnyDXoteZ16jXldeg15kg16DXlNeo15nXlA!5e1!3m2!1sar!2sil!4v1766318505882!5m2!1sar!2sil");
    }
    else if (cityName === "Haifa") {
        locationText.innerHTML = "This is Haifa Fields location";
        changeMaps("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111533.26415804552!2d35.120641405599564!3d32.78207909030684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151da5f8c67739a9%3A0xca1643e32133debb!2sMaccabi%20Haifa%20FC%20Training%20Ground!5e1!3m2!1sar!2sil!4v1766318570388!5m2!1sar!2sil");
    }
}

// Function to update the map source and visibility
function changeMaps(newUrl) {
    var myIframe = document.getElementById('Maps');
    myIframe.src = newUrl;

    /* Only show if URL is not empty */
    if (newUrl !== "") {
        myIframe.style.display = "block";
    } else {
        myIframe.style.display = "none";
    }
}

/* ============================================================================
   Modal / Dialog Functions
   ============================================================================
*/

function showMessage(message) {
    document.getElementById('notificationMessage').textContent = message;
    document.getElementById('notificationModal').showModal();
}

function showSuccessMessage(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successModal').showModal();
}

function closeNotificationWindow() {
    document.getElementById('notificationModal').close();
}

function closeSuccessWindow() {
    document.getElementById('successModal').close();
}

function openPaymentWindow() {
    document.getElementById('paymentModal').showModal();
}

function closePaymentWindow() {
    document.getElementById('paymentModal').close();
}



