class PacifistAgent extends Player {
    constructor(color) {
        super(color);
        this.agentName = "Pacifist"
    }

    playTurn() {
        this.deployTroops();
        if (Game.instance.commitTroopsDistribution())
            this.attack();
    }

    deployTroops() {
        let territory = this.getMinTroopsTerritory();
        territory.setTroopsNumber(territory.troops + this.availableTroops);
        this.availableTroops = 0;
    }

    attack() {
        let from = this.getMaxTroopsTerritory(this.getBorderTerritories());
        if (from) {
            let to = this.getMinNeighbourTerritory(from);
            super.attack(from, to, from.troops - 1);
        }
        Game.instance.nextTurn();
    }
}