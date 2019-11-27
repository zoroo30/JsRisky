class Territory {
    constructor(id, neighbours) {
        this.id = id
        this.neighbours = neighbours
        this.troops = 1;
        this.addedTroops = 0;
        this.player = null;
    }

    /* PLAYER */
    setPlayer(player) {
        this.player = player;
    }

    getPlayer() {
        return this.player;
    }

    /* NEIGHBOURS */
    getNeighbours() {
        return this.neighbours;
    }

    hasNeighbour(neighbourId) {
        return this.neighbours.includes(neighbourId);
    }

    /* TROOPS */
    getTroopsNumber() {
        return this.troops + this.addedTroops;
    }

    setTroopsNumber(count) {
        this.troops = count;
        this.addedTroops = 0;
    }

    addTroops(count = 1) {
        if (this.player.takeFromAvailableTroops(count) != -1)
            this.addedTroops += count;
        return this.getTroopsNumber();
    }

    removeTroops(count = 1) {
        if (this.addedTroops === 0) return this.troops;
        this.player.addToAvailableTroops(count);
        this.addedTroops -= count;
        return this.getTroopsNumber();
    }

    /* PLAYER TURN */
    /**
     * 1- deploy troops
     * 2- committing troops distripution
     * 3- attack multible times
     * 4- endturn
     */
    commitTroopsDistripution() {
        this.troops += this.addedTroops;
        this.addedTroops = 0;
    }

    /**
     * attack territory with n troops
     * @param {Territory} territory => attacked territory
     * @param {int} troopsCount => number of troops
     */
    attack(territory, troopsCount) {
        if(troopsCount >= this.troops) return;
        this.troops -= troopsCount;
        if (this.player === territory.getPlayer()) {
            territory.setTroopsNumber(territory.getTroopsNumber() + troopsCount);
        }
        else {
            const result = troopsCount - territory.getTroopsNumber();
            if (result === 0) // draw
                territory.setTroopsNumber(1);
            else if (result < 0) // defense won
                territory.setTroopsNumber(-result);
            else { // attack won
                territory.setTroopsNumber(result);
                territory.getPlayer().lose(territory);
                territory.setPlayer(this.player);
                this.player.setOwner(territory);
            }
        }
    }

    /* STATE RELATED METHODS */
    getEnemyNeighbours(state) {
        return this.neighbours.filter(id => this.player != state.get(id).player)
    }

    canWinAttack(state) {
        let result = false, enemyNeighboursIds = [], enemyNeighbours = [];
        if (this.troops > 1) {
            enemyNeighboursIds = this.getEnemyNeighbours(state);
            for (let neighbourId of enemyNeighboursIds) {
                const neighbour = state.get(neighbourId);
                if (neighbour.troops < this.troops) {
                    result = true;
                    enemyNeighbours.push({ id: neighbour.id, troops: neighbour.troops })
                }
            }
            enemyNeighbours.sort((a, b) => (a.troops > b.troops) ? 1 : -1);
        }
        return { result, enemyNeighbours };
    }
}