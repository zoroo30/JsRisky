// // The svg
// var svg = d3.select("svg"),
//   width = +svg.attr("width"),
//   height = +svg.attr("height");

// // Map and projection
// var path = d3.geoPath();
// var projection = d3.geoMercator()
//   .scale(70)
//   .center([0,20])
//   .translate([width / 2, height / 2]);

// // Data and color scale
// var data = d3.map();
// var colorScale = d3.scaleThreshold()
//   .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
//   .range(d3.schemeBlues[7]);

// // Load external data and boot
// d3.queue()
//   .defer(d3.json, "./custom.geo.json")
//   .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
//   .await(ready);

// function ready(error, topo) {

//   // Draw the map
//   svg.append("g")
//     .selectAll("path")
//     .data(topo.features)
//     .enter()
//     .append("path")
//       // draw each country
//       .attr("d", d3.geoPath()
//         .projection(projection)
//       )
//       // set the color of each country
//       .attr("fill", function (d) {
//         d.total = data.get(d.id) || 0;
//         return colorScale(d.total);
//       });
//     }


function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}


/**
 * todo
 * - turns mangment : 
 *      selected player
 *      commit distribution button
 *      selected state
 *      attack (troops text box and attack button)
 *      end turn button
 *      NOTE : FIRST TURN only troops distripution is made
 * - visiualization class :
 *      add caplities to choose the map to visualize with different scaling parameters
 *      update method
 * - history management :
 *      keep track of the board state after each turn
 *      after the game ending be able to see the history   
 */