function draw(data) {

/*
  D3.js setup code
*/
    "use strict";
    var margin = 2275,
        width = 1400 - margin,
        height = 600 - margin;

    d3.select("body")
      .append("h2")
      .text("Export and GDP Numbers in 2010")
    d3.select("body")
      .append("p")
      .text("In the book 'How Asia Works' from 2013 J.Studwell makes the argument for that the Asian Tigers - Taiwan, South Korea, Singapore, and Hong Kong made their impressive steps forward by imposing the right step-strategy; 1) first a focus on the individual development of agricultural land, then 2) massive support for large-style construction - but letting the companies fight internationally, and lastly 3) by lenient financial incentives. Most likely a simplication of many other factors, but interesting viewpoint when we look at the of the economic sectors in 2010 for the range of countries. Countries going from lowest to highest GDP.")
    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin)
      .attr("height", height + margin)
      .append('g')
      .attr('class','chart');

// Split data into two arrays

var productionData = [],
    gdpData = [],
    i,
    keySeries = "GDPPerCapita";

for (i = 0; i < data.length; i += 1) {
    if (data[i]["Series"] === keySeries) {
        gdpData.push(data[i]);
    } else {
        productionData.push(data[i]);
    }
}

  // Inspired by: http://stackoverflow.com/questions/24493771/create-a-combined-bar-line-chart-with-dimplejs-and-use-self-defined-colors

/*
  Dimple.js Chart construction code
*/
    var myChart3 = new dimple.chart(svg), 
      production, 
      gdp;

    var x1 = myChart3.addPctAxis("x", "Production");
    var y = myChart3.addCategoryAxis("y", "Country");
    var x2 = myChart3.addMeasureAxis("x","Production");


    production = myChart3.addSeries(["Series"], dimple.plot.bar);
    production.addOrderRule(["EmployAgriculture","EmployIndustry","EmployService"]);
    production.data = productionData;

    gdp = myChart3.addSeries("GDPColor", dimple.plot.scatter,[x2,y]);
    myChart3.assignColor("GDPColor", "red");
    gdp.data = gdpData;

    var myLegend = myChart3.addLegend(780, 25, 420, 10, "right");


  //  var myStoryboard = myChart3.setStoryboard("Year");
  //  myChart3.storyboard = new dimple.storyboard(myChart3, "Year");

    myChart3.draw();
};

data3 = "data/3_Economic_sectors.csv";

d3.csv(data3, function(d) { 
  return {
    Year: +d.Year,
    Production: +d.Production,
    Series: d.Series,
    Country: d.Country,
  };
},
  draw);