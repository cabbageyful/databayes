
var width = 475,
    height = 500;

var svg = d3.select('#homicide'),
    margin = {top: 30, right: 20, bottom: 30, left: 20},
    width = +svg.attr(width) - margin.left - margin.right,
    height = +svg.attr(height) - margin.top - margin.bottom,
    g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

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

g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y))
 .append('text')
    .attr('y', 10)
    .attr('dy', '0.71em')
    .style('text-anchor', 'end')
    .text('Total Homicides');

g.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line);

