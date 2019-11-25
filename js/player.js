class Player {
    constructor(color) {
        this.color = color;
        this.playedFirstTime = false;
        this.territories = new Set();
        this.availableTroops = 20;
    }

    setOwner(territory) {
        territory.setPlayer(this)
        this.territories.add(territory)
    }

    // needs improvment and refactoring to be fater for ai agents
    getBorderTerritories() {
        let border = [...this.territories].filter(territory => Game.instance.game_map.getEnemyNeighbours(territory.id).length != 0);
        return border;
    }

    lose(territory) {
        if(this.territories.has(territory))
            this.territories.delete(territory);
    }

    territoriesCount() {
        return this.territories.size;
    }

    getAvailableTroops() {
        return this.availableTroops;
    }

    addToAvailableTroops(troopsCount = 1) {
        this.availableTroops += troopsCount;
        return this.availableTroops;
    }

    takeFromAvailableTroops(troopsCount = 1) {
        if (this.availableTroops - troopsCount < 0) return -1;
        this.availableTroops -= troopsCount;
        return this.addToAvailableTroops;
    }

    commitTroopsDistripution() {
        this.territories.forEach(territory => territory.commitTroopsDistripution());
    }

    attack(from, to, troopsCount) {
        from.attack(to, troopsCount);
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

    getMinTroopsTerritory(territories = this.territories) {
        if (territories.length === 0) return null;
        let min;
        if (territories instanceof Set) {
            territories = territories.values()
            min = territories.next().value;
        } else min = territories[0];
        for (let territory of territories) {
            if (territory.troops < min.troops) min = territory;
        }
        return min;
    }

    getMinNeighbourTerritory(territory) {
        const neighboursIds = Game.instance.game_map.getEnemyNeighbours(territory.id);
        let neighboursTerritories = [];
        for (let i = 0; i < neighboursIds.length; i++) {
            let t = Game.instance.game_map.getTerritory(neighboursIds[i]);
            neighboursTerritories.push(t);
        }
        return this.getMinTroopsTerritory(neighboursTerritories);
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

    playTurn() {
        
    }

    endTurn() {

    }
}