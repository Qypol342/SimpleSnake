class SnakePart {
  /**
   * Creates a new snake part.
   *
   * @constructor
   * @this {snakePart}
   * @param {number} x - X coordinate of the snake part.
   * @param {number} y - Y coordinate of the snake part.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Apple {
  /**
   * Creates an instance of Apple.
   *
   * @constructor
   * @this {Apple}
   * @param {number} x - X coordinate of the apple.
   * @param {number} y - Y coordinate of the apple.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Wall {
  /**
   * Creates an instance of wall.
   *
   * @constructor
   * @this {Wall}
   * @param {number} x - X coordinate of the wall.
   * @param {number} y - Y coordinate of the wall.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const canGame = document.querySelector("canvas");
const ctx = canGame.getContext("2d");
const startBtn = document.querySelector("#start");

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

let MaxY = 600;
let MaxX = 600;

canGame.width = MaxX;
canGame.height = MaxY;

const speed = 10;
let tileCount = 20;
let tileSize = 10;

let SnakeX = 1;
let SnakeY = 1;

let VelX = 1;
let VelY = 0;

let parts = [];
let apples = [];
let walls = [];

let score = 0;
let lost = false;
let MODE = "MENU";
let LEVEL_SEL = 0;
const LEVEL_LIST = ["1", "2", "3", "4", "5"];
let delai = 0;

/**
 * Function to load the json level file
 *
 * @param {number} id The json level file id.
 * @returns {object} The json level file.
 */
async function loadLevel(id) {
  let reponse = await fetch("./SRC/LEVEL/" + id + ".json");
  let json = await reponse.json();
  return json;
}

/**
 *
 * Function to draw the menu selector
 *
 */
function drawMenu() {
  clearScreen();

  ctx.fillStyle = "white";
  ctx.font = "17px Arial";
  ctx.fillText("Press Enter to select Level", 10, 20);
}

/**
 *
 * Functio to draw the level selector
 *
 */
function drawLevel() {
  clearScreen();
  let pointer = "";
  for (var i = LEVEL_LIST.length - 1; i >= 0; i--) {
    ctx.fillStyle = "white";
    pointer = "   ";
    if (i == LEVEL_SEL) {
      ctx.fillStyle = "orange";
      pointer = "> ";
    }
    ctx.font = "17px Arial";
    ctx.fillText(pointer + "Level " + LEVEL_LIST[i], 10, 20 + 20 * i);
  }
}

/**
 *
 * Function to draw the scoreboard
 */
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "17px Arial";
  ctx.fillText("Score: " + score, canGame.clientWidth - 75, 24);
}

/**
 *
 * Function to clear the screen and draw the background
 *
 */
function clearScreen() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, MaxX, MaxY);
}

/**
 *
 * Function to draw the snake parts in the game
 *
 */
function drawSnake() {
  for (let i = 0; i < parts.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "orangered";
    } else {
      ctx.fillStyle = "orange";
    }
    let part = parts[i];
    ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
  }
}

/**
 *
 * Function to draw the apples in the game
 *
 */
function drawFood() {
  apples.forEach((e) => {
    ctx.fillStyle = "red";
    ctx.fillRect(e.x * tileSize, e.y * tileSize, tileSize, tileSize);
  });
}

/**
 *
 * Function to draw the walls on the game map
 *
 */
function drawWall() {
  walls.forEach((e) => {
    ctx.fillStyle = "grey";
    ctx.fillRect(e.x * tileSize, e.y * tileSize, tileSize, tileSize);
  });
}

/**
 *
 * Function to add a new snake part at the end of the snake queue
 *
 */
function addSnakePart() {
  if (VelX == 1) {
    parts.push(
      new SnakePart(parts[parts.length - 1].x - 1, parts[parts.length - 1].y)
    );
  } else if (VelX == -1) {
    parts.push(
      new SnakePart(parts[parts.length - 1].x + 1, parts[parts.length - 1].y)
    );
  } else if (VelY == 1) {
    parts.push(
      new SnakePart(parts[parts.length - 1].x, parts[parts.length - 1].y - 1)
    );
  } else if (VelY == -1) {
    parts.push(
      new SnakePart(parts[parts.length - 1].x, parts[parts.length - 1].y + 1)
    );
  }
}

/**
 *
 * Function to check if the snake is eating an apple,
 * if yes, add a new snake part and remove the apple and add a new one
 *
 */
function checkSnakeEat() {
  apples.forEach((e) => {
    if (e.x == parts[0].x && e.y == parts[0].y) {
      apples.pop(e);
      score++;
      addSnakePart();
      apples.push(
        new Apple(
          Math.floor(Math.random() * (MaxX / tileSize)),
          Math.floor(Math.random() * (MaxY / tileSize))
        )
      );
    }
  });
}

