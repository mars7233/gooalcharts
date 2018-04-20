import * as d3 from 'd3'
import { getObjValue } from '../tools/gooalArray'
import { writeFile } from 'fs';

let width = 800
let height = 400
let columnSVG
let xScale, yScale
let commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
}

function drawBarHori(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 40, left: 20 }
    if (newWidth != undefined) {
        width = newWidth
    }
    columnSVG = dom
    readConfig(opt)
    // 比例尺

    yScale = d3.scaleBand()
        .domain(data.key)
        .rangeRound([height - margin.bottom - margin.top, 0])
        .paddingInner(0.2)
        .paddingOuter(0.1)
    //隐形坐标轴测坐标宽度
    let hideYAxis = columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    xScale = d3.scaleLinear()
        .domain([0, d3.max(data.value)])
        .range([0, width - margin.right - margin.left])


    // 绘制数据
    columnSVG.selectAll("rect")
        .data(opt.data)
        .enter()
        .append("rect")
        .attr("class", commonOpt.type + "element" + commonOpt.id)
        .attr("x", function (d, i) { return width - margin.left })
        .attr("y", function (d, i) { return margin.top + yScale(getObjValue(0, d)) })
        .attr("height", yScale.bandwidth)
        .attr("width", function (d) { return xScale(d.value) })
        .transition()
        .duration(500)
        .attr("x", function (d, i) { return margin.left })
        .attr("fill", function (d) { return "steelblue" })

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

export default function (dom, data, opt, newWidth) {
    return drawBarHori(dom, data, opt, newWidth)
}