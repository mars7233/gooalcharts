import * as d3 from 'd3'
import { getObjValue } from '../tools/gooalArray';
import { getObjFirstValue as first, getObjKey } from '../tools/gooalArray';

let width = 800
let height = 400
let lineSVG
let tooltip
let xScale, yScale
let xMaxScale, yMaxScale
let xMinScale, yMinScale
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
    dataBox = options.dataBox
    xMaxScale = axisBox.xAxis.maxScale
    yMaxScale = axisBox.yAxis.maxScale
    xMinScale = axisBox.xAxis.minScale
    yMinScale = axisBox.yAxis.minScale
}

function drawLine(dom, data, opt, layout) {
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }
    width = layout.data.width
    height = layout.data.height
    lineSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.left = margin.left + 20 : {}
    axisBox.yAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}

    // 比例尺
    yScale = d3.scaleLinear()
        .domain([yMinScale || d3.min(opt.data, function (d) {
            return Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(2, d) : getObjValue(1, d)
        }), yMaxScale || d3.max(opt.data, function (d) {
            return Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(2, d) : getObjValue(1, d)
        })])
        .range([height - margin.bottom - margin.top, 0])


    let zScale = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    // 隐形坐标轴测坐标宽度
    let hideYAxis = lineSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    let xScale = d3.scaleLinear()
        .domain([xMinScale || d3.min(opt.data, function (d) {
            return Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(1, d) : getObjValue(0, d)
        }), xMaxScale || d3.max(opt.data, function (d) {
            return Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(1, d) : getObjValue(0, d)
        })])
        .range([0, width - margin.right - margin.left])

    // 线生成器
    let lineGenerator = d3.line()
        .x(function (d) {
            return xScale(Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(1, d) : getObjValue(0, d))
        })
        .y(function (d) {
            return yScale(Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(2, d) : getObjValue(1, d))
        })
        .curve(d3.curveMonotoneX)

    // 绘制数据
    data.forEach(element => {
        lineSVG.append("path")
            .attr("class", commonOpt.type + "Path" + commonOpt.id)
            .attr("d", lineGenerator(element.values))
            .attr("fill", "none")
            .attr("normalColor", zScale(element.key))
            .attr("stroke", function () {
                return zScale(element.key)
            })
            .attr("stroke-width", "2px")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
    })

    // 添加圆点
    lineSVG.selectAll("circle")
        .data(opt.data)
        .enter()
        .append("svg:circle")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("cx", function (d, i) {
            let cx = Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(1, d) : getObjValue(0, d)
            return xScale(cx)
        })
        .attr("cy", function (d) {
            let cy = Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(2, d) : getObjValue(1, d)
            return yScale(cy)
        })
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("r", commonOpt.dataBox.radius)
        .attr("normalColor", function (d) {
            return zScale(Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(0, d) : 0)
        })
        .attr("fill", function (d) {
            return zScale(Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(0, d) : 0)
        })

    return { 'svg': lineSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

export default function (dom, data, opt, layout) {
    return drawLine(dom, data, opt, layout)
}