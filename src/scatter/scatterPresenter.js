import drawScatter from './scatterView'
import { defaultEvents as mouseDefault } from './mouseEvents'


var width = 800
var height = 400
var scatterContainer
var commonOpt
var data

function readConfig(options) {
    commonOpt = option
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

    drawScatter(scatterContainer, options, legendDom, newWidth)

    mouseDefault(scatterContainer)

    return scatterContainer

}

export default function (dom, options, legendDom, newWidth) {
    return presenter(dom, options, legendDom, newWidth)
}