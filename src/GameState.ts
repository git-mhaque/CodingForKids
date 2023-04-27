import { Enemy } from "./Enemy";
import { Player } from "./Player";

class GameState {
    player: Player;
    enemies: Array<Enemy>;
}

export { GameState }