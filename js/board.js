/*
- setMap(map) // set the board map
- initialize(numberOfPlayers) // randomly distributes the territories amongst the players and returns the board instance
- plot_board() // draw board
- update_board(newBoardInstance) // update board with the newBoardInstance
- setOwner(territory, player)
- setArmies(territory, n)
- neighbors(territory)
- attack(fromTerritory, toTerritory, armies)
*/
class Board {
    constructor(game_map, players) {
        this.game_map = game_map;
        this.players = players;
        this.initialize();
        this.visualization = new game_map_visualization(this.game_map);
        this.visualization.updateControls();
    }

    initialize() {
        const territories = this.game_map.getTerritories(),
            playersCount = this.players.length;
        var iter = territories.values()
        for (let i = 0; i < territories.size; i++) {
            let player = this.players[Math.floor((Math.random() * playersCount))];
            if ((territories.size % 2 == 1 && player.territories.size <= territories.size / playersCount)
                || (territories.size % 2 == 0 && player.territories.size - 1 <= territories.size / playersCount))
                player.setOwner(iter.next().value);
            else i--;
        }
    }

    update() {
        this.visualization.update();
        this.visualization.updateControls();
    }
}