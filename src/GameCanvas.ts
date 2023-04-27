class GameCanvas {
    ctx: any;
    width: number;
    height: number;

    constructor(canvasId: string) {
        var canvas = document.getElementById(canvasId);
     
        // @ts-ignore
        this.ctx = canvas?.getContext("2d");
        
        // @ts-ignore
        this.width = canvas.width; 
        
        // @ts-ignore
        this.height = canvas.height;
    }
}

export { GameCanvas }