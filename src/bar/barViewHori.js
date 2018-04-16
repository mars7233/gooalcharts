import * as d3 from 'd3'
import { getObjValue } from '../tools/gooalArray'

let width = 800
let height = 400
let columnSVG
let xScale, yScale
let commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
}

function drawBarHori(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 40, left: 20 }
    if (newWidth != undefined) {
        width = newWidth
    }
    columnSVG = dom
    readConfig(opt)



    // return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

export default function (dom, data, opt, newWidth) {
    return drawBarHori(dom, data, opt, newWidth)
}