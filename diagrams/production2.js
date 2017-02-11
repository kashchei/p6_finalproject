function draw(data) {

/*
  D3.js setup code
*/
    "use strict";
    var margin = 3475,
        width = 1400 - margin,
        height = 600 - margin;

    d3.select("body")
      .append("h2")
      .text("Production Area Chart")
    d3.select("body")
      .append("p")
      .text("This diagram gives the development in the past 35 years for both countries. To me this plot explains the difference between why recessions hit them differently; Malaysia is mainly reliant on the service sector while Indonesia is having a hard time to kickstart its service sector, and dependent on its agricultural economic sector. Thereby Indonesia is still ranging as a sub-developed country in terms of GDP, but is also being less susceptible to economic crisis originated in the bank and finance world.")

    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin)
      .attr("height", height + margin)
      .append('g')
      .attr('class','chart');

/*
  Dimple.js Chart construction code
*/
    var myChart4 = new dimple.chart(svg,data);

    var x = myChart4.addCategoryAxis("x", "Year");
    var y = myChart4.addPctAxis("y", "Production");
    var m = myChart4.addSeries("Series", dimple.plot.area);

    var myLegend = myChart4.addLegend(680, 40, 460, 300, "right");

    var myStoryboard = myChart4.setStoryboard("Country");
    myChart4.storyboard = new dimple.storyboard(myChart4, "Country");

  myChart4.draw();

  myChart4.legends = [];
};

data4 = "data/4_Economic_sectors_cont.csv";

d3.csv(data4, function(d) { 
  return {
    Year: +d.Year,
    Production: +d.Production,
    Series: d.Series,
    Country: d.Country,
  };
},
  draw);