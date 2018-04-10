import * as d3 from 'd3'

var width = 800
var height = 400
var margin = { top: 10, right: 10, bottom: 40, left: 50 }
var columnSVG
var xScale, yScale
var commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = commonOpt.axisBox
    dataBox = commonOpt.dataBox
}

function drawBar(dom, data, opt, newWidth) {
    if (newWidth == undefined) {
        console.log("barchart no new Width")
    } else {
        width = newWidth
    }
    columnSVG = dom
    // readConfig(opt)

    // 比例尺
    xScale = d3.scaleBand()
        .domain(data.key)
        .range([0, width - margin.right - margin.left])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    yScale = d3.scaleLinear()
        .domain([0, d3.max(data.value)])
        .rangeRound([height - margin.bottom - margin.top, 0])

    // 绘制坐标轴
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

    // 绘制数据
    columnSVG.selectAll("rect")
        .data(opt.data)
        .enter()
        .append("rect")
        .attr("class", "myrect")
        .attr("x", function (d, i) { return margin.left + xScale(d.key) })
        .attr("y", function (d, i) { return height - margin.bottom })
        .attr("width", xScale.bandwidth)
        .transition()
        .attr("y", function (d, i) { return margin.top + yScale(d.value) })
        .attr("height", function (d) { return height - yScale(d.value) - margin.bottom - margin.top })
        .attr("fill", function (d) { return "steelblue" })

    return columnSVG
}

function redrawBar() {

}

export default function (dom, data, opt, newWidth) {
    return drawBar(dom, data, opt, newWidth)
}