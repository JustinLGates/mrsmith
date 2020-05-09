//#region User interface manipulation

function drawGold() {}

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
function play(event) {
  event.preventDefault();
  let form = event.target;
  createPlayer(form.username.value);
  hide("start-menu");
  show("game");
}
class User {
  constructor(name) {
    this.id = 123;
    this.name = name;
  }
}
//todo remove this before relasing game it is to make a player

/**
 * creates a new player
 * @param {string} username
 */
function createPlayer(username) {
  let user = new User(username);
  drawUserName(user.name);
}
function drawUserName(username) {
  document.getElementById("name-display").innerText = username;
}
