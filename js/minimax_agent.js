class MinimaxAgent extends Player {
    constructor(color) {
        super(color);
        this.agentName = "Minimax"
    }

    playTurn() {
        this.deployTroops();
        if (Game.instance.commitTroopsDistribution())
            this.attack();
    }

    deployTroops() {
        let territory = this.getMinTroopsTerritory(this.getBorderTerritories());
        territory.setTroopsNumber(territory.troops + this.availableTroops);
        this.availableTroops = 0;
    }

    attack() {
        let intitialState = new Turn(this);
        intitialState.simulateStateAfter();

        const bestTurn = this.minimax(intitialState, 0, true, Math.NEGATIVE_INFINITY, Math.POSITIVE_INFINITY);
        console.log("best", bestTurn)
        bestTurn.state.attack();
        Game.instance.nextTurn();
    }

    minimax(state, depth, isMaximizingPlayer, alpha, beta) {
        if (state.isGoal() || depth === 1) return { score: state.getScore(), state };

        if (isMaximizingPlayer) {
            let bestVal = { score: Number.NEGATIVE_INFINITY, state: null };
            for (let possibleTurn of this.getPossibleTurns(state.stateAfter)) {
                const value = this.minimax(possibleTurn, depth + 1, false, alpha, beta);
                if (bestVal.score < state.score) {
                    bestVal = { score: state.getScore(), state };
                    console.log(possibleTurn, bestVal)
                }
                 alpha = Math.max(alpha, bestVal.score);
                if (beta <= alpha) break;
            }
            //console.log("max:",bestVal)
            return bestVal;
        }
        else {
            let bestVal = { score: Number.POSITIVE_INFINITY, state: null };
            for (let possibleTurn of this.getPossibleTurns(state.stateAfter)) {
                const value = this.minimax(possibleTurn, depth + 1, true, alpha, beta);
                if (bestVal.score > state.score)
                    bestVal = { score: state.getScore(), state };
                beta = Math.min(beta, bestVal.score);
                if (beta <= alpha) break;
            }
            //console.log("min:",bestVal)
            return bestVal;
        }
    }

    evaluateState(state = Game.instance.getCurrentState()) {
        let territories = state.values(), score = 0;
        for (let territory of territories) {
            if (territory.getPlayer().color === this.color) score++;
            else score--;
            console.log("evaluting score")
        }
        return score;
    }
}