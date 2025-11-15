// DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWPMDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');

// Sentences for test
const testTexts = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster.",
    "Technology has revolutionized the way we communicate and work in the modern digital era.",
    "Typing speed is an essential skill for anyone working with computers in today's workplace.",
    "Consistent practice helps in improving typing speed, accuracy, and confidence over time.",
    "Fast and accurate typing saves time and boosts productivity in every digital task."
];

// Game state
let currentText = '';
let timeLeft = 60;
let timerInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;

// Load previous best
function webLoad() {
    const temp = sessionStorage.getItem('previousWpm');
    bestWPM = temp ? parseInt(temp) : 0;
    timerDisplay.textContent = timeLeft;
    bestWPMDisplay.textContent = bestWPM;
}
webLoad();

// Start Game
function startGame() {
    startBtn.disabled = true;
    isTestActive = true;
    startTime = null;
    timeLeft = 60;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = "100%";
    loadNewSentence();

    typingArea.disabled = false;
    typingArea.value = "";
    typingArea.focus();

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

// Load new sentence
function loadNewSentence() {
    currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
    textDisplay.innerHTML = currentText;
    typingArea.value = "";
}

// End Game
function endGame() {
    clearInterval(timerInterval);
    isTestActive = false;
    typingArea.disabled = true;
    startBtn.disabled = false;

    const currentWPM = parseInt(wpmDisplay.textContent) || 0;
    if (currentWPM > bestWPM) {
        bestWPM = currentWPM;
        sessionStorage.setItem('previousWpm', bestWPM);
    }

    bestWPMDisplay.textContent = bestWPM;
    timerDisplay.textContent = 60;
    textDisplay.textContent = "⏹ Test Ended! Click 'Start Test' to try again.";
}

// Update WPM & Accuracy
function updateStatus() {
    const typed = typingArea.value;
    const elapsedTime = (Date.now() - startTime) / 1000 / 60;
    const words = typed.trim().split(/\s+/).filter(w => w.length > 0);
    const wpm = elapsedTime > 0 ? Math.floor(words.length / elapsedTime) : 0;
    wpmDisplay.textContent = wpm;

    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === currentText[i]) correct++;
    }

    const accuracy = typed.length > 0 ? Math.floor((correct / typed.length) * 100) : 100;
    accuracyDisplay.textContent = accuracy + "%";
}

// Highlight letters
function highlightText() {
    const typed = typingArea.value;
    let highlighted = "";

    for (let i = 0; i < currentText.length; i++) {
        if (i < typed.length) {
            highlighted += currentText[i] === typed[i]
                ? `<span class="correct">${currentText[i]}</span>`
                : `<span class="incorrect">${currentText[i]}</span>`;
        } else {
            highlighted += currentText[i];
        }
    }

    textDisplay.innerHTML = highlighted;
}

// Check typing progress
function handleTyping() {
    if (!isTestActive) return;
    if (!startTime) startTime = Date.now();

    updateStatus();
    highlightText();

    // If sentence completed before time ends → load next
    if (typingArea.value.trim() === currentText.trim()) {
        loadNewSentence();
    }
}

// Reset session
function resetGame() {
    endGame();
    bestWPM = 0;
    sessionStorage.removeItem('previousWpm');
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";
    bestWPMDisplay.textContent = "0";
}

// Event Listeners
startBtn.addEventListener('click', startGame);
typingArea.addEventListener('input', handleTyping);
resetBtn.addEventListener('click', resetGame);
