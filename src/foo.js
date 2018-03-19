import * as d3 from 'd3';

var dataset_1 = [];
var dataset_2 = [];
for (var i = 0; i < 40; i++) {
  var newNumber = Math.floor(Math.random() * 300);
  dataset_1.push(newNumber);
}
var w = 1200;
var h = 600;
var h_2 = 300;
var barPadding = 5;
var padding = 20;

function drawSimple(dom, options) {
  // console.log(d3);
  // 柱状图
  var svg_1 = d3.select(dom).append("svg").attr("width", w).attr("height", h_2);
  console.log(dom);
  svg_1.selectAll("rect")
    .data(dataset_1)
    .enter()
    .append("rect")
    .attr("x", function (d, i) { return i * (w / dataset_1.length); })
    .attr("y", function (d, i) { return h_2 - d; })
    .attr("width", w / dataset_1.length - barPadding)
    .attr("height", function (d) { return d; })
    .attr("fill", function (d) { return "rgb(0," + d + ",0)"; });

  svg_1.selectAll("text")
    .data(dataset_1)
    .enter()
    .append("text")
    .text(function (d) { return d; })
    .attr("x", function (d, i) { return i * (w / dataset_1.length) + w / dataset_1.length / 2 - 2; })
    .attr("y", function (d, i) { return h_2 - d + 13; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "13px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");

  var dataset_2_x_max = d3.max(dataset_2, function (d) { return d[0]; });
  var dataset_2_y_max = d3.max(dataset_2, function (d) { return d[1]; });
  // 比例尺
  var xScale = d3.scaleLinear().domain([0, dataset_2_x_max]).range([padding, w - padding]);
  var yScale = d3.scaleLinear().domain([0, dataset_2_y_max]).range([padding, h_2 - padding]);
}
export default function (dom, options) {
  return drawSimple(dom, options);
}
