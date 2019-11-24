class game_map_visualization {
    constructor(game_map) {

        if (!!game_map_visualization.instance) {
            return game_map_visualization.instance;
        }
        game_map_visualization.instance = this;
        this.game_map_visualization = game_map_visualization;

        this.margin = { top: 50, left: 50, right: 50, bottom: 50 },
            this.height = 600 - this.margin.top - this.margin.bottom,
            this.width = 1000 - this.margin.right - this.margin.left

        this.svg = d3.select("#map")
            .append("svg")
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .attr("width", this.width + this.margin.left + this.margin.right)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        d3.queue()
            .defer(d3.json, "js/egypt.topojson")
            .await(this.ready)

        this.projection = d3.geoMercator()
            .translate([this.width / 2, this.height / 2])
            .scale(3000)
            .center([30, 27])

        this.path = d3.geoPath()
            .projection(this.projection)


        this.game_map = game_map;
        // Game is singleton class
        this.game = new Game();

        return this;
    }

    historyUpdate(territories) {
        for (let territory of territories) {
            d3.select(`.city-label#${territory[1].id}`).text(territory[1].troops);
            console.log(territory[1])
            d3.select(`#${territory[1].id}`).attr("style", "fill:" + territory[1].player.color);
        }
    }

    update(territories = this.game_map.territories) {
        if (territories instanceof Map) territories = territories.values()
        for (let territory of territories) {
            d3.select(`.city-label#${territory.id}`).text(territory.getTroopsNumber());
            d3.select(`#${territory.id}`).attr("style", "fill:" + territory.getPlayer().color);
        }
        if (this.game.getSelectedTerritoryId()) {
            d3.select(`#${this.game.getSelectedTerritoryId()}`).attr("style", "fill:" + this.LightenDarkenColor(this.game.selectedPlayer.color, -100));
            this.heighlightNeighbours(this.game.getSelectedTerritoryId());
        }
    }

    updateControls() {
        console.log(this.game.selectedPlayer)
        d3.select("#current-player").attr("style", "background-color:" + this.game.selectedPlayer.color);
        d3.select("#troops-count").text(this.game.selectedPlayer.getAvailableTroops());
        if (this.game.isDistributionStage()) {
            d3.selectAll("#commit").attr("disabled", null)
            d3.selectAll("#attack-troops-count, #attack, #end-turn").attr("disabled", "disabled")
        } else {
            d3.selectAll("#commit").attr("disabled", "disabled")
            d3.selectAll("#attack-troops-count, #attack, #end-turn").attr("disabled", null)
        }
        const from = this.game.getSelectedTerritoryId();
        const to = this.game.getSelectedToTerritoryId()
        d3.select("#from").text(from ? from : "not selected");
        d3.select("#to").text(to ? to : "not selected");
        // from && d3.select("#attack-troops-count")
        //     .attr("max", this.game_map.getTroopsNumber(from) - 1)
        //     .attr("value", this.game_map.getTroopsNumber(from) - 1);

        if (from) {
            const input = document.getElementById("attack-troops-count");
            input.value = this.game_map.getTroopsNumber(from) - 1;
            input.max = this.game_map.getTroopsNumber(from) - 1;
        }
    }

    handleClick(id, count = 1) {
        if (this.game.isCurrentPlayer(id) && this.game.isDistributionStage()) {
            let troops = this.game_map.addTroops(id, count);
            d3.select(`.city-label#${id}`).text(troops);
            console.log(id, troops)
        } else if (!this.game.isDistributionStage()) {
            if (this.game.isCurrentPlayer(id))
                this.game.setSelectedTerritoryId(id);
            else if (this.game_map.isNeighbour(id, this.game.getSelectedTerritoryId()))
                this.game.setSelectedToTerritoryId(id);
            this.update();
        }
        this.updateControls();
    }


    ready = (error, data) => {
        if (error) throw error;

        let states = topojson.feature(data, data.objects.egypt).features;

        let state = this.svg.selectAll(".state")
            .data(states)
            .enter().append("g")
            .on("mouseover", ({ properties: s }) => {
                if (!this.game.isCurrentPlayer(s.id)) return;
                d3.select(`#${s.id}`).attr("style", ({ properties: s }) => {
                    return "fill:" + this.LightenDarkenColor(this.game_map.getPlayer(s.id).color, -100)
                }).classed("selected", true)
                this.heighlightNeighbours(s.id);
            })
            .on("mouseout", ({ properties: s }) => {
                if (!this.game.isCurrentPlayer(s.id)) return;
                if (s.id == this.game.getSelectedTerritoryId()) return
                d3.select(`#${s.id}`).attr("style", ({ properties: s }) => {
                    return "fill:" + this.game_map.getPlayer(s.id).color
                }).classed("selected", false)
                this.heighlightNeighbours(s.id, false);
            })
            .on("click", ({ properties: s }) => {
                this.handleClick(s.id)
            })
            .on("contextmenu", ({ properties: s }) => {
                d3.event.preventDefault();
                this.handleClick(s.id, -1)
            });

        state.append("path")
            .attr("class", "state")
            .attr("id", ({ properties: s }) => {
                return s.id;
            })
            .attr("d", this.path)
            .attr("style", ({ properties: s }) => {
                return "fill:" + this.game_map.getPlayer(s.id).color;
            })

        state.append("text")
            .attr("class", "city-label")
            .attr("id", ({ properties: s }) => {
                return s.id;
            })
            .attr("x", ({ properties: s }) => {
                var coords = this.projection([s.longitude, s.latitude])
                return coords[0];
            })
            .attr("y", ({ properties: s }) => {
                var coords = this.projection([s.longitude, s.latitude])
                return coords[1];
            })
            .text(({ properties: s }) => {
                return this.game_map.getTroopsNumber(s.id);
            })
            .attr("dx", -5)
            .attr("dy", 2.5)


    }

    heighlightNeighbours(id, heighlight = true) {
        if (!this.game.isCurrentPlayer(id)) return;
        const neighbours = this.game_map.getEnemyNeighbours(id);
        for (let i = 0; i < neighbours.length; i++) {
            if (heighlight == true || !this.game_map.isNeighbour(this.game.getSelectedTerritoryId(), neighbours[i]))
                d3.select(`#${neighbours[i]}`).attr("style", ({ properties: s }) => {
                    return "fill:" + this.LightenDarkenColor(this.game_map.getPlayer(s.id).color, heighlight ? 100 : 0)
                }).classed("neighbour", heighlight)
        }
    }

    LightenDarkenColor(col, amt) {

        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        if (r > 255) r = 255;
        else if (r < 0) r = 0;
        var b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        var g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
}

// window.oncontextmenu = function ()
// {
//     return false;
// }
