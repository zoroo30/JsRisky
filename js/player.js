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

    playTurn() {
        
    }

    endTurn() {

    }
}