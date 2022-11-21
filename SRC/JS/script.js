const canGame = document.querySelector("canvas")
const ctx = canGame.getContext("2d")
const startBtn = document.querySelector("#start");

document.addEventListener("keydown",keyDown);
document.addEventListener("click",run)


const MaxY = 600;
const MaxX = 600;
const speed = 7;
const tileCount=20;
const tileSize=MaxX/tileCount;

let SnakeX =1;
let SnakeY = 1;

let VelX =1;
let VelY=0;

class Apple{
    constructor(x, y){
        this.x=x;
        this.y=y;
    }
} 

let lost = false
let apples = [new Apple( 5,5)]
let Score =0




function clearScreen(){
    ctx.fillStyle="green"
    ctx.fillRect(0,0,MaxX, MaxY)
}

function drawSnake(){
    ctx.fillStyle = "orange"
    ctx.fillRect(SnakeX *tileCount ,SnakeY * tileCount,2 * tileSize,2 * tileSize)
}

function drawFood(){
    apples.forEach(e => {
        ctx.fillStyle = "red"
    ctx.fillRect(e.x *tileCount ,e.y * tileCount,2 * tileSize,2 * tileSize)
        
    });
}

function checkCollison(){
    // food

    apples.forEach(e => {
        if (e.x == SnakeX && e.y == SnakeY ){
            apples.pop(e)
            console.log("food eated")
            Score ++;
            apples.push(new Apple(Math.floor(Math.random()*tileCount),Math.floor(Math.random()*tileCount)))
        }
        
    });

    //eadge
}

function run(){
    if (lost){ return }
    

    SnakeX += VelX;
    SnakeY += VelY;

    clearScreen();
    checkCollison();
    drawFood();
    drawSnake();
    setTimeout(run, 1000/speed)
}


clearScreen()
drawSnake()




function keyDown(event){
    console.log("key down")
    if(event.keyCode==38){
        if(VelY == 1){return}
        VelY=-1;
        VelX=0;

    }

    if(event.keyCode==40){
        if(VelY == -1){return}
        VelY=1;
        VelX=0;
    }

    if(event.keyCode==37){
        if(VelX == 1){return}
        VelY=0;
        VelX=-1;
    }
    if(event.keyCode==39){
        if(VelX == -1){return}
        VelY=0;
        VelX=1;
    }


}