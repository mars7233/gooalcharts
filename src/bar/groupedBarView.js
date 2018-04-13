import * as d3 from 'd3'
import { getObjFirstValue as first } from './dataEvents'

var width = 800
var height = 400
var columnSVG
var tooltip
var xScale_0, xScale_1, yScale
var commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    dataBox = commonOpt.dataBox
}

function drawGroupedBar(dom, data, opt, newWidth) {
    var margin = { top: 10, right: 10, bottom: 40, left: 20 }
    if (newWidth != undefined) {
        width = newWidth
    }
    var primaryItem, secondaryItem
    primaryItem = data.primary
    secondaryItem = data.secondary

    columnSVG = dom
    // 比例尺
    yScale = d3.scaleLinear()
        .domain([0, d3.max(opt.data, function (d) {
            return d3.max(secondaryItem, function (key) {
                return d[key]
            })
        })])
        .range([height - margin.bottom - margin.top, 0])

    var zScale = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    //隐形坐标轴测坐标宽度 
    var hideYAxis = columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    var yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    xScale_0 = d3.scaleBand()
        .domain(primaryItem)
        .range([0, width - margin.right - margin.left])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    xScale_1 = d3.scaleBand()
        .domain(secondaryItem)
        .range([0, xScale_0.bandwidth()])
        .paddingInner(0.2)

    columnSVG.append("svg")
        .selectAll("g")
        .data(opt.data)
        .enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + (margin.left + xScale_0(first(d))) + "," + "0" + ")" })
        .selectAll("rect")
        .data(function (d) { return secondaryItem.map(function (key) { return { key: key, value: d[key] } }) })
        .enter()
        .append("rect")
        .attr("class", "myrect")
        .attr("x", function (d) { return xScale_1(d.key) })
        .attr("y", function (d, i) { return height - margin.bottom })
        .attr("width", xScale_1.bandwidth())
        .transition()
        .attr("y", function (d) { return margin.top + yScale(d.value) })
        .attr("height", function (d) { return height - yScale(d.value) - margin.bottom - margin.top })
        .attr("fill", function (d) { return zScale(d.key) })

    return { "svg": columnSVG, "margin": margin, "xScale": xScale_0, "yScale": yScale }
}

export default function (dom, data, opt, newWidth) {
    return drawGroupedBar(dom, data, opt, newWidth)
}