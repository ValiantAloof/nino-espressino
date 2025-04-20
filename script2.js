const storyText = document.getElementById("story-text");
const artwork = document.getElementById("artwork");

const story = [
  {
    text: "Nino sets off from his espresso garage, determined to find Bambino Biscottino.",
    options: ["Take the cobblestone road", "Ride the espresso river", "Visit Caffe Canyon", "Sneak through the Latte Labyrinth"],
    art: "art/scene1.png",
    next: [1, 2, 3, 4]
  },
  {
    text: "You encounter wild cappuccinos! They challenge your brew knowledge.",
    options: ["Offer a ristretto", "Show your grinder", "Run!", "Sing the espresso anthem"],
    art: "art/cappuccino.png",
    next: [5, 6, -1, 7]
  },
  {
    text: "The river drags you into a whirlpool. You find a secret espresso vault.",
    options: ["Open it", "Ignore it", "Mark location", "Dive deeper"],
    art: "art/vault.png",
    next: [8, 9, 1, -1]
  },
  {
    text: "In Caffe Canyon, you find a map with latte stains pointing toward the Mocha Mountains.",
    options: ["Follow it", "Burn it", "Eat it", "Frame it"],
    art: "art/map.png",
    next: [10, -1, -1, 11]
  },
  {
    text: "The Latte Labyrinth is confusing... and milky. You're stuck in a loop.",
    options: ["Turn back", "Use biscotti crumbs", "Call out for Bambino", "Take a milk nap"],
    art: "art/labyrinth.png",
    next: [1, 12, -1, -1]
  },
  {
    text: "The cappuccinos grant you safe passage and a frothy clue.",
    options: ["Continue", "Take nap", "Celebrate", "Share espresso"],
    art: "art/clue.png",
    next: [13, -1, -1, 10]
  },
  {
    text: "The grinder impresses them! They teach you the sacred crema ritual.",
    options: ["Perform it", "Forget it", "Write it down", "Yell it out"],
    art: "art/ritual.png",
    next: [13, -1, 13, -1]
  },
  {
    text: "They leave... unimpressed. You lose valuable beans. Game Over.",
    options: ["Restart", "", "", ""],
    art: "art/gameover.png",
    next: [0, -1, -1, -1]
  },
  {
    text: "Inside the vault, you find... a trap! You are whipped by milk tentacles. Game Over.",
    options: ["Restart", "", "", ""],
    art: "art/gameover.png",
    next: [0, -1, -1, -1]
  },
  {
    text: "You leave the vault alone. A barista shadow follows you.",
    options: ["Run", "Talk", "Ignore", "Hide"],
    art: "art/shadow.png",
    next: [14, 15, -1, -1]
  },
  {
    text: "The map leads to the Mocha Mountains. Bambino's trail grows warmer.",
    options: ["Climb", "Send drone", "Make camp", "Scream his name"],
    art: "art/mountains.png",
    next: [16, -1, -1, -1]
  },
  {
    text: "You frame the map, and it becomes a national treasure. Fame, but no Bambino.",
    options: ["Restart", "", "", ""],
    art: "art/gameover.png",
    next: [0, -1, -1, -1]
  },
  {
    text: "The biscotti crumbs guide you out. You’re free!",
    options: ["Continue", "Eat crumbs", "Leave a trail", "Celebrate"],
    art: "art/crumbs.png",
    next: [13, -1, -1, -1]
  },
  {
    text: "You reach the summit. There’s a mysterious espresso temple.",
    options: ["Enter", "Knock", "Peek", "Leave"],
    art: "art/temple.png",
    next: [17, 17, -1, -1]
  },
  {
    text: "The barista reveals a prophecy. You're destined to find Bambino in Volume 3.",
    options: ["Accept", "Reject", "Cry", "Make espresso"],
    art: "art/prophecy.png",
    next: [18, -1, -1, -1]
  },
  {
    text: "Inside the temple... a chair, a single biscotti crumb, and Bambino’s scarf.",
    options: ["Cry", "Take the crumb", "Shout", "Drink espresso"],
    art: "art/scarf.png",
    next: [18, 18, 18, 18]
  },
  {
    text: "You end your journey for now. Bambino remains lost... but hope brews eternal.",
    options: ["Restart", "", "", ""],
    art: "art/end.png",
    next: [0, -1, -1, -1]
  }
];

let currentIndex = 0;

function renderStory(index) {
  const node = story[index];
  currentIndex = index;
  storyText.textContent = node.text;

  const buttons = document.querySelectorAll(".options button");
  node.options.forEach((opt, i) => {
    buttons[i].textContent = opt;
    buttons[i].style.display = "inline-block";
  });
  for (let i = node.options.length; i < 4; i++) {
    buttons[i].style.display = "none";
  }
  artwork.innerHTML = node.art ? `<img src="${node.art}" alt="scene" style="width:100%;max-height:300px;">` : "";
}

function makeChoice(choiceIndex) {
  const next = story[currentIndex].next[choiceIndex];
  if (next !== -1) renderStory(next);
}

renderStory(0);