//#region User interface manipulation
let blacksmiths = [];
let upgrades = [];
/**
 * takes an element name and adds hidden class to argument
 * must be an elements id
 * @param {string} elementName
 */
function hide(elementName) {
  document.getElementById(elementName).classList.add("hidden");
}
/**
 * removes the hidden class from the argument
 * must be an elements id
 * @param {string} elementToShow
 *
 */
function show(elementToShow) {
  document.getElementById(elementToShow).classList.remove("hidden");
  if (elementToShow === "upgrades") {
    hide("hire-help");
  } else if (elementToShow === "hire-help") {
    hide("upgrades");
  }
  refreshOptions();
}
//#endregion
//#region initalizing the player and starting the game

/**
 *starts a new game
 */
function play(event) {
  event.preventDefault();
  let form = event.target;
  //check if player has player
  loadGame(form.username.value);
  hide("start-menu");
  show("game");
  setRewardInterval();
  saveGameIntervel();
}
function saveGameIntervel() {
  setInterval(() => {
    saveGame();
  }, 5000);
}
function setRewardInterval(rewardInterval = 1000) {
  setInterval(() => {
    user.addGoldAuto();
  }, rewardInterval);
}
class User {
  constructor(name) {
    this.id = 123;
    this.name = name;
    this.gold = 0;
    this.clickPower = 1;
    this.goldPerSecond = 0.0;
    this.tools = [];
    this.workers = [];
  }
  addGoldOnClick() {
    this.gold += this.clickPower;
    playHammerSound();
    drawGoldCounter();
  }
  addGoldAuto() {
    this.gold += this.goldPerSecond;
    drawGoldCounter();
  }
}

//todo remove this before relasing game it is to make a player

/**
 * creates a new player
 * @param {string} username
 */

let user = new User("");
console.log(user);

function createPlayer(username) {
  user.name = username;
  user.tools = upgrades;
  user.workers = blacksmiths;

  saveGame();
  drawGoldCounter();
}

// function drawUserName(username) {
//   document.getElementById("name-display").innerText = username;
// }
function drawGoldCounter() {
  document.getElementById("gold").innerText = `Gold: ${Math.floor(user.gold)
    .toFixed(2)
    .toString()}`;
  document.getElementById(
    "gold-per-second"
  ).innerText = `gold per second: ${user.goldPerSecond.toFixed(2).toString()}`;
}
drawGoldCounter();

function clickImg() {
  user.addGoldOnClick();

  document.getElementById("hammer").classList.add("fa-spin");
  playHammerSound();
  setTimeout(() => {
    document.getElementById("hammer").classList.remove("fa-spin");
  }, 400);
}

function upGoldPerSecond(cost, amount) {
  user.gold -= cost;
  user.goldPerSecond += amount;
}

function upgradeGoldPerSec(id) {
  blacksmiths.find((bs) => {
    if (bs.id === id) {
      upGoldPerSecond(bs.upgradeCost, bs.upgrade);
      increaseCostHire(bs.id);
      drawGoldCounter();
      drawHireOptions();
    }
  });
  user.workers = blacksmiths;
  saveGame();
}
function upClickPower(cost, amountToAdd) {
  user.gold -= cost;
  user.clickPower += amountToAdd;
}
function upgradeClickPower(id) {
  upgrades.find((t) => {
    if (t.id === id) {
      upClickPower(t.upgradeCost, t.upgrade);
      increaseCostTool(t.id);
      drawGoldCounter();
      drawUpgradeOptions();
    }
  });
  user.tools = upgrades;
  saveGame();
  console.log(user.tools);
}
var audio;

function playHammerSound() {
  audio = document.getElementById("hammer1");
  audio.play();
}
class Tool {
  constructor(id, upgradeCost, upgrade, icon, name, baseCost, baseUpgrade) {
    this.id = id;
    this.upgradeCost = upgradeCost;
    this.upgrade = upgrade;
    this.icon = icon;
    this.name = name;
    this.baseCost = baseCost;
    this.baseUpgrade = baseUpgrade;
  }
}
class Blacksmith {
  constructor(id, upgradeCost, upgrade, icon, name, baseCost, baseUpgrade) {
    this.id = id;
    this.upgradeCost = upgradeCost;
    this.upgrade = upgrade;
    this.icon = icon;
    this.name = name;
    this.baseCost = baseCost;
    this.baseUpgrade = baseUpgrade;
  }
}

