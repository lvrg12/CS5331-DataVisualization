var margin = {top: 40, right: 20, bottom: 30, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale
	// .linear()
	// .range([0,width],.1);
	.ordinal()
	.rangeRoundBands([0, width], .1);

var y = d3.scale
	.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
	.orient("bottom");
	// .rotate(90);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html( (d,i) => "<strong>Debt:</strong> <span style='color:red'>" + d[i+1800] + "</span>" );

// create svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

// load data
// d3.tsv("data/data.tsv", type, (error,data) => initSVG(data) );
d3.csv("data/data.1.csv", data => initJSON(data) );

// init json
var json = {};
function initJSON( data )
{
	for( country in data )
	{
		if( !data.hasOwnProperty(country) ) continue;

		var tmp = [];
		for( var y=1800; y<2016; y++ )
		{
			var obj = {}
			obj[y] = data[country][y] == "" ? undefined : +data[country][y] / 100;
			tmp.push( obj );
		}

		json[data[country]["Country Name"]] = { debt : tmp };
	}

	initSVG( json );
}

var what = [4,5,6,7,8];

// init svg
function initSVG( data )
{
	var arr = [...Array(2015-1800).keys()];
	arr.forEach( (v,i,a) => a[i]=v+1800 );

	x.domain( arr );
	// var m = 0;
	// for( var c in data )
	// {
	// 	if( !data.hasOwnProperty(c) ) continue;
	// 	m = d3.max( d3.values(data[c].debt) ) > m ? d3.max( d3.values(data[c].debt) ) : m;
	// }
	y.domain( [0,2.0] );

  	svg.append("g")
    	.attr("class", "x axis")
      	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Debt to GDP Ratio");

	// console.log(x.rangeBand());

	svg.selectAll(".bar")
		.data(data["United Kingdom"].debt)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", (d,i) => i *4 + 20 )
		.attr("width", x.rangeBand() )
		.attr("y", (d,i) => y(d[i+1800]) )
		.attr("height", (d,i) => height - y(d[i+1800]) )
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)

}

function type(d)
{
	d.frequency = +d.frequency;
	return d;
}