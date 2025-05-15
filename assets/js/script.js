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

let startTime;

// Utility function to get elements by ID
const $ = id => document.getElementById(id);

// Display a random sample text based on selected difficulty
function displayRandomTextByDifficulty() {
    const difficulty = $("difficulty-select").value;
    const texts = sampleTexts[difficulty];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    $("text-to-type").textContent = randomText;
}

// Start the typing test
function startTypingTest() {
    startTime = Date.now();
    $("typing-box").value = "";
    $("typing-box").disabled = false;
    $("typing-box").focus();

    $("start-btn").disabled = true;
    $("stop-btn").disabled = false;

    displayRandomTextByDifficulty();
}

// Stop the typing test and display results
function stopTypingTest() {
    const elapsedTimeSec = ((Date.now() - startTime) / 1000).toFixed(2);
    const sampleText = $("text-to-type").textContent;
    const userText = $("typing-box").value;

    const correctWords = calculateCorrectWords(sampleText, userText);
    const wpm = calculateWPM(correctWords, elapsedTimeSec);

    $("result-time").textContent = elapsedTimeSec;
    $("result-wpm").textContent = wpm;
    $("result-level").textContent = $("difficulty-select").value;

    $("typing-box").disabled = true;
    $("start-btn").disabled = false;
    $("stop-btn").disabled = true;
}

// Count correct words by position
function calculateCorrectWords(reference, input) {
    const refWords = reference.trim().split(/\s+/);
    const inputWords = input.trim().split(/\s+/);
    let correct = 0;

    for (let i = 0; i < inputWords.length; i++) {
        if (inputWords[i] === refWords[i]) {
            correct++;
        }
    }
    return correct;
}

// Calculate WPM (words per minute)
function calculateWPM(correctWords, timeInSeconds) {
    const minutes = timeInSeconds / 60;
    return Math.round(correctWords / minutes || 0);
}

// Event listeners
$("start-btn").addEventListener("click", startTypingTest);
$("stop-btn").addEventListener("click", stopTypingTest);
$("difficulty-select").addEventListener("change", displayRandomTextByDifficulty);
