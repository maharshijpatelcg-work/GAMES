var player = prompt("Enter Your Name");

// DOM Elements
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const resumeBtn = document.querySelector('#resumeBtn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

// Variables
let score = 0;
let time = 30;
let bestScore = 0;
let playGame = false;
let paused = false;
let gameId = null;

// Load best score
function onLoad() {
    const temp = localStorage.getItem('highScoreMole');
    bestScore = temp ? parseInt(temp) : 0;
}
onLoad();

function displayContent() {
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = time;
    maxScoreDisplay.textContent = bestScore;
}

// Game ends
function endGame() {
    clearInterval(gameId);
    playGame = false;
    paused = false;
    startBtn.disabled = false;

    const bgVideo = document.querySelector('#bg-video');

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('highScoreMole', bestScore);

        alert(`🎉 New High Score! You scored: ${score}`);
        bgVideo.classList.add('show');

        setTimeout(() => bgVideo.classList.remove('show'), 10000);
    } else {
        alert(`Your score: ${score}`);
    }

    displayContent();
}

// Getting random hole
function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

// Mole popping loop
function popGame() {
    if (!playGame || paused) return;

    const hole = randomHole();
    const mole = hole.querySelector('.mole');
    mole.classList.add('up');

    const timer = Math.floor(Math.random() * (1500 - 500) + 500);

    setTimeout(() => {
        mole.classList.remove('up');
        if (playGame && !paused) popGame();
    }, timer);
}

// Start game
function startGame() {
    time = 30;
    score = 0;
    playGame = true;
    paused = false;

    startBtn.disabled = true;
    displayContent();

    popGame();

    gameId = setInterval(() => {
        if (!paused) {
            time--;
            displayContent();

            if (time <= 0) endGame();
        }
    }, 1000);
}

// Pause game
function pauseGame() {
    if (!playGame) return;
    paused = true;

    alert("⏸ Game Paused!");
}

// Resume game
function resumeGame() {
    if (!playGame || !paused) return;

    paused = false;

    alert("▶ Game Resumed!");

    popGame(); // restart mole popping
}

// Clicking mole
function bonk(event) {
    if (!event.target.classList.contains('up') || paused) return;

    event.target.classList.remove('up');
    event.target.classList.add('bonked');

    score++;
    displayContent();

    setTimeout(() => event.target.classList.remove('bonked'), 300);
}

// ✅ Reset whole game + clear localStorage
function resetGame() {
    clearInterval(gameId);

    score = 0;
    time = 30;
    playGame = false;
    paused = false;

    // Clear high score
    localStorage.removeItem('highScoreMole');
    bestScore = 0;

    displayContent();

    moles.forEach(mole => {
        mole.classList.remove('up');
        mole.classList.remove('bonked');
    });

    document.querySelector('#bg-video').classList.remove('show');

    startBtn.disabled = false;

    alert("✅ Game Reset! High Score Cleared.");
}

// Events
moles.forEach(m => m.addEventListener('click', bonk));
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
pauseBtn.addEventListener('click', pauseGame);
resumeBtn.addEventListener('click', resumeGame);

// Initial display
displayContent();
