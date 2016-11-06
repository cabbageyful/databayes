
var margin = {top: 30, right: 20, bottom: 30, left: 20},
    width = 475 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select('body')
    .append('svg')
    .append('width', width + margin.left + margin.right)
    .append('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.TotalHomicides); });

d3.csv('/csv/totalhomicides.csv', function(error, data) {

    // turns from str to int
    d.TotalHomicides = +d.TotalHomicides;
    return d;

}, function(error, data) {
    if (error) throw error;

    x.domain(d3.extent(data, function(d) { return d.Year; }));
    y.domain(d3.extent(data, function(d) { return d.TotalHomicides; }));

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
});

