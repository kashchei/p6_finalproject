function draw(data) {

/*
  D3.js setup code
*/
    "use strict";
    var margin = 1275,
        width = 1400 - margin,
        height = 600 - margin;

    d3.select("body")
      .append("h2")
      .text("GDP and unemployment during the 2008 recession")

    d3.select("body")
      .append("p")
      .text("The countries Indonesia and Malaysia are two neighbouring countries with many common traits - in history, religion and culturally - but yet, they have two very different economic trajectories. When we look at the past decade plot show the unemployment in bars, and the GDP in the line graph - and the financial recession in 2008 is marked by the black bar. Malaysias GDP is much harder hit by the recession and is also experiencing higher unemployment right after.")

    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin)
      .attr("height", height + margin)
      .append('g')
      .attr('class','chart');

/*
  Dimple.js Chart construction code
*/
    var myChart2 = new dimple.chart(svg, data);

    var x = myChart2.addCategoryAxis("x", "Year"); 
    var y1 = myChart2.addMeasureAxis("y", "GDPPerCapita");
    var y2 = myChart2.addMeasureAxis("y", "Unemployment");

    var s = myChart2.addSeries(null, dimple.plot.bar,[x,y2]);
    var t = myChart2.addSeries("Country", dimple.plot.line);
    
    // Set up storyboard for animating through time series
    var myStoryboard = myChart2.setStoryboard("Country");
    myStoryboard.frameDuration = 8000;
   

// Recession line plut legend
    //recessions 2008 -financial crisis / 2000 energy crisis (global recessions: 1970: 1974–75,[5] 1980–83,[5] 1990–93,[6] 1998,[6] 2001–02,[6] and 2008–09.[7] According to Wikipedia https://en.wikipedia.org/wiki/Global_recession
    svg.append("svg:line") // Recession 2008-2009
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 165).attr("stroke", "black") // look
             .attr("x1", 604).attr("y1", 420).attr("x2", 604).attr("y2", 540); // - line placement
    svg.append("svg:line") // Legend image
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 20).attr("stroke", "black") // look
             .attr("x1", 180).attr("y1", 75).attr("x2", 180).attr("y2", 95); // - line placement
    svg.append("text") // legend text
        .attr("class","legendtext")
        .attr("x", 200).attr("y", 85)
        .attr("class", "legendtext")
        .text("Global financial recession 2008-2009");
    svg.append("svg:line") // Legend image
        .style("fill", "black").style("opacity",0.8).attr("stroke-width", 20).attr("stroke","#9ecae1")// look
        .attr("x1", 180).attr("y1", 105).attr("x2", 180).attr("y2", 125) // - line placement
    svg.append("text") // legend text
        .attr("x", 200).attr("y", 115)
        .attr("class", "legendtext")
        .text("Unemployment");

//   var myLegend = myChart2.addLegend(180, 50, 460, 300, "left"); // uncomment if storyboard active
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