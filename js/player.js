class Player {
    constructor(color) {
        this.color = color;
        this.territories = new Set();
        this.availableTroops = 20;
    }

    setOwner(territory) {
        territory.setPlayer(this)
        this.territories.add(territory)
    }

    lose(territory) {
        if (this.territories.has(territory))
            this.territories.delete(territory);
    }

    territoriesCount() {
        return this.territories.size;
    }

    addToAvilableTroops(troopsCount = 1) {
        this.availableTroops += troopsCount;
        return this.availableTroops;
    }

    takeFromAvilableTroops(troopsCount = 1) {
        if (this.availableTroops - troopsCount < 0) return -1;
        this.availableTroops -= troopsCount;
        return this.addToAvilableTroops;
    }

    commitTroopsDistripution() {
        for(let i = 0; i < this.territories.size; i++){
            territories[i].commitTroopsDistripution();
        }
    }

    attack(from, to, troopsCount) {
        from.attack(to, troopsCount);
    }

    endTurn() {

    }
}