// DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWPMDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');

// Test texts
const testTexts = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster.",
    "Technology has revolutionized the way we communicate and work in the modern digital era.",
    "Typing speed is an essential skill for anyone working with computers in today's workplace."
];

// Game state
let currentText = '';
let timeLeft = 60;
let timerInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;

// On page load
function webLoad() {
    onLoad();
    displayContent();
}

function onLoad() {
    const temp = sessionStorage.getItem('previousWpm');
    if (temp != null) {
        bestWPM = parseInt(temp);
    } else {
        bestWPM = 0;
    }
}

function displayContent() {
    timerDisplay.textContent = timeLeft;
    bestWPMDisplay.textContent = bestWPM;
}

webLoad();

// End Game
function endGame() {
    clearInterval(timerInterval);
    isTestActive = false;
    typingArea.disabled = true;
    startBtn.disabled = false;

    // Save best WPM
    const currentWPM = parseInt(wpmDisplay.textContent) || 0;
    if (currentWPM > bestWPM) {
        bestWPM = currentWPM;
        sessionStorage.setItem('previousWpm', bestWPM);
    }

    timeLeft = 60;
    displayContent();
}

// Start Game
function startGame() {
    startBtn.disabled = true;
    isTestActive = true;
    startTime = null;
    timeLeft = 60;

    // Choose random text
    currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
    textDisplay.textContent = currentText;

    typingArea.disabled = false;
    typingArea.value = "";
    typingArea.focus();
    typingArea.setAttribute('placeholder', 'Start typing here...');

    timerInterval = setInterval(() => {
        timeLeft--;
        displayContent();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Update WPM & Accuracy
function updateStatus() {
    const typed = typingArea.value;
    const elapsedTime = (Date.now() - startTime) / 1000 / 60; // minutes

    const words = typed.trim().split(/\s+/).filter(w => w.length > 0);
    const wpm = elapsedTime > 0 ? Math.floor(words.length / elapsedTime) : 0;
    wpmDisplay.textContent = wpm;

    let currentScore = 0;
    for (let i = 0; i < typed.length; i++) {
        if (currentText[i] === typed[i]) {
            currentScore++;
        }
    }

    const accuracy = typed.length > 0 ? Math.floor((currentScore / typed.length) * 100) : 0;
    accuracyDisplay.textContent = accuracy;
}

// Highlight correct/incorrect letters
function Highlights() {
    const typed = typingArea.value;
    let highlightText = "";

    for (let i = 0; i < currentText.length; i++) {
        if (i < typed.length) {
            if (currentText[i] === typed[i]) {
                highlightText += `<span class="correct">${currentText[i]}</span>`;
            } else {
                highlightText += `<span class="incorrect">${currentText[i]}</span>`;
            }
        } else {
            highlightText += currentText[i];
        }
    }

    textDisplay.innerHTML = highlightText;
}

// Input handler
function wordType() {
    if (!isTestActive) return;

    if (startTime == null) {
        startTime = Date.now();
    }

    updateStatus();
    Highlights();
}

// Event listeners
startBtn.addEventListener('click', startGame);
typingArea.addEventListener('input', wordType);
resetBtn.addEventListener('click', endGame);
