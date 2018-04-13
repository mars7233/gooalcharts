import * as d3 from 'd3';
import GooalCharts from './gooalcharts';
import GooalBar from './bar/gooalbar';

let containerWidth, containerHeight = 0;
let titleBox, axisBox, legendBox, drawBox = "";
let chartType = ""
let chart;
let parentWidths = [];
let opt;

// 初始化入口
function chartsInit(dom, options) {
    opt = options;
    let verify = verifyParameter(dom, options);
    if (verify == false) {
        console.log("Init fail: wrong dom elemnt or options.");
        return 0;
    }

    window.addEventListener('resize', resize(500));
    // 判断图表类型
    chartType = options.type;
    if (chartType == "bar" || chartType == "groupedbar" || chartType == "stackedbar") {
        chart = new GooalBar(dom, options);
        chart.draw();
    }
    return chart;
}

function resize(delay) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
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