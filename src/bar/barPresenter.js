import drawBar from './barView';
import drawGroupedBar from './groupedBarView';
import drawStackedBar from './stackedBarView';
import { defaultEvents as mouseDefault } from './mouseEvents';
import { handleBarData, handleGroupedBarData, handleStackedBar } from './dataEvents';
import { drawGroupedBarLegend, drawStackBarLegend } from './legend';

var width = 800;
var height = 400;
var barContainer, dataSVG;
var tooltip;
var xScale, yScale;
var commonOpt, axisBox, dataBox;
var data;

// 读取配置文件
function readConfig(options) {
  commonOpt = options;
  axisBox = commonOpt.axisBox;
  dataBox = commonOpt.dataBox;

}

// 绘制
function presenter(dom, options, newWidth) {

  if (newWidth == undefined) {
    console.log("no new Width")
  } else {
    width = "";
    // console.log(width || newWidth)
  };

  // 读取配置
  readConfig(options);

  // 绘制容器
  barContainer = dom
    .append("svg")
    .attr("width", width || newWidth)
    .attr("height", height)
    .attr("class", "column");

  if (options.type == "bar") {
    data = handleBarData(options);
    drawBar(barContainer, data, options, newWidth);
  } else if (options.type == "groupedbar") {
    data = handleGroupedBarData(options);
    drawGroupedBar(barContainer, data, options, newWidth);
  } else if (options.type == "stackedbar") {
    data = handleStackedBar(options)
    drawStackedBar(barContainer, data, options, newWidth);
  }

  // 加载鼠标默认事件
  mouseDefault(barContainer);

  // 返回bar容器
  return barContainer;
}

export default function (dom, options, newWidth) {
  return presenter(dom, options, newWidth);
}