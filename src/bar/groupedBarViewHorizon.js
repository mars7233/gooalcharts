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
    axisBox = options.axisBox
    dataBox = options.dataBox
}


function drawGroupedBarHori(dom, data, opt, layout) {
    let margin = layout.margin
    width = layout.data.width
    height = layout.data.height

    columnSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}
    axisBox.yAxis.title != "" ? margin.left = margin.left + 20 : {}

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
        .range(dataBox.normalColor)

    drawFakeDataBox(commonOpt)
    let fakeAxis = d3.select("." + opt.type + "FakeAxisBox" + opt.id)

    //隐形坐标轴测坐标宽度 
    let hideYAxis = fakeAxis.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale_0))
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

    xScale = d3.scaleLinear()
        .domain([0, xMaxScale || d3.max(opt.data, function (d) {
            return d3.max(secondaryItem, function (key) {
                return d[key]
            })
        })])
        .range([0, width - margin.right - margin.left])


    let bandwidth = yScale_1.bandwidth() > commonOpt.dataBox.maxBandWidth ? commonOpt.dataBox.maxBandWidth : yScale_1.bandwidth()
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
        .attr("height", function () {
            return bandwidth
        })
        .attr("transform", function () {
            return "translate(" + 0 + "," + (yScale_1.bandwidth() / 2 - bandwidth / 2) + ")"
        })
        .transition()
        .duration(500)
        .attr("width", function (d) { return xScale(d.value) })
        .attr("fill", function (d) { return zScale(d.category) })
        .attr("normalColor", function (d) { return zScale(d.category) })

    d3.select(".deletesoon").remove()

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale_0 }
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
    return drawGroupedBarHori(dom, data, opt, layout)
}