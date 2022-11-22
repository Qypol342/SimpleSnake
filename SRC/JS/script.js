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

const Parts = [new snakeParts(SnakeX, SnakeY)];

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
      part.x * tileCount,
      part.y * tileCount,
      2 * tileSize,
      2 * tileSize
    );
  }
}

function drawFood() {
  apples.forEach((e) => {
    ctx.fillStyle = "red";
    ctx.fillRect(e.x * tileCount, e.y * tileCount, 2 * tileSize, 2 * tileSize);
  });
}

function addSnakePart() {
  if (VelX == 1) {
    Parts.push(
      new snakeParts(Parts[Parts.length - 1].x - 1, Parts[Parts.length - 1].y)
    );
  } else if (VelX == -1) {
    Parts.push(
      new snakeParts(Parts[Parts.length - 1].x + 1, Parts[Parts.length - 1].y)
    );
  } else if (VelY == 1) {
    Parts.push(
      new snakeParts(Parts[Parts.length - 1].x, Parts[Parts.length - 1].y - 1)
    );
  } else if (VelY == -1) {
    Parts.push(
      new snakeParts(Parts[Parts.length - 1].x, Parts[Parts.length - 1].y + 1)
    );
  }
}
function checkCollison() {
  // food

  apples.forEach((e) => {
    if (e.x == Parts[0].x && e.y == Parts[0].y) {
      apples.pop(e);
      console.log("food");
      score++;
      addSnakePart();
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
    Parts[0].x < 0 ||
    Parts[0].x > tileCount + tileSize ||
    Parts[0].y < 0 ||
    Parts[0].y > tileCount + tileSize
  ) {
    console.log("out");
    return true;
  }
}

function moveSnake() {
  for (let i = 0; i < Parts.length; i++) {
    Parts[i].x += VelX;
    Parts[i].y += VelY;
  }
}

function run() {
  if (lost) {
    location.reload();
  }
  console.log(VelX, VelY);
  moveSnake();

  clearScreen();
  checkCollison();

  lost = checkOutside();
  drawFood();
  drawSnake();
  drawScore();
  console.log(Parts);
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
