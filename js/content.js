async function fetchAndInsertContent(targetId, contentUrl) {
    try {
        const response = await fetch(contentUrl);
        const data = await response.text();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.innerHTML = data;
        } else {
            console.error(`Element with id '${targetId}' not found.`);
        }
    } catch (error) {
        console.error(`Error fetching or inserting content: ${error}`);
    }
}

const week = 7

for (let i = 1; i <= 15; i++) {
    let weekNumber = "week" + i;
    let weekUrl = `../../weeks/${i}.html`;
    fetchAndInsertContent(weekNumber, weekUrl);
}

// fetchAndInsertContent("accessible-book", "../../assignments/accessible-book.html");
// fetchAndInsertContent("experimental-clock", "../../assignments/experimental-clock.html");
// fetchAndInsertContent("generative-tool", "../../assignments/generative-tool.html");