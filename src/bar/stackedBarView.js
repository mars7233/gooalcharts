import * as d3 from 'd3'

var width = 800
var height = 400
var margin = { top: 10, right: 10, bottom: 40, left: 80 }
var columnSVG
var tooltip
var xScale, yScale
var commonOpt, axisBox, dataBox
var dataset

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = commonOpt.axisBox
    dataBox = commonOpt.dataBox
}

function drawStackedBar(dom, data, opt, newWidth) {
    if (newWidth == undefined) {
        console.log("stackedbar no new Width")
    } else {
        width = newWidth
    }
    columnSVG = dom
    var primaryItem, secondaryItem
    primaryItem = data.primary
    secondaryItem = data.secondary
    dataset = data.value

    // var xKeys = data.primary
    var stackMax = d3.max(dataset, function (d) {
        return d3.max(d, function (d) { return d[1] })
    })
    var stackMin = d3.min(dataset, function (d) {
        return d3.min(d, function (d) { return d[0] })
    })

    var xScale = d3.scaleBand()
        .domain(primaryItem)
        .range([0, width - margin.right - margin.left])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    var yScale = d3.scaleLinear()
        .domain([stackMin, stackMax])
        .rangeRound([height - margin.bottom - margin.top, 0])

    var zScale = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    var xAxis = d3.axisBottom().scale(xScale)
    var yAxis = d3.axisLeft().scale(yScale)



    columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
        .attr("class", "xAxis")
        .call(xAxis)
    columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "yAxis")
        .call(yAxis)

    var xAxisBBox = d3.select(".xAxis").node().getBBox()
    var yAxisBBox = d3.select(".yAxis").node().getBBox()

    // 坐标轴标题
    // x轴
    columnSVG.append("text")
        .attr("class", "xTitle")
        .attr("transform", "translate(" + ((width - margin.left - margin.right) / 2 + margin.left) + "," + (height - margin.bottom + 15 + xAxisBBox.height) + ")")
        .attr("text-anchor", "middle")
        .text("Item")
    // y轴
    columnSVG.append("text")
        .attr("class", "yTitle")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left - yAxisBBox.width - 5)
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .text("Value")

    columnSVG.append("svg")
        .selectAll("g")
        .data(dataset)
        .enter().append("g")
        .attr("fill", function (d) { return zScale(d.key) })
        .selectAll("rect")
        .data(function (d) { return d })
        .enter()
        .append("rect")
        .attr("class", "myrect")
        .attr("width", xScale.bandwidth)
        .attr("x", function (d, i) { return margin.left + xScale(d.primaryItem) })
        .attr("y", function (d, i) { return height - margin.bottom })
        .transition()
        .attr("y", function (d, i) { return margin.top + yScale(d[1]) })
        .attr("height", function (d) { return (yScale(d[0]) - yScale(d[1])) })

    return columnSVG
}



export default function (dom, data, opt, newWidth) {
    return drawStackedBar(dom, data, opt, newWidth)
}