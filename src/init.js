import * as d3 from 'd3';
import GooalCharts from './gooalcharts';
import column from "./gooal-column";

var containerWidth, containerHeight = 0;
var container = ""
var titleBox, axisBox, legendBox, drawBox = "";
var chartType = ""

// 初始化入口
function chartsInit(dom, options) {
    // 初始化容器
    container = new GooalCharts(dom, options).container;

    // 判断图表类型
    chartType = options.type;
    if (chartType == "column") {
        column(container, options);
    }
}

export default function (dom, options) {
    return chartsInit(dom, options);

}