import drawScatter from './scatterView'
import DataBoxEvent from '../chartEvent/dataBoxEvents'
import { handleScatterData } from './dataEvents'
import drawLegend from '../drawLegend'
import drawAxis from '../drawAxis'

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
    data = handleScatterData(options)
    let scatter = drawScatter(scatterContainer, data, options, newWidth)
    drawAxis(scatter, options, newWidth)
    drawLegend(legendDom, data.category, options)

    let dataBoxEvents = new DataBoxEvent(scatterContainer, commonOpt)
    // mouseDefault(scatterContainer, options)
    dataBoxEvents.defaultEvents(commonOpt)

    return scatterContainer
}

export default function (dom, options, opt, newWidth) {
    return presenter(dom, options, opt, newWidth)
}