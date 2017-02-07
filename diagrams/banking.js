function draw(data) {

/*
  D3.js setup code
*/
    "use strict";
    var margin = 4475,
        width = 1400 - margin,
        height = 600 - margin;

    d3.select("body")
      .append("h2")
      .text("Indonesia and Philippines effects")

    d3.select("body")
      .append("p")
      .text("The last plot lets you compare several indicators to see how they interact with the changing GDP of selected South East Asian countries. Select a category to see how it develops through the past decade.")

    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin)
      .attr("height", height + margin)
      .append('g')
      .attr('class','chart');

/*
  Dimple.js Chart construction code
*/

          // Create the indicator chart on the right of the main chart
          var indicator = new dimple.chart(svg, data);

          // Pick blue as the default and orange for the selected month
          var defaultColor = indicator.defaultColors[0];
          var indicatorColor = indicator.defaultColors[2];

          // The frame duration for the animation in milliseconds
          var frame = 2000;

          var firstTick = true;

          // Place the indicator bar chart to the right
          indicator.setBounds(1130, 49, 153, 311);

          // Add values along the y axis
          var y = indicator.addCategoryAxis("y", "Series");
          //y.addOrderRule("Country", true);

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

          // This block simply adds the legend title. I put it into a d3 data
          // object to split it onto 2 lines.  This technique works with any
          // number of lines, it isn't dimple specific.
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
          var x2 = myChart5.addCategoryAxis("x", "Year");
          myChart5.addMeasureAxis("y", "Value");
          myChart5.addSeries("Country", dimple.plot.bubble);
          myChart5.addLegend(140, 10, 410, 60);

          var y2 = myChart5.addMeasureAxis("y", "GDP");
          myChart5.addSeries("Country", dimple.plot.line,[x2,y2]);

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
                  // Color all shapes the same
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
    GDP: +d.GDPPerCapita,
    Value: +d.Production,
    Series: d.Series
  };
},
  draw);