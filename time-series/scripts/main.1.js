const winw = window.innerWidth/1.05;
const winh = window.innerHeight/1.05;
var margin = {top: 40, right: 40, bottom: 40, left: 40};
var width = winw - margin.left - margin.right;
var height = winh - margin.top - margin.bottom;
var leftOffset = 40;

var formatPercent = d3.format(".0%");
var formatYear = d3.format("d");

var x = d3.time
	.scale()
	.range([0,width])
	// .ordinal()
	// .rangeRoundBands([0, width], .1);

var y = d3.scale
	.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
	.tickSize(-height)
	.tickFormat(formatYear)
	.ticks(20);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html( (d,i) => "<strong>Debt:</strong> <span style='color:red'>" + Math.round(d[i+1800]*100) + "%</span>" );

// create svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

// load data
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

// init svg
function initSVG( data )
{
	x.domain( [1800,2015] );
	y.domain( [0,3.0] );

  	svg.append("g")
    	.attr("class", "x axis")
      	.attr("transform", "translate(" + leftOffset + "," + height + ")")
		.call(xAxis)
		// .selectAll("text")
		// .attr("y", 0)
		// .attr("x", 10)
		// .attr("dy", ".35em")
		// .attr("transform", "rotate(-90)")
		// .style("text-anchor", "start");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Debt to GDP Ratio");

	svg.selectAll(".bar")
		.data(data["United Kingdom"].debt)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", (d,i) => x(i+1800) + leftOffset - winh/200 )
		.attr("width", winh/100 )
		.attr("y", (d,i) => y(d[i+1800]) )
		.attr("height", (d,i) => height - y(d[i+1800]) )
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)

	// svg.selectAll(".circle")
	// 	.data(data["United Kingdom"].debt)
	// 	.enter().append("circle")
	// 	.attr("class", "circle")
	// 	.attr("cx", (d,i) => x(i+1800) + leftOffset )
	// 	.attr("r", 3 )
	// 	.attr("cy", (d,i) => y(d[i+1800]) )
	// 	.on('mouseover', tip.show)
	// 	.on('mouseout', tip.hide)

}

function type(d)
{
	d.frequency = +d.frequency;
	return d;
}