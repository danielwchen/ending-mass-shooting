
// var map2 = d3.squareMap.setAttr({
//     labelStyle: 'abbr',
//     colorNumber: 6,

// }).render("data/gundeathspercapita.csv","#vis2");
var map1 = d3.squareMap.setAttr({
    labelStyle: 'abbr',
    scale: d3.scaleThreshold().domain([0,10,20,100]),
    legend: "Firearms per 1,000 people")
}).render("data/gunspercapita.csv","#vis1");