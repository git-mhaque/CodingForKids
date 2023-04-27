import { Enemy } from "./Enemy";
import { GameCanvas } from "./GameCanvas";
import { GameState } from "./GameState";
import { Player } from "./Player";

var canvasId = "gameCanvas"; 

var gameCanvas = new GameCanvas();
var gameState = new GameState();

function initGameState(): void {
    gameState.player = new Player(400, 300, 20, 30);
    gameState.enemies = new Array<Enemy>();
}

function initRenderEngine() {
    var canvas = document.getElementById(canvasId);
 
    // @ts-ignore
    var ctx = canvas?.getContext("2d");
    gameCanvas.ctx = ctx;
    
    // @ts-ignore
    gameCanvas.width = canvas.width; 
    
    // @ts-ignore
    gameCanvas.height = canvas.height;
}

function drawLine(x1: number, y1: number, x2: number, y2: number) {
    var ctx = gameCanvas.ctx; 
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();    
}

function drawRect(x: number, y: number, width: number, height: number) {
    var ctx = gameCanvas.ctx; 
    ctx.strokeRect(x, y, width, height);    
}

function drawCircle(x: number, y: number, radius: number, strokeStyle: string , fillStyle: string) {
    var ctx = gameCanvas.ctx; 
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
    ctx.fillStyle = fillStyle;
    ctx.fill();
}

function clearCanvas() {
    gameCanvas.ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function updateScene() {
    updateEnemyState();
    detectCollision();
    drawScene();
}

function detectCollision() {
    var player = gameState.player; 

    gameState.enemies.forEach(function(enemy) {
        var dist = Math.sqrt(
            Math.pow(player.x - enemy.x, 2) + Math.pow(player.y - enemy.y, 2)   
        );

        if (dist < player.radius + enemy.radius) {
            console.log("Collision Detected");
            return;
        }
    });
}

function updateEnemyState() {
    gameState.enemies.forEach(function (enemy) {
        if (enemy.x + enemy.xDelta + enemy.radius > gameCanvas.width || enemy.x - enemy.radius + enemy.xDelta <= 0) {
            enemy.xDelta *= -1;
        } 

        if (enemy.y + enemy.yDelta + enemy.radius > gameCanvas.height || enemy.y - enemy.radius + enemy.yDelta <= 0) {
            enemy.yDelta *= -1;
        }

        enemy.x += enemy.xDelta;
        enemy.y += enemy.yDelta;
    });    
}

function updatePlayerLocation(direction:string) {
    switch (direction) {
        case "U": 
            gameState.player.y -= gameState.player.speed;
            break; 
        case "D": 
            gameState.player.y += gameState.player.speed;
            break; 
        case "L": 
            gameState.player.x -= gameState.player.speed;
            break; 
        case "R": 
            gameState.player.x += gameState.player.speed;
            break; 
    }
}

function drawScene() {
    clearCanvas();
    drawEnemy();
    drawPlayer();
}

function drawEnemy() {
    gameState.enemies.forEach(function(enemy) {
        drawCircle(enemy.x, enemy.y, enemy.radius, 'black', '#ff0000');
    });
}

function drawPlayer() {
    drawCircle(gameState.player.x, gameState.player.y,  gameState.player.radius, 'black', '#0000ff');
}

function initPlayerInput() {
    document.onkeydown = checkKey;

    function checkKey(e: KeyboardEvent): void {
        switch(e.keyCode) {
            case 38:
                updatePlayerLocation('U');
                break;   
            case 40:
                updatePlayerLocation('D');
                break;   
            case 37:
                updatePlayerLocation('L');
                break;   
            case 39:
                updatePlayerLocation('R');
                break;     
        }
        e.preventDefault();
    }
}

function initGameLoop() {
    var fps = 30;
    setInterval(updateScene, 1000 / fps);
}

function initEnemies() {
    var enemyCount = 10 + (Math.random() * 10);

    var i: number = 0; 
    for (i = 0; i < enemyCount; i++) {
        var enemy = new Enemy();
        enemy.radius = 20 + (Math.random() * 10);
        enemy.x = enemy.radius + Math.random() * (gameCanvas.width - enemy.radius * 2);    
        enemy.y = enemy.radius + Math.random() * (gameCanvas.height - enemy.radius * 2);     
        enemy.xDelta = Math.random() > 0.5 ? 1 : -1;
        enemy.yDelta = Math.random() > 0.5 ? 1 : -1;
        gameState.enemies.push(enemy);
    }
}

function initGame() {
    initRenderEngine();
    initGameState();
    initEnemies();
    initGameLoop();
    initPlayerInput();
}

initGame();