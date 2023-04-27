import { GameCanvas } from "./GameCanvas";

class RenderingEngine {
    gameCanvas: GameCanvas;

    constructor(gameCanvas: GameCanvas) {
        this.gameCanvas = gameCanvas;
    }

    drawLine(x1: number, y1: number, x2: number, y2: number): void {
        var ctx = this.gameCanvas.ctx;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    drawRect(x: number, y: number, width: number, height: number): void {
        var ctx = this.gameCanvas.ctx;
        ctx.strokeRect(x, y, width, height);
    }

    drawCircle(x: number, y: number, radius: number, strokeStyle: string, fillStyle: string) {
        var ctx = this.gameCanvas.ctx;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }

    clearCanvas(): void {
        this.gameCanvas.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    }
}

export { RenderingEngine }