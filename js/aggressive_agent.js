class AggressiveAgent extends Player {
    constructor(color) {
        super(color);
        this.agentName = "Aggressive"
    }

    playTurn() {
        this.deployTroops();
        if (Game.instance.commitTroopsDistribution())
            this.attack();
    }

    deployTroops() {
        let territory = this.getMaxTroopsTerritory(this.getBorderTerritories());
        territory.setTroopsNumber(territory.troops + this.availableTroops);
        this.availableTroops = 0;
    }

    attack() {
        let from = this.getMaxTroopsTerritory(this.getBorderTerritories());
        let to = this.getMaxNeighbourTerritory(from);

        while (from.troops != 1 && Game.instance.game_map.hasEnemyNeighbours(from.id)) {
            super.attack(from, to, from.troops - 1);
            from = this.getMaxTroopsTerritory(this.getBorderTerritories());
            if (!from) break;
            to = this.getMaxNeighbourTerritory(from);
            console.log(from, from.troops != 1, Game.instance.game_map.hasEnemyNeighbours(from.id))
        }
        Game.instance.nextTurn();
    }


}