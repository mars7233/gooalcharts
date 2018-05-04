import * as d3 from 'd3'
import { get } from 'http';
import { getObjFirstValue as first, getObjKey } from '../tools/gooalArray';

let width = 800
let height = 400
let columnSVG
let tooltip
let yScale_0, yScale_1, xScale
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    if ("axisBox" in options) {
        axisBox = options.axisBox
    }
    if ("dataBox" in options) {
        dataBox = options.dataBox
    }
}


function drawGroupedBarHori(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }
    if (newWidth != undefined) {
        width = newWidth
    }

    columnSVG = dom
    readConfig(opt)

    if ("axisBox" in commonOpt) {
        let axisBox = commonOpt.axisBox
        if ("yAxis" in axisBox)
            if ("title" in axisBox.yAxis) {
                margin.left = margin.left + 20
            }
        if ("xAxis" in axisBox) {
            if ("title" in axisBox.xAxis) {
                margin.bottom = margin.bottom + 20
            }
        }
    }
    // 比例尺
    let primaryItem, secondaryItem
    primaryItem = data.categoryList
    secondaryItem = data.keyList
    let xMaxScale, yMaxScale
    if ("xAxis" in axisBox && "maxScale" in axisBox.xAxis) {
        xMaxScale = axisBox.xAxis.maxScale
    }
    if ("yAxis" in axisBox && "maxScale" in axisBox.yAxis) {
        yMaxScale = axisBox.yAxis.maxScale
    }

    yScale_0 = d3.scaleBand()
        .domain(primaryItem)
        .range([height - margin.bottom - margin.top, 0])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    yScale_1 = d3.scaleBand()
        .domain(secondaryItem)
        .range([yScale_0.bandwidth(), 0])
        .paddingInner(0.2)

    let zScale = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    //隐形坐标轴测坐标宽度 
    let hideYAxis = columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale_0))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    xScale = d3.scaleLinear()
        .domain([0, xMaxScale || d3.max(opt.data, function (d) {
            return d3.max(secondaryItem, function (key) {
                return d[key]
            })
        })])
        .range([0, width - margin.right - margin.left])

    columnSVG.append("svg")
        .selectAll("g")
        .data(opt.data)
        .enter()
        .append("g")
        .attr("transform", function (d) { return "translate(0," + (margin.bottom + yScale_0(first(d))) + ")" })
        .selectAll("rect")
        .data(function (d) { return secondaryItem.map(function (key) { return { category: key, key: first(d), value: d[key] } }) })
        .enter()
        .append("rect")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("y", function (d, i) { return yScale_1(d.category) - margin.bottom + margin.top })
        .attr("x", function (d) { return margin.left })
        .attr("height", yScale_1.bandwidth())
        .transition()
        .duration(500)
        .attr("width", function (d) { return xScale(d.value) })
        .attr("fill", function (d) { return zScale(d.category) })

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale_0 }
}

export default function (dom, data, opt, newWidth) {
    return drawGroupedBarHori(dom, data, opt, newWidth)
}