import * as d3 from 'd3'

var width = 800
var height = 400
var margin = { top: 10, right: 10, bottom: 40, left: 50 }
var scatterSVG
var xScale, yScale
var commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
}

function drawScatter(dom, data, opt, newWidth) {
    if (newWidth == undefined) {
        console.log("scatter no new Width")
    } else {
        width = newWidth
    }
    scatterSVG = dom
    readConfig(opt)
    data = randomData(300)

    xScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(function (d) { return d.key }))])
        .rangeRound([0, width - margin.right - margin.left])

    yScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(function (d) { return d.value }))])
        .rangeRound([height - margin.bottom - margin.top, 0])

    var xAxis = d3.axisBottom().scale(xScale)
    var yAxis = d3.axisLeft().scale(yScale)
    scatterSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
        .attr("class", "xAxis")
        .call(xAxis)

    scatterSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "yAxis")
        .call(yAxis)


    scatterSVG.selectAll(".mydot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "mydot")
        .attr("r", 5)
        .attr("cx", function (d) { return margin.left + xScale(d.key) })
        .attr("cy", function (d) { return margin.top + yScale(d.value) })
        .attr("opacity", 0.7)
        .style("fill", "#4292c6");

    return scatterSVG
}

function randomData(samples) {
    var data = []
    for (i = 0; i < samples; i++) {
        var newKey = Math.floor(Math.random() * 300);
        var newValue = Math.floor(Math.random() * 300);
        var tempdata = { "key": newKey, "value": newValue }
        data.push(tempdata);
    }
    return data;
}

export default function (dom, data, opt, newWidth) {
    drawScatter(dom, data, opt, newWidth)
}