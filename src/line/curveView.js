import * as d3 from 'd3'
import { getObjValue } from '../tools/gooalArray';

let width = 800
let height = 400
let lineSVG
let xScale, yScale
let commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
}

function drawCurve(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }
    if (newWidth != undefined) {
        width = newWidth
    }
    lineSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.left = margin.left + 20 : {}
    axisBox.yAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}

    let ys = []
    data.forEach(element => {
        let y = getObjValue(1, element)
        ys.push(y)
    });


    // 比例尺
    yScale = d3.scaleLinear()
        .domain([0, d3.max(ys)])
        .range([height - margin.bottom - margin.top, 0])


    //隐形坐标轴测坐标宽度
    let hideYAxis = lineSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left


    let xs = []
    data.forEach(element => {
        let x = getObjValue(0, element)
        xs.push(x)
    });

    xScale = d3.scaleLinear()
        .domain([0, d3.max(xs)])
        .range([0, width - margin.left - margin.right])

    // 线生成器
    let curveline_generator = d3.line()
        .x(function (d, i) {
            return xScale(d.x)
        })
        .y(function (d, i) {
            return yScale(d.y)
        })
        .curve(d3.curveCatmullRom)


    // 绘制数据
    lineSVG.append("path")
        .attr("d", curveline_generator(data))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", "2px")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

    // 添加圆点
    lineSVG.selectAll("circle")
        .data(data)
        .enter()
        .append("svg:circle")
        .attr("cx", function (d) {
            return xScale(d.x)
        })
        .attr("cy", function (d) {
            return yScale(d.y)
        })
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("r", 5)
        .attr("fill", "#1E90FF")
        .on("mouseover", function () {
            d3.select(this)
                .attr("fill", "#000080")
                .attr("stroke", "rgba(0, 0, 128, 0.5)")
                .attr("stroke-width", "2px")
        })
        .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(250)
                .attr("fill", "#1E90FF")
                .attr("stroke", "none")
        })
        .append("svg:title")
        .text(function (d) {
            return "(" + d.x + ", " + d.y + ")";
        })


    return { 'svg': lineSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

export default function (dom, data, opt, newWidth) {
    return drawCurve(dom, data, opt, newWidth)
}