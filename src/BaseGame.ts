export abstract class BaseGame {
    constructor() {
        this.initKeyboardInput(this);
        this.initGameLoop(this);
    }

    initGameLoop(o: BaseGame): void {
        var fps = 30;
        setInterval(() => o.update(), 1000 / fps);
    }

    initKeyboardInput(o: BaseGame): void {
        document.onkeydown = checkKey;

        function checkKey(e: KeyboardEvent): void {
            switch (e.keyCode) {
                case 38: // Up
                    o.handleUpArrow();
                    break;
                case 40: // Down
                    o.handleDownArrow();
                    break;
                case 37: // Left
                    o.handleLeftArrow();
                    break;
                case 39: // Right
                    o.handleRightArrow();
                    break;
            }
            e.preventDefault();
        }
    }

    abstract update(): void;
    abstract handleUpArrow(): void;
    abstract handleDownArrow(): void;
    abstract handleLeftArrow(): void;
    abstract handleRightArrow(): void;
}
