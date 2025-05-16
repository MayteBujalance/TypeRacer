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

let startTime; // Variable to store the start time

// Function to display a random sample text based on the selected difficulty. When this function is called:

// It checks which difficulty level the user selected.
// It retrieves a list of texts for that difficulty.
// It picks one text randomly.
// It updates the text-to-type element to display the chosen text.

function displayRandomTextByDifficulty() {
    const difficultySelect = document.getElementById("difficulty-select");
    const selectedDifficulty = difficultySelect.value;
    const textsForDifficulty = sampleTexts[selectedDifficulty];
    const randomIndex = Math.floor(Math.random() * textsForDifficulty.length);
    const textToTypeElement = document.getElementById("text-to-type");
    textToTypeElement.textContent = textsForDifficulty[randomIndex];
}

// Function to start the typing test
function startTypingTest() {
    startTime = Date.now(); // Record the start time
    document.getElementById("start-btn").disabled = true; // Disable the Start button
    document.getElementById("stop-btn").disabled = false; // Enable the Stop button
    const typingBox = document.getElementById("typing-box");
    typingBox.value = ""; // Clear the typing box
    typingBox.disabled = false; // Enable the typing box
    typingBox.focus(); // Automatically focus on the typing box
    displayRandomTextByDifficulty(); // Display a random text
    document.getElementById("typing-box").focus();
}

// Function to stop the typing test and calculate the elapsed time
function stopTypingTest() {
    const endTime = Date.now(); // Record the end time
    const elapsedTime = ((endTime - startTime) / 1000).toFixed(2); // Calculate time in seconds and round to 2 decimal points
    document.getElementById("result-time").textContent = elapsedTime; // Display the elapsed time
    document.getElementById("start-btn").disabled = false; // Enable the Start button
    document.getElementById("stop-btn").disabled = true; // Disable the Stop button
    document.getElementById("typing-box").disabled = true;
// Disable the typing box
}

// Function to calculate the number of correctly typed words
function calculateCorrectWords(sampleText, userInput) {
    const sampleWords = sampleText.trim().split(/\s+/); // Trims removes start and end spcaces. Splits text into an array of words. s+ matches whitespace character, space, tabs etc
    const userWords = userInput.trim().split(/\s+/); // same as above for the user's input
    let correctWords = 0; // Initialize a counter for correct words.

    // Compare each word in the user's input with the sample text
    for (let i = 0; i < userWords.length; i++) {
        if (userWords[i] === sampleWords[i]) {
            correctWords++;
        }
    }

    return correctWords;
}

// Function to calculate Words Per Minute (WPM)
function calculateWPM(correctWords, elapsedTime) {
    const minutes = elapsedTime / 60; // Convert time to minutes
    return Math.round(correctWords / minutes); // Calculate WPM and round to a whole number
}



// Function to retry the typing test
function retryTypingTest() {
    const typingBox = document.getElementById("typing-box");
    typingBox.value = ""; // Clear the typing box
    typingBox.disabled = false; // Enable the typing box
    typingBox.focus(); // Automatically focus on the typing box

    // Reset results (optional)
    document.getElementById("result-time").textContent = "-";
    document.getElementById("result-wpm").textContent = "-";
    document.getElementById("result-level").textContent = "-";

    // Disable the Start button and enable the Stop button
    document.getElementById("start-btn").disabled = true;
    document.getElementById("stop-btn").disabled = false;
}


// Add event listeners to the Start and Stop buttons and the Retry button
document.getElementById("start-btn").addEventListener("click", startTypingTest);
document.getElementById("stop-btn").addEventListener("click", stopTypingTest);
document.getElementById("retry-btn").addEventListener("click", retryTypingTest);

// Add event listener to the difficulty select dropdown
document.getElementById("difficulty-select").addEventListener("change", displayRandomTextByDifficulty);