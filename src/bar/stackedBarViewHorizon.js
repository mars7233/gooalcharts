import * as d3 from 'd3'
import { read } from 'fs';

let width = 800
let height = 400
let columnSVG
let tooltip
let xScale, yScale
let commonOpt, axisBox, dataBox
let dataset

// 读取配置文件
function readConfig(options) {
    commonOpt = options
}

function drawStackedBarHori(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 40, left: 20 }
    if (newWidth != undefined) {
        width = newWidth
    }
    columnSVG = dom

    readConfig(opt)
    let primaryItem, secondaryItem
    primaryItem = data.primary
    secondaryItem = data.secondary
    dataset = data.value

    let stackMax = d3.max(dataset, function (d) {
        return d3.max(d, function (d) { return d[1] })
    })

    let stackMin = d3.min(dataset, function (d) {
        return d3.min(d, function (d) { return d[0] })
    })
    // 比例尺
    yScale = d3.scaleBand()
        .domain(primaryItem)
        .range([height - margin.top - margin.bottom , 0])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    let zScale = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    //隐形坐标轴测坐标宽度 
    let hideYAxis = columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    let xScale = d3.scaleLinear()
        .domain([stackMin, stackMax])
        .rangeRound([ 0, width - margin.left - margin.right])

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
        .attr("height", yScale.bandwidth())
        .attr("y", function (d, i) { return margin.top + yScale(d.primaryItem) })
        .attr("x", function (d, i) { return margin.left  })
        .transition()
        .attr("x", function (d, i) { return margin.left + xScale(d[0]) })
        .attr("width", function (d) { return (xScale(d[1]) - xScale(d[0])) })

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale }

}

export default function (dom, data, opt, newWidth) {
    return drawStackedBarHori(dom, data, opt, newWidth)
}