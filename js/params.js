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
    function setupWeekFunctionality(weekNumber, style, transformationType, unit, replacement) {
        const details = document.querySelector(`#week${weekNumber}-details`);
        const input = document.querySelector(`#week${weekNumber}-input`);
        const box = document.querySelector(`#week${weekNumber}-box`);
        const label = document.querySelector(`#week${weekNumber}-input~label`);

        input.addEventListener("input", function () {
            const num = input.value + unit;
            box.style.setProperty(style, `${transformationType}(${num})`);
            label.textContent = `[${num}]`.replace(unit, replacement);
        });

        details.addEventListener("toggle", function () {
            if (!details.open) {
                input.value = 0;
                box.style.setProperty(style, "none");
                label.textContent = `[0${replacement}]`;
            }
        });
    }

    setupWeekFunctionality(6, "transform", "translateX", "px", "px");
    setupWeekFunctionality(7, "transform", "rotate", "deg", "°");
    setupWeekFunctionality(8, "transform", "skew", "deg", "°");
    setupWeekFunctionality(9, "transform", "scale", "", "");
    setupWeekFunctionality(10, "filter", "blur", "px", "px");

}

let intervalId = null;
let timer = 1;

function stepInput(inputId, step) {
    const input = document.getElementById(inputId);
    if (step > 0) {
        input.stepUp();
    } else {
        input.stepDown();
    }
    input.dispatchEvent(new Event("input"));
}

function startStepInput(inputId, step) {
    timer = 1;
    stepInput(inputId, step);
    intervalId = setInterval(() => {
        timer += 0.1;
        for (let i = 0; i < parseInt(timer); i++) {
            stepInput(inputId, step);
        }
    }, 100); // Adjust the interval as needed
}

function stopStepInput() {
    clearInterval(intervalId);
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    const hourDegrees = (hours % 12) * 30 + minutes / 2 + 180;
    const minuteDegrees = minutes * 6 + seconds / 10 + 180;
    const secondDegrees = seconds * 6 + 180;

    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
}

setInterval(updateClock, 1000);
