const canGame = document.querySelector("canvas");
const ctx = canGame.getContext("2d");
const startBtn = document.querySelector("#start");

document.addEventListener("keydown", keyDown);
document.addEventListener("click", run);

const MaxY = 600;
const MaxX = 600;
const speed = 7;
const tileCount = 20;
const tileSize = 10; //MaxX/tileCount;

let SnakeX = 1;
let SnakeY = 1;

let VelX = 1;
let VelY = 0;

const Parts = [];
let snakeLenght = 2;

class snakeParts {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Apple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let lost = false;
let apples = [new Apple(5, 5)];
let score = 0;

// lien vers tuto https://www.section.io/engineering-education/how-to-build-a-snake-game-with-javascript/
function clearScreen() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, MaxX, MaxY);
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "17px Arial";
  ctx.fillText("Score: " + score, canGame.clientWidth - 75, 24);
}

function drawSnake() {
  ctx.fillStyle = "orange";
  for (let i = 0; i < Parts.length; i++) {
    let part = Parts[i];
    ctx.fillRect(
      SnakeX * tileCount,
      SnakeY * tileCount,
      2 * tileSize,
      2 * tileSize
    );
  }
  Parts.push(new snakeParts(SnakeX, SnakeY));
}

function drawFood() {
  apples.forEach((e) => {
    ctx.fillStyle = "red";
    ctx.fillRect(e.x * tileCount, e.y * tileCount, 2 * tileSize, 2 * tileSize);
  });
}

function checkCollison() {
  // food

  apples.forEach((e) => {
    if (e.x == SnakeX && e.y == SnakeY) {
      apples.pop(e);
      console.log("food");
      score++;
      apples.push(
        new Apple(
          Math.floor(Math.random() * tileCount),
          Math.floor(Math.random() * tileCount)
        )
      );
    }
  });

  //eadge
}

function checkOutside() {
  if (
    SnakeX < 0 ||
    SnakeX > tileCount + tileSize ||
    SnakeY < 0 ||
    SnakeY > tileCount + tileSize
  ) {
    console.log("out");
    return true;
  }
}

function run() {
  if (lost) {
    location.reload();
  }

  SnakeX += VelX;
  SnakeY += VelY;

  clearScreen();
  checkCollison();

  lost = checkOutside();
  console.log(lost);
  drawFood();
  drawSnake();
  drawScore();
  console.log(snakeParts);
  console.log(SnakeX, " ", SnakeY);
  setTimeout(run, 1000 / speed);
}

clearScreen();
drawSnake();

function keyDown(event) {
  if (event.keyCode == 38) {
    if (VelY == 1) {
      return;
    }
    VelY = -1;
    VelX = 0;
  }

  if (event.keyCode == 40) {
    if (VelY == -1) {
      return;
    }
    VelY = 1;
    VelX = 0;
  }

  if (event.keyCode == 37) {
    if (VelX == 1) {
      return;
    }
    VelY = 0;
    VelX = -1;
  }
  if (event.keyCode == 39) {
    if (VelX == -1) {
      return;
    }
    VelY = 0;
    VelX = 1;
  }
}
