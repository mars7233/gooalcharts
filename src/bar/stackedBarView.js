import * as d3 from 'd3'
import { read } from 'fs';

let width = 800
let height = 400
let columnSVG
let tooltip
let xScale, yScale
let dataset
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
    dataBox = options.dataBox
}


function drawStackedBar(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }
    if (newWidth != undefined) {
        width = newWidth
    }
    columnSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.left = margin.left + 20 : {}
    axisBox.yAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}
    // 比例尺
    let primaryItem, secondaryItem
    primaryItem = data.categoryList
    secondaryItem = data.keyList
    dataset = data.value

    let stackMax = d3.max(dataset, function (d) {
        return d3.max(d, function (d) { return d[1] })
    })

    let stackMin = d3.min(dataset, function (d) {
        return d3.min(d, function (d) { return d[0] })
    })
    // 比例尺
    let yScale = d3.scaleLinear()
        .domain([stackMin, stackMax])
        .rangeRound([height - margin.bottom - margin.top, 0])

    let zScale = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    //隐形坐标轴测坐标宽度 
    let hideYAxis = columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    xScale = d3.scaleBand()
        .domain(primaryItem)
        .range([0, width - margin.right - margin.left])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    columnSVG.append("svg")
        .selectAll("g")
        .data(dataset)
        .enter().append("g")
        .attr("fill", function (d) { return zScale(d.key) })
        .attr("normalColor", function (d) { return zScale(d.key) })
        .selectAll("rect")
        .data(function (d) { return d })
        .enter()
        .append("rect")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("width", xScale.bandwidth)
        .attr("x", function (d, i) { return margin.left + xScale(d.key) })
        .attr("y", function (d, i) { return height - margin.bottom })
        .transition()
        .duration(500)
        .attr("y", function (d, i) { return margin.top + yScale(d[1]) })
        .attr("height", function (d) { return (yScale(d[0]) - yScale(d[1])) })

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

export default function (dom, data, opt, newWidth) {
    return drawStackedBar(dom, data, opt, newWidth)
}