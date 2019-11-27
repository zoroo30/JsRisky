class Player {
    constructor(color) {
        this.color = color;
        this.playedFirstTime = true;
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
        if (this.territories.has(territory))
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

    playTurn() { }

    /* STATE RELATED METHODS */
    evaluateState(state = Game.instance.getCurrentState()) {
        let territories = state.values(), score = 0;
        for (let territory of territories) {
            if (territory.getPlayer().color != this.color) score++;
        }
        return score;
    }

    getPossibleTurns(state = Game.instance.getCurrentState()) {
        const possibleAttacks = this.getPossibleAttacks(state);
        let possibleTurns = [];
        for (let attackMoves of possibleAttacks) {
            const turn = new Turn(this, state, [], attackMoves);
            turn.simulateStateAfter();
            possibleTurns.push(turn);
        }
        return possibleTurns;
    }

    getPossibleAttacks(state = Game.instance.getCurrentState()) {
        let possibleTurns = []; // [[{fromId, toId, numberOfTroops}, ...], ...]
        let territories = state.values();

        // territories that the player can attack from [{territory, enemies: [{id:"", troops: 0}, ...]}, ...]
        let playerTerritories = [];

        let maxPossibleWins = 0;
        for (let territory of territories) {
            let canWin = territory.canWinAttack(state);
            if (territory.getPlayer().color === this.color && canWin.result) {
                playerTerritories.push({ territory, enemies: canWin.enemyNeighbours });
                if (canWin.enemyNeighbours.length > maxPossibleWins)
                    maxPossibleWins = canWin.enemyNeighbours.length
            }
        }

        for (let i = 0; i < maxPossibleWins; i++) {
            possibleTurns[i] = []
            for (let territory of playerTerritories) {
                let territoryTroopsCount = territory.territory.troops;
                for (let j = 0; j < Math.min(i + 1, territory.enemies.length); j++) {
                    if (territoryTroopsCount > territory.enemies[j].troops && !possibleTurns.includes()) {
                        territoryTroopsCount -= territory.enemies[j].troops + 1;
                        possibleTurns[i].push({
                            fromId: territory.territory.id,
                            toId: territory.enemies[j].id,
                            numberOfTroops: territory.enemies[j].troops + 1
                        })
                    }
                }
            }
        }

        return possibleTurns.filter((v, i) => i == 0 || v.length !== possibleTurns[i - 1].length);
    }
}