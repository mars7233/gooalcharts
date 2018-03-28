import * as d3 from 'd3';
import drawBar from './barView';
import { defaultEvents as mouseDefault } from './mouseEvents';

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
function presenter(dom, options) {
  // 读取配置
  readConfig(options);

  // tooltip 初始化
  if (dataBox.tooltip.show == "true") {
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

  // 加载鼠标默认事件
  mouseDefault(barContainer, tooltip);

  // 返回bar容器
  return barContainer;
}

export default function (dom, options) {
  return presenter(dom, options);
}

