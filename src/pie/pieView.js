import * as d3 from 'd3'

let width = 800
let height = 400
let pieSVG
let commonOpt, axisBox, dataBox

function readConfig(options) {
    commonOpt = options
}

function drawPie(dom, data, opt, newWidth) {
    if (newWidth != undefined) {
        width = newWidth
    }
    pieSVG = dom
    readConfig(opt)

    let color = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])
    let radius = (Math.min(width, height) - 20) / 2;
    let path = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius * 0.7)
        .padAngle(0.01)

    pieSVG.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
        .append("path")
        .attr("class", commonOpt.type + "element" + commonOpt.id)
        .attr("fill", function (d, i) { return color(i) })
        .attr("d", path)

    return pieSVG

}

export default function (dom, data, opt, newWidth) {
    return drawPie(dom, data, opt, newWidth)
}