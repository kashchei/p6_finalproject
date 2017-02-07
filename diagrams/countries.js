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
      .text("GDP, population and Recession Impact")

    d3.select("body")
      .append("p")
      .text("The countries in South East Asia have very different conditions - political, economically and culturally. Below the countries are shown with their population in bars, and the GDP in the line graph. In this dataset is it interesting to see how economic downturns in the eighties and nineties stops the GDP growth for some of the countries - but the economic recession in 2008 do not affect their upward trajectories..")

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
    var y2 = myChart2.addMeasureAxis("y", "Population");

    var s = myChart2.addSeries(null, dimple.plot.bar,[x,y2]);
    var t = myChart2.addSeries("PopulationColor", dimple.plot.line);
    myChart2.assignColor("PopulationColor", "red");
    
//    var myLegend = myChart2.addLegend(680, 50, 460, 300, "right");

    // Set up storyboard for animating through time series
    var myStoryboard = myChart2.setStoryboard("Country");
//    myStoryboard.addOrderRule("Year");
    //recessions 2008 -financial crisis / 2000 energy crisis
    // 1970: 1974–75,[5] 1980–83,[5] 1990–93,[6] 1998,[6] 2001–02,[6] and 2008–09.[7] According to Wikipedia https://en.wikipedia.org/wiki/Global_recession
    var line1 = svg.append("svg:line") // recession 1974-75
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 25).attr("stroke", "black") // look
             .attr("x1", 300).attr("y1", 420).attr("x2", 300).attr("y2", 540); // - line placement
             //.attr("r", 10).attr("cx",30).attr("cy",30) //- circle
             //.attr("width",20).attr("height",20) //- rect
    var line2 = svg.append("svg:line") // 1980–83
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 50).attr("stroke", "black") // look
             .attr("x1", 450).attr("y1", 420).attr("x2", 450).attr("y2", 540); // - line placement
    var line3 = svg.append("svg:line") // 1990-93
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 35).attr("stroke", "black") // look
             .attr("x1", 670).attr("y1", 420).attr("x2", 670).attr("y2", 540); // - line placement
    var line4 = svg.append("svg:line") // 1998
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 15).attr("stroke", "black") // look
             .attr("x1", 750).attr("y1", 420).attr("x2", 750).attr("y2", 540); // - line placement    
    var line5 = svg.append("svg:line") // 2001-02
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 25).attr("stroke", "black") // look
             .attr("x1", 880).attr("y1", 420).attr("x2", 880).attr("y2", 540); // - line placement
    var line6 = svg.append("svg:line") // 2008-09
             .style("fill", "black").style("opacity",0.4).attr("stroke-width", 45).attr("stroke", "black") // look
             .attr("x1", 1100).attr("y1", 420).attr("x2", 1100).attr("y2", 540); // - line placement
    myChart2.draw();
};

data2 = "data/2_gdp_animated.csv";

d3.csv(data2, function(d) { 
  return {
    Year: +d.Year,
    ExportGoodsServices: +d.ExportGoodsServices,
    GDPPerCapita: +d.GDPPerCapita,
    Country: d.Country,
    Population: +d.Population
  };
},
  draw);

// c("Country","Year","FDI","ElectricityAccess","RenewableElectricityProduction","AlternativeNuclear","ElectricPowerConsumption","EaseofBusiness","ExportGoodsServices","AgraTotalValueAdded","AdjustedNetNationalIncome","GPCPerCapita","GDPPerCapitaPP","SEADTLITRZS","SESECUNERLOZS","SHSTABFEDZS","SIPOVGINI","SLAGREMPLZS","SLINDEMPLZS","SLSRVEMPLZS","SLUEMTOTLZS","SPDYNCDRTIN")