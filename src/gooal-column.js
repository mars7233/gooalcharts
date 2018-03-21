import * as d3 from 'd3';
// fake data
var dataset_1 = [];
for (var i = 0; i < 20; i++) {
  var newNumber = Math.floor(Math.random() * 300);
  dataset_1.push(newNumber);
}
var w = 1200;
var h = 400;
var barPadding = 5;
var padding = { top: 40, right: 40, bottom: 40, left: 40 };
var rectWidth = (w - padding.left - padding.right - dataset_1.length * barPadding) / dataset_1.length;
var rectStep = rectWidth + barPadding;

function drawSimple(dom, options) {

  // 绘制容器
  var svg = d3.select(dom).append("svg").attr("width", w).attr("height", h);
  console.log(dom);
  // 绘制图
  svg.selectAll("rect")
    .data(dataset_1)
    .enter()
    .append("rect")
    .attr("class", "myrect")
    .on("mouseover", handleMouseOver)// function (d, i) { d3.select(this).style("fill", "brown"); })
    .on("mouseout", handleMouseOut)//function (d, i) { d3.select(this).style("fill", "steelblue"); })
    .attr("x", function (d, i) { return padding.left + i * rectStep; })
    .attr("y", function (d, i) { return h - padding.bottom; })
    .transition()
    .attr("y", function (d, i) { return h - d - padding.bottom; })
    .attr("width", rectWidth)
    .attr("height", function (d) { return d })
    .attr("fill", function (d) { return "steelblue" });


  // // 绘制数值
  // svg.selectAll("text")
  //   .data(dataset_1)
  //   .enter()
  //   .append("text")
  //   .text(function (d) { return d; })
  //   .attr("x", function (d, i) { return padding.left + i * (w / dataset_1.length) + w / dataset_1.length / 2 - 2; })
  //   .attr("y", function (d, i) { return h - d + 13; })
  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", "13px")
  //   .attr("fill", "white")
  //   .attr("text-anchor", "middle");

  // 比例尺
  var xScale = d3.scaleBand().domain(d3.range(1, dataset_1.length + 1)).range([padding.left, w - padding.right]);
  var yScale = d3.scaleLinear().domain([0, d3.max(dataset_1)]).range([h - padding.top - padding.bottom, 0]);
  // 绘制坐标轴
  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);
  svg.append("g")
    .attr("transform", "translate(" + 0 + "," + (h - padding.bottom) + ")")
    .call(xAxis);
  svg.append("g")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .call(yAxis);
  console.log(d3.range(1, dataset_1.length));
}


function updateData(svg, dataset, options) {
  var updateRect = svg.selectAll("rect")
    .data(dataset);
  var enterRect = updateRect.enter();
  var exitRect = updateRect.exit();
  // 更新数据
  updateRect.attr("x", function (d, i) { return padding.left + i * rectStep; })
    .attr("y", function (d, i) { return h - d - padding.bottom; })
    .attr("width", rectWidth)
    .attr("height", function (d) { return d; })
    .attr("fill", function (d) { return "steelblue" });

  // 增加数据

}

function handleMouseOver(d) {
  console.log("mouseover");
  d3.select(this).style("fill", "brown");
}
function handleMouseOut(d) {
  console.log("mouseout");
  d3.select(this).style("fill", "steelblue");
}
export default function (dom, options) {
  return drawSimple(dom, options);
}