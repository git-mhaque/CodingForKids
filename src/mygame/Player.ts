import { RenderingEngine } from "../framework/RenderingEngine";

export class Player {
    private x: number;
    private y: number;
    private speed: number;
    private radius: number;
    private renderer: RenderingEngine;

    constructor(x: number, y: number, speed: number, radius: number, renderer: RenderingEngine) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.renderer = renderer;
    }

    moveUp(): void {
        this.y -= this.speed;
    }

    moveDown(): void {
        this.y += this.speed; 
    }

    moveLeft(): void {
        this.x -= this.speed;
    }

    moveRight(): void {
        this.x += this.speed;
    }

    draw(): void {
        this.renderer.drawCircle(this.x, this.y, this.radius, 'black', '#0000ff');
    }

    hasCollision(cx: number, cy: number, radius: number): boolean {
        var dist = Math.sqrt(
            Math.pow(this.x - cx, 2) + Math.pow(this.y - cy, 2)
        );

        if (dist < this.radius + radius) {
            console.log("** Collision Detected **");
            return true;
        }
        
        return false;
    }
}
