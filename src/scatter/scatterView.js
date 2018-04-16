import * as d3 from 'd3'
import { getObjFirstValue } from '../tools/gooalArray';

let width = 800
let height = 400
let scatterSVG
let xScale, yScale
let commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
}

function drawScatter(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 20, bottom: 40, left: 20 }
    if (newWidth != undefined) {
        width = newWidth
    }
    scatterSVG = dom
    readConfig(opt)

    yScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(function (d) { return d.value }))])
        .rangeRound([height - margin.bottom - margin.top, 0])

    let zScale = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    //隐形坐标轴测坐标宽度
    let hideYAxis = scatterSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    xScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(function (d) { return d.key }))])
        .rangeRound([0, width - margin.right - margin.left])

    scatterSVG.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", commonOpt.type + "element" + commonOpt.id)
        .attr("r", 3)
        .attr("cx", function (d) { return margin.left + xScale(d.key) })
        .attr("cy", function (d) { return margin.top + yScale(d.value) })
        .style("fill", function (d) {
            if (Object.keys(d).length == 3) return zScale(getObjFirstValue(d))
            else return zScale(1)
        });
    return { "svg": scatterSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

export default function (dom, data, opt, newWidth) {
    return drawScatter(dom, data, opt, newWidth)
}