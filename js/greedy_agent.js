class GreedyAgent extends Player {
    constructor(color) {
        super(color);
        this.agentName = "Greedy"
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
}