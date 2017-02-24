function draw(data) {

// D3.js setup code

  "use strict";
  var margin = 75,
    width = 1400 - margin,
    height = 600 - margin;

  d3.select("#div2")
    .append("h2")
    .text("2. Unemployment during the 2008 recession")

  d3.select("#div2")
    .append("ptop")
    .text("Indonesia and Malaysia are two neighbouring countries with many common traits - in history, religion and culturally - but very different economic trajectories. ")

  var svg2 = d3.select("#div2")
    .append("svg")
    .attr("width", width + margin)
    .attr("height", height + margin)
    .append('g')
    .attr('class','chart');

  d3.select("#div2")
    .append("p")
    .text("The plot compares Indonesia and Malaysia through the past decade. The unemployment is displayed in bars, and the GDP in the line graph - and the financial recession in 2008 is marked by the black bar. Malaysias GDP is much harder hit by the recession and is also experiencing higher unemployment right after.")


// Dimple.js Chart construction code


  // Recession line plus legend
  svg2.append("svg:line") // Recession 2008-2009
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 165).attr("stroke", "black") // look
    .attr("x1", 604).attr("y1", 60).attr("x2", 604).attr("y2", 540); // - line placement
  svg2.append("svg:line") // Legend image
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 20).attr("stroke", "black") // look
    .attr("x1", 180).attr("y1", 75).attr("x2", 180).attr("y2", 95); // - line placement
  svg2.append("text") // legend text
    .attr("class","legendtext")
    .attr("x", 200).attr("y", 85)
    .attr("class", "legendtext")
    .text("Global financial recession 2008-2009");

  // Plotting
  var myChart2 = new dimple.chart(svg2, data);

  var x = myChart2.addCategoryAxis("x", ["Year","Country"]);
  var x2 = myChart2.addCategoryAxis("x", "Year"); 
  var y1 = myChart2.addMeasureAxis("y", "Unemployment");
  var y2 = myChart2.addMeasureAxis("y", "GDPPerCapita");
  x2.hidden = true;
  y2.hidden = true;

  var t = myChart2.addSeries("Country", dimple.plot.line,[x2,y2]);
  var s = myChart2.addSeries(["Country"], dimple.plot.bar,[x,y1]);

  myChart2.addLegend(140, 10, 510, 60);
  myChart2.draw();
};

data2 = "data/2_gdp_animated.csv";

d3.csv(data2, function(d) { 
  return {
    Year: +d.Year,
    Unemployment: +d.Unemployment,
    GDPPerCapita: +d.GDPPerCapita,
    Country: d.Country,
    Population: +d.Population
  };
},
  draw);