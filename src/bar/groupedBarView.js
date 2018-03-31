import * as d3 from 'd3';
import dataEvents from './dataEvents';

var width = 800;
var height = 400;
var margin = { top: 10, right: 10, bottom: 40, left: 50 };
var columnSVG;
var tooltip;
var xScale_0, xScale_1, yScale;
var commonOpt, axisBox, dataBox;

// 读取配置文件
function readConfig(options) {
    commonOpt = options;
    axisBox = commonOpt.axisBox;
    dataBox = commonOpt.dataBox;
}

function drawGroupedBar(dom, data, opt) {
    columnSVG = dom;
    var name = data.columns.slice(1);
    // 比例尺
    xScale_0 = d3.scaleBand()
        .domain(data.map(function (d) { return d.State }))
        .range([0, width - margin.right - margin.left])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    xScale_1 = d3.scaleBand()
        .domain(name)
        .range([0, xScale_0.bandwidth()])
        .paddingInner(0.2);

    yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d3.max(name, function (key) {
                return d[key];
            })
        })])
        // .domain([0,5000000])
        .range([height - margin.bottom - margin.top, 0]);

    var zScale = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis_0 = d3.axisBottom().scale(xScale_0);
    var xAxis_1 = d3.axisBottom().scale(xScale_1);
    var yAxis = d3.axisLeft().scale(yScale);


    columnSVG.append("g")
        .attr("class", "xAxis_0")
        .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
        .call(xAxis_0);

    columnSVG.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);

    columnSVG.append("svg")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + (margin.left + xScale_0(d.State)) + "," + "0" + ")" })
        .selectAll("rect")
        .data(function (d) { return name.map(function (key) { return { key: key, value: d[key] }; }); })
        .enter()
        .append("rect")
        .attr("class", "myrect")
        .attr("x", function (d) { return xScale_1(d.key); })
        .attr("y", function (d) { return margin.top + yScale(d.value); })
        .attr("width", xScale_1.bandwidth())
        .attr("height", function (d) { return height - yScale(d.value) - margin.bottom - margin.top })
        .attr("fill", function (d) { return zScale(d.key); });
}

function handleGroupedBarData(dom, opt) {
    d3.csv("./data.csv", function (d, i, columns) {
        for (var i = 1, n = columns.length; i < n; ++i) { d[columns[i]] = +d[columns[i]]; }

        return d;
    }, function (error, data) {
        // console.log(data);
        var name = data.columns.slice(1);
        console.log(name)
        drawGroupedBar(dom, data);
        return { "name": name, "data": data };
    })
}


export default function (dom, opt) {
    return handleGroupedBarData(dom, opt);
}