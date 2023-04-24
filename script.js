var canvasId = "gameCanvas"; 

var gameCanvas = {
    ctx: null,
    width: null,
    height: null
}

var gameState = {
    player: {
        x: 400,
        y: 300,
        speed: 20,
        radius: 30
    },
    enemies: [
        {x: 100, y: 100, xDelta: 1, yDelta: 1, speed: 20},  
        {x: 200, y: 100, xDelta: -1, yDelta: 1, speed: 20},   
        {x: 100, y: 300, xDelta: 1, yDelta: -1, speed: 20},   
        {x: 200, y: 300, xDelta: -1, yDelta: -1, speed: 20}, 
        {x: 100, y: 100, xDelta: 1, yDelta: 1, speed: 20},  
        {x: 200, y: 100, xDelta: -1, yDelta: 1, speed: 20},   
        {x: 100, y: 300, xDelta: 1, yDelta: -1, speed: 20},   
        {x: 200, y: 300, xDelta: -1, yDelta: -1, speed: 20}, 
        {x: 100, y: 100, xDelta: 1, yDelta: 1, speed: 20},  
        {x: 200, y: 100, xDelta: -1, yDelta: 1, speed: 20},   
        {x: 100, y: 300, xDelta: 1, yDelta: -1, speed: 20},   
        {x: 200, y: 300, xDelta: -1, yDelta: -1, speed: 20}, 
        {x: 100, y: 100, xDelta: 1, yDelta: 1, speed: 20},  
        {x: 200, y: 100, xDelta: -1, yDelta: 1, speed: 20},   
        {x: 100, y: 300, xDelta: 1, yDelta: -1, speed: 20},   
        {x: 200, y: 300, xDelta: -1, yDelta: -1, speed: 20},              
    ],
    enemyRadius: 30
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
    drawScene();
}

function updateEnemyState() {
    var enemyRadius = gameState.enemyRadius;
    
    for(var i = 0; i < gameState.enemies.length; i++) {
        var xCur = gameState.enemies[i].x; 
        var yCur = gameState.enemies[i].y; 
        
        var xDeltaCur = gameState.enemies[i].xDelta; 
        var yDeltaCur = gameState.enemies[i].yDelta; 
        
        var xDeltaNew = xDeltaCur; 
        var yDeltaNew = yDeltaCur; 

        if (xCur + xDeltaCur + enemyRadius > gameCanvas.width || xCur - enemyRadius + xDeltaCur <= 0) {
            xDeltaNew *= -1;
        } 

        if (yCur + yDeltaCur + enemyRadius > gameCanvas.height || yCur - enemyRadius + yDeltaCur <= 0) {
            yDeltaNew *= -1;
        }

        var xNew = xCur + xDeltaNew;
        var yNew = yCur + yDeltaNew;
    
        gameState.enemies[i].x = xNew;
        gameState.enemies[i].y = yNew;
        gameState.enemies[i].xDelta = xDeltaNew;
        gameState.enemies[i].yDelta = yDeltaNew;
    }    
}

function updatePlayerState(direction) {
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
    var enemyRadius = gameState.enemyRadius;
    
    for(var i = 0; i < gameState.enemies.length; i++) {
        var x = gameState.enemies[i].x; 
        var y = gameState.enemies[i].y;

        drawCircle(x, y, enemyRadius, 'black', '#ff0000');
    }
}

function drawPlayer() {
    drawCircle(gameState.player.x, gameState.player.y,  gameState.player.radius, 'black', '#0000ff');
}

function initPlayerInput() {
    document.onkeydown = checkKey;

    function checkKey(e) {
    
        e = e || window.event;
    
        if (e.keyCode == '38') {
            updatePlayerState('U');
        }
        else if (e.keyCode == '40') {
            updatePlayerState('D');
        }
        else if (e.keyCode == '37') {
            updatePlayerState('L');
        }
        else if (e.keyCode == '39') {
            updatePlayerState('R');
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
    gameState.enemies.forEach(function(enemy){
        enemy.x = Math.random() * gameCanvas.width - gameState.enemyRadius * 2.5;    
        enemy.y = Math.random() * gameCanvas.height - gameState.enemyRadius * 2.5;     
    });
}

function initGame() {
    initRenderEngine();
    
    initEnemies();
    
    initGameLoop();
    initPlayerInput();
}


initGame();