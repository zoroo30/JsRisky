/*
- reinforcePhase(player)
- attackPhase(player)
- nextTurn()
- playTurn()
- hasEnded()
*/

class Game {
    constructor(game_map = new EgyptMap("egypt")) {
        if (!!Game.instance) {
            return Game.instance;
        }
        Game.instance = this;
        this.game_map = game_map;
        this.players = [
            new Player("#78e6d0"),
            new Player("#ff4356"),
        ];
        this.initialize();

        return this;
    }

    initialize() {
        const board = new Board(this.game_map, this.players)
        board.plot();
    }

    hasEnded() {
        for (let i = 0; i < this.players.length; i++) {
            console.log(this.players[i].territoriesCount(),this.game_map.territories.size)
            if(this.players[i].territoriesCount() === this.game_map.territories.size) return true; 
        }
        return false;
    }
}