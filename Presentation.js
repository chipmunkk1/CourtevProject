// ***Presentation Tier***
//   contains only UI components and visual design, without business or data logic    //

// Wait until the entire page has loaded before running the code
window.addEventListener('load', function () {
    var loader = document.getElementById('split-loader');
    var content = document.getElementById('main-content');
    
    setTimeout(function () {
        loader.classList.add('loaded');
        content.classList.add('visible');
    }, 500);

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

// --- Page Navigation Functions ---

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

// --- Iframe / External Site Functions ---

function ChangeSite(newUrl){
    var myIframe=document.getElementById('Frame');
    myIframe.src = newUrl;
    myIframe.style.display = "block";
}

// --- Modal / Dialog Functions ---

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