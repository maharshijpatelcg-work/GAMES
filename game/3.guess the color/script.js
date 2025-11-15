const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const colorBoxes = document.querySelectorAll('.color-box');
const newRoundBtn = document.querySelector('#newRoundBtn');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');
const bgVideo = document.querySelector('#bgVideo');

let playerName = "";
let currentStreak = 0;
let bestStreak = 0;
let colors = [];
let correctColor = "";
let num = 6;
let isRoundActive = true;

bgVideo.src = "winning.mp4";

function webLoad() {
  askPlayerName();
  onLoad();
  setGame();
  displayStreaks();
  hardBtn.classList.add('selected'); 
}

function askPlayerName() {
  playerName = prompt("🎮 Enter your name to start:") || "Player";
  messageDisplay.textContent = `Welcome, ${playerName}!`;
  setTimeout(() => (messageDisplay.textContent = "Pick the correct color!"), 1500);
}

function onLoad() {
  const stored = localStorage.getItem('bestStreak');
  bestStreak = stored ? parseInt(stored) : 0;
}

function displayStreaks() {
  currentStreakDisplay.textContent = currentStreak;
  bestStreakDisplay.textContent = bestStreak;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) arr.push(randomColor());
  return arr;
}

function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function setGame() {
  colors = generateColors(num);
  correctColor = pickColor();
  colorDisplay.textContent = correctColor.toUpperCase();
  isRoundActive = true;

  messageDisplay.textContent = "";
  messageDisplay.style.color = "white";

  colorDisplay.style.fontWeight = "600";

  colorBoxes.forEach(b => b.classList.remove("correct-glow"));

  for (let i = 0; i < colorBoxes.length; i++) {
    if (colors[i]) {
      colorBoxes[i].style.display = "block";
      colorBoxes[i].style.backgroundColor = colors[i];
      colorBoxes[i].style.cursor = "pointer";
    } else {
      colorBoxes[i].style.display = "none";
    }
  }
}

function setEasyMode() {
  num = 3;

  easyBtn.style.backgroundColor = "lightgreen";
  easyBtn.style.color = "black";

  hardBtn.style.backgroundColor = "";
  hardBtn.style.color = "";

  setGame();
}

function setHardMode() {
  num = 6;

  hardBtn.style.backgroundColor = "white";
  hardBtn.style.color = "#141e30";

  easyBtn.style.backgroundColor = "";
  easyBtn.style.color = "";

  setGame();
}

colorBoxes.forEach(box => {
  box.addEventListener("click", function () {
    if (!isRoundActive) return;

    const clickedColor = this.style.backgroundColor;

    if (clickedColor === correctColor) {

      currentStreak++;

      if (currentStreak === 1) {
        messageDisplay.textContent = "🥇 First Win!";
        messageDisplay.style.color = "#ffd700"; 
      }
      else if (currentStreak >= 3) {
        messageDisplay.textContent = "🔥 STREAK!";
        messageDisplay.style.color = "#00ff6a"; 
      }
      else {
        messageDisplay.textContent = "✅ Correct!";
        messageDisplay.style.color = "white";
      }

      alert(`🎉 Congratulations ${playerName}! You won this round! 🎯`);

      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
        localStorage.setItem("bestStreak", bestStreak);

        colorDisplay.style.fontWeight = "bold";
      }

      displayStreaks();
      isRoundActive = false;

      colorBoxes.forEach(b => {
        if (b.style.backgroundColor === correctColor) {
          b.classList.add("correct-glow");
        }
        b.style.backgroundColor = correctColor;
      });

      bgVideo.classList.add("show");

      setTimeout(() => {
        bgVideo.classList.remove("show");
        messageDisplay.style.color = "white";
        colorBoxes.forEach(b => b.classList.remove("correct-glow"));
        setGame();
      }, 3000);

    } else {
      this.style.backgroundColor = "#141e30";
      messageDisplay.textContent = "❌ Try Again!";
      messageDisplay.style.color = "white";
      currentStreak = 0;
      displayStreaks();
    }
  });
});

newRoundBtn.addEventListener("click", setHardMode);

easyBtn.addEventListener("click", setEasyMode);

hardBtn.addEventListener("click", setHardMode);

resetStreakBtn.addEventListener("click", () => {
  localStorage.removeItem("bestStreak");
  bestStreak = 0;
  currentStreak = 0;
  displayStreaks();
});

webLoad();
