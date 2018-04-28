import drawLine from './lineView'
import { defaultEvents as mouseDefault } from './mouseEvents'
import { handleLineData } from './dataEvents'
import drawAxis from '../drawAxis'

let width = 800
let height = 400
let lineContainer
let commonOpt
let data

// 读取配置文件
function readConfig(options) {
    commonOpt = options
}

// 绘制

function presenter(dom, options, legendDom, newWidth) {
    if (newWidth != undefined) {
        width = ""
    }
    // 读取配置
    readConfig(options)

    // 容器
    lineContainer = dom

    data = handleLineData(options)
    lineChart = drawLine(lineContainer, data, options, newWidth)
    // drawAxis(lineChart, options, newWidth)

    return lineContainer
}

export default function (dom, options, legendDom, newWidth) {
    return presenter(dom, options, legendDom, newWidth)
}