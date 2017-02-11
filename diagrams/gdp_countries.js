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
      .text("Global Recessions - a peak into the South East Asian Economy")

    d3.select("body")   
      .append("p")   
      .text("Today we are more connected than ever globally, our economies are tangled together in ways only possible due to the progress made in logistics and technology; an interconnectedness that can clearly be seen when global financial recessions are taking place. But even though we are globally connected, each national economy handle the recessions differently. In the following I will zoom into the Asian region and in particular the countries of Indochina to see if we can learn something from looking at their economies through the glasses of the global recessions. The recessions are used due to the way they function like a cut that lays bare the bone for us to see what is behind.")

    d3.select("body")
      .append("h2")
      .text("GDP World Wide")

    d3.select("body")
      .append("p")
      .text("When looking at graphs of GDP for regionsglobally, it is clear that the world is progressing. Historically, the Western countries have a headstart, but all regions have growing GDP. When displayed on top of the recessions, it is visible how the economies are in fact connected - they all slow down or even go downward in the aftermath of the recessions.")

    var svg = d3.select("body")
      .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
      .append('g')
          .attr('class','chart');

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

/*
  Dimple.js Chart construction code
*/
    var myChart = new dimple.chart(svg, data);
    var x = myChart.addCategoryAxis("x", "Year");
    var y = myChart.addMeasureAxis("y", "Number");
    var m = myChart.addSeries("Country", dimple.plot.bubbles);
    
    var myLegend = myChart.addLegend(180, 50, 460, 300, "left");
    myChart.draw();

    myChart.legends = [];
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