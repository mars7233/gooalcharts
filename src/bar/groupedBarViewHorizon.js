import * as d3 from 'd3'
import { getObjFirstValue as first } from './dataEvents'

let width = 800
let height = 400
let columnSVG
let tooltip
let xScale_0, xScale_1, yScale
let commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    dataBox = commonOpt.dataBox
}

function drawGroupedBarHori(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 40, left: 20 }
    if (newWidth != undefined) {
        width = newWidth
    }
    let primaryItem, secondaryItem
    primaryItem = data.primary
    secondaryItem = data.secondary

    readConfig(opt)

    // return { "svg": columnSVG, "margin": margin, "xScale": xScale_0, "yScale": yScale }
}

export default function (dom, data, opt, newWidth) {
    return drawGroupedBarHori(dom, data, opt, newWidth)
}