const canGame = document.querySelector("canvas")
const ctx = canGame.getContext("2d")
const startBtn = document.querySelector("#start");

document.addEventListener("keybown",keyDown);
document.addEventListener("click",run)

const tileCount=20;
const tileSize=18;
const MaxY = 400;
const MaxX = 800;
const speed = 7;

let SnakeX =1;
let SnakeY = 1;

let VelX =1;
let VelY=0;

function clearScreen(){
    ctx.fillStyle="green"
    ctx.fillRect(0,0,MaxX, MaxY)
}

function drawSnake(){
    ctx.fillStyle = "orange"
    ctx.fillRect(1 *tileCount ,1 * tileCount,2 * tileSize,2 * tileSize)
}

function run(){
    console.log("runiong")

    SnakeX += VelX;
    SnakeY += VelY;

    setTimeout(run, 1000/speed)
}


clearScreen()
drawSnake()




function keyDown(event){

    if(event.keyCode==38){
        VelY=-1;
        VelX=0;

    }

    if(event.keyCode==40){
        VelY=1;
        VelX=0;
    }

    if(event.keyCode==37){
        VelY=0;
        VelX=-1;
    }
    if(event.keyCode==39){
        VelY=0;
        VelX=1;
    }


}