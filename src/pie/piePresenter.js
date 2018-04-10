import drawPie from './pieView'
import { handlePieData } from './dataEvents'
import { defaultEvents as mouseDefault } from './mouseEvents'
import drawLegend from '../drawLegend'

var width = 800
var height = 400
var pieContainer
var tooltip
var commonOpt
var data

function readConfig(options) {
    commonOpt = option;
}

function presenter(dom, options, legendDom, newWidth) {
    if (newWidth == undefined) {
        console.log("no new width")
    } else {
        width = ""
    }

    readConfig(options)

    pieContainer = dom
        .append("svg")
        .attr("width", width || newWidth)
        .attr("height", height)
        .attr("class", "pie")

    data = handlePieData(options)
    drawPie(pieContainer, data, options, newWidth)
    drawLegend(legendDom, data.keys)
    mouseDefault(pieContainer)

    return pieContainer
}

export default function (dom, options, legendDom, newWidth) {
    return presenter(dom, options, legendDom, newWidth)
}