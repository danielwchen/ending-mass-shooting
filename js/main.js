var map1 = d3.squareMap.setAttr({
    colorSet: 'Reds',
    labelStyle: 'abbr'
}).render("data/gunspercapita.csv","#vis1");
var map = d3.squareMap.setAttr({
    colorSet: 'Greens',
    labelStyle: 'abbr'
}).render("data/gundeathspercapita.csv","#vis2");