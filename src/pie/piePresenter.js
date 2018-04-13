import drawPie from './pieView'
import { handlePieData } from './dataEvents'
import { defaultEvents as mouseDefault } from './mouseEvents'
import drawLegend from '../drawLegend'

let width = 800
let height = 400
let pieContainer
let commonOpt
let data

function readConfig(options) {
    commonOpt = options
}

function presenter(dom, options, legendDom, newWidth) {
    if (newWidth != undefined) {
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