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