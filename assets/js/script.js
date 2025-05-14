// Predefined sample texts for each difficulty level
const sampleTexts = {
    easy: [
        "The quick brown fox jumps over the lazy dog.",
        "Typing is fun and easy to learn.",
        "Practice typing every day to improve."
    ],
    medium: [
        "JavaScript is a versatile programming language used for web development.",
        "Speed and accuracy are essential for becoming a great typist.",
        "Consistency and practice are the keys to mastering typing."
    ],
    hard: [
        "The complexities of asynchronous programming in JavaScript can be challenging.",
        "Typing tests are a great way to measure your speed and accuracy under pressure.",
        "Advanced algorithms and data structures require a deep understanding of programming concepts."
    ]
};

// Function to display a random sample text based on the selected difficulty
function displayRandomTextByDifficulty() {
    const difficultySelect = document.getElementById("difficulty-select"); // Get the dropdown
    const selectedDifficulty = difficultySelect.value; // Get the selected difficulty level
    const textsForDifficulty = sampleTexts[selectedDifficulty]; // Get texts for the selected difficulty
    const randomIndex = Math.floor(Math.random() * textsForDifficulty.length); // Get a random index
    const textToTypeElement = document.getElementById("text-to-type"); // Target the text-to-type element
    textToTypeElement.textContent = textsForDifficulty[randomIndex]; // Update the text content
}

// Add event listener to the Start button
document.getElementById("start-btn").addEventListener("click", displayRandomTextByDifficulty);