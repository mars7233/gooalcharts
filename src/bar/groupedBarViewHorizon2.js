import * as d3 from 'd3'
import { getObjFirstValue as first } from './dataEvents'
import { get } from 'http';
import { getObjValue } from '../tools/gooalArray';

let width = 800
let height = 400
let columnSVG
let tooltip
let yScale_0, yScale_1, xScale
let commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    dataBox = commonOpt.dataBox
}

function drawGroupedBarHori2(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }
    if (newWidth != undefined) {
        width = newWidth
    }

    columnSVG = dom
    readConfig(opt)

    if ("axisBox" in commonOpt) {
        let axisBox = commonOpt.axisBox
        if ("yAxis" in axisBox)
            if ("title" in axisBox.yAxis) {
                margin.left = margin.left + 20
            }
        if ("xAxis" in axisBox) {
            if ("title" in axisBox.xAxis) {
                margin.bottom = margin.bottom + 20
            }
        }
    }

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale_0 }

}

export default function (dom, data, opt, newWidth) {
    return drawGroupedBarHori2(dom, data, opt, newWidth)
}