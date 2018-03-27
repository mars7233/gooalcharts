import * as d3 from 'd3';
import drawBar from './barView';

var width = 800;
var height = 400;
var barContainer, dataSVG;
var tooltip;
var xScale, yScale;
var commonOpt, axisBox, dataBox;

// 读取配置文件
function readConfig(options) {
  commonOpt = options;
  axisBox = commonOpt.axisBox;
  dataBox = commonOpt.dataBox;
}

// 绘制
function drawColumn(dom, options) {

  readConfig(options);
  if (dataBox.tooltip.show == "true") {
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
  }

  // 绘制容器
  barContainer = dom
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "column");

  // 绘制图及坐标轴
  drawBar(barContainer, options);

  // 处理鼠标事件
  mouseEvent();

  return barContainer;
}

// 事件绑定 --- 鼠标事件
function mouseEvent() {
  barContainer.selectAll(".myrect")
    .on("mouseover.highlight", mouseOverHighlight)
    .on("mouseover.tooltip", mouseOverTooltip)
    .on("mousemove.highlight", handleMouseMove)
    .on("mouseout.highlight", handleMouseOut)
}

function mouseOverHighlight(d) {
  // 悬浮高亮
  d3.select(this).style("fill", "brown");
}
function mouseOverTooltip(d) {
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

