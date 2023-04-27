import { Enemy } from "./Enemy";
import { GameCanvas } from "./GameCanvas";
import { GameState } from "./GameState";
import { Player } from "./Player";
import { RenderingEngine } from "./RenderingEngine";

class MyGame {
    canvasId: string = "gameCanvas";
    gameCanvas: GameCanvas;
    renderer: RenderingEngine;
    gameState: GameState;

    constructor() {
        this.gameCanvas = new GameCanvas(this.canvasId);
        this.renderer = new RenderingEngine(this.gameCanvas);

        this.gameState = new GameState();
        this.gameState.player = new Player(400, 300, 20, 30);
        this.gameState.enemies = new Array<Enemy>();

        this.initEnemies();
        this.initGameLoop(this);
        this.initPlayerInput(this);
    }

    detectCollision(): void {
        var player = this.gameState.player;

        this.gameState.enemies.forEach(function (enemy) {
            var dist = Math.sqrt(
                Math.pow(player.x - enemy.x, 2) + Math.pow(player.y - enemy.y, 2)
            );

            if (dist < player.radius + enemy.radius) {
                console.log("Collision Detected");
                return;
            }
        });
    }

    updateEnemyState(o: MyGame): void {
        o.gameState.enemies.forEach(function (enemy) {
            if (enemy.x + enemy.xDelta + enemy.radius > o.gameCanvas.width || enemy.x - enemy.radius + enemy.xDelta <= 0) {
                enemy.xDelta *= -1;
            }
    
            if (enemy.y + enemy.yDelta + enemy.radius > o.gameCanvas.height || enemy.y - enemy.radius + enemy.yDelta <= 0) {
                enemy.yDelta *= -1;
            }
    
            enemy.x += enemy.xDelta;
            enemy.y += enemy.yDelta;
        });
    }

    updatePlayerLocation(direction: string): void {
        switch (direction) {
            case "U":
                this.gameState.player.y -= this.gameState.player.speed;
                break;
            case "D":
                this.gameState.player.y += this.gameState.player.speed;
                break;
            case "L":
                this.gameState.player.x -= this.gameState.player.speed;
                break;
            case "R":
                this.gameState.player.x += this.gameState.player.speed;
                break;
        }
    }

    drawScene(o: MyGame): void {
        o.renderer.clearCanvas();
        o.drawEnemy(o);
        o.drawPlayer(o);
    }

    drawEnemy(o: MyGame): void {
        o.gameState.enemies.forEach(function (enemy) {
            o.renderer.drawCircle(enemy.x, enemy.y, enemy.radius, 'black', '#ff0000');
        });
    }

    drawPlayer(o: MyGame): void {
        o.renderer.drawCircle(o.gameState.player.x, o.gameState.player.y, o.gameState.player.radius, 'black', '#0000ff');
    }

    initPlayerInput(o: MyGame): void {
        document.onkeydown = checkKey;

        function checkKey(e: KeyboardEvent): void {
            switch (e.keyCode) {
                case 38:
                    o.updatePlayerLocation('U');
                    break;
                case 40:
                    o.updatePlayerLocation('D');
                    break;
                case 37:
                    o.updatePlayerLocation('L');
                    break;
                case 39:
                    o.updatePlayerLocation('R');
                    break;
            }
            e.preventDefault();
        }
    }

    updateScene(o: MyGame): void {
        o.updateEnemyState(o);
        o.detectCollision();
        o.drawScene(o);
    }

    initGameLoop(o: MyGame): void {
        var fps = 30;
        setInterval(() => o.updateScene(o), 1000 / fps);
    }

    initEnemies(): void {
        var enemyCount = 10 + (Math.random() * 10);

        var i: number = 0;
        for (i = 0; i < enemyCount; i++) {
            var enemy = new Enemy();
            enemy.radius = 20 + (Math.random() * 10);
            enemy.x = enemy.radius + Math.random() * (this.gameCanvas.width - enemy.radius * 2);
            enemy.y = enemy.radius + Math.random() * (this.gameCanvas.height - enemy.radius * 2);
            enemy.xDelta = Math.random() > 0.5 ? 1 : -1;
            enemy.yDelta = Math.random() > 0.5 ? 1 : -1;
            this.gameState.enemies.push(enemy);
        }
    }
}

export { MyGame }