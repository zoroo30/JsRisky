class GameMap {
    constructor() {
    }

    getTerritories() {
        return this.territories;
    }

    getNeighbours(id) {
        return this.territories.get(id).getNeighbours();
    }

    getTroopsNumber(id) {
        return this.territories.get(id).getTroopsNumber();
    }

    getPlayer(id) {
        return this.territories.get(id).getPlayer();
    }

    addTroops(id, count = 1) {
        return this.territories.get(id).addTroops(count);
    }

    removeTroops(id, count = 1) {
        return this.territories.get(id).removeTroops(count);
    }
}