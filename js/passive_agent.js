class PassiveAgent extends Player {
    playTurn() {
        this.deployTroops();
        if (Game.instance.commitTroopsDistribution())
            Game.instance.nextTurn();
    }

    deployTroops() {
        let territory = this.getMinTroopsTerritory();
        territory.setTroopsNumber(territory.troops + this.availableTroops);
        this.availableTroops = 0;
    }

    getMinTroopsTerritory() {
        let min = this.territories.values().next().value;
        for (let territory of this.territories.values()) {
            if (territory.troops < min.troops) min = territory;
        }
        return min;
    }
}