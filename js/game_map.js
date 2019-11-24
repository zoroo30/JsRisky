class GameMap {
    constructor() {
    }

    getTerritories() {
        return this.territories;
    }

    getTerritory(id) {
        return this.territories.get(id);
    }

    getNeighbours(id) {
        return this.territories.get(id).getNeighbours();
    }

    isNeighbour(id, neighbourId) {
        if(!id) return false;
        return this.territories.get(id).hasNeighbour(neighbourId);
    }

    getEnemyNeighbours(id) {
        let neighbours = this.getNeighbours(id);
        let territory = this.territories.get(id);
        return neighbours.filter(id => territory.player != this.territories.get(id).player)
    }

    getTroopsNumber(id) {
        return this.territories.get(id).getTroopsNumber();
    }

    getPlayer(id) {
        return this.territories.get(id).getPlayer();
    }

    addTroops(id, count = 1) {
        if (count > 0)
            return this.territories.get(id).addTroops(count);
        else
            return this.territories.get(id).removeTroops(-count);
    }
}