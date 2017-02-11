function draw(data) {

/*
  D3.js setup code
*/
    "use strict";
    var margin = 75,
        width = 1400 - margin,
        height = 600 - margin;

    d3.select("body")
      .append("h1")
      .text("Economic development in South East Asia")

    d3.select("body")   
      .append("p")   
      .text("Today we are more connected than ever globally, our economies are tangled together in ways only possible due to the progress made in logistics and technology. But even though we are globally connected, the national economies are quite different construed. ")

    d3.select("body")   
      .append("p")   
      .text("The data for the following plots are all based on numbers from the World Banks Open Data project (http://data.worldbank.org/).")

    d3.select("body")
      .append("h2")
      .text("GDP Numbers - South East Asia")

    d3.select("body")
      .append("p")
      .text("When looking at the GDP for the countries in South East Asia, Singapore stands out with the extremely high GDP. The global economic recessions - displayed as black boxes - are a good way to see the economic interconnectedness; especially the so-called 'Asian financial crisis' in the nineties show how the South East Asian countries are economically connected. Try removing Singapore from the plot (click on the Legend) to get the other nations stand out more clearly. I found it interesting how Malaysia had a much more positive trajectory than Indonesia.")

    var svg = d3.select("body")
      .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
      .append('g')
          .attr('class','chart');

/*
  Dimple.js Chart construction code
*/
// Recession line plut legend
    //recessions 2008 -financial crisis / 2000 energy crisis (global recessions: 1970: 1974–75,[5] 1980–83,[5] 1990–93,[6] 1998,[6] 2001–02,[6] and 2008–09.[7] According to Wikipedia https://en.wikipedia.org/wiki/Global_recession
    svg.append("svg:line") // Recession 1974-1975
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 50).attr("stroke", "black") // look
             .attr("x1", 470).attr("y1", 420).attr("x2", 470).attr("y2", 540); // - line placement
    svg.append("svg:line") // Recession 1980-1983
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 75).attr("stroke", "black") // look
             .attr("x1", 595).attr("y1", 420).attr("x2", 595).attr("y2", 540); // - line placement
    svg.append("svg:line") // Recession 1990-1993
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 75).attr("stroke", "black") // look
             .attr("x1", 775).attr("y1", 420).attr("x2", 775).attr("y2", 540); // - line placement
    svg.append("svg:line") // Recession 1998
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 25).attr("stroke", "black") // look
             .attr("x1", 860).attr("y1", 420).attr("x2", 860).attr("y2", 540); // - line placement
    svg.append("svg:line") // Recession 2001-2002
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 50).attr("stroke", "black") // look
             .attr("x1", 960).attr("y1", 420).attr("x2", 960).attr("y2", 540); // - line placement
    svg.append("svg:line") // Recession 2008-2009
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 50).attr("stroke", "black") // look
             .attr("x1", 1100).attr("y1", 420).attr("x2", 1100).attr("y2", 540); // - line placement
    svg.append("svg:line") // Legend image
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 20).attr("stroke", "black") // look
             .attr("x1", 190).attr("y1", 105).attr("x2", 190).attr("y2", 125); // - line placement
    svg.append("text") // legend text
        .attr("class","legendtext")
        .attr("x", 203).attr("y", 118)
        .attr("class", "legendtext")
        .text("Global financial recessions");

    var myChart1 = new dimple.chart(svg, data);
    var x = myChart1.addCategoryAxis("x", "Year");
    var y = myChart1.addMeasureAxis("y", "Number");
    var s = myChart1.addSeries("Country", dimple.plot.scatter);
    var m = myChart1.addSeries("Country", dimple.plot.line);
    
    var myLegend = myChart1.addLegend(180, 50, 460, 300, "left");
    myChart1.draw();

    myChart1.legends = [];
      svg.selectAll("title_text")
          .data(["Click legend to show/hide a Region"])
          .enter()
          .append("text")
            .attr("x", 180)
            .attr("y", function (d, i) { return 43 + i * 14; })
            .style("font-family", "sans-serif")
            .style("font-size", "10px")
            .style("color", "Black")
            .text(function (d) { return d; });

/* 
Create clickcable filter
*/
  // Get a unique list of Owner values to use when filtering
  var filterValues = dimple.getUniqueValues(data, "Country"); //["Malaysia","Indonesia"]
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
    Number: +d.Number,
    Year: +d.Year,
    Country: d.Country
  }
};

d3.csv(data, convert, draw);