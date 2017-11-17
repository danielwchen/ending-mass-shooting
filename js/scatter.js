/*
 *  Scatter - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _eventHandler    -- Event handler
 */

 Scatter = function(_parentElement) {

  this.parentElement = _parentElement;
 	
  this.winWidth = d3.select(_parentElement).node().getBoundingClientRect().width;
  ;
  this.winHeight = this.winWidth*0.5;
 	

  this.fin_data;
 
  this.colors = colorbrewer["Reds"][4];

  this.initVis();
};

Scatter.prototype.initVis = function() {

  var vis = this;

  d3.queue()
  .defer(d3.csv, "data/scatterdata.csv")
  .await(function(error, data) {
    vis.wrangleData(data);
  });

};

Scatter.prototype.wrangleData = function(data) {
  var vis = this;


  data.forEach(function(d) {
  	d.firearms = +d.firearms;
  	d.deaths = +d.deaths;
  })

  vis.fin_data = data;

  vis.createVis();

};

Scatter.prototype.createVis = function() {
  var vis = this;

  // set the dimensions and margins of the graph
  vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
  vis.width = vis.winWidth - vis.margin.left - vis.margin.right;
  vis.height = vis.winHeight - vis.margin.top - vis.margin.bottom;

  vis.svgparent = d3.select(vis.parentElement).append("svg")
  .attr("width", vis.width + vis.margin.left + vis.margin.right)
  .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
//  .attr('viewBox', '0 0 400 300');

  vis.svg = vis.svgparent.append("g")
  .attr("transform",
    "translate(" + vis.margin.left + "," + vis.margin.top + ")");

  vis.tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-8, 0])
  .style('z-index', '999999999')
  .html(function(d) {
    return "<text id=\"tip-title\">" + d.state + "</text>" + "<br>" + "Firearms: " + d.firearms + "/1,000<br>" 
    + "Gun Deaths: " + d.deaths; 
  });

  vis.svg.call(vis.tip);

  vis.x = d3.scaleLog().range([0, vis.width]);
  vis.y = d3.scaleLinear().range([vis.height, 0]);

//  vis.x.domain([0, d3.max(vis.fin_data, function(d) { 
//    return d.firearms;
//  })]);
//
//  vis.y.domain([0, d3.max(vis.fin_data, function(d) { 
//    return d.deaths;
//  })]);

  vis.x.domain([1,200]);
  vis.y.domain([0,25]);

  vis.xAxis = vis.svg.append("g")
  .attr("transform", "translate(0," + vis.height + ")")
  .call(d3.axisBottom(vis.x).tickSizeInner(-vis.height).tickPadding(10).ticks(8, ",.1s"));

  vis.yAxis = vis.svg.append("g")
  .call(d3.axisLeft(vis.y).tickSizeInner(-vis.width).tickPadding(10).ticks(4	));


  vis.xLabel = vis.svg
  .append("text")
  .attr("class", "x-label axis-label")
  .attr("x", vis.width)
  .attr("y", vis.height-6)
  .style("text-anchor", "end")
  .text("Firearms/1,000 People");

  vis.yLabel = vis.svg
  .append("text")
  .attr("class", "y-label axis-label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Gun Deaths/1,000,000 People");

  vis.dots = vis.svg.selectAll("g.dots")
  .data(vis.fin_data)
  .enter().append("g")
  
  vis.dots.append("circle")
  .attr("class", "dots")
  .attr("r", 5)
  .attr("cx", function(d) { return vis.x(d.firearms); })
  .attr("cy", function(d) { return vis.y(d.deaths); })
  .attr("fill", vis.colors[2])
  .attr("opacity",1)
  .on("mouseover", function(d) { vis.tip.show(d); })
  .on("mouseout", function(d) { vis.tip.hide(d); });
  
//  vis.dots.append("text")
//  .text(function(d) { return d.abbr; })
//  .attr('class', 'state-label')
//  .attr("x", function(d) { return vis.x(d.firearms); })
//  .attr("y", function(d) { return vis.y(d.deaths); })
//  .attr('text-anchor', 'middle')
//  .attr('alignment-baseline', 'middle')
//  .style('fill', 'white')
//  .style('font-family', 'sans-serif');
  

  vis.updateVis();
};

Scatter.prototype.updateVis = function() {
  var vis = this;

//  vis.xAxis
//  .call(d3.axisBottom(vis.x).tickSizeInner(-vis.height).tickPadding(10));
//
//  vis.yAxis
//  .call(d3.axisLeft(vis.y).tickSizeInner(-vis.width).tickPadding(10));
//
//
//  vis.dots.transition().duration(500)
//  .attr("fill", vis.colors[2])
//  .attr("cx", function(d) { return vis.x(d[vis.x_stat]); })
//  .attr("cy", function(d) { return vis.y(d[vis.y_stat]); })


}

//Scatter.prototype.resize = function(w, h) {
//  var vis = this;
//
//  vis.winWidth = w;
//  vis.winHeight = h;
//
//  vis.width = vis.winWidth - vis.margin.left - vis.margin.right;
//  vis.height = vis.winHeight - vis.margin.top - vis.margin.bottom - 40;
//
//  vis.svgparent
//  .attr("width", vis.width + vis.margin.left + vis.margin.right)
//  .attr("height", vis.height + vis.margin.top + vis.margin.bottom);
//
//  vis.x.range([0, vis.width]);
//  vis.y.range([vis.height, 0]);
//
//  vis.xAxis
//  .attr("transform", "translate(0," + vis.height + ")")
//
//  vis.xLabel
//  .attr("x", vis.width)
//  .attr("y", vis.height-6);
//
//  vis.yLabel
//  .attr("y", 6)
//  .attr("dy", ".71em");
//
//  vis.updateVis();
//
//}