//#region User interface manipulation

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
  createPlayer(form.username.value);
  hide("start-menu");
  show("game");
  setRewardInterval();
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
    this.goldPerSecond = 0.25;
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

const player = {};
//todo remove this before relasing game it is to make a player

/**
 * creates a new player
 * @param {string} username
 */

const user = new User("");
function createPlayer(username) {
  user.name = username;
  drawGoldCounter();
}
createPlayer("justin");
// function drawUserName(username) {
//   document.getElementById("name-display").innerText = username;
// }
function drawGoldCounter() {
  document.getElementById("gold").innerText = `Gold: ${Math.floor(user.gold)
    .toFixed(0)
    .toString()}`;
  document.getElementById(
    "gold-per-second"
  ).innerText = `gold per second: ${user.goldPerSecond.toFixed(2).toString()}`;
}
drawGoldCounter();

function clickImg() {
  user.addGoldOnClick();
}

function upGoldPerSecond(cost, amount) {
  user.gold -= cost;
  user.goldPerSecond += amount;
}

function upgradeGoldPerSec(id) {
  blacksmiths.find((bs) => {
    if (bs.id === id) {
      upGoldPerSecond(bs.upgradeCost, bs.upgrade);
      drawGoldCounter();
      drawHireOptions();
    }
  });
}
function upClickPower(cost, amountToAdd) {
  user.gold -= cost;
  user.clickPower += amountToAdd;
}
function upgradeClickPower(id) {
  upgrades.find((t) => {
    if (t.id === id) {
      upClickPower(t.upgradeCost, t.upgrade);
      drawGoldCounter();
      drawUpgradeOptions();
    }
  });
}
var audio;
function playHammerSound() {
  audio = document.getElementById("hammer1");

  audio.play();
}
class Tool {
  constructor(id, upgradeCost, upgrade, icon, name) {
    this.id = id;
    this.upgradeCost = upgradeCost;
    this.upgrade = upgrade;
    this.icon = icon;
    this.name = name;
  }
}
class Blacksmith {
  constructor(id, upgradeCost, upgrade, icon, name) {
    this.id = id;
    this.upgradeCost = upgradeCost;
    this.upgrade = upgrade;
    this.icon = icon;
    this.name = name;
  }
}
let blacksmiths = [];
let upgrades = [];
function createUpgrades() {
  let blacksmithApprentice = new Blacksmith(
    1234,
    100,
    1,
    "fa-burn",
    "apprentice"
  );
  let blacksmithJournyman = new Blacksmith(
    152345,
    200,
    3,
    "fa-burn",
    "journyman"
  );
  let blacksmithMaster = new Blacksmith(172364, 300, 5, "fa-burn", "master");
  blacksmiths.push(blacksmithApprentice);
  blacksmiths.push(blacksmithJournyman);
  blacksmiths.push(blacksmithMaster);
  let hammer = new Tool(9877, 25, 1, "fa-hammer", "Hammer");
  let anvil = new Tool(8897765, 500, 4, "fa-archive", "anvil");
  let forge = new Tool(22153, 7500, 10, "fa-burn", "forge");
  upgrades.push(hammer);
  upgrades.push(anvil);
  upgrades.push(forge);
}
createUpgrades();
function drawUpgradeOptions() {
  let template = "";
  upgrades.forEach((u) => {
    if (user.gold >= u.upgradeCost) {
      template += `<div >
      <div><h1 class=" d-flex justify-content-around align-items-center" ><i class="fas '${u.icon}' text-warning"></i><button onclick="upgradeClickPower(${u.id})"  class=" btn-1 btn btn-success">Upgrade '${u.name}' <br> cost: ${u.upgradeCost} <br> <small> + ${u.upgrade} gold per click!</small> </button></h1></div>
      </div>`;
    } else {
      template += `<div >
      <div><h1 class=" d-flex justify-content-around align-items-center" ><i class="fas '${u.icon}' text-warning"></i><button disabled onclick="upgradeClickPower(${u.id})"  class=" btn-1 btn btn-success">Upgrade '${u.name}' <br> cost: ${u.upgradeCost} <br> <small> + ${u.upgrade} gold per click!</small> </button></h1></div>
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
      <div  ><h1 class=" d-flex justify-content-around align-items-center" ><i class="fas '${bs.icon}' text-warning"></i><button  onclick="upgradeGoldPerSec(${bs.id})" class=" btn-1 btn btn-success">Hire '${bs.name}' <br> cost: ${bs.upgradeCost}<br> <small> + ${bs.upgrade} gold per sec</small> </button></h1></div>
      </div>`;
    } else {
      template += `<div >
    <div  ><h1 class=" d-flex justify-content-around align-items-center" ><i class="fas '${bs.icon}' text-warning"></i><button disabled onclick="upgradeGoldPerSec(${bs.id})" class=" btn-1 btn btn-success">Hire '${bs.name}' <br> cost: ${bs.upgradeCost}<br> <small> + ${bs.upgrade} gold per sec</small> </button></h1></div>
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