/**
 *
 * Function to check if the snake is going out of the map
 *
 * @returns {boolean} True if the snake is out of the map, false otherwise
 */
function checkOutside() {
  if (
    parts[0].x < 0 ||
    parts[0].x > MaxX / tileSize - 1 ||
    parts[0].y < 0 ||
    parts[0].y > MaxY / tileSize - 1
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 *
 * Function to check if the snake is going to hit himself
 *
 * @returns {boolean} True if the snake is going to hit himself, false otherwise
 */
function checkHimselfCollision() {
  for (let i = 1; i < parts.length; i++) {
    if (parts[0].x == parts[i].x && parts[0].y == parts[i].y) {
      return true;
    }
  }
  return false;
}

/**
 *
 * Function to check if the snake is going to hit a wall
 *
 * @returns {boolean} True if the snake is going to hit a wall, false otherwise
 */
function checkWallCollision() {
  for (let i = 0; i < walls.length; i++) {
    if (parts[0].x == walls[i].x && parts[0].y == walls[i].y) {
      return true;
    }
  }
  return false;
}

/**
 *
 * Function to move the snake in the game map following the direction
 *
 */
function moveSnake() {
  for (let i = parts.length - 1; i > 0; i--) {
    parts[i].x = parts[i - 1].x;
    parts[i].y = parts[i - 1].y;
  }
  parts[0].x += VelX;
  parts[0].y += VelY;
}

/**
 *
 * Function init the game and his components
 *
 * @param {number} level The level id to init
 */
async function startGame(level) {
  MODE = "GAME";
  let lev = await loadLevel(level);

  VelX = 1;
  VelY = 0;

  parts = [];

  lost = false;
  apples = [];
  walls = [];
  score = 0;

  for (var i = lev["food"].length - 1; i >= 0; i--) {
    apples.push(new Apple(lev["food"][i][0], lev["food"][i][1]));
  }
  for (var i = lev["walls"].length - 1; i >= 0; i--) {
    walls.push(new Wall(lev["walls"][i][0], lev["walls"][i][1]));
  }

  for (var i = 0; i < lev["snake"].length; i++) {
    parts.push(new SnakePart(lev["snake"][i][0], lev["snake"][i][1]));
  }

  delai = lev["delay"];

  tileCount = lev["dimensions"][0];

  canGame.width = tileSize * lev["dimensions"][0];
  canGame.height = tileSize * lev["dimensions"][1];

  MaxX = tileSize * lev["dimensions"][0];
  MaxY = tileSize * lev["dimensions"][1];

  clearScreen();
  drawFood();
  drawWall();
  drawSnake();
  drawScore();
  setTimeout(run, delai);
}

/**
 *
 * Function to run the game motor
 *
 */
function run() {
  moveSnake();

  if (checkOutside() || checkHimselfCollision() || checkWallCollision()) {
    MODE = "MENU";
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("NOOB !", canGame.width / 2.75, canGame.height / 2);
    setTimeout(drawMenu, 5000);
  } else {
    clearScreen();
    checkSnakeEat();

    drawFood();
    drawWall();
    drawSnake();
    drawScore();

    setTimeout(run, 1000 / speed);
  }
}

/**
 *
 * Function to change the direction of the snake when a key is pressed
 *
 * @param {KeyboardEvent} event The keyboard event
 */
function keyDown(event) {
  if (MODE == "GAME") {
    if (event.keyCode == 38) {
      if (VelY == 1) {
        return;
      }
      VelY = -1;
      VelX = 0;
    } else if (event.keyCode == 40) {
      if (VelY == -1) {
        return;
      }
      VelY = 1;
      VelX = 0;
    } else if (event.keyCode == 37) {
      if (VelX == 1) {
        return;
      }
      VelY = 0;
      VelX = -1;
    } else if (event.keyCode == 39) {
      if (VelX == -1) {
        return;
      }
      VelY = 0;
      VelX = 1;
    }
  }
}

/**
 *
 * Function to select a level when a key is pressed in the menu
 *
 * @param {KeyboardEvent} event The keyboard event
 */
function keyUp(event) {
  if (MODE == "LEVEL") {
    if (event.keyCode == 40) {
      LEVEL_SEL = Math.min(LEVEL_LIST.length, LEVEL_SEL + 1);
      clearScreen();
      drawLevel();
    }
    if (event.keyCode == 38) {
      LEVEL_SEL = Math.max(0, LEVEL_SEL - 1);
      clearScreen();
      drawLevel();
    }
    if (event.keyCode == 13) {
      MODE = "GAME";
      clearScreen();
      startGame(LEVEL_SEL + 1);
    }
  }
  if (MODE == "MENU") {
    if (event.keyCode == 13) {
      MODE = "LEVEL";
      clearScreen();
      drawLevel();
    }
  }
}

clearScreen();
drawMenu();
