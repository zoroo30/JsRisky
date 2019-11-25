class UsMapVisualization extends game_map_visualization {
    constructor(game_map) {
        super(game_map);
        d3.queue()
            .defer(d3.json, "js/us.topojson")
            .await(this.ready)

        this.projection = d3.geoMercator()
            .translate([this.width / 2, this.height / 2])
            .scale(3000)
            .center([30, 27])

        this.path = d3.geoPath()
            .projection(this.projection)


    }

    ready = (error, data) => {
        if (error) throw error;

        let states = topojson.feature(data, data.objects.us).features;

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
}

// window.oncontextmenu = function ()
// {
//     return false;
// }
