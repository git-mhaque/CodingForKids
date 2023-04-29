import { DrawingToolbox } from "../framework/DrawingToolbox";

export class Enemy {
    x: number;
    y: number;
    xDelta: number;
    yDelta: number;
    radius: number;
    renderer: DrawingToolbox;

    constructor (renderer: DrawingToolbox) {
        this.renderer = renderer;
    }

    draw(): void {
        this.renderer.drawCircle(this.x, this.y, this.radius, 'black', '#ff0000');
    }
}
