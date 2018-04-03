import * as d3 from 'd3';
import GooalCharts from './gooalcharts';
import GooalBar from './bar/gooalbar';

var containerWidth, containerHeight = 0;
var titleBox, axisBox, legendBox, drawBox = "";
var chartType = ""
var chart;
var parentWidths = [];

// 初始化入口
function chartsInit(dom, options) {

    var verify = verifyParameter(dom, options);
    if (verify == false) {
        console.log("Init fail: wrong dom elemnt or options.");
        return 0;
    }

    window.addEventListener('resize', resize(500));
    // 判断图表类型
    chartType = options.type;
    if (chartType == "bar" || chartType == "groupedbar") {
        chart = new GooalBar(dom, options);
        chart.draw();
    }
    return chart;
}

function resize(delay) {
    var timer = null;
    return function () {
        clearTimeout(timer);
        var parentNode = document.getElementsByClassName("container")[0].parentNode;
        var parentWidth = parentNode.clientWidth;
        timer = setTimeout(function () {
            console.log(parentWidth);
            chart.redraw();
        }, delay);
    };
}

// 检验dom和options格式是否正确
function verifyParameter(dom, options) {
    return true;
}



export default function (dom, options) {
    return chartsInit(dom, options);

}