import * as d3 from 'd3'
import { getObjFirstValue as first } from './dataEvents'
import { get } from 'http';
import { getObjValue } from '../tools/gooalArray';

let width = 800
let height = 400
let columnSVG
let tooltip
let yScale_0, yScale_1, xScale
let commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    dataBox = commonOpt.dataBox
}

function drawGroupedBarHori(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 40, left: 20 }
    if (newWidth != undefined) {
        width = newWidth
    }
    let primaryItem, secondaryItem
    primaryItem = data.primary
    secondaryItem = data.secondary

    columnSVG = dom
    readConfig(opt)

    yScale_0 = d3.scaleBand()
        .domain(primaryItem)
        .range([height - margin.bottom - margin.top, 0])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    yScale_1 = d3.scaleBand()
        .domain(secondaryItem)
        .range([yScale_0.bandwidth(), 0])
        .paddingInner(0.2)

    let zScale = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    //隐形坐标轴测坐标宽度 
    let hideYAxis = columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale_0))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    xScale = d3.scaleLinear()
        .domain([0, d3.max(opt.data, function (d) {
            return d3.max(secondaryItem, function (key) {
                return d[key]
            })
        })])
        .range([0, width - margin.right - margin.left])

    columnSVG.append("svg")
        .selectAll("g")
        .data(opt.data)
        .enter()
        .append("g")
        .attr("transform", function (d) { return "translate(0," + (margin.bottom + yScale_0(first(d))) + ")" })
        .selectAll("rect")
        .data(function (d) { return secondaryItem.map(function (key) { return { key: key, value: d[key] } }) })
        .enter()
        .append("rect")
        .attr("class", commonOpt.type + "element" + commonOpt.id)
        .attr("y", function (d, i) { return yScale_1(d.key) - margin.bottom + margin.top })
        .attr("x", function (d) { return height - margin.bottom })
        .attr("height", yScale_1.bandwidth())
        .transition()
        .duration(500)
        .attr("x", function (d) { return margin.left })
        .attr("width", function (d) { return xScale(d.value) })
        .attr("fill", function (d) { return zScale(d.key) })

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale_0 }
}

export default function (dom, data, opt, newWidth) {
    return drawGroupedBarHori(dom, data, opt, newWidth)
}