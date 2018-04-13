import * as d3 from 'd3'

var width = 800
var height = 400
var columnSVG
var xScale, yScale
var commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
}

function drawBar(dom, data, opt, newWidth) {
    var margin = { top: 10, right: 10, bottom: 40, left: 20 }
    if (newWidth != undefined) {
        width = newWidth
    }
    columnSVG = dom
    readConfig(opt)

    // 比例尺
    yScale = d3.scaleLinear()
        .domain([0, d3.max(data.value)])
        .rangeRound([height - margin.bottom - margin.top, 0])

    //隐形坐标轴测坐标宽度-----------------------------------------------
    var hideYAxis = columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    var yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left
    // --------------------------------------------------------------

    xScale = d3.scaleBand()
        .domain(data.key)
        .range([0, width - margin.right - margin.left])
        .paddingInner(0.2)
        .paddingOuter(0.1)

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

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

function redrawBar() {

}

export default function (dom, data, opt, newWidth) {
    return drawBar(dom, data, opt, newWidth)
}