

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("#homicide").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
 

x.domain(d3.extent(data, function(d) { return data.year; }));
y.domain(d3.max(data, function(d) { return data.total; }));

svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));


