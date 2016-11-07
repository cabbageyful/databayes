
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y0 = d3.scaleLinear().range([height, 0]);
var y1 = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y0(d.TotalBudget); });

var valueline2 = d3.line()
  .x(function(d) { return x(d.Year); })
  .y(function(d) { return y1(d.TotalHomicides); });

var valueline3 = d3.line()
  .x(function(d) { return x(d.Year); })
  .y(function(d) {return y0(d.CureViolencefunding); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#homicide").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("d3data.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.Year = parseTime(d.Year);
      d.TotalBudget = +d.TotalBudget;
      d.TotalHomicides = +d.TotalHomicides;
      d.CureViolencefunding = +d.CureViolencefunding;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y0.domain([0, d3.max(data, function(d) { return Math.max(d.TotalBudget); })]);
  y1.domain([0, d3.max(data, function(d) { return Math.max(d.TotalHomicides); })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  svg.append('path')
      .data([data])
      .attr('class', 'line')
      .style('stroke', 'red')
      .attr('d', valueline2);

  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style('stroke', 'green')
      .attr("d", valueline3);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .attr('class', 'axisMoney')
      .call(d3.axisLeft(y0));

  svg.append("g")
      .attr('class', 'axisDeath')
      .call(d3.axisLeft(y1));
});


var margin = {top: 30, right: 20, bottom: 30, left: 20},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var svg = d3.select('#homicide').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Year,TotalHomicides
var data = [
    {year: 1995, total: 828},
    {year: 1996, total: 796},
    {year: 1997, total: 761},
    {year: 1998, total: 704},
    {year: 1999, total: 643},
    {year: 2000, total: 633},
    {year: 2001, total: 667},
    {year: 2002, total: 656},
    {year: 2003, total: 601},
    {year: 2004, total: 453},
    {year: 2005, total: 602},
    {year: 2006, total: 471},
    {year: 2007, total: 448},
    {year: 2008, total: 513},
    {year: 2009, total: 459},
    {year: 2010, total: 436},
];

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(data.year); })
    .y(function(d) { return y(data.total); });
 

x.domain(d3.extent(data, function(d) { return data.year; }));
y.domain(d3.extent(data, function(d) { return data.total; }));

svg.append('path')
    .data(data)
    .attr('class', 'line')
    .attr('d', line);

svg.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

svg.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y))
 .append('text')
    .attr('y', 10)
    .attr('dy', '0.71em')
    .style('text-anchor', 'end')
    .text('Total Homicides');

