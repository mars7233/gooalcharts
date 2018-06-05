import * as d3 from 'd3'
import { getObjValue } from '../tools/gooalArray'

let width = 800
let height = 400
let columnSVG
let xScale, yScale
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
    dataBox = options.dataBox
}

function drawBarHori(dom, data, opt, layout) {
    let margin = layout.margin
    width = layout.data.width
    height = layout.data.height

    columnSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}
    axisBox.yAxis.title != "" ? margin.left = margin.left + 20 : {}

    // 比例尺
    let xMaxScale, yMaxScale
    if ("xAxis" in axisBox && "maxScale" in axisBox.xAxis) {
        xMaxScale = axisBox.xAxis.maxScale
    }
    if ("yAxis" in axisBox && "maxScale" in axisBox.yAxis) {
        yMaxScale = axisBox.yAxis.maxScale
    }
    yScale = d3.scaleBand()
        .domain(data.key)
        .rangeRound([height - margin.bottom - margin.top, 0])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    drawFakeDataBox(commonOpt)
    let fakeAxis = d3.select("." + opt.type + "FakeAxisBox" + opt.id)


    //隐形坐标轴测坐标宽度
    let hideYAxis = fakeAxis.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    xScale = d3.scaleLinear()
        .domain([0, xMaxScale || d3.max(data.value)])
        .range([0, width - margin.right - margin.left])


    // 绘制数据
    columnSVG.selectAll("rect")
        .data(opt.data)
        .enter()
        .append("rect")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("x", function (d, i) { return margin.left })
        .attr("y", function (d, i) { return margin.top + yScale(getObjValue(0, d)) })
        .attr("height", yScale.bandwidth)
        .transition()
        .duration(500)
        .attr("width", function (d) { return xScale(d.value) })
        .attr("fill", function (d) { return dataBox.normalColor[0] })
        .attr("normalColor", dataBox.normalColor[0])

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
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

export default function (dom, data, opt, newWidth) {
    return drawBarHori(dom, data, opt, newWidth)
}