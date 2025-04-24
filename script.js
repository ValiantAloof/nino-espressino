// script.js
let espresso = 0;
let eps = 0;
let answeredQuestions = [];
let espressoPerClick = 1;


const music = document.getElementById("bg-music");
const toggleMusicBtn = document.getElementById("toggleMusic");

toggleMusicBtn.addEventListener("click", () => {
  if (music.muted) {
    music.muted = false;
    toggleMusicBtn.textContent = "🔊 Mute Music";
  } else {
    music.muted = true;
    toggleMusicBtn.textContent = "🔈 Unmute Music";
  }
});

// Upgrade configuration
const upgrades = [
  { baseCost: 15, epsValue: 0.1, quantity: 0 },
  { baseCost: 100, epsValue: 1, quantity: 0 },
  { baseCost: 1100, epsValue: 8, quantity: 0 },
  { baseCost: 12000, epsValue: 47, quantity: 0 }
];

const questions = [
  { q: "What is the ideal temperature range (in °C) for espresso extraction?", a: ["90", "95"], reward: () => { espresso += 100; } },

  { q: "How many grams are typically used in a double shot of espresso?", a: ["18", "18 grams"], reward: () => { espressoPerClick += 1; } },

  { q: "What pressure (in bars) is commonly used to brew espresso?", a: ["9", "nine"], reward: () => { espresso += 1000; } },

  { q: "Which country is known as the birthplace of espresso?", a: ["italy"], reward: () => { espressoPerClick += 1; } },

  { q: "What milk-based espresso drink has a 1:1 coffee to milk ratio?", a: ["macchiato"], reward: () => { espresso += 10000; } },

  { q: "Name the device used for manually brewing espresso using a lever.", a: ["lever machine", "manual espresso machine"], reward: () => { espressoPerClick += 2; } },

  { q: "What is the name of the fine grind size used for espresso?", a: ["fine"], reward: () => { espresso += 100000; } },

  { q: "How long (in seconds) should a typical espresso shot take to brew?", a: ["25", "30"], reward: () => { espresso += 100000; } },

  { q: "Which part of the espresso machine maintains pressure and temperature?", a: ["boiler", "group head"], reward: () => { espresso += 100000; } },

  { q: "What term refers to the golden layer of foam atop a well-pulled espresso shot?", a: ["crema"], reward: () => { espresso += 100000; } },
];

function updateCounter() {
  document.getElementById("espressoCount").textContent = `Espressos: ${Math.floor(espresso)}`;
  document.getElementById("espressoPerSecond").textContent = `Per Second: ${eps.toFixed(1)}`;

  // Update the cost of each upgrade dynamically
  upgrades.forEach((upgrade, index) => {
    const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.quantity));
    document.getElementById(`cost${index}`).textContent = cost;
  });

  // Check for win condition

  if (espresso >= 1000000) {
    document.getElementById("nextAdventureBtn").style.display = "block";
    alert("You got enough espressos to bribe Latte Luchador. You got Bambino Biscottino back...this time!");
    resetGame();
  }
}

  function goToNextAdventure() {
  window.location.href = "index2.html"; // 👈 Make sure index2.html is in the same folder
}

document.getElementById("mainButton").addEventListener("click", () => {
  espresso += espressoPerClick;
  updateCounter();

  const btn = document.getElementById("mainButton");
  btn.classList.add("clicked");
  setTimeout(() => btn.classList.remove("clicked"), 100);

  const popup = document.createElement("div");
  popup.textContent = "+1";
  popup.className = "click-popup";
  popup.style.position = "absolute";
  popup.style.left = `${btn.offsetLeft + btn.offsetWidth / 2}px`;
  popup.style.top = `${btn.offsetTop}px`;
  popup.style.fontSize = "1rem";
  popup.style.color = "#fff8e1";
  popup.style.animation = "popUp 0.6s ease-out forwards";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 600);
});

function buyUpgrade(index) {
  const upgrade = upgrades[index];
  const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.quantity));

  if (espresso >= cost) {
    espresso -= cost;
    eps += upgrade.epsValue;
    upgrade.quantity++;
    updateCounter();
  } else {
    alert("Not enough espressos!");
  }
}

function switchTab(id) {
  document.querySelectorAll('.cutscene, .boss-battle, .save-system, .tutorial').forEach(el => el.classList.remove('visible'));
  document.getElementById(id).classList.add('visible');
  if (id === 'boss') showBossQuestion();
}

function showBossQuestion() {
  const available = questions.filter((_, i) => !answeredQuestions.includes(i));
  if (available.length === 0) {
    document.getElementById("bossQuestion").textContent = "You've answered all boss questions!";
    return;
  }
  const index = questions.indexOf(available[Math.floor(Math.random() * available.length)]);
  document.getElementById("bossQuestion").dataset.index = index;
  document.getElementById("bossQuestion").textContent = questions[index].q;
}

ffunction checkAnswer() {
  const input = document.getElementById("bossAnswer").value.toLowerCase().trim();
  const index = parseInt(document.getElementById("bossQuestion").dataset.index);
  const currentQuestion = questions[index];
  const correct = currentQuestion.a.some(ans => input.includes(ans));

  if (correct) {
    if (!answeredQuestions.includes(index)) {
      currentQuestion.reward(); // Apply the reward!
      answeredQuestions.push(index);
      alert("Correct! You earned a reward.");
    } else {
      alert("You've already answered this question.");
    }
  } else {
    alert("Wrong! Latte Luchador wins...");
    resetGame();
  }

  updateCounter();
}

function saveGame() {
  const save = { espresso, eps, answeredQuestions, upgrades };
  localStorage.setItem("ninoSave", JSON.stringify(save));
  alert("Game Saved!");
}

function loadGame() {
  const load = JSON.parse(localStorage.getItem("ninoSave"));
  if (load) {
    espresso = load.espresso;
    eps = load.eps;
    answeredQuestions = load.answeredQuestions || [];
    if (load.upgrades) upgrades.forEach((u, i) => Object.assign(u, load.upgrades[i]));
    updateCounter();
    alert("Game Loaded!");
  }
}

function resetGame() {
  localStorage.removeItem("ninoSave");
  espresso = 0;
  eps = 0;
  answeredQuestions = [];
  upgrades.forEach(upg => upg.quantity = 0);
  updateCounter();
  alert("Progress Reset.");
}

setInterval(() => {
  espresso += eps / 10;
  updateCounter();
}, 100);

window.addEventListener('click', () => {
  const music = document.getElementById('bg-music');
  if (music && music.paused) music.play();
});

updateCounter();
