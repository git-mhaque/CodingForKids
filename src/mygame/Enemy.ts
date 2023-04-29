import { DrawingToolbox } from "../framework/DrawingToolbox";

export class Enemy {
    x: number;
    y: number;
    xDelta: number;
    yDelta: number;
    radius: number;
    toolbox: DrawingToolbox;

    constructor (renderer: DrawingToolbox) {
        this.toolbox = renderer;
    }

    draw(): void {
        this.toolbox.drawCircle(this.x, this.y, this.radius, 'black', 'red');
    }
}
