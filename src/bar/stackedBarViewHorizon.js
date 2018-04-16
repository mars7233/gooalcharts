import * as d3 from 'd3'
import { read } from 'fs';

let width = 800
let height = 400
let columnSVG
let tooltip
let xScale, yScale
let commonOpt, axisBox, dataBox
let dataset

// 读取配置文件
function readConfig(options) {
    commonOpt = options
}

function drawStackedBarHori(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 40, left: 20 }
    if (newWidth != undefined) {
        width = newWidth
    }
    columnSVG = dom

    readConfig(opt)



    // return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

export default function (dom, data, opt, newWidth) {
    return drawStackedBarHori(dom, data, opt, newWidth)
}