import drawBar from './barView'
import drawBarHori from './barViewHorizon'
import drawGroupedBar from './groupedBarView'
import drawGroupedBarHori from './groupedBarViewHorizon'
import drawGroupedBar2 from './groupedBarView2'
import drawGroupedBarHori2 from './groupedBarViewHorizon2'
import drawStackedBar from './stackedBarView'
import drawStackedBarHori from './stackedBarViewHorizon'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import { handleBarData, handleGroupedBarData, handleStackedBar, handleGroupedBarData2 } from './dataEvents'
import drawLegend from '../drawLegend'
import { GooalLegend } from '../drawLegend'
import drawAxis from '../drawAxis'

export default class BarPresenter {
	constructor(dom, options, legendDom, newWidth) {
		this.width = 800
		newWidth != undefined ? this.width = "" : {}
		this.height = 400
		this.barContainer = dom

		// 普通柱状图
		if (options.type == "bar") {
			this.Bar(options, newWidth)
			// 分组柱状图
		} else if (options.type == "groupedbar") {
			this.groupedBar(options, legendDom, newWidth)

		} else if (options.type == "groupedbar2") {
			this.groupedBar2(options, legendDom, newWidth)

			// 堆叠柱状图
		} else if (options.type == "stackedbar") {
			this.stackedBar(options, legendDom, newWidth)
		}

		this.dataBoxEvent = new DataBoxEvents(this.barContainer, options)
		this.dataBoxEvent.defaultEvents(options)

		// 返回bar容器
		return this.barContainer
	}

	Bar(options, newWidth) {
		let barchart, barchartHori
		this.data = handleBarData(options)

		if (options.dataBox.direction == "horizontal") {

			barchartHori = drawBarHori(this.barContainer, this.data, options, newWidth)
			drawAxis(barchartHori, options, newWidth)

		} else {

			barchart = drawBar(this.barContainer, this.data, options, newWidth)
			drawAxis(barchart, options, newWidth)

		}
	}

	groupedBar(options, legendDom, newWidth) {
		let groupedbar, groupedbarHori
		this.data = handleGroupedBarData(options)

		if (options.dataBox.direction == "horizontal") {

			groupedbarHori = drawGroupedBarHori(this.barContainer, this.data, options, newWidth)
			drawAxis(groupedbarHori, options, newWidth)
			drawLegend(legendDom, this.data.keyList, options)

		} else {

			groupedbar = drawGroupedBar(this.barContainer, this.data, options, newWidth)
			drawAxis(groupedbar, options, newWidth)
			drawLegend(legendDom, this.data.keyList, options)

		}
	}

	groupedBar2(options, legendDom, newWidth) {
		let groupedbar2, groupedbarHori2
		this.data = handleGroupedBarData2(options)

		if (options.dataBox.direction == "horizontal") {

			groupedbarHori2 = drawGroupedBarHori2(this.barContainer, this.data, options, newWidth)
			drawAxis(groupedbarHori2, options, newWidth)
			drawLegend(legendDom, this.data.category, options)

		} else {

			groupedbar2 = drawGroupedBar2(this.barContainer, this.data, options, newWidth)
			drawAxis(groupedbar2, options, newWidth)
			drawLegend(legendDom, this.data.category, options)

		}
	}

	stackedBar(options, legendDom, newWidth) {
		let stackedbar, stackedbarHori
		this.data = handleStackedBar(options)

		if (options.dataBox.direction == "horizontal") {

			stackedbarHori = drawStackedBarHori(this.barContainer, this.data, options, newWidth)
			drawAxis(stackedbarHori, options, newWidth)
			drawLegend(legendDom, this.data.keyList, options)

		} else {

			stackedbar = drawStackedBar(this.barContainer, this.data, options, newWidth)
			drawAxis(stackedbar, options, newWidth)
			drawLegend(legendDom, this.data.keyList, options)

		}
	}
}