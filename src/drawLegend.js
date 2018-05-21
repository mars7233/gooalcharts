import * as d3 from 'd3'
import { getObjFirstValue } from './tools/gooalArray'
let legendOptions
let legend
let colorScale

function drawLegend(svg, data, opt) {
    // svg为legendbox，data为key，opt为legend的额外操作（例如，数据逆置、圆或方、颜色）
    // data格式：["key1","key2","key3"]

    if ("legendBox" in opt) {
        legendOptions = opt.legendBox
    } else {
        legendOptions = ""
    }

    let legendBBox = svg.node().getBBox()

    colorScale = d3.scaleOrdinal()
        .range(opt.dataBox.normalColor)

    if (legendOptions != "" && "icon" in legendOptions && "type" in legendOptions.icon) {
        if (legendOptions.icon.type == "circle") {
            drawCirleLegend(svg, data, opt)
        } else if (legendOptions.icon.type == "rectangle") {
            drawRectangleLegend(svg, data, opt)
        } else {
            drawSquareLegend(svg, data, opt)
        }
    } else {
        drawSquareLegend(svg, data, opt)
    }

    legend.append("text")
        .attr("x", 34)
        .attr("y", 9)
        .attr("dy", ".35em")
        // .attr("text-anchor", "end")
        .text(function (d) { return d })
}

function drawSquareLegend(svg, data, opt) {
    let x = 18
    if ("icon" in legendOptions && "x" in legendOptions.icon) {
        x = legendOptions.icon.x || 18
    }
    legend = svg.selectAll(".legend")
        .data(data)
        .enter()
        .append("g")
        .attr("class", opt.type + "Legend" + opt.id)
        .attr("transform", function (d, i) { return "translate(10," + i * 20 + ")" })
    legend.append("rect")
        .attr("width", x)
        .attr("height", x)
        .attr("fill", function (d, i) { console.log(d); return colorScale(i) })
}

function drawCirleLegend(svg, data, opt) {
    let r
    if ("r" in legendOptions.icon) {
        r = legendOptions.icon.r || 7
    } else {
        r = 7
    }
    legend = svg.selectAll(".legend")
        .data(data)
        .enter()
        .append("g")
        .attr("class", opt.type + "Legend" + opt.id)
        .attr("transform", function (d, i) { return "translate(10," + i * 20 + ")" })
    legend.append("circle")
        .attr("cy", 9)
        .attr("r", r)
        .attr("fill", colorScale)
}

function drawRectangleLegend(svg, data, opt) {

}

export default function (svg, data, opt) {
    return drawLegend(svg, data, opt)
}