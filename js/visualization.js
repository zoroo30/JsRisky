class game_map_visualization {
    constructor(game_map) {
        this.margin = { top: 50, left: 50, right: 50, bottom: 50 },
            this.height = 600 - this.margin.top - this.margin.bottom,
            this.width = 1000 - this.margin.right - this.margin.left

        this.svg = d3.select("#map")
            .append("svg")
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .attr("width", this.width + this.margin.left + this.margin.right)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        /*
            Read in world.topojson
        */
        d3.queue()
            .defer(d3.json, "js/egypt.topojson")
            .await(this.ready)

        /*
            Create a new projection using Mercator (geoMercator)
            and center it (translate)
            and zoom in a certain amount (scale)
        */
        this.projection = d3.geoMercator()
            .translate([this.width / 2, this.height / 2])
            .scale(3000)
            .center([30, 27])


        /*
            Create a path (geoPath)
            using the projection
        */
        this.path = d3.geoPath()
            .projection(this.projection)


        this.game_map = game_map;

    }

    us_ready = (error, data) => {
        let states = topojson.feature(data, data.objects.us).features;
        let state = this.svg.selectAll(".state")
            .data(states)
            .enter().append("g")
            .on("mouseover", ({ properties: s }) => {
                d3.select(`#${s.id}`).attr("style", ({ properties: s }) => {
                    return "fill:" + LightenDarkenColor(this.game_map.getPlayer(s.id).color, -100)
                })//.classed("selected", true)
                this.heighlightNeighbours(s.id);
            })
            .on("mouseout", ({ properties: s }) => {
                d3.select(`#${s.id}`).attr("style", ({ properties: s }) => {
                    return "fill:" + this.game_map.getPlayer(s.id).color
                })
                //classed("selected", false)
                this.heighlightNeighbours(s.id, false);
            })
            .on("click", ({ properties: s }) => {
                let troops = this.game_map.addTroops(s.id);
                d3.select(`.city-label#${s.id}`).text(troops);
                console.log(s.id, troops)
            })
            .on("contextmenu", ({ properties: s }) => {
                d3.event.preventDefault();
                let troops = this.game_map.removeTroops(s.id);
                d3.select(`.city-label#${s.id}`).text(troops);
                console.log(s.id, troops)
            });
        state.append("path")
            .attr("class", "state")
            .attr("id", ({ properties: s }) => {
                return s.id;
            })
            .attr("d", this.path)
            .attr("style", ({ properties: s }) => {
                return "fill: #f1f1f1"
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

    ready = (error, data) => {
        let states = topojson.feature(data, data.objects.egypt).features;
        let state = this.svg.selectAll(".state")
            .data(states)
            .enter().append("g")
            .on("mouseover", ({ properties: s }) => {
                d3.select(`#${s.id}`).attr("style", ({ properties: s }) => {
                    return "fill:" + LightenDarkenColor(this.game_map.getPlayer(s.id).color, -100)
                })//.classed("selected", true)
                this.heighlightNeighbours(s.id);
            })
            .on("mouseout", ({ properties: s }) => {
                d3.select(`#${s.id}`).attr("style", ({ properties: s }) => {
                    return "fill:" + this.game_map.getPlayer(s.id).color
                })
                //classed("selected", false)
                this.heighlightNeighbours(s.id, false);
            })
            .on("click", ({ properties: s }) => {
                let troops = this.game_map.addTroops(s.id);
                d3.select(`.city-label#${s.id}`).text(troops);
                console.log(s.id, troops)
            })
            .on("contextmenu", ({ properties: s }) => {
                d3.event.preventDefault();
                let troops = this.game_map.removeTroops(s.id);
                d3.select(`.city-label#${s.id}`).text(troops);
                console.log(s.id, troops)
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
        const neighbours = this.game_map.getNeighbours(id);
        for (let i = 0; i < neighbours.length; i++) {
            d3.select(`#${neighbours[i]}`).attr("style", ({ properties: s }) => {
                return "fill:" + LightenDarkenColor(this.game_map.getPlayer(s.id).color, heighlight ? -40 : 0)
            })//.classed("neighbour", heighlight);
        }
    }


}

// window.oncontextmenu = function ()
// {
//     return false;
// }

function LightenDarkenColor(col, amt) {

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