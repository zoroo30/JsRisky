class Turn {
    constructor(player, stateBefore = Game.instance.getCurrentState(), deploymentMoves = [], attackMoves = []) {
        this.player = player;
        this.deploymentMoves = deploymentMoves; // [{territoryId, numberOfTroops}, ...]
        this.attackMoves = attackMoves; // [{fromId, toId, numberOfTroops}, ...]
        this.stateBefore = stateBefore;
        this.stateAfter = null;
        this.score = 0;
        this.id = "";
    }

    deployTroops(state = Game.instance.game_map) {
        for (let i = 0; i < this.deploymentMoves.length; i++) {
            const { territoryId, numberOfTroops } = this.deploymentMoves[i];
            const territory = state.get(territoryId);
            territory.setTroopsNumber(territory.troops + numberOfTroops);
            this.player.availableTroops -= numberOfTroops;
        }
    }

    attack(state = Game.instance.game_map.territories) {
        for (let i = 0; i < this.attackMoves.length; i++) {
            const { fromId, toId, numberOfTroops } = this.attackMoves[i];
            const from = state.get(fromId);
            const to = state.get(toId);
            from.attack(to, numberOfTroops);
        }
    }

    /* SIMULATION */
    simulateStateAfter() {
        this.stateAfter = new Map(_.cloneDeep(this.stateBefore));
        this.deployTroops(this.stateAfter)
        this.attack(this.stateAfter)
        this.calcId()
        return this.calcScore()
    }

    calcId(state = this.stateAfter) {
        let territories = state.values();
        for (let territory of territories) {
            if (territory.getPlayer().color === this.player.color) this.id += territory.id;
        }
    }

    calcScore(state = this.stateAfter) {
        let score = this.player.evaluateState(state);
        return score;
    }

    getScore() {
        return this.score;
    }

    isGoal() {
        if (this.player.territoriesCount() === Game.instance.game_map.territories.size) return true;
        return false
    }

    /* COMPARE 2 TURNS AND CHECK IF THEY ARE THE SAME OR NOT */
    isPrevious(turn) {
        return JSON.stringify(JSON.stringify(Array.from(this.stateAfter))) === JSON.stringify(JSON.stringify(Array.from(turn.stateBefore)))
    }

    isEqual(turn) {
        return JSON.stringify(JSON.stringify(Array.from(this.stateAfter))) === JSON.stringify(JSON.stringify(Array.from(turn.stateAfter)))
    }
}