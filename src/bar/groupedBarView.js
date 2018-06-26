import * as d3 from 'd3'
import { getObjFirstValue as first, getObjKey } from '../tools/gooalArray';

let width = 800
let height = 400
let columnSVG
let tooltip
let xScale_0, xScale_1, yScale
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
    dataBox = options.dataBox
}


function drawGroupedBar(dom, data, opt, layout) {
    let margin = layout.margin
    width = layout.data.width
    height = layout.data.height

    columnSVG = dom
    readConfig(opt)
    axisBox.xAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}
    axisBox.yAxis.title != "" ? margin.left = margin.left + 20 : {}

    let primaryItem, secondaryItem
    primaryItem = data.categoryList
    secondaryItem = data.keyList

    // 比例尺
    let xMaxScale, yMaxScale
    if ("xAxis" in axisBox && "maxScale" in axisBox.xAxis) {
        xMaxScale = axisBox.xAxis.maxScale
    }
    if ("yAxis" in axisBox && "maxScale" in axisBox.yAxis) {
        yMaxScale = axisBox.yAxis.maxScale
    }
    yScale = d3.scaleLinear()
        .domain([0, yMaxScale || d3.max(opt.data, function (d) {
            return d3.max(secondaryItem, function (key) {
                return d[key]
            })
        })])
        .range([height - margin.bottom - margin.top, 0])

    let zScale = d3.scaleOrdinal()
        .range(dataBox.normalColor)


    drawFakeDataBox(commonOpt)
    let fakeAxis = d3.select("." + opt.type + "FakeAxisBox" + opt.id)

    //隐形坐标轴测坐标宽度 
    let hideYAxis = fakeAxis.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    hideYAxis.selectAll("text")
        .attr("font-size", "12px")
    hideYAxis.selectAll("text")
        .each(function (d, i) {
            if (d.length > commonOpt.axisBox.yAxis.maxStringLength) {
                this.innerHTML = String(d).slice(0, commonOpt.axisBox.yAxis.maxStringLength) + "..."
            }
        })
    let yAxisBBox = hideYAxis.node().getBBox()
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

    let bandwidth = xScale_1.bandwidth() > commonOpt.dataBox.maxBandWidth ? commonOpt.dataBox.maxBandWidth : xScale_1.bandwidth()
    columnSVG.append("svg")
        .selectAll("g")
        .data(opt.data)
        .enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + (margin.left + xScale_0(first(d))) + "," + "0" + ")" })
        .selectAll("rect")
        .data(function (d) { return secondaryItem.map(function (key) { return { category: key, key: first(d), value: d[key] } }) })
        .enter()
        .append("rect")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("x", function (d) { return xScale_1(d.category) })
        .attr("y", function (d, i) { return height - margin.bottom })
        .attr("width", function () {
            return bandwidth
        })
        .attr("transform", function () {
            return "translate(" + (xScale_1.bandwidth() / 2 - bandwidth / 2) + "," + 0 + ")"
        })
        .transition()
        .duration(500)
        .attr("y", function (d) { return margin.top + yScale(d.value) })
        .attr("height", function (d) { return height - yScale(d.value) - margin.bottom - margin.top })
        .attr("fill", function (d) { return zScale(d.category) })
        .attr("normalColor", function (d) { return zScale(d.category) })

    d3.select(".deletesoon").remove()

    return { "svg": columnSVG, "margin": margin, "xScale": xScale_0, "yScale": yScale }
}

function drawFakeDataBox(opt) {
    let fake = d3.select("body")
        .append("svg")
        .attr("class", "deletesoon")
        .attr("width", 0)
        .attr("height", 0)
        .append("svg")
        .attr("class", opt.type + "FakeAxisBox" + opt.id)
        .attr("width", opt.layout.data.width)
        .attr("height", opt.layout.data.height)
    // .attr("opacity", 0)
}

export default function (dom, data, opt, layout) {
    return drawGroupedBar(dom, data, opt, layout)
}