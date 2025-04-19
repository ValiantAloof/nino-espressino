// script.js
let espresso = 0;
let eps = 0;
let answeredQuestions = [];
let difficultyFactor = 1.1;

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
});

function buyUpgrade(value, baseCost) {
  const cost = Math.floor(baseCost * Math.pow(difficultyFactor, value));
  if (espresso >= cost) {
    espresso -= cost;
    eps += value;
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
  const save = { espresso, eps, answeredQuestions };
  localStorage.setItem("ninoSave", JSON.stringify(save));
  alert("Game Saved!");
}

function loadGame() {
  const load = JSON.parse(localStorage.getItem("ninoSave"));
  if (load) {
    espresso = load.espresso;
    eps = load.eps;
    answeredQuestions = load.answeredQuestions || [];
    updateCounter();
    alert("Game Loaded!");
  }
}

function resetGame() {
  localStorage.removeItem("ninoSave");
  espresso = 0;
  eps = 0;
  answeredQuestions = [];
  updateCounter();
  alert("Progress Reset.");
}

setInterval(() => {
  espresso += eps / 10;
  updateCounter();
}, 100);

window.addEventListener('click', () => {
  const music = document.getElementById('bg-music');
  if (music.paused) music.play();
});

updateCounter();
