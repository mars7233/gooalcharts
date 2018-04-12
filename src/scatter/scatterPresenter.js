import drawScatter from './scatterView'
import { defaultEvents as mouseDefault } from './mouseEvents'
import { handleScatterData } from './dataEvents'
import drawLegend from '../drawLegend'

var width = 800
var height = 400
var scatterContainer
var commonOpt
var data

function readConfig(options) {
    commonOpt = options
}

function presenter(dom, options, legendDom, newWidth) {
    if (newWidth == undefined) {
        console.log("no new width")
    } else {
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