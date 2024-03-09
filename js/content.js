async function fetchAndInsertContent(targetId, contentUrl) {
    const response = await fetch(contentUrl);
    const data = await response.text();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.innerHTML = data;
    } else {
        console.error(`Failed to fetch or insert content for week '${targetId}':`);
        return null;
    }
}

async function loadEachWeek(totalWeeks) {
    const promises = [];
    for (let i = 1; i <= totalWeeks; i++) {
        let weekNumber = "week" + i;
        let weekUrl = `../../weeks/${i}.html`;
        const promise = await fetchAndInsertContent(weekNumber, weekUrl);

        if (promise === null) {
            break;
        } else {
            promises.push(promise); // Only push the promise if it's not null
        }
    }

    // Wait for all promises to resolve
    await Promise.allSettled(promises);

    // Call allInteractions after all content insertions have finished
    allInteractions();
};

loadEachWeek(15);
