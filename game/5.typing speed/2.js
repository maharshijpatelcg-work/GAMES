// DOM elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWPMDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const timeButtons = document.querySelectorAll('.time-btn');

// sentences pool
const testTexts = [
  "The quick brown fox jumps over the lazy dog. Practice makes perfect.",
  "Technology has changed the way we work and communicate.",
  "Typing speed is very important in the digital world.",
  "Consistent practice improves speed and accuracy.",
  "Fast typing helps save time and increases productivity."
];

// state
let currentText = '';
let selectedTime = 0;
let timeLeft = 0;
let timerInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;

// initialize
(function init() {
  const saved = sessionStorage.getItem('previousWpm');
  bestWPM = saved ? parseInt(saved, 10) : 0;
  bestWPMDisplay.textContent = bestWPM;

  // show consistent formatting
  timerDisplay.textContent = "0s";
  typingArea.disabled = true;
  startBtn.disabled = true; // Start disabled initially
})();

// helper: enable/disable time buttons
function setTimeButtonsDisabled(val) {
  timeButtons.forEach(b => b.disabled = val);
}

// ⭐ TIME BUTTON CLICK LOGIC
timeButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    if (isTestActive) return;

    // Reset button styles + text
    timeButtons.forEach(b => {
      b.classList.remove('active');
      b.textContent = b.dataset.time + "s";
    });

    // Highlight selected button
    btn.classList.add('active');
    btn.textContent = btn.dataset.time + "s";

    // Update timer
    selectedTime = Number(btn.dataset.time);
    timeLeft = selectedTime;
  timerDisplay.textContent = selectedTime + "s";

    // Enable Start Button Now
    // Ensure the Start button is visually and functionally enabled
    startBtn.disabled = false;
    startBtn.removeAttribute('disabled');
    startBtn.classList.remove('disabled');
    startBtn.tabIndex = 0;
  });
});

// ⭐ START GAME
function startGame() {
  if (!selectedTime || isTestActive) return;

  if (timerInterval) clearInterval(timerInterval);

  isTestActive = true;
  startBtn.disabled = true;
  setTimeButtonsDisabled(true);

  startTime = null;
  timeLeft = selectedTime;
  timerDisplay.textContent = timeLeft + "s";

  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = "100%";

  loadNewSentence();

  typingArea.disabled = false;
  typingArea.value = "";
  typingArea.focus();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft + "s";

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// ⭐ LOAD NEW SENTENCE
function loadNewSentence() {
  currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
  textDisplay.innerHTML = currentText;
  typingArea.value = "";
  startTime = null;
}

// ⭐ END GAME (FIXED)
function endGame() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  isTestActive = false;
  typingArea.disabled = true;
  setTimeButtonsDisabled(false);

  // Start disabled until selecting time again
  startBtn.disabled = true;

  // Reset buttons
  timeButtons.forEach(b => {
    b.classList.remove("active");
    b.textContent = b.dataset.time + "s";
  });

  const currentWPM = parseInt(wpmDisplay.textContent, 10) || 0;
  if (currentWPM > bestWPM) {
    bestWPM = currentWPM;
    sessionStorage.setItem('previousWpm', String(bestWPM));
    bestWPMDisplay.textContent = bestWPM;
  }

  textDisplay.textContent = "⏹ Test Ended! Select a time and click Start Test to play again.";
  
  // keep consistent formatting
  timerDisplay.textContent = "0s";
  startTime = null;
}

// ⭐ UPDATE WPM + ACCURACY
function updateStatus() {
  const typed = typingArea.value;
  if (!startTime) return;

  const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
  const wordsCount = typed.trim().length === 0 ? 0 : typed.trim().split(/\s+/).length;
  const wpm = elapsedMinutes > 0 ? Math.floor(wordsCount / elapsedMinutes) : 0;
  wpmDisplay.textContent = wpm;

  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === (currentText[i] || '')) correct++;
  }
  const accuracy = typed.length > 0 ? Math.floor((correct / typed.length) * 100) : 100;
  accuracyDisplay.textContent = accuracy + "%";
}

// ⭐ HIGHLIGHT TEXT
function highlightText() {
  const typed = typingArea.value;
  let html = '';

  for (let i = 0; i < currentText.length; i++) {
    if (i < typed.length) {
      html += typed[i] === currentText[i]
        ? `<span class="correct">${currentText[i]}</span>`
        : `<span class="incorrect">${currentText[i]}</span>`;
    } else {
      html += currentText[i];
    }
  }

  textDisplay.innerHTML = html;
}

// ⭐ HANDLE TYPING
function handleTyping() {
  if (!isTestActive) return;

  if (!startTime) startTime = Date.now();

  updateStatus();
  highlightText();

  if (typingArea.value.trim() === currentText.trim()) {
    loadNewSentence();
  }
}

// ⭐ RESET GAME
function resetGame() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  isTestActive = false;
  selectedTime = 0;
  timeLeft = 0;
  startTime = null;

  typingArea.value = "";
  typingArea.disabled = true;

  timerDisplay.textContent = "0s";
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = "100%";
  textDisplay.textContent = "Select a time to start the test.";

  startBtn.disabled = true;

  bestWPM = 0;
  sessionStorage.removeItem('previousWpm');
  bestWPMDisplay.textContent = 0;

  timeButtons.forEach(b => {
    b.classList.remove("active");
    b.textContent = b.dataset.time + "s";
  });

  setTimeButtonsDisabled(false);
}

// EVENTS
startBtn.addEventListener('click', startGame);
typingArea.addEventListener('input', handleTyping);
resetBtn.addEventListener('click', resetGame);
// Note: do NOT add an event listener that passes the numeric `selectedTime` as
// the handler. The Start button is already wired to `startGame` above.