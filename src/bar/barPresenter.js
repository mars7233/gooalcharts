import drawBar from './barView'
import drawBarHori from './barViewHorizon'
import drawGroupedBar from './groupedBarView'
import drawGroupedBarHori from './groupedBarViewHorizon'
import drawStackedBar from './stackedBarView'
import drawStackedBarHori from './stackedBarViewHorizon'
import { defaultEvents as mouseDefault } from './mouseEvents'
import { handleBarData, handleGroupedBarData, handleStackedBar } from './dataEvents'
import drawLegend from '../drawLegend'
import drawAxis from '../drawAxis'

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
  // 普通柱状图
  if (options.type == "bar") {
    let barchart, barchartHori
    data = handleBarData(options)

    if (options.dataBox.direction == "vertical") {

      barchart = drawBar(barContainer, data, options, newWidth)
      drawAxis(barchart, options, newWidth)

    } else if (options.dataBox.direction == "horizontal") {

      barchartHori = drawBarHori(barContainer, data, options, newWidth)
      drawAxis(barchartHori, options, newWidth)
    }


    // 分组柱状图
  } else if (options.type == "groupedbar") {
    let groupedbar, groupedbarHori
    data = handleGroupedBarData(options)

    if (options.dataBox.direction == "vertical") {

      groupedbar = drawGroupedBar(barContainer, data, options, newWidth)
      drawAxis(groupedbar, options, newWidth)
      drawLegend(legendDom, data.secondary)

    } else if (options.dataBox.direction == "horizontal") {

      groupedbarHori = drawGroupedBarHori(barContainer, data, options, newWidth)
      drawAxis(groupedbarHori, options, newWidth)
      drawLegend(legendDom, data.secondary)

    }

    // 堆叠柱状图
  } else if (options.type == "stackedbar") {
    let stackedbar, stackedbarHori
    data = handleStackedBar(options)

    if (options.dataBox.direction == "vertical") {

      stackedbar = drawStackedBar(barContainer, data, options, newWidth)
      drawAxis(stackedbar, options, newWidth)
      drawLegend(legendDom, data.secondary)

    } else if (options.dataBox.direction == "horizontal") {

      stackedbarHori = drawStackedBarHori(barContainer, data, options, newWidth)
      drawAxis(stackedbarHori, options, newWidth)
      drawLegend(legendDom, data.secondary)
    }


  }

  // 加载鼠标默认事件
  mouseDefault(barContainer)


  // 返回bar容器
  return barContainer
}

export default function (dom, options, legendDom, newWidth) {
  return presenter(dom, options, legendDom, newWidth)
}