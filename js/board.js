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
        //this.visualization = new EgyptMapVisualization(this.game_map);
        this.visualization = new UsMapVisualization(this.game_map);
        this.visualization.updateControls();
    }

    // should randomize placement of armies as well
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

        for (let p = 0; p < this.players.length ; p++) {
            const player = this.players[p];
            let max = player.availableTroops
            let playerTerritories = [...player.territories];
            for (let i = 0; i < max; i++) {
                let randomTerritoryIndex = Math.floor(Math.random() * playerTerritories.length);
                console.log(randomTerritoryIndex)
                playerTerritories[randomTerritoryIndex].setTroopsNumber(playerTerritories[randomTerritoryIndex].troops + 1);
                player.availableTroops--;
            }
        }
    }

    update() {
        this.visualization.update();
        this.visualization.updateControls();
    }
}