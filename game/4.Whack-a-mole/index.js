var player = prompt("Enter Your name");
const p = document.querySelector('.name');

// DOM Elements
const scoreDisplay = document.querySelector('#score');
const hitsDisplay = document.querySelector('#hits');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const messageDisplay = document.querySelector('#message');
const startBtn = document.querySelector('#startBtn');
const restartBtn = document.querySelector('#restartBtn'); // NEW
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

// Required variables
let score = 0;
let hits = 0;
let time = 90;
let bestScore = 0;
let playGame = false;
let gameId = null;

// Common functions
function webLoad() {
    onLoad();
    displayContent();
}

function onLoad() {
    const temp = localStorage.getItem('highScoreMole');
    bestScore = temp ? parseInt(temp) : 0;
}

function displayContent() {
    scoreDisplay.textContent = score;
    hitsDisplay.textContent = `Hits: ${hits}`;
    timeLeftDisplay.textContent = time;
    maxScoreDisplay.textContent = bestScore;

    // ⭐ Score turns gold when > 50
    if (score > 50) {
        scoreDisplay.style.color = 'gold';
        scoreDisplay.style.fontWeight = 'bold';
    } else {
        scoreDisplay.style.color = '';
        scoreDisplay.style.fontWeight = '';
    }
}

function endGame() {
    clearInterval(gameId);
    playGame = false;
    startBtn.disabled = false;
    startBtn.innerText = "Play Again";

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('highScoreMole', bestScore);
        alert(`🎉 New High Score! You scored: ${score}`);

        // ✨ NEW RECORD GLOW
        maxScoreDisplay.style.textShadow = "0 0 15px yellow, 0 0 25px yellow";
        setTimeout(() => {
            maxScoreDisplay.style.textShadow = "";
        }, 1000);
    } else {
        alert(`Your current score: ${score}`);
    }

    displayContent();
}

// Random timing
function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

// Mole popping logic
function popGame() {
    if (!playGame) return;

    let min = 500;
    let max = 1500;

    if (time < 10) {
        min = 200;
        max = 600;
    }

    const timer = randomTime(min, max);
    const hole = randomHole();
    const mole = hole.querySelector('.mole');

    mole.classList.add('up');

    setTimeout(() => {
        mole.classList.remove('up');
        if (playGame) popGame();
    }, timer);
}

// Start game
function startGame() {
    time = 90;
    score = 0;
    hits = 0;
    playGame = true;
    startBtn.disabled = true;
    startBtn.innerText = "Playing...";
    displayContent();
    messageDisplay.textContent = "";

    popGame();

    gameId = setInterval(() => {
        time--;
        displayContent();
        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

// Hit detection
function bonk(event) {
    if (!event.isTrusted) return;

    if (event.target.classList.contains('up')) {
        event.target.classList.remove('up');
        event.target.classList.add('bonked');

        score++;
        hits++;
        displayContent();

        messageDisplay.textContent = "Whack!";
        messageDisplay.style.opacity = 1;

        setTimeout(() => {
            messageDisplay.style.opacity = 0;
        }, 400);

        setTimeout(() => {
            event.target.classList.remove('bonked');
        }, 300);
    }
}

// 🔁 RESET EVERYTHING
function restartGame() {
    clearInterval(gameId);
    playGame = false;

    score = 0;
    hits = 0;
    time = 90;
    bestScore = 0;

    localStorage.removeItem('highScoreMole');

    startBtn.disabled = false;
    startBtn.innerText = "Start";
    messageDisplay.textContent = "";
    maxScoreDisplay.style.textShadow = "";

    displayContent();
    alert("Game Reset! Best Score Cleared.");
}

webLoad();

// Event Listeners
moles.forEach((box) => box.addEventListener('click', bonk));
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame); // NEW
