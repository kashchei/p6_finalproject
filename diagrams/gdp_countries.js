function draw(data) {

/*
  D3.js setup code
*/
    "use strict";
    var margin = 75,
        width = 1400 - margin,
        height = 600 - margin;

    d3.select("body")
      .append("h2")
      .text("GDP Numbers")

    d3.select("body")
      .append("p")
      .text("When looking at the GDP development for the different regions in the world, it is clear that the world is progressing. Historically, the Western countries have a headstart, but what makes the other regions succeed. An interesting region is South East Asia -or East Asian & Pacific in the chart below.")

    var svg = d3.select("body")
      .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
      .append('g')
          .attr('class','chart');

/*
  Dimple.js Chart construction code
*/
    var myChart = new dimple.chart(svg, data);
    var x = myChart.addCategoryAxis("x", "Year");
    var y = myChart.addMeasureAxis("y", "Number");
    var s = myChart.addSeries("Country", dimple.plot.scatter);
    var m = myChart.addSeries("Country", dimple.plot.line);
    
    var myLegend = myChart.addLegend(180, 50, 460, 300, "left");
    myChart.draw();

    myChart.legends = [];
      svg.selectAll("title_text")
          .data(["Click legend to show/hide a Region"])
          .enter()
          .append("text")
            .attr("x", 180)
            .attr("y", function (d, i) { return 47 + i * 14; })
            .style("font-family", "sans-serif")
            .style("font-size", "10px")
            .style("color", "Black")
            .text(function (d) { return d; });
/* 
Create clickcable filter
*/
  // Get a unique list of Owner values to use when filtering
  var filterValues = dimple.getUniqueValues(data, "Country");
  // Get all the rectangles from our now orphaned legend
  myLegend.shapes.selectAll("rect")
    // Add a click event to each rectangle
    .on("click", function (e) {
      // This indicates whether the item is already visible or not
      var hide = false;
      var newFilters = [];
      // If the filters contain the clicked shape hide it
      filterValues.forEach(function (f) {
        if (f === e.aggField.slice(-1)[0]) {
          hide = true;
        } else {
          newFilters.push(f);
        }
      });
      // Hide the shape or show it
      if (hide) {
        d3.select(this).style("opacity", 0.2);
      } else {
        newFilters.push(e.aggField.slice(-1)[0]);
        d3.select(this).style("opacity", 0.8);
      }
      // Update the filters
      filterValues = newFilters;
      // Filter the data
      myChart.data = dimple.filterData(data, "Country", filterValues);
      // Passing a duration parameter makes the chart animate. Without
      // it there is no transition
      myChart.draw(800);
    });
};

data = "data/1_GDP_development.csv";

function convert(d) {
  return {
    Number: +d.Number,
    Year: +d.Year,
    Country: d.Country
  }
};

d3.csv(data, convert, draw);