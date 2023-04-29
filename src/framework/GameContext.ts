import { RenderingEngine } from "./RenderingEngine";

export class GameContext {
    width: number;
    height: number;
    renderer: RenderingEngine;

    constructor(width: number, height: number, renderer: RenderingEngine) {
        this.width = width;
        this.height = height;
        this.renderer = renderer;
    }
}