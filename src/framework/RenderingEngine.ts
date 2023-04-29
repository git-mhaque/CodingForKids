import { GameCanvas } from "./GameCanvas";

export class RenderingEngine {
    gameCanvas: GameCanvas;

    constructor(gameCanvas: GameCanvas) {
        this.gameCanvas = gameCanvas;
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, strokeStyle?: string): void {
        var ctx = this.gameCanvas.ctx;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = typeof strokeStyle !== 'undefined' ? strokeStyle : "black";
        ctx.stroke();
    }

    drawRect(x: number, y: number, width: number, height: number, strokeStyle?: string, fillStyle?: string): void {
        var ctx = this.gameCanvas.ctx;
        ctx.fillStyle = typeof fillStyle !== 'undefined' ? fillStyle : "white";
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = typeof strokeStyle !== 'undefined' ? strokeStyle : "black";
        ctx.strokeRect(x, y, width, height);
    }
    
    drawCircle(x: number, y: number, radius: number, strokeStyle?: string, fillStyle?: string) {
        var ctx = this.gameCanvas.ctx;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = typeof fillStyle !== 'undefined' ? fillStyle : "white";
        ctx.fill();
        ctx.strokeStyle = typeof strokeStyle !== 'undefined' ? strokeStyle : "black";
        ctx.stroke();
    }

    clearCanvas(): void {
        this.gameCanvas.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    }
}
