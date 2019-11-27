class AStarAgent extends Player {
    constructor(color) {
        super(color);
        this.agentName = "A*"
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
        const { bestTurn } = this.greedySearch();
        bestTurn.attack();
        Game.instance.nextTurn();
    }

    greedySearch() {
        let intitialState = new Turn(this);
        intitialState.simulateStateAfter();
        console.log(this.getPossibleTurns(intitialState.stateAfter))

        let frontier = new MinHeap(intitialState);
        let frontierSet = new Set();
        let explored = new Map();
        let result = false;
        let bestTurn = null;

        while (!frontier.isEmpty()) {
            let state = frontier.extractMin();

            if (bestTurn == null || (state.id.length > bestTurn.id.length && intitialState.isPrevious(state))) {
                explored.set(state.id, state)
                bestTurn = state
            } else break;

            if (state.isGoal()) result = true;

            for (let possibleTurn of this.getPossibleTurns(state.stateAfter)) {
                if (!explored.has(possibleTurn.id) || !frontierSet.has(possibleTurn.id)) {
                    frontier.insert(possibleTurn);
                    frontierSet.add(possibleTurn.id);
                } else if (frontierSet.has(possibleTurn.id)) {
                    // decrease possibleTurn key
                }
            }
        }

        console.log(explored, bestTurn)
        return { result, explored, bestTurn }
    }

    /**
     * A* is the same as greedy but with the real cost to rach the end + heuristic
     * the thing is our h(n) = realCost
     * so it's exactly the same as greedy agent
     */
    evaluateState(state = Game.instance.getCurrentState()) {
        let territories = state.values(), score = 0;
        for (let territory of territories) {
            if (territory.getPlayer().color != this.color) score++;
        }
        return score;
    }
}