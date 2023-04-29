import { BaseGame } from "../framework/BaseGame";
import { RenderingEngine } from "../framework/RenderingEngine";

export class MyFunGame extends BaseGame {
    initState(): void {
    }

    updateState(): void {
    }

    updateView(toolbox: RenderingEngine): void {
        toolbox.drawRect(300, 300, 100, 100);
        toolbox.drawRect(600, 300, 100, 100,"black","red");

        toolbox.drawCircle(400, 200, 40,"blue","green");
        toolbox.drawCircle(600, 200, 40);

        toolbox.drawLine(100, 200, 300, 200);
        toolbox.drawLine(100, 100, 300, 100, "red");
        toolbox.drawLine(100, 50, 300, 50, "blue");
    }

    handleUpArrow(): void {
    }

    handleDownArrow(): void {
    }
 
    handleLeftArrow(): void {
    }

    handleRightArrow(): void {
    }
}