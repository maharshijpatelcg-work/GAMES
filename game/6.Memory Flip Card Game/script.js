// DOM Elements
const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const timeEl = document.getElementById('timeLeft');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const bestScoreEl = document.getElementById('bestScore');

// Config
const totalPairs = 9;
const initialTime = 60;

// State
let firstCard = null;
let secondCard = null;
let busy = false;
let moves = 0;
let matchedPairs = 0;
let timeLeft = initialTime;
let timerId = null;
let bestScore = 0;
let gameStarted = false;

// Load best score
function onLoad() {
    const temp = localStorage.getItem("highScore");
    bestScore = temp ? parseInt(temp) : 0;
}

function displayContent() {
    timeEl.textContent = timeLeft;
    bestScoreEl.textContent = bestScore;
}

var num1 = [1,2,3,4,5,6,7,8,9];

// Shuffle numbers
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Create card
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = value;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    return card;
}

// Flip Logic
function displayValue(card) {

    if (!gameStarted) return;
    if (busy) return;
    if (card === firstCard || card.classList.contains('marked')) return;

    card.classList.add('flipped');

    // First card
    if (firstCard === null) {
        firstCard = card;
        return;
    }

    // Second card
    secondCard = card;
    moves++;
    movesEl.textContent = moves;

    let a = firstCard.querySelector('.back').textContent;
    let b = secondCard.querySelector('.back').textContent;

    // MATCH
    if (a === b) {
        firstCard.classList.add('marked');
        secondCard.classList.add('marked');

        matchedPairs++;
        pairsEl.textContent = matchedPairs;

        // GAME OVER
        if (matchedPairs === totalPairs) {
            clearInterval(timerId);
            gameStarted = false;

            checkBestScore();

            setTimeout(() => {
                alert("🎉 Game Completed!");
            }, 300);
        }

        firstCard = null;
        secondCard = null;
    }

    // NOT MATCH
    else {
        busy = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            firstCard = null;
            secondCard = null;
            busy = false;
        }, 900);
    }
}

// Best score
function checkBestScore() {
    if (bestScore === 0 || moves < bestScore) {
        bestScore = moves;
        localStorage.setItem("highScore", bestScore);
    }
    bestScoreEl.textContent = bestScore;
}

// Create board
function createBoxGame() {
    board.innerHTML = "";
    const arr = shuffle([...num1, ...num1]);

    arr.forEach(value => {
        const card = createCard(value);
        board.appendChild(card);
        card.addEventListener("click", () => displayValue(card));
    });
}

// START GAME
startBtn.addEventListener("click", function () {
    if (gameStarted) return;
    startGame();
});

// ⭐ RESTART GAME ⭐
restartBtn.addEventListener("click", restartGame);

function restartGame() {

    clearInterval(timerId);

    // Reset states
    gameStarted = false;
    busy = false;
    firstCard = null;
    secondCard = null;
    moves = 0;
    matchedPairs = 0;
    timeLeft = initialTime;

    // ⭐ RESET BEST SCORE ALSO ⭐
    bestScore = 0;
    localStorage.setItem("highScore", 0);
    bestScoreEl.textContent = 0;

    // Reset display
    movesEl.textContent = 0;
    pairsEl.textContent = 0;
    timeEl.textContent = initialTime;

    // Recreate board
    createBoxGame();

    console.log("Game Restarted!");
}

// Start new game logic
function startGame() {

    gameStarted = true;

    timeLeft = initialTime;
    moves = 0;
    matchedPairs = 0;

    movesEl.textContent = 0;
    pairsEl.textContent = 0;

    document.querySelectorAll('.card').forEach(c => {
        c.classList.remove('flipped', 'marked');
    });

    timerId = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert("⏳ Time's Up!");
            gameStarted = false;
        }
    }, 1000);
}

// Load and show
createBoxGame();
onLoad();
displayContent();
