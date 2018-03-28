import * as d3 from 'd3';

// fake data
var dataset = [];
for (var i = 0; i < 20; i++) {
    var newNumber = Math.floor(Math.random() * 300);
    dataset.push(newNumber);
}

var width = 800;
var height = 400;
var margin = { top: 5, right: 10, bottom: 20, left: 40 };
var columnSVG;
var tooltip;
var xScale, yScale;
var commonOpt, axisBox, dataBox;

// 读取配置文件
function readConfig(options) {
    commonOpt = options;
    axisBox = commonOpt.axisBox;
    dataBox = commonOpt.dataBox;
}


function drawBar(dom, opt) {
    columnSVG = dom;
    readConfig(options);

    // 比例尺
    xScale = d3.scaleBand()
        .domain(d3.range(1, dataset.length + 1))
        .range([1, width - margin.right - margin.left])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .rangeRound([height - margin.bottom - margin.top, 0]);

    // 绘制坐标轴
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);
    columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
        .attr("class", "xAxis")
        .call(xAxis);
    columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "yAxis")
        .call(yAxis);

    // 绘制数据
    columnSVG.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "myrect")
        .attr("x", function (d, i) { return margin.left + xScale(i + 1); })
        .attr("y", function (d, i) { return height - margin.bottom; })
        .attr("width", xScale.bandwidth)
        .transition()
        .attr("y", function (d, i) { return margin.top + yScale(d); })
        .attr("height", function (d) { return height - yScale(d) - margin.bottom - margin.top; })
        .attr("fill", function (d) { return "steelblue"; });

    return columnSVG;
}

export default function (dom, opt) {
    return drawBar(dom, opt)
}