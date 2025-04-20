// script.js
let espresso = 0;
let eps = 0;
let answeredQuestions = [];

// Upgrade configuration
const upgrades = [
  { baseCost: 15, epsValue: 0.1, quantity: 0 },
  { baseCost: 100, epsValue: 1, quantity: 0 },
  { baseCost: 1100, epsValue: 8, quantity: 0 },
  { baseCost: 12000, epsValue: 47, quantity: 0 }
];

const questions = [
  { q: "What is the perfect temperature for espresso extraction?", a: ["90", "95"] },
  { q: "How many grams of coffee are in a double shot?", a: ["18", "18 grams"] },
  { q: "What pressure (in bars) is typically used to brew espresso?", a: ["9", "nine"] },
  { q: "Which country is known as the birthplace of espresso?", a: ["italy"] },
  { q: "What milk-based espresso drink has a 1:1 coffee to milk ratio?", a: ["macchiato"] }
];

function updateCounter() {
  document.getElementById("espressoCount").textContent = `Espressos: ${Math.floor(espresso)}`;
  document.getElementById("espressoPerSecond").textContent = `Per Second: ${eps.toFixed(1)}`;
}

document.getElementById("mainButton").addEventListener("click", () => {
  espresso++;
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

function checkAnswer() {
  const input = document.getElementById("bossAnswer").value.toLowerCase().trim();
  const index = parseInt(document.getElementById("bossQuestion").dataset.index);
  const correct = questions[index].a.some(ans => input.includes(ans));

  if (correct) {
    if (!answeredQuestions.includes(index)) {
      espresso += 100;
      answeredQuestions.push(index);
      alert("Correct! You earned 100 espressos.");
    } else {
      alert("You've already answered this question correctly before.");
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
