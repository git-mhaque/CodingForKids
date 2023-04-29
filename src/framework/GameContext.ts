import { DrawingToolbox } from "./DrawingToolbox";

export class GameContext {
    width: number;
    height: number;
    renderer: DrawingToolbox;

    constructor(width: number, height: number, renderer: DrawingToolbox) {
        this.width = width;
        this.height = height;
        this.renderer = renderer;
    }
}