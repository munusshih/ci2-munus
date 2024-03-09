// Function to check if dark mode is enabled
function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Function to toggle between light and dark mode
function toggleDarkMode() {
    const body = document.body;
    const isDark = isDarkMode();

    if (isDark) {
        body.style.setProperty('--background', 'black');
        body.style.setProperty('--foreground', 'white');
        body.style.setProperty('--border', '1px solid white');
    } else {
        body.style.setProperty('--background', 'white');
        body.style.setProperty('--foreground', 'black');
        body.style.setProperty('--border', '1px solid black');
    }
}

// Initial check and setup
toggleDarkMode();

// Listen for changes in dark mode preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', toggleDarkMode);


/* -------------session 2 interaction----------------- */

function allInteractions() {
    const week7slider = document.querySelector("#week7-slider");
    const week7box = document.querySelector("#week7-box");
    const week7label = document.getElementById("week7-slider-label");

    week7slider.addEventListener("input", function () {
        const rotationAngle = week7slider.value + "deg";
        week7box.style.setProperty("transform", "rotate(" + rotationAngle + ")");
        week7label.textContent = `[${rotationAngle}]`.replace("deg", "°");
    });

}