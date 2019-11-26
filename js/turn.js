class Turn {
    constructor(player, stateBefore = Game.instance.getCurrentState(), deploymentMoves = [], attackMoves = []) {
        this.player = player;
        this.deploymentMoves = deploymentMoves; // [{territory, numberOfTroops}, ...]
        this.attackMoves = attackMoves; // [{from, to, numberOfTroops}, ...]
        this.score = 0;
        this.stateBefore = stateBefore;
        this.stateAfter = null;
    }

    /* ON REAL MAP */
    deployTroops() {
        for (let i = 0; i < this.deploymentMoves.length; i++) {
            const { territory, numberOfTroops } = this.deploymentMoves[i];
            territory.setTroopsNumber(territory.troops + numberOfTroops);
            this.player.availableTroops -= numberOfTroops;
        }
    }

    attack() {
        for (let i = 0; i < this.attackMoves.length; i++) {
            const {from, to, numberOfTroops} = this.attackMoves[i];
            from.attack(to, numberOfTroops);
        }
    }

    /* SIMULATION */
    simulateStateAfter() {
        this.stateAfter = new Map(_.cloneDeep(this.stateBefore));

    }

    simulateDeployTroops(state = this.stateAfter) {
        for (let i = 0; i < this.deploymentMoves.length; i++) {
            const { territory, numberOfTroops } = this.deploymentMoves[i];
            territory.setTroopsNumber(territory.troops + numberOfTroops);
        }
    }

    simulateAttack(state = this.stateAfter) {
        for (let i = 0; i < this.attackMoves.length; i++) {
            const {from, to, numberOfTroops} = this.attackMoves[i];
            from.attack(to, numberOfTroops);
        }
    }
}