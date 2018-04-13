import * as d3 from 'd3'

let width = 800
let height = 400
let commonOpt

function drawAxis(chart, opt, newWidth) {
    // 缺少x轴刻度参数配置（是否旋转，旋转角度）
    // 坐标轴标题的字体大小、颜色、字体

    let svg = chart.svg
    let margin = chart.margin
    let xScale = chart.xScale
    let yScale = chart.yScale

    if (newWidth != undefined) {
        width = newWidth
    }

    let commonOpt = opt
    // 绘制刻度
    let xAxis = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
        .attr("class", commonOpt.type + "xAxis")
        .attr("id", commonOpt.type + "xAxis" + commonOpt.id)
        .call(d3.axisBottom().scale(xScale))

    let yAxis = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", commonOpt.type + "yAxis")
        .attr("id", commonOpt.type + "yAxis" + commonOpt.id)
        .call(d3.axisLeft().scale(yScale))

    xAxis.selectAll("text")
        .attr("transform", "rotate(-65)")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")

    let xAxisBBox = xAxis.node().getBBox()
    let yAxisBBox = yAxis.node().getBBox()

    let container = d3.select("#" + commonOpt.type + "Container" + commonOpt.id)
    let containerHeight = Number(container.attr("height"))
    container.attr("height", function () { return xAxisBBox.height + containerHeight })

    let dataBox = d3.select("#" + commonOpt.type + "DataBox" + commonOpt.id)
    let dataBoxHeight = Number(dataBox.attr("height"))
    dataBox.attr("height", function () { return xAxisBBox.height + dataBoxHeight })

    let titleBox = d3.select("#" + commonOpt.type + "TitleBox" + commonOpt.id)
    let titleBoxY = Number(titleBox.attr("y"))
    let titleBoxClass = titleBox.attr("class")
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