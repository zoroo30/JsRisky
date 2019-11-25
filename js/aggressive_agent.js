class AggressiveAgent extends Player {
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

    getMaxTroopsTerritory(territories = this.territories) {
        if (territories.length === 0) return null;
        let max;
        if (territories instanceof Set) {
            territories = territories.values()
            max = territories.next().value;
        } else max = territories[0];
        for (let territory of territories) {
            if (territory.troops > max.troops) max = territory;
        }
        return max;
    }

    getMaxNeighbourTerritory(territory) {
        const neighboursIds = Game.instance.game_map.getEnemyNeighbours(territory.id);
        let neighboursTerritories = [];
        for (let i = 0; i < neighboursIds.length; i++) {
            let t = Game.instance.game_map.getTerritory(neighboursIds[i]);
            neighboursTerritories.push(t);
        }
        return this.getMaxTroopsTerritory(neighboursTerritories);
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