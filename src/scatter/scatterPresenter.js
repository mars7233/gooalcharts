import drawScatter from './scatterView'
import { defaultEvents as mouseDefault } from './mouseEvents'
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
    data = handleScatterData(commonOpt)
    let scatter = drawScatter(scatterContainer, data, options, newWidth)
    drawAxis(scatter, options, newWidth)
    drawLegend(legendDom, data.category)
    mouseDefault(scatterContainer, commonOpt)

    return scatterContainer
}

export default function (dom, options, opt, newWidth) {
    return presenter(dom, options, opt, newWidth)
}