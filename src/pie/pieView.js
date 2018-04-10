import * as d3 from 'd3'
import dataEvent from './dataEvents'

var width = 800
var height = 400
var pieSVG
var commonOpt, axisBox, dataBox

function readConfig(options) {

}

function drawPie(dom, data, opt, newWidth) {
    if (newWidth == undefined) {
        console.log("barchart no new Width")
    } else {
        width = newWidth
    }
    pieSVG = dom
    readConfig(opt)

    var color = d3.scaleOrdinal(d3.schemeCategory20)
    var raidus = Math.min(width, height) / 2;
    var path = d3.arc()
        .outerRadius(raidus)
        .innerRadius(0)

    pieSVG.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
        .append("path")
        .attr("class", "myarc")
        .attr("fill", function (d, i) { return color(i) })
        .attr("d", path)

}

export default function (dom, data, opt, newWidth) {
    return drawPie(dom, data, opt, newWidth)
}