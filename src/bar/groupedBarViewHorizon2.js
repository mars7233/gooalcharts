import * as d3 from 'd3'
import { getObjFirstValue as first } from './dataEvents'
import { get } from 'http';
import { getObjValue,getObjFirstValue } from '../tools/gooalArray';

let width = 800
let height = 400
let columnSVG
let tooltip
let yScale, xScale
let commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    dataBox = commonOpt.dataBox
}

function drawGroupedBarHori2(dom, data, opt, newWidth) {
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

    //色彩集
    let zScale = d3.scaleOrdinal()
    .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    // 绘制数据
    columnSVG.selectAll("rect")
        .data(opt.data)
        .enter()
        .append("rect")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("x", function (d, i) { return margin.left })
        .attr("y", function (d, i) { return margin.top + yScale(getObjValue(1, d)) })
        .attr("height", yScale.bandwidth)
        .transition()
        .duration(500)
        .attr("width", function (d) { return xScale(d.value) })
        .attr("fill", function (d) {
            if (Object.keys(d).length == 3) return zScale(getObjFirstValue(d))
            else return zScale(1)
        })
        .attr("normalColor", function (d) {
            if (Object.keys(d).length == 3) return zScale(getObjFirstValue(d))
            else return zScale(1)
        })

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale }

}

export default function (dom, data, opt, newWidth) {
    return drawGroupedBarHori2(dom, data, opt, newWidth)
}