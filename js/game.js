/*
- reinforcePhase(player)
- attackPhase(player)
- nextTurn()
- playTurn()
- hasEnded()
*/

class Game {
    constructor(game_map = new EgyptMap(), players = [new HumanAgent("#ff4356"), new HumanAgent("#78e6d0")]) {
        if (!!Game.instance) {
            return Game.instance;
        }
        Game.instance = this;
        this.game_map = game_map;
        this.players = players;
        this.selectedPlayer = this.players[1];
        this.selectedTerritory = null;
        this.selectedToTerritory = null;
        this.history = [];
        /**
         * every turn has 2 stages
         * 1- distribution stage 
         * 2- attacking stage
         */
        this.distributionStage = true;

        this.initialize();
        return this;
    }

    getSelectedToTerritoryId() {
        return this.selectedToTerritory
    }

    getSelectedTerritoryId() {
        return this.selectedTerritory;
    }

    setSelectedToTerritoryId(id) {
        this.selectedToTerritory = id;
    }

    setSelectedTerritoryId(id) {
        this.selectedToTerritory = null;
        this.selectedTerritory = id;
    }

    deleteSelected() {
        this.selectedTerritory = null;
        this.selectedToTerritory = null;
    }

    initialize() {
        this.board = new Board(this.game_map, this.players)
        this.addBonusTroops();
        this.board.update();
        this.selectedPlayer.playTurn();
    }

    //clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);
    //JSON.parse(JSON.stringify(Array.from(this.game_map.territories)))

    nextTurn = () => {
        this.history.push(new Map(_.cloneDeep(this.game_map.territories)))
        if (this.history.length <= 1000) {
            if (!this.hasEnded()) {
                this.deleteSelected();
                this.selectedPlayer = this.players.shift();
                this.addBonusTroops();
                this.players.push(this.selectedPlayer);
                this.distributionStage = this.nextTurnStage();
                this.board.update();
                this.selectedPlayer.playTurn();
            } else this.endgame()
        }
        else {
            this.moveExeededLimit(); 
            alert("maximum number of turns exceeded")
        }
    }

    endgame = () => {
        document.getElementById("end-game").style.display = "inline-block"
        document.getElementById("in-game").style.display = "none";
        document.getElementById("player").style.display = "inline-block";
        document.getElementById("won").style.display = "inline-block";
        const historySlider = document.getElementById("history");
        historySlider.max = this.history.length - 1;
        historySlider.value = this.history.length - 1;
        historySlider.onchange = () => {
            this.board.visualization.historyUpdate(this.history[parseInt(document.getElementById("history").value)])
        }
    }

    moveExeededLimit = () => {
        document.getElementById("end-game").style.display = "inline-block"
        document.getElementById("in-game").style.display = "none";
        document.getElementById("player").style.display = "none";
        document.getElementById("won").style.display = "none";
        const historySlider = document.getElementById("history");
        historySlider.max = this.history.length - 1;
        historySlider.value = this.history.length - 1;
        historySlider.onchange = () => {
            this.board.visualization.historyUpdate(this.history[parseInt(document.getElementById("history").value)])
        }
    }

    addBonusTroops() {
        let troops = Math.floor(this.selectedPlayer.territoriesCount() / 3)
        if (troops < 3) troops = 3
        if (this.selectedPlayer.playedFirstTime)
            this.selectedPlayer.addToAvailableTroops(troops);
    }

    isCurrentPlayer(id) {
        return this.game_map.getPlayer(id) == this.selectedPlayer;
    }

    isDistributionStage() {
        return this.distributionStage;
    }

    nextTurnStage() {
        this.distributionStage = !this.distributionStage;
        return this.distributionStage;
    }

    commitTroopsDistribution = (internalCommit = false) => {
        if (this.selectedPlayer.getAvailableTroops() != 0) {
            if (!confirm("You didn't distribute all of your troops. If you commit now you won't be able to use these troops until your next turn. are you sure you want to do that?"))
                return;
        }
        internalCommit && this.selectedPlayer.commitTroopsDistripution();
        let isTurnNotEnded = true;
        if (this.selectedPlayer.playedFirstTime) {
            this.nextTurnStage();
        } else {
            this.selectedPlayer.playedFirstTime = true;
            this.nextTurnStage();
            this.nextTurn();
            isTurnNotEnded = false;
        }
        this.board.update();
        return isTurnNotEnded;
    }

    attack = (troops) => {
        if (!this.selectedTerritory) {
            alert("you have to choose `from` territory!");
            return;
        }

        if (!this.selectedToTerritory) {
            alert("you have to choose `to` territory!");
            return;
        }

        if (troops < 1) {
            alert("you cann't attack with no troops :3");
            return;
        }

        const from = this.game_map.getTerritory(this.selectedTerritory);
        const to = this.game_map.getTerritory(this.selectedToTerritory);
        this.selectedPlayer.attack(from, to, troops);

        this.board.update();
    }

    hasEnded = () => {
        for (let i = 0; i < this.players.length; i++) {
            console.log(this.players[i].territoriesCount(), this.game_map.territories.size)
            if (this.players[i].territoriesCount() === this.game_map.territories.size) return true;
        }
        return false;
    }

    getCurrentState = () => {
        return new Map(_.cloneDeep(this.game_map.territories));
    }
}