function createUpgrades() {
  let blacksmithApprentice = new Blacksmith(
    1234,
    250,
    0.25,
    "fa-baby",
    "apprentice",
    50,
    0.25
  );
  let blacksmithJournyman = new Blacksmith(
    152345,
    500,
    0.5,
    "fa-user-tie",
    "journyman",
    100,
    0.5
  );
  let blacksmithMaster = new Blacksmith(
    150034,
    1000,
    1,
    "fa-user-ninja",
    "master",
    250,
    1
  );
  blacksmiths.push(blacksmithApprentice);
  blacksmiths.push(blacksmithJournyman);
  blacksmiths.push(blacksmithMaster);
  let hammer = new Tool(9877, 25, 0.25, "fa-hammer", "Hammer", 12, 0.25);
  let anvil = new Tool(8897765, 100, 1, "fa-archive", "anvil", 50, 0.5);
  let forge = new Tool(22153, 1000, 5, "fa-burn", "forge", 500, 1);
  upgrades.push(hammer);
  upgrades.push(anvil);
  upgrades.push(forge);
}

function drawUpgradeOptions() {
  let template = "";
  upgrades.forEach((u) => {
    if (user.gold >= u.upgradeCost) {
      template += `<div >
      <div><h1 class=" d-flex justify-content-around align-items-center" ><i class="fas ${u.icon} text-warning"></i><button onclick="upgradeClickPower(${u.id})"  class=" btn-1 btn btn-success">Upgrade '${u.name}' <br> cost: ${u.upgradeCost} <br> <small> + ${u.upgrade} gold per click!</small> </button></h1></div>
      </div>`;
    } else {
      template += `<div >
      <div><h1 class=" d-flex justify-content-around align-items-center" ><i class="fas ${u.icon} text-warning"></i><button disabled onclick="upgradeClickPower(${u.id})"  class=" btn-1 btn btn-success">Upgrade '${u.name}' <br> cost: ${u.upgradeCost} <br> <small> + ${u.upgrade} gold per click!</small> </button></h1></div>
      </div>`;
    }
  });
  document.getElementById("ugb").innerHTML = template;
}

function drawHireOptions() {
  let template = "";
  blacksmiths.forEach((bs) => {
    if (user.gold >= bs.upgradeCost) {
      template += `<div >
      <div  ><h1 class=" d-flex justify-content-around align-items-center" ><i class="fas ${bs.icon} text-warning"></i><button  onclick="upgradeGoldPerSec(${bs.id})" class=" btn-1 btn btn-success">Hire '${bs.name}' <br> cost: ${bs.upgradeCost}<br> <small> + ${bs.upgrade} gold per sec</small> </button></h1></div>
      </div>`;
    } else {
      template += `<div >
    <div  ><h1 class=" d-flex justify-content-around align-items-center" ><i class="fas ${bs.icon} text-warning"></i><button disabled onclick="upgradeGoldPerSec(${bs.id})" class=" btn-1 btn btn-success">Hire '${bs.name}' <br> cost: ${bs.upgradeCost}<br> <small> + ${bs.upgrade} gold per sec</small> </button></h1></div>
  </div>`;
    }
  });
  document.getElementById("hb").innerHTML = template;
}
//todo add some logic to prevent err buying tons needs to update gold amt for display and make
//sure that the button is redrawn on each click
function refreshOptions() {
  drawUpgradeOptions();
  drawHireOptions();
}

function saveGame() {
  window.localStorage.setItem(user.name, JSON.stringify(user));
  //todo add saving tools and smiths
}

function loadGame(username) {
  //todo add loading tools and smiths will need to change where they are created
  let gameData = window.localStorage.getItem(username);

  if (gameData) {
    user.name = JSON.parse(gameData).name;
    user.id = JSON.parse(gameData).id;
    user.gold = JSON.parse(gameData).gold;
    user.goldPerSecond = JSON.parse(gameData).goldPerSecond;
    upgrades = JSON.parse(gameData).tools;
    blacksmiths = JSON.parse(gameData).workers;

    drawGoldCounter();
  } else {
    createUpgrades();
    createPlayer(username);
  }
}

function increaseCostTool(id) {
  upgrades.find((tool) => {
    if (tool.id === id) {
      tool.upgradeCost += tool.baseCost;
      tool.upgrade += tool.baseUpgrade;
    }
  });
}
function increaseCostHire(id) {
  blacksmiths.find((smith) => {
    if (smith.id === id) {
      smith.upgradeCost += smith.baseCost;
      smith.upgrade += smith.baseUpgrade;
    }
  });
}
