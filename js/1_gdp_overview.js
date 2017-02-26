function draw(data) {

// D3.js setup code
  "use strict";
  var margin = 75,
    width = 1400 - margin,
    height = 600 - margin;

  d3.select("#div1")
    .append("h2")
    .text("1. GDP Numbers - South East Asia")

  d3.select("#div1")   
    .append("ptop")   
    .text("We are more connected than ever globally, our economies are following seemingly similar paths. ")

  var svg1 = d3.select("#div1")
    .append("svg")
    .attr("width", width + margin)
    .attr("height", height + margin)
    .append('g')
    .attr('class','chart');

  d3.select("#div1")
    .append("p")
    .text("When looking at the GDP for the countries in South East Asia, Singapore stands out with the extremely high GDP. The global economic recessions - displayed as black boxes - are a good way to see the economic interconnectedness; especially the so-called 'Asian financial crisis' in the nineties show how the South East Asian countries are economically connected. Try removing Singapore from the plot (click on the Legend) to get the other nations stand out more clearly. They all show dips and spikes, following the same economical route. But I found it interesting how Malaysia had a much more positive trajectory than Indonesia.")

  d3.select("#div1")   
    .append("p")   
    .text("The data for the following plots are all based on numbers from the World Banks Open Data project (http://data.worldbank.org/).")

//  Dimple.js Chart construction code

  // Draw lines and legends for recession period for timeline
  svg1.append("svg:line") // Recession 1974-1975
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 50).attr("stroke", "black") // look
    .attr("x1", 470).attr("y1", 60).attr("x2", 470).attr("y2", 540); // - line placement
  svg1.append("svg:line") // Recession 1980-1983
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 75).attr("stroke", "black") // look
    .attr("x1", 595).attr("y1", 60).attr("x2", 595).attr("y2", 540); // - line placement
  svg1.append("svg:line") // Recession 1990-1993
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 75).attr("stroke", "black") // look
    .attr("x1", 775).attr("y1", 60).attr("x2", 775).attr("y2", 540); // - line placement
  svg1.append("svg:line") // Recession 1998
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 25).attr("stroke", "black") // look
    .attr("x1", 860).attr("y1", 60).attr("x2", 860).attr("y2", 540); // - line placement
  svg1.append("svg:line") // Recession 2001-2002
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 50).attr("stroke", "black") // look
    .attr("x1", 960).attr("y1", 60).attr("x2", 960).attr("y2", 540); // - line placement
  svg1.append("svg:line") // Recession 2008-2009
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 50).attr("stroke", "black") // look
    .attr("x1", 1100).attr("y1", 60).attr("x2", 1100).attr("y2", 540); // - line placement
  svg1.append("svg:line") // Legend image
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 20).attr("stroke", "black") // look
    .attr("x1", 190).attr("y1", 105).attr("x2", 190).attr("y2", 125); // - line placement
  svg1.append("text") // legend text
    .attr("class","legendtext")
    .attr("x", 203).attr("y", 118)
    .attr("class", "legendtext")
    .text("Global financial recessions");

    // Setup chart with legends
    var myChart1 = new dimple.chart(svg1, data);
    var x = myChart1.addCategoryAxis("x", "Year");
    var y = myChart1.addMeasureAxis("y", "GDP");
    myChart1.addSeries("Country", dimple.plot.scatter);
    myChart1.addSeries("Country", dimple.plot.line);
    var myLegend = myChart1.addLegend(180, 50, 460, 300, "left");

    myChart1.defaultColors = [
    new dimple.color("#333333"),
    new dimple.color("#80B1D3"),
    new dimple.color("#666666"),
    new dimple.color("#FB8072"), 
    new dimple.color("#999999"),
    new dimple.color("#BBBBBB"),
    new dimple.color("#EEEEEE")
    ]; 
    
    myChart1.draw();

// Create clickcable filter - based on explanation by John Kiernander in dimplejs.com examples
  // Prepare legends
  myChart1.legends = [];
    svg1.selectAll("title_text")
      .data(["Click legend to show/hide a Region"])
      .enter()
      .append("text")
        .attr("x", 180)
        .attr("y", function (d, i) { return 43 + i * 14; })
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .style("color", "Black")
        .text(function (d) { return d; });
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
      myChart1.data = dimple.filterData(data, "Country", filterValues);
      // Passing a duration parameter makes the chart animate. Without
      // it there is no transition
      myChart1.draw(800);
    });
};

data = "data/1_GDP_development2.csv";

function convert(d) {
  return {
    GDP: +d.Number,
    Year: +d.Year,
    Country: d.Country
  }
};

d3.csv(data, convert, draw);