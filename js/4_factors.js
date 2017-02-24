function draw(data) {

//  D3.js setup code

  "use strict";
  var margin = 75,
    width = 1400 - margin,
    height = 600 - margin;

  d3.select("#div4")
    .append("h2")
    .text("4. Factors affecting the GDP")

  d3.select("#div4")
    .append("ptop")
    .text("Any other factors that makes Indonesia and Malaysia take different paths?")

  var svg = d3.select("#div4")
    .append("svg")
    .attr("width", width + margin)
    .attr("height", height + margin)
    .append('g')
    .attr('class','chart');

  d3.select("#div4")
    .append("p")
    .text("The last plot makes it possible to see several indicators and explore how they compare with the changing GDP of Malaysia and Indonesia. Are there any indicators that you think have an impact on their GDP?")

//  Dimple.js Chart construction code

  // Create the indicator chart on the right of the main chart
  var indicator = new dimple.chart(svg, data);
  var defaultColor = indicator.defaultColors[0];
  var indicatorColor = indicator.defaultColors[2];

  // The frame duration for the animation in milliseconds
  var frame = 2000;
  var firstTick = true;

  // Place the indicator bar chart to the right
  indicator.setBounds(1130, 49, 233, 311);

  // Add values along the y axis
  var y = indicator.addCategoryAxis("y", "Series");

  // Use sales for bar size and hide the axis
  var x = indicator.addMeasureAxis("x", "Series");
  x.hidden = true;

  // Add the bars to the indicator and add event handlers
  var s = indicator.addSeries(null, dimple.plot.bar);
  s.addEventHandler("click", onClick);
  // Draw the side chart
  indicator.draw();

  // Remove the title from the y axis
  y.titleShape.remove();

  // Remove the lines from the y axis
  y.shapes.selectAll("line,path").remove();

  // Move the y axis text inside the plot area
  y.shapes.selectAll("text")
    .style("text-anchor", "start")
    .style("font-size", "11px")
    .attr("transform", "translate(18, 0.5)");

  // This block simply adds the legend title.
  svg.selectAll("title_text")
    .data(["Click bar to select",
        "and pause. Click again",
        "to resume animation"])
    .enter()
    .append("text")
    .attr("x", 1130)
    .attr("y", function (d, i) { return 15 + i * 12; })
    .style("font-family", "sans-serif")
    .style("font-size", "10px")
    .style("color", "Black")
    .text(function (d) { return d; });

  // Manually set the bar colors
  s.shapes
    .attr("rx", 10)
    .attr("ry", 10)
    .style("fill", function (d) { return (d.y === 2000 ? indicatorColor.fill : defaultColor.fill) })
    .style("stroke", function (d) { return (d.y === 2000 ? indicatorColor.stroke : defaultColor.stroke) })
    .style("opacity", 0.4);

  // Draw the main chart
  var myChart5 = new dimple.chart(svg, data);
  myChart5.setBounds(140, 50, 900, 500);
  var x2 = myChart5.addCategoryAxis("x", ["Year","Country"]);
  myChart5.addMeasureAxis("y", "Value");
  myChart5.addSeries("Country", dimple.plot.line);
  myChart5.addLegend(140, 10, 510, 60);
  //var y2 = myChart5.addMeasureAxis("y", "GDP");
  //myChart5.addSeries("Country", dimple.plot.line,[x2,y2]);

  // Recession line plus legend
  svg.append("svg:line") // Recession 2008-2009
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 165).attr("stroke", "black") // look
    .attr("x1", 604).attr("y1", 60).attr("x2", 604).attr("y2", 550); // - line placement
  svg.append("svg:line") // Legend image
    .style("fill", "black").style("opacity",0.2).attr("stroke-width", 20).attr("stroke", "black") // look
    .attr("x1", 180).attr("y1", 75).attr("x2", 180).attr("y2", 95); // - line placement
  svg.append("text") // legend text
    .attr("class","legendtext")
    .attr("x", 200).attr("y", 85)
    .attr("class", "legendtext")
    .text("Global financial recession 2008-2009");

  // Add a storyboard to the main chart and set the tick event
  var story = myChart5.setStoryboard("Series", onTick);
  // Change the frame duration
  story.frameDuration = frame;

  // Draw the bubble chart
  myChart5.draw();

  // Orphan the legends as they are consistent but by default they
  // will refresh on tick
  myChart5.legends = [];
  // Remove the storyboard label 
  story.storyLabel.remove();
  story.pauseAnimation();

  // On click of the side chart
  function onClick(e) {
    // Pause the animation
    story.pauseAnimation();
    // If it is already selected resume the animation
    // otherwise pause and move to the selected 
    if (e.yValue === story.getFrameValue()) {
      story.startAnimation();
    } else {
      story.goToFrame(e.yValue);
      story.pauseAnimation();
    }
  }
  // On tick of the main charts storyboard
  function onTick(e) {
    if (!firstTick) {
      // Color all shapes the same color
      s.shapes
        .transition()
        .duration(frame / 2)
        .style("fill", function (d) { return (d.y === e ? indicatorColor.fill : defaultColor.fill) })
        .style("stroke", function (d) { return (d.y === e ? indicatorColor.stroke : defaultColor.stroke) });
    }
    firstTick = false;
  }
};

data5 = "data/5_banking.csv";

d3.csv(data5, function(d) { 
  return {
    Year: +d.Year,
    Country: d.Country,
    GDP: +d['GDP Per Capita'],
    Value: +d.Production,
    Series: d.Series
  };
},
  draw);