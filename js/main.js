console.log('check');
var map1 = d3.squareMap.render("data/gunspercapita.csv","#vis1");
var map2 = d3.squareMap2.render("data/gundeathspercapita.csv","#vis2");
var scatter = new Scatter("#vis3", 400, 300);