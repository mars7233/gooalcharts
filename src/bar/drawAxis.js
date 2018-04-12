import * as d3 from 'd3'

var width = 800
var height = 400
var commonOpt

function drawAxis(chart, opt, newWidth) {
    // 缺少x轴刻度参数配置（是否旋转，旋转角度）

    var svg = chart.svg
    var margin = chart.margin
    var xScale = chart.xScale
    var yScale = chart.yScale

    if (newWidth == undefined) {
        console.log("stackedbar no new Width")
    } else {
        width = newWidth
    }

    var commonOpt = opt

    var xAxis = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
        .attr("class", commonOpt.type + "xAxis")
        .attr("id", commonOpt.type + "xAxis" + commonOpt.id)
        .call(d3.axisBottom().scale(xScale))

    var yAxis = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", commonOpt.type + "yAxis")
        .attr("id", commonOpt.type + "yAxis" + commonOpt.id)
        .call(d3.axisLeft().scale(yScale))

    xAxis.selectAll("text")
        .attr("transform", "rotate(-65)")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")

    var xAxisBBox = xAxis.node().getBBox()
    var yAxisBBox = yAxis.node().getBBox()

    var container = d3.select("#" + commonOpt.type + "Container" + commonOpt.id)
    var containerHeight = Number(container.attr("height"))
    container.attr("height", function () { return xAxisBBox.height + containerHeight })

    var dataBox = d3.select("#" + commonOpt.type + "DataBox" + commonOpt.id)
    var dataBoxHeight = Number(dataBox.attr("height"))
    dataBox.attr("height", function () { return xAxisBBox.height + dataBoxHeight })

    var titleBox = d3.select("#" + commonOpt.type + "TitleBox" + commonOpt.id)
    var titleBoxY = Number(titleBox.attr("y"))
    var titleBoxClass = titleBox.attr("class")
    if (titleBoxClass == "bottomTitleBox") {
        titleBox.attr("y", function () { return titleBoxY + xAxisBBox.height })
    }

    // 坐标轴标题
    // x轴
    svg.append("text")
        .attr("class", "xTitle")
        .attr("transform", "translate(" + ((width - margin.left - margin.right) / 2 + margin.left) + "," + (height - margin.bottom + 15 + xAxisBBox.height) + ")")
        .attr("text-anchor", "middle")
        .text("Item")
    // y轴
    svg.append("text")
        .attr("class", "yTitle")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - ((height - margin.top - margin.bottom) / 2))
        .attr("y", margin.left - yAxisBBox.width - 10)
        .attr("text-anchor", "middle")
        .text("Value")

}

export default function (chart, opt, newWidth) {
    return drawAxis(chart, opt, newWidth)
}