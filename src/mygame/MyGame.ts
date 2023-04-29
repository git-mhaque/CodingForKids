import { BaseGame } from "../framework/BaseGame";
import { GameState } from "./GameState";

export class MyGame extends BaseGame {
    private gameState: GameState;

    constructor() {
        super();
        this.gameState = new GameState(this.getGameContext());
    }

    updateState(): void {
        this.gameState.updateEnemyState();
        this.gameState.detectCollision();
    }

    updateView(): void {
        //TODO: refactor these: GameState should not be responsible for updating views.
        //TODO: create a separate class called GameViewRenderer 
        this.gameState.clearView(); 
        this.gameState.drawEnemies();
        this.gameState.drawPlayer();
    }

    handleUpArrow(): void {
        this.gameState.getPlayer().moveUp();
    }

    handleDownArrow(): void {
        this.gameState.getPlayer().moveDown();
    }

    handleLeftArrow(): void {
        this.gameState.getPlayer().moveLeft();
    }

    handleRightArrow(): void {
        this.gameState.getPlayer().moveRight();
    }
}