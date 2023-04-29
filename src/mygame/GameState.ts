import { Enemy } from "./Enemy";
import { GameContext } from "../framework/GameContext";
import { Player } from "./Player";

export class GameState {
    private player: Player;
    private enemies: Array<Enemy>;
    private gameContext: GameContext;

    constructor (gameContext: GameContext) {
        this.gameContext = gameContext;

        this.initPlayer();
        this.initEnemies();
    }

    getPlayer(): Player {
        return this.player;
    }

    initPlayer(): void {
        this.player = new Player(400, 300, 20, 30, this.gameContext.renderer);
    }

    initEnemies(): void {
        this.enemies = new Array<Enemy>();
        var enemyCount = 10 + (Math.random() * 10);

        for (var i = 0; i < enemyCount; i++) {
            var enemy = new Enemy(this.gameContext.renderer);
            enemy.radius = 20 + (Math.random() * 10);
            enemy.x = enemy.radius + Math.random() * (this.gameContext.width - enemy.radius * 2);
            enemy.y = enemy.radius + Math.random() * (this.gameContext.height - enemy.radius * 2);
            enemy.xDelta = Math.random() > 0.5 ? 1 : -1;
            enemy.yDelta = Math.random() > 0.5 ? 1 : -1;
            this.enemies.push(enemy);
        }
    }

    updateEnemyState(): void {
        var width = this.gameContext.width;
        var height = this.gameContext.height;
        
        this.enemies.forEach(function (enemy) {
            if (enemy.x + enemy.xDelta + enemy.radius > width || enemy.x - enemy.radius + enemy.xDelta <= 0) {
                enemy.xDelta *= -1;
            }
    
            if (enemy.y + enemy.yDelta + enemy.radius > height || enemy.y - enemy.radius + enemy.yDelta <= 0) {
                enemy.yDelta *= -1;
            }
    
            enemy.x += enemy.xDelta;
            enemy.y += enemy.yDelta;
        });
    }
    
    detectCollision(): void {
        var player = this.player;
        this.enemies.forEach(function (enemy) {
            if (player.hasCollision(enemy.x, enemy.y, enemy.radius)) {
                return;
            }
        });
    }

    clearView(): void {
        this.gameContext.renderer.clearCanvas();
    }

    drawEnemies(): void {
        this.enemies.forEach(function (enemy) {
            enemy.draw();
        });
    }

    drawPlayer(): void {
        this.player.draw();
    }    
}