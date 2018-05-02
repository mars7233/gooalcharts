import * as d3 from 'd3'

let width = 800
let height = 400
let lineSVG
let xScale, yScale
let commonOpt, axisBox, dataBox

// 读取配置文件
function readConfig(options) {
    commonOpt = options
}

function drawLine(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }
    if (newWidth != undefined) {
        width = newWidth
    }
    lineSVG = dom
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


    return { 'svg': lineSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

export default function (dom, data, opt, newWidth) {
    return drawLine(dom, data, opt, newWidth)
}