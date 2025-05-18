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

let startTime = null; // Store the start time
let testStarted = false; // Flag to check if typing has started

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
    testStarted = false; // Reset the flag
    startTime = null; // Reset the timer
    document.getElementById("start-btn").disabled = true; // Disable the Start button
    document.getElementById("stop-btn").disabled = false; // Enable the Stop button
    document.getElementById("retry-btn").disabled = true;
    
    const typingBox = document.getElementById("typing-box");
    typingBox.value = ""; // Clear the typing box
    typingBox.disabled = false; // Enable the typing box
    typingBox.focus(); // Automatically focus on the typing box
    
    displayRandomTextByDifficulty(); // Display a random text
    
    const difficultySelect = document.getElementById("difficulty-select");
    const selectedDifficulty = difficultySelect.value;
    document.getElementById("result-time").textContent = "-";
    document.getElementById("result-wpm").textContent = "-";
    document.getElementById("result-level").textContent = selectedDifficulty;
}

// Start timer on first key press in typing box
document.getElementById("typing-box").addEventListener("keydown", function (e) {
    if (!testStarted && e.key.length === 1) { // Only start on actual character input
        startTime = Date.now();
        testStarted = true;
    }
});

// Function to stop the typing test and calculate the elapsed time
function stopTypingTest() {
    if (!testStarted || !startTime) return; // Do nothing if test hasn't started
    const endTime = Date.now(); // Record the end time
    const elapsedTime = ((endTime - startTime) / 1000).toFixed(2); // Calculate time in seconds and round to 2 decimal points
    document.getElementById("result-time").textContent = elapsedTime; // Display the elapsed time
    calculateWPM(); // Calculate and display WPM
    document.getElementById("start-btn").disabled = false; // Enable the Start button
    document.getElementById("stop-btn").disabled = true; // Disable the Stop button
    document.getElementById("typing-box").disabled = false;
    document.getElementById("retry-btn").disabled = false; // Enable the Retry button
// Disable the typing box
}

// Allow stopping the test with the Enter/Return key
document.getElementById("typing-box").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevents adding a new line in the textarea
        stopTypingTest();
    }
});

// Function to highlight words in real-time
function highlightWords() {
    const typingBox = document.getElementById("typing-box");
    const userInput = typingBox.value.trim();
    const sampleText = document.getElementById("text-to-type").textContent.trim();
    const sampleWords = sampleText.split(/\s+/); // Split sample text into words
    const userWords = userInput.split(/\s+/); // Split user input into words

    let highlightedText = "";

    // Compare each word and apply highlighting
    for (let i = 0; i < sampleWords.length; i++) {
        if (userWords[i] === undefined) {
            // If the user hasn't typed this word yet, keep it unstyled
            highlightedText += `<span>${sampleWords[i]}</span> `;
        } else if (userWords[i] === sampleWords[i]) {
            // Correct word: highlight in blue
            highlightedText += `<span style="color: blue;">${sampleWords[i]}</span> `;
        } else {
            // Incorrect word: highlight in red
            highlightedText += `<span style="color: red;">${sampleWords[i]}</span> `;
        }
    }

    // Update the sample text display with highlighted text
    document.getElementById("text-to-type").innerHTML = highlightedText.trim();
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

function calculateWPM() {
    const typingBox = document.getElementById("typing-box");
    const userInput = typingBox.value.trim();
    const wordCount = userInput.split(/\s+/).length; // Count words in user input
    const elapsedTime = (Date.now() - startTime) / 1000 / 60; // Time in minutes
    const wpm = Math.round(wordCount / elapsedTime); // Calculate WPM
    document.getElementById("result-wpm").textContent = wpm; // Display WPM
}

// Function to retry the typing test
function retryTypingTest() {
    const typingBox = document.getElementById("typing-box");
    typingBox.value = ""; // Clear the typing box
    typingBox.disabled = false; // Enable the typing box
    typingBox.focus(); // Automatically focus on the typing box

// Fetch a new random text at the same difficulty level
    displayRandomTextByDifficulty();

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

// Add event listener for real-time input in the typing box
document.getElementById("typing-box").addEventListener("input", highlightWords);

// Add event listener to the difficulty select dropdown
document.getElementById("difficulty-select").addEventListener("change", displayRandomTextByDifficulty);

