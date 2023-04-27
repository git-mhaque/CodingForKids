class Player {
    x: number;
    y: number;
    speed: number;
    radius: number;

    constructor(x: number, y: number, speed: number, radius: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
    }
}

export { Player }