let countdown = null;
let timeLeft = 3600;
let endTime = null;
let paused = false;

function adjustTime(unit, change) {
  const el = document.getElementById(unit);
  let value = parseInt(el.innerText);
  value += change;
  if (value < 0) value = 0;
  if (unit !== "hours" && value > 59) value = 59;
  el.innerText = String(value).padStart(2, '0');
}

function getTimeFromUI() {
  const h = parseInt(document.getElementById("hours").innerText);
  const m = parseInt(document.getElementById("minutes").innerText);
  const s = parseInt(document.getElementById("seconds").innerText);
  return h * 3600 + m * 60 + s;
}

function updateUIFromSeconds(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  document.getElementById("hours").innerText = String(h).padStart(2, '0');
  document.getElementById("minutes").innerText = String(m).padStart(2, '0');
  document.getElementById("seconds").innerText = String(s).padStart(2, '0');
}

function startTimer() {
  if (countdown) return;
  if (paused && timeLeft > 0) {
    endTime = Date.now() + timeLeft * 1000;
    paused = false;
  } else {
    timeLeft = getTimeFromUI();
    if (timeLeft <= 0) return;
    endTime = Date.now() + timeLeft * 1000;
  }

  countdown = setInterval(() => {
    timeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    updateUIFromSeconds(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(countdown);
      countdown = null;
      alert("⏰ Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  if (!countdown) return;
  clearInterval(countdown);
  countdown = null;
  paused = true;
}

function resetTimer() {
  clearInterval(countdown);
  countdown = null;
  paused = false;
  timeLeft = getTimeFromUI();
  updateUIFromSeconds(timeLeft);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
