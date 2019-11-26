class Turn {
    constructor(player, stateBefore = Game.instance.getCurrentState(), deploymentMoves = [
        { territoryId: "SS", numberOfTroops: 20 }, { territoryId: "SS", numberOfTroops: 50 }
    ], attackMoves = [
        { fromId: "SS", toId: "JS", numberOfTroops: 30 }
    ]) {
        this.player = player;
        this.deploymentMoves = deploymentMoves; // [{territoryId, numberOfTroops}, ...]
        this.attackMoves = attackMoves; // [{fromId, toId, numberOfTroops}, ...]
        this.score = 0;
        this.stateBefore = stateBefore;
        this.stateAfter = null;
    }

    deployTroops(state = Game.instance.game_map) {
        for (let i = 0; i < this.deploymentMoves.length; i++) {
            const { territoryId, numberOfTroops } = this.deploymentMoves[i];
            const territory = state.get(territoryId);
            territory.setTroopsNumber(territory.troops + numberOfTroops);
            this.player.availableTroops -= numberOfTroops;
        }
    }

    attack(state = Game.instance.game_map) {
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
        return this.calcScore()
    }

    calcScore(state = this.stateAfter) {
        let score = 0;
        return score;
    }

    /* COMPARE 2 TURNS AND CHECK IF THEY ARE THE SAME OR NOT */
    isEqual(turn) {
        return JSON.stringify(JSON.stringify(Array.from(this.stateAfter))) === JSON.stringify(JSON.stringify(Array.from(turn.stateAfter)))
    }
}