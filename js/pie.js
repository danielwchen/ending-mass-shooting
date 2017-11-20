/*
 *  Pie - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 */

 Pie = function(_parentElement) {

  this.parentElement = _parentElement;

  this.winWidth = d3.select(_parentElement).node().getBoundingClientRect().width;
  ;
  this.winHeight = this.winWidth*0.5;


  this.fin_data = [{label: "Before Police", num:65}, {label: "After Police", num:95}];

  this.colors = colorbrewer["Reds"][4];


  this.initVis();
};

Pie.prototype.initVis = function() {

  var vis = this;

  vis.createVis();

};

Pie.prototype.createVis = function() {
  var vis = this;

  vis.width = vis.winWidth;
  vis.height = vis.winHeight;
  vis.radius = Math.min(vis.width, vis.height) / 3;

  vis.svg = d3.select(vis.parentElement).append("svg")
  .attr('width', '100%')
  // .attr('viewBox', '0 0 ' + size + ' ' + size);
  .attr("viewBox", '0 0 900 300');
  // .attr("preserveAspectRatio", "xMinYMin meet");

  vis.g = vis.svg.append("g")
  .attr("transform", "translate(" + vis.width / 3 + "," + vis.height / 3 + ")");

  vis.color = d3.scaleOrdinal([vis.colors[3], vis.colors[0]]);

  vis.path = d3.arc()
  .outerRadius(vis.radius - 10)
  .innerRadius(0);

  vis.labelArc = d3.arc()
  .outerRadius(vis.radius)
  .innerRadius(vis.radius);

  vis.pie = d3.pie()
  .sort(null)
  .value(function(d) { return d.num; });


  vis.arc = vis.g.selectAll(".arc")
  .data(vis.pie(vis.fin_data))
  .enter().append("g")
  .attr("class", "arc");

  vis.arc.append("path")
  .attr("d", vis.path)
  .style("fill", function(d) {
    return vis.color(d.data.num);
  });

  vis.arc.append("text")
  .attr("transform", function(d) { return "translate(" + vis.labelArc.centroid(d) + ")"; })
  .attr("dy", "-0.4em")
  .attr("dx", "-0.2em")
  .text(function(d,i) {
    if (i==0) {
      return "40%";
    } else { return ""; }
  })
  .attr("class", "pie-percent");

  vis.arc.append("text")
  .attr("transform", function(d) { return "translate(" + vis.labelArc.centroid(d) + ")"; })
  .attr("dy", "0em")
  .attr("dx", "1em")
  .text(function(d,i) {
    if (i==0) {
      return "of analyzed shootings ended";
    } else { return ""; }
  })
  .attr("class", "pie-label");

  vis.arc.append("text")
  .attr("transform", function(d) { return "translate(" + vis.labelArc.centroid(d) + ")"; })
  .attr("dy", "1.3em")
  .attr("dx", "1.5em")
  .text(function(d,i) {
    if (i==0) {
      return "before police arrival.";
    } else { return ""; }
  })
  .attr("class", "pie-label");

   

  vis.updateVis();
};

Pie.prototype.updateVis = function() {
  var vis = this;




}

//Pie.prototype.resize = function(w, h) {
//  var vis = this;
//
//  vis.winWidth = w;
//  vis.winHeight = h;
//
//  vis.updateVis();
//
//}