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

fetchAndInsertContent("week1", "../../weeks/1.html");
fetchAndInsertContent("week2", "../../weeks/2.html");
fetchAndInsertContent("week3", "../../weeks/3.html");
// fetchAndInsertContent("accessible-book", "../../assignments/accessible-book.html");
// fetchAndInsertContent("experimental-clock", "../../assignments/experimental-clock.html");
// fetchAndInsertContent("generative-tool", "../../assignments/generative-tool.html");