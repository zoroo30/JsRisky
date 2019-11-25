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
}