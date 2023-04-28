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
        this.gameState = new GameState(this.gameCanvas.width, this.gameCanvas.height, this.renderer);
    
        this.initGameLoop(this);
        this.initPlayerInput(this);
    }

    detectCollision(gameState: GameState): void {
        var player = gameState.player;

        gameState.enemies.forEach(function (enemy) {
            if (player.hasCollision(enemy.x, enemy.y, enemy.radius)) {
                return;
            }
        });
    }
 
    drawScene(o: MyGame): void {
        o.renderer.clearCanvas();
        o.drawEnemy(o.gameState.enemies);
        o.drawPlayer(o.gameState.player);
    }

    drawEnemy(enemies: Array<Enemy>): void {
        enemies.forEach(function (enemy) {
            enemy.draw();
        });
    }

    drawPlayer(player: Player): void {
        player.draw();
    }

    initPlayerInput(o: MyGame): void {
        document.onkeydown = checkKey;

        function checkKey(e: KeyboardEvent): void {
            switch (e.keyCode) {
                case 38: // Up
                    o.gameState.player.moveUp();
                    break;
                case 40: // Down
                    o.gameState.player.moveDown();
                    break;
                case 37: // Left
                    o.gameState.player.moveLeft();
                    break;
                case 39: // Right
                    o.gameState.player.moveRight();
                    break;
            }
            e.preventDefault();
        }
    }

    updateScene(o: MyGame): void {
        o.gameState.updateEnemyState(o.gameCanvas.width, o.gameCanvas.height);
        o.detectCollision(o.gameState);
        o.drawScene(o);
    }

    initGameLoop(o: MyGame): void {
        var fps = 30;
        setInterval(() => o.updateScene(o), 1000 / fps);
    }
}

export { MyGame }