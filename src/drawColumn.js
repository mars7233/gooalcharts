import * as d3 from 'd3';
// fake data
var dataset_1 = [];
for (var i = 0; i < 20; i++) {
  var newNumber = Math.floor(Math.random() * 300);
  dataset_1.push(newNumber);
}
var w = 800;
var h = 400;
var barPadding = 5;
var margin = { top: 10, right: 10, bottom: 20, left: 40 };
var rectWidth = (w - margin.left - margin.right - dataset_1.length * barPadding) / dataset_1.length;
var rectStep = rectWidth + barPadding;
var tooltip;
var xScale;
var yScale;
var columnOpt;

function drawColumn(dom, options) {
  columnOpt = options;

  // tooltip 初始化
  tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.0)
    .style("position", "absolute")
    .style("width", "120px")
    .style("height", "auto")
    .style("font-family", "simsun")
    .style("font-size", "14px")
    .style("text-align", "center")
    .style("border-style", "solid")
    .style("border-width", "1px")
    .style("background-color", "white")
    .style("border-radius", "5px");

  // 绘制容器
  var svg = dom
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "column");

  // 比例尺
  xScale = d3.scaleBand().domain(d3.range(1, dataset_1.length + 1)).range([margin.left, w - margin.right]);
  yScale = d3.scaleLinear().domain([0, d3.max(dataset_1)]).rangeRound([h - margin.bottom - margin.top, 0]);

  // 绘制坐标轴
  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);
  svg.append("g")
    .attr("transform", "translate(" + 0 + "," + (h - margin.bottom) + ")")
    .attr("class", "xAxis")
    .call(xAxis);
  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "yAxis")
    .call(yAxis);

  // 绘制图
  svg.selectAll("rect")
    .data(dataset_1)
    .enter()
    .append("rect")
    .attr("class", "myrect")
    .on("mouseover", handleMouseOver)
    .on("mousemove", handleMouseMove)
    .on("mouseout", handleMouseOut)
    .attr("x", function (d, i) { return margin.left + i * rectStep })
    .attr("y", function (d, i) { return h - margin.bottom; })
    .transition()
    .attr("y", function (d, i) { return margin.top + yScale(d) })
    .attr("width", rectWidth)
    .attr("height", function (d) { console.log(d); return h - yScale(d) - margin.bottom - margin.top; })
    .attr("fill", function (d) { return "steelblue"; });
}

function updateData(svg, dataset, options) {
  var updateRect = svg.selectAll("rect")
    .data(dataset);
  var enterRect = updateRect.enter();
  var exitRect = updateRect.exit();
  // 更新数据
  updateRect.attr("x", function (d, i) { return margin.left + i * rectStep; })
    .attr("y", function (d, i) { return h - d - margin.bottom; })
    .attr("width", rectWidth)
    .attr("height", function (d) { return d; })
    .attr("fill", function (d) { return "steelblue" });

  // 增加数据

}

// 事件绑定 --- 鼠标事件
function handleMouseOver(d) {
  console.log(d)
  // 悬浮高亮
  d3.select(this).style("fill", "brown");

  // tooltip
  tooltip.html("  数据: " + d + "  ")
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY + 20) + "px")
    .style("opacity", 1.0);
}

function handleMouseMove(d) {
  tooltip.style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY + 20) + "px");
}

function handleMouseOut(d) {
  // 取消高亮
  d3.select(this).style("fill", "steelblue");
  tooltip.style("opacity", 0.0);
}



export default function (dom, options) {
  return drawColumn(dom, options);
}