import drawScatter from './scatterView'
import { defaultEvents as mouseDefault } from './mouseEvents'
import { handleScatterData } from './dataEvents'
import drawLegend from '../drawLegend'

let width = 800
let height = 400
let scatterContainer
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

    scatterContainer = dom
        .append("svg")
        .attr("width", width || newWidth)
        .attr("height", height)
        .attr("class", "scatter")

    data = handleScatterData(commonOpt)
    drawScatter(scatterContainer, data, options, newWidth)
    drawLegend(legendDom, data.category)
    mouseDefault(scatterContainer)

    return scatterContainer
}

export default function (dom, options, opt, newWidth) {
    return presenter(dom, options, opt, newWidth)
}