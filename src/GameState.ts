import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { RenderingEngine } from "./RenderingEngine";

class GameState {
    player: Player;
    enemies: Array<Enemy>;

    width: number;
    height: number;
    renderer: RenderingEngine;

    constructor (width: number, height: number, renderer: RenderingEngine) {
        this.width = width;
        this.height = height;
        this.renderer = renderer; 

        this.enemies = new Array<Enemy>();
        this.player = new Player(400, 300, 20, 30, this.renderer);

        this.initEnemies();
    }

    initEnemies(): void {
        var enemyCount = 10 + (Math.random() * 10);

        var i: number = 0;
        for (i = 0; i < enemyCount; i++) {
            var enemy = new Enemy(this.renderer);
            enemy.radius = 20 + (Math.random() * 10);
            enemy.x = enemy.radius + Math.random() * (this.width - enemy.radius * 2);
            enemy.y = enemy.radius + Math.random() * (this.height - enemy.radius * 2);
            enemy.xDelta = Math.random() > 0.5 ? 1 : -1;
            enemy.yDelta = Math.random() > 0.5 ? 1 : -1;
            this.enemies.push(enemy);
        }
    }

    updateEnemyState(width: number, height: number): void {
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
}

export { GameState }