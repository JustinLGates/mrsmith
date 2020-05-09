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
}
//#endregion
//#region initalizing the player and starting the game

/**
 *starts a new game
 */
function play() {
  // event.preventDefault(); add event as param
  // let form = event.target;
  // createPlayer(form.username.value);
  // hide("start-menu");
  // show("game");
  setInterval(() => {
    user.addGold(user.goldPerSecond);
    console.log("gold:" + user.gold);
  }, 1000);
}
play();
class User {
  constructor(name) {
    this.id = 123;
    this.name = name;
    this.gold = 0;
    this.multiplyer = 1;
    this.goldPerSecond = 0.25;
  }
  addGold(bonus = 0) {
    this.gold += bonus + this.multiplyer;
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
  ).innerText = `gold per second: ${Math.floor(user.goldPerSecond)
    .toFixed(0)
    .toString()}`;
}
drawGoldCounter();

function clickImg() {
  user.addGold(1);
  drawGoldCounter();
}

function upGoldPerSecond(cost, amount) {
  user.gold -= cost;
  user.goldPerSecond += amount;
}

function upgradeClicks(cost, clicksToAdd) {
  user.gold -= cost;
  user.multiplyer += clicksToAdd;
}
