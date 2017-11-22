/*
 *  Bar - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 */

 Bar = function(_parentElement) {

  this.parentElement = _parentElement;

  this.fin_data = [
    {resolution:"Suicide", num:37},
    {resolution:"Unarmed civilians", num:21},
    {resolution:"Armed Civilians", num:5},
    {resolution:"Armed off-duty police officers", num:2},
  ];

  this.height = 200;

  this.initVis();
};

Bar.prototype.initVis = function() {
  var vis = this;

  vis.x = d3.scaleBand()
  .rangeRound([0,800],.1)
  .paddingInner(0.1)
  .domain(vis.fin_data.map(function(d) { return d.resolution; }))
  .paddingInner(0.4)
  .paddingOuter(0.6);

  vis.y = d3.scaleLinear()
  .range([vis.height,0])
  .domain([0,40]);

  vis.xAxis = d3.axisBottom()
  .scale(vis.x);

  vis.createVis();
};

Bar.prototype.createVis = function() {
  var vis = this;

  vis.svg = d3.select(vis.parentElement).append('svg')
  .attr('width', '100%')
  .attr("viewBox", '0 0 800 240');

  vis.svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + vis.height + ")")
  .call(vis.xAxis);

  vis.svg.selectAll('rect')
  .data(vis.fin_data).enter()
  .append('rect')
  .attr("fill", "black")
  .attr("y", function(d) {
      return vis.y(d.num);
  })
  .attr("x", function(d) {
      return vis.x(d.resolution);
  })
  .attr("height", function(d) {
      return vis.height - vis.y(d.num);
  })
  .attr("width", vis.x.bandwidth())
  .attr("fill", "#cb181d");

  vis.svg.selectAll('.bar-label')
  .data(vis.fin_data).enter()
  .append('text')
  .attr('class', 'bar-label')
  .attr('text-anchor', 'middle')
  .attr("fill", "blue")
  .text(function(d) {
    return d.num;
  })
  .attr("y", function(d) {
      return vis.y(d.num);
  })
  .attr("x", function(d) {
      return vis.x(d.resolution) + 50;
  })
  .attr('dy', function(d, i) {
    if (i < 2) { return '1em'; }
    else { return '-0.1em'; }
  })
  .attr('fill', function(d, i) {
    if (i < 2) { return 'white'; }
    else { return '#cb181d'; }
  });
};