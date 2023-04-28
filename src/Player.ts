import { RenderingEngine } from "./RenderingEngine";

class Player {
    x: number;
    y: number;
    speed: number;
    radius: number;
    renderer: RenderingEngine;

    constructor(x: number, y: number, speed: number, radius: number, renderer: RenderingEngine) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.renderer = renderer;
    }

    draw(): void {
        this.renderer.drawCircle(this.x, this.y, this.radius, 'black', '#0000ff');
    }
}

export { Player }