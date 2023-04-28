import { RenderingEngine } from "./RenderingEngine";

export class Enemy {
    x: number;
    y: number;
    xDelta: number;
    yDelta: number;
    radius: number;
    renderer: RenderingEngine;

    constructor (renderer: RenderingEngine) {
        this.renderer = renderer;
    }

    draw(): void {
        this.renderer.drawCircle(this.x, this.y, this.radius, 'black', '#ff0000');
    }
}
