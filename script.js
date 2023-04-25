var canvasId = "gameCanvas"; 

var gameCanvas = {
    ctx: null,
    width: null,
    height: null
}

class Enemy {
    constructor (x, y, xDelta, yDelta, radius) {
        this.x = x;
        this.y = y;
        this.xDelta = xDelta;
        this.yDelta = yDelta;
        this.radius = radius;
    }
}

var gameState = {
    player: {
        x: 400,
        y: 300,
        speed: 20,
        radius: 30
    },
    enemies: [],
}

function initRenderEngine() {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");

    gameCanvas.ctx = ctx;
    gameCanvas.width = canvas.width;
    gameCanvas.height = canvas.height;

    console.log(gameCanvas);
}

function drawLine(x1, y1, x2, y2) {
    var ctx = gameCanvas.ctx; 
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();    
}

function drawRect(x, y, width, height) {
    var ctx = gameCanvas.ctx; 
    ctx.strokeRect(x, y, width, height);    
}

function drawCircle(x, y, radius, strokeStyle, fillStyle) {
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

function updatePlayerLocation(direction) {
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

    function checkKey(e) {
        e = e || window.event;
    
        if (e.keyCode == '38') {
            updatePlayerLocation('U');
        }
        else if (e.keyCode == '40') {
            updatePlayerLocation('D');
        }
        else if (e.keyCode == '37') {
            updatePlayerLocation('L');
        }
        else if (e.keyCode == '39') {
            updatePlayerLocation('R');
        }

        e.preventDefault();
        console.log(gameState);
    }
}

function initGameLoop() {
    var fps = 30;
    setInterval(updateScene, 1000 / fps);
}

function initEnemies() {
    var enemyCount = 10 + (Math.random() * 10);

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
    initEnemies();
    initGameLoop();
    initPlayerInput();
}

initGame();