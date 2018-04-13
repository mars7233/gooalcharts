import drawBar from './barView'
import drawGroupedBar from './groupedBarView'
import drawStackedBar from './stackedBarView'
import { defaultEvents as mouseDefault } from './mouseEvents'
import { handleBarData, handleGroupedBarData, handleStackedBar } from './dataEvents'
import drawLegend from '../drawLegend'
import drawAxis from './drawAxis'

let width = 800
let height = 400
let barContainer
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

  // 绘制容器
  barContainer = dom

  if (options.type == "bar") {
    data = handleBarData(options)
    let barchart = drawBar(barContainer, data, options, newWidth)
    drawAxis(barchart, options, newWidth)
  } else if (options.type == "groupedbar") {
    data = handleGroupedBarData(options)
    let groupedbar = drawGroupedBar(barContainer, data, options, newWidth)
    drawAxis(groupedbar, options, newWidth)
    drawLegend(legendDom, data.secondary)
  } else if (options.type == "stackedbar") {
    data = handleStackedBar(options)
    let stackedbar = drawStackedBar(barContainer, data, options, newWidth)
    drawAxis(stackedbar, options, newWidth)
    drawLegend(legendDom, data.secondary)
  }

  // 加载鼠标默认事件
  mouseDefault(barContainer)


  // 返回bar容器
  return barContainer
}

export default function (dom, options, legendDom, newWidth) {
  return presenter(dom, options, legendDom, newWidth)
}