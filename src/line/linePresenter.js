import drawLine from './lineView'
import drawCurveLine from './lineViewCurve'
import drawGroupedLine from './groupedLineView'
import { defaultEvents as mouseDefault } from './mouseEvents'
import { handleLineData, handleCurveLineData, handleGroupedLineData } from './dataEvents'
import drawAxis from '../drawAxis'
import drawLegend from '../drawLegend';
// import { handleStackedBar } from '../bar/dataEvents';


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
    if (options.type == "linechart") {
        let lineChart
        data = handleLineData(options)
        lineChart = drawLine(lineContainer, data, options, newWidth)
        drawAxis(lineChart, options, newWidth)


      // 曲线图 
    } else if (options.type == "curvelinechart") {
        let curvelinechart
        data = handleCurveLineData(options)
        curvelinechart = drawCurveLine(lineContainer, data, options, newWidth)
        drawAxis(curvelinechart, options, newWidth)

      // 分组折线图
    } else if (options.type == "groupedlinechart") {
        let groupedlinechart
        data = handleGroupedLineData(options)
        groupedlinechart = drawGroupedLine(lineContainer, data, options, newWidth)
        drawAxis(groupedlinechart, options, newWidth)
        drawLegend(legendDom, data.keyList, options)
    }

    // 返回line容器
    return lineContainer
}

export default function (dom, options, legendDom, newWidth) {
    return presenter(dom, options, legendDom, newWidth)
}