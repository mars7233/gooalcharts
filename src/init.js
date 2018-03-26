import * as d3 from 'd3';
import GooalCharts from './gooalcharts';
import GooalColumn from './gooalcolumn';

var containerWidth, containerHeight = 0;
var titleBox, axisBox, legendBox, drawBox = "";
var chartType = ""

// 初始化入口
function chartsInit(dom, options) {
    // 判断图表类型
    chartType = options.type;
    if (chartType == "column") {
        var column = new GooalColumn(dom, options);
        column.draw(dom, options);
    }
}

export default function (dom, options) {
    return chartsInit(dom, options);

}