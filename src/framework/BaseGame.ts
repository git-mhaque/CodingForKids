import { GameCanvas } from "./GameCanvas";
import { GameContext } from "./GameContext";
import { RenderingEngine } from "./RenderingEngine";

export abstract class BaseGame {
    private canvasId: string = "gameCanvas";
    private gameCanvas: GameCanvas;
    private renderer: RenderingEngine;
    private gameContext: GameContext;
    private fps: number = 30;
    
    constructor() {
        this.gameCanvas = new GameCanvas(this.canvasId);
        this.renderer = new RenderingEngine(this.gameCanvas);
        this.gameContext = new GameContext(this.gameCanvas.width, this.gameCanvas.height, this.renderer);

        this.initKeyboardInput(this);
        this.initGameLoop(this);
    }

    initGameLoop(o: BaseGame): void {
        setInterval(() => o.update(), 1000 / this.fps);
    }

    initKeyboardInput(o: BaseGame): void {
        document.onkeydown = checkKey;

        function checkKey(e: KeyboardEvent): void {
            switch (e.keyCode) {
                case 38: // Up
                    o.handleUpArrow();
                    break;
                case 40: // Down
                    o.handleDownArrow();
                    break;
                case 37: // Left
                    o.handleLeftArrow();
                    break;
                case 39: // Right
                    o.handleRightArrow();
                    break;
            }
            e.preventDefault();
        }
    }

    getGameContext(): GameContext {
        return this.gameContext;
    }

    update(): void {
        this.updateState();
        this.updateView();
    }
    abstract updateState(): void;
    abstract updateView(): void;
    abstract handleUpArrow(): void;
    abstract handleDownArrow(): void;
    abstract handleLeftArrow(): void;
    abstract handleRightArrow(): void;
}
