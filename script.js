let espresso = 0;
let eps = 0;
let espressoPerClick = 1;
let answeredQuestions = [];

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggleMusicBtn = document.getElementById("toggleMusic");

  if (toggleMusicBtn && music) {
    toggleMusicBtn.addEventListener("click", () => {
      music.muted = !music.muted;
      toggleMusicBtn.textContent = music.muted ? "🔈 Unmute Music" : "🔊 Mute Music";
    });
  }

  document.getElementById("mainButton").addEventListener("click", () => {
    espresso += espressoPerClick;
    updateCounter();

    const btn = document.getElementById("mainButton");
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 100);

    const popup = document.createElement("div");
    popup.textContent = `+${espressoPerClick}`;
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

  updateCounter();
});

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
  const espressoCount = document.getElementById("espressoCount");
  const espressoPerSecond = document.getElementById("espressoPerSecond");

  if (espressoCount) espressoCount.textContent = `Espressos: ${Math.floor(espresso)}`;
  if (espressoPerSecond) espressoPerSecond.textContent = `Per Second: ${eps.toFixed(1)}`;

  upgrades.forEach((upgrade, index) => {
    const costElement = document.getElementById(`cost${index}`);
    if (costElement) {
      const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.quantity));
      costElement.textContent = cost;
    }
  });

  if (espresso >= 1000000) {
    const nextBtn = document.getElementById("nextAdventureBtn");
    if (nextBtn) nextBtn.style.display = "block";
    alert("You got enough espressos to bribe Latte Luchador. You got Bambino Biscottino back... this time!");
    resetGame();
  }
}

function goToNextAdventure() {
  window.location.href = "index2.html";
}

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
  const questionElement = document.getElementById("bossQuestion");

  if (available.length === 0) {
    questionElement.textContent = "You've answered all boss questions!";
    return;
  }

  const index = questions.indexOf(available[Math.floor(Math.random() * available.length)]);
  questionElement.dataset.index = index;
  questionElement.textContent = questions[index].q;
}

function checkAnswer() {
  const input = document.getElementById("bossAnswer").value.toLowerCase().trim();
  const index = parseInt(document.getElementById("bossQuestion").dataset.index);
  const currentQuestion = questions[index];
  const correct = currentQuestion.a.some(ans => input.includes(ans));

  if (correct) {
    if (!answeredQuestions.includes(index)) {
      currentQuestion.reward();
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
  const save = { espresso, eps, espressoPerClick, answeredQuestions, upgrades };
  localStorage.setItem("ninoSave", JSON.stringify(save));
  alert("Game Saved!");
}

function loadGame() {
  const load = JSON.parse(localStorage.getItem("ninoSave"));
  if (load) {
    espresso = load.espresso;
    eps = load.eps;
    espressoPerClick = load.espressoPerClick || 1;
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
  espressoPerClick = 1;
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
