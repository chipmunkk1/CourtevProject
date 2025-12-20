// ***Presentation Tier***
//   contains only UI components and visual design, without business or data logic    //


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

// Initialize the VANTA Globe background effect
// This creates an interactive 3D animated globe on the page
document.addEventListener("DOMContentLoaded", () => {
    VANTA.GLOBE({
        el: "#vanta-bg",
        mouseControls: false,
        touchControls: true,
        gyroControls: false,  // Disables gyro controls for mobile
        minHeight: 200.00,    // Minimum height for the animation to display
        minWidth: 200.00,     // Minimum width
        scale: 1.00,          // Scale factor for desktop
        scaleMobile: 1.00,    // Scale factor for mobile
        backgroundColor: 0xcacaca  // Background color behind the globe
    });
});

