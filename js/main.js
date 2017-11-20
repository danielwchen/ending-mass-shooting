console.log('check');
var pie = new Pie("#vis-pie");
var pie2 = new Pie2("#vis-pie2");
var bar = new Bar("#vis-bar");
var map1 = d3.squareMap.render("data/gunspercapita.csv","#vis1");
var map2 = d3.squareMap2.render("data/gundeathspercapita.csv","#vis2");
var scatter = new Scatter("#vis3", 400, 300);