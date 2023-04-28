import { BaseGame } from "./BaseGame";
import { Enemy } from "./Enemy";
import { GameCanvas } from "./GameCanvas";
import { GameState } from "./GameState";
import { Player } from "./Player";
import { RenderingEngine } from "./RenderingEngine";

class MyGame extends BaseGame {
    canvasId: string = "gameCanvas";
    gameCanvas: GameCanvas;
    renderer: RenderingEngine;
    gameState: GameState;

    constructor() {
        super();
        this.gameCanvas = new GameCanvas(this.canvasId);
        this.renderer = new RenderingEngine(this.gameCanvas);
        this.gameState = new GameState(this.gameCanvas.width, this.gameCanvas.height, this.renderer);
    }

    update(): void {
        console.log("Update");
        this.updateScene(this);
    }

    updateScene(o: MyGame): void {
        o.gameState.updateEnemyState(o.gameCanvas.width, o.gameCanvas.height);
        o.detectCollision(o.gameState);
        o.drawScene(o);
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

    handleUpArrow(): void {
        this.gameState.player.moveUp();
    }

    handleDownArrow(): void {
        this.gameState.player.moveDown();
    }

    handleLeftArrow(): void {
        this.gameState.player.moveLeft();
    }

    handleRightArrow(): void {
        this.gameState.player.moveRight();
    }
}

export { MyGame }