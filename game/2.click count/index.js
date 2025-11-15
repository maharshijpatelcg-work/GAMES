// 🎮 Select Elements
var currentScore = document.querySelector('#currentScore');
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');
var clickButton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var pauseButton = document.querySelector('#pauseButton');
var resumeButton = document.querySelector('#resumeButton');
var resetButton = document.querySelector('#resetButton');
var resetGameButton = document.querySelector('#resetGameButton');
var statusMessage = document.querySelector('#statusMessage');
var video = document.querySelector('#bgvideo');

// ⚙️ Game Variables
var current = 0;
var high = 0;
var timeLeft = 10;
var track = false;
var idTrack = null;
var playerName = "Player";
var buttonScale = 1;

// 🚀 Load Initial Data
function loadContent() {
  dataLoad();
  displayMessage();
}

function dataLoad() {
  var temp = localStorage.getItem('highScore');
  high = temp ? parseInt(temp) : 0;
}

function displayMessage() {
  currentScore.textContent = current;
  highScore.textContent = high;
  timer.textContent = timeLeft;
}

// 📝 Status Message
function statusMsg(msg) {
  statusMessage.textContent = msg;
}

// 💥 END GAME
function endGame() {
  clearInterval(idTrack);
  track = false;

  clickButton.disabled = true;
  startButton.disabled = false;
  pauseButton.disabled = true;
  resumeButton.style.display = "none";

  // Change button to "Play Again"
  startButton.innerText = "Play Again";

  // ⭐ CPS calculation
  var cps = (current / 10).toFixed(2);

  if (current > high) {
    localStorage.setItem('highScore', current);
    high = current;
    statusMsg("🎉 New High Score!");

    // 🌟 GOLD FLASH EFFECT
    document.body.style.background = "gold";
    setTimeout(() => {
      document.body.style.background = ""; 
    }, 1000);

    // Video + popup
    setTimeout(() => {
      video.style.display = 'block';
      video.play();

      setTimeout(() => {
        alert(
`🏆 Congratulations ${playerName}! 🎯
New High Score: ${current}
CPS: ${cps} clicks/second`
        );

        video.pause();
        video.currentTime = 0;
        video.style.display = 'none';
      }, 50);

    }, 500);

  } else {

    statusMsg("⏰ Game Over! Try again!");

    setTimeout(() => {
      alert(
`⏰ Time’s up, ${playerName}!
Your Score: ${current}
High Score: ${high}
CPS: ${cps} clicks/second`
      );
    }, 400);
  }

  displayMessage();
}

// ▶️ START GAME
function startGame() {
  var nameInput = prompt("🧠 Enter your name to start the game:");

  if (!nameInput || nameInput.trim() === "") {
    alert("⚠️ Please enter your name to start!");
    return;
  }

  playerName = nameInput.trim();
  current = 0;
  timeLeft = 10;
  track = true;
  currentScore.style.color = "white";

  // reset button scale
  buttonScale = 1;
  clickButton.style.transform = "scale(1)";

  clickButton.disabled = false;
  startButton.disabled = true;
  startButton.innerText = "Start";
  pauseButton.disabled = false;
  resumeButton.disabled = true;
  resumeButton.style.display = "none";
  video.style.display = "none";

  displayMessage();

  // Flash START message
  statusMsg("👉 Click Me!");
  setTimeout(() => {
    statusMsg(`🔥 Game started for ${playerName}!`);
  }, 1000);

  idTrack = setInterval(function () {
    timeLeft--;
    if (timeLeft <= 0) endGame();
    displayMessage();
  }, 1000);
}

// 👆 CLICK HANDLER (button grows)
function handleClick() {
  if (!track) return;

  current++;
  displayMessage();

  // Red score after 20
  currentScore.style.color = current > 20 ? "red" : "white";

  // Button grows 10% each click (max 2×)
  if (buttonScale < 2) {
    buttonScale += 0.1;
    clickButton.style.transform = `scale(${buttonScale})`;
  }
}

// PAUSE
function pauseGame() {
  if (track) {
    clearInterval(idTrack);
    track = false;

    clickButton.disabled = true;
    pauseButton.disabled = true;
    resumeButton.disabled = false;
    resumeButton.style.display = "inline-block";

    statusMsg(`⏸ Game paused by ${playerName}`);
  }
}

// RESUME
function resumeGame() {
  if (!track && timeLeft > 0) {
    track = true;

    clickButton.disabled = false;
    pauseButton.disabled = false;
    resumeButton.disabled = true;
    resumeButton.style.display = "none";

    statusMsg(`▶️ Game resumed by ${playerName}`);

    idTrack = setInterval(function () {
      timeLeft--;
      if (timeLeft <= 0) endGame();
      displayMessage();
    }, 1000);
  }
}

// RESET HIGH SCORE
function resetHighScore() {
  localStorage.removeItem('highScore');
  high = 0;
  displayMessage();
  statusMsg("🏁 High score reset!");
}

// RESET GAME
function resetGame() {
  clearInterval(idTrack);

  current = 0;
  timeLeft = 10;
  track = false;
  currentScore.style.color = "white";

  buttonScale = 1;
  clickButton.style.transform = "scale(1)";

  clickButton.disabled = true;
  pauseButton.disabled = true;
  resumeButton.disabled = true;
  resumeButton.style.display = "none";
  video.style.display = "none";

  startButton.disabled = false;
  startButton.innerText = "Start";

  displayMessage();
  statusMsg("🧹 Game has been reset!");
}

// ⚡ INIT
loadContent();

// 🧩 EVENTS
startButton.addEventListener('click', startGame);
clickButton.addEventListener('click', handleClick);
pauseButton.addEventListener('click', pauseGame);
resumeButton.addEventListener('click', resumeGame);
resetButton.addEventListener('click', resetHighScore);
resetGameButton.addEventListener('click', resetGame);
