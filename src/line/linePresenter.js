import drawLine from './lineView'
import { handleLineData } from './dataEvents'
import drawAxis from '../drawAxis'
import drawLegend from '../drawLegend';
import DataBoxEvents from '../chartEvent/dataBoxEvents'

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
        width = newWidth
    }
    // 读取配置
    readConfig(options)

    // 容器
    lineContainer = dom

    // 折线图
    let linechart
    data = handleLineData(options)
    linechart = drawLine(lineContainer, data, options, newWidth)
    drawAxis(linechart, options, newWidth)
    drawLegend(legendDom, data.category, options)
    
    //绑定默认数据时间 
    let dataBoxEvents = new DataBoxEvents(lineContainer, options)
    dataBoxEvents.defaultEvents()

    // 返回line容器
    return lineContainer
}

export default function (dom, options, legendDom, newWidth) {
    return presenter(dom, options, legendDom, newWidth)
}