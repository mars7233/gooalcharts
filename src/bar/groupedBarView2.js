import * as d3 from 'd3'
import { getObjValue, getObjFirstValue } from '../tools/gooalArray'
import NewExpression from 'rollup/dist/typings/ast/nodes/NewExpression';
import { SSL_OP_NO_TLSv1_1 } from 'constants';

let width = 800
let height = 400
let columnSVG
let xScale, yScale
let commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
    dataBox = options.dataBox
}

function drawGroupedBar2(dom, data, opt, layout) {
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }
    width = layout.data.width
    height = layout.data.height

    columnSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.left = margin.left + 20 : {}
    axisBox.yAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}

    // 比例尺
    yScale = d3.scaleLinear()
        .domain([0, d3.max(data.value)])
        .rangeRound([height - margin.bottom - margin.top, 0])
    //隐形坐标轴测坐标宽度
    let hideYAxis = columnSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    xScale = d3.scaleBand()
        .domain(data.key)
        .range([0, width - margin.right - margin.left])
        .paddingInner(0.2)
        .paddingOuter(0.1)
    //色彩集
    let zScale = d3.scaleOrdinal()
        .range(dataBox.normalColor)


    // 绘制数据

    columnSVG.selectAll("rect")
        .data(opt.data)
        .enter()
        .append("rect")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("x", function (d, i) { return margin.left + xScale(getObjValue(1, d)) })
        .attr("y", function (d, i) { return height - margin.bottom })
        .attr("width", xScale.bandwidth)
        .transition()
        .duration(500)
        .attr("y", function (d, i) { return margin.top + yScale(getObjValue(2, d)) })
        .attr("height", function (d) { return height - yScale(d.value) - margin.bottom - margin.top })
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

export default function (dom, data, opt, layout) {
    return drawGroupedBar2(dom, data, opt, layout)
}