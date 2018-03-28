import * as d3 from 'd3';
import GooalCharts from './gooalcharts';
import GooalBar from './bar/gooalbar';

var containerWidth, containerHeight = 0;
var titleBox, axisBox, legendBox, drawBox = "";
var chartType = ""
var chart;

// 初始化入口
function chartsInit(dom, options) {
    // 判断图表类型
    chartType = options.type;
    if (chartType == "bar") {
        chart = new GooalBar(dom, options);
        chart.draw();
        console.log(chart.getBarSVG())
    }
    return chart;
}

export default function (dom, options) {
    return chartsInit(dom, options);

}