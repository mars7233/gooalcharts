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
			this.chart = this.Bar(options, newWidth)
			// 分组柱状图
		} else if (options.type == "groupedbar") {
			this.chart = this.groupedBar(options, legendDom, newWidth)

		} else if (options.type == "groupedbar2") {
			this.chart = this.groupedBar2(options, legendDom, newWidth)

			// 堆叠柱状图
		} else if (options.type == "stackedbar") {
			this.chart = this.stackedBar(options, legendDom, newWidth)
		}

		this.axis = drawAxis(this.chart, options, newWidth)
		this.legend

		this.dataBoxEvent = new DataBoxEvents(this.barContainer, options)
		this.dataBoxEvent.defaultEvents(options)

		// 返回bar容器
		return this.barContainer
	}

	Bar(options, newWidth) {
		let chart
		this.data = handleBarData(options)

		if (options.dataBox.direction == "horizontal") {
			chart = drawBarHori(this.barContainer, this.data, options, newWidth)
		} else {
			chart = drawBar(this.barContainer, this.data, options, newWidth)
		}
		return chart
	}

	groupedBar(options, legendDom, newWidth) {
		let chart
		this.data = handleGroupedBarData(options)

		if (options.dataBox.direction == "horizontal") {

			chart = drawGroupedBarHori(this.barContainer, this.data, options, newWidth)
			this.legend = new GooalLegend(legendDom, this.data.keyList, options)

		} else {

			chart = drawGroupedBar(this.barContainer, this.data, options, newWidth)
			this.legend = new GooalLegend(legendDom, this.data.keyList, options)

		}
		return chart
	}

	groupedBar2(options, legendDom, newWidth) {
		let chart
		this.data = handleGroupedBarData2(options)

		if (options.dataBox.direction == "horizontal") {

			chart = drawGroupedBarHori2(this.barContainer, this.data, options, newWidth)
			this.legend = new GooalLegend(legendDom, this.data.category, options)

		} else {

			chart = drawGroupedBar2(this.barContainer, this.data, options, newWidth)
			this.legend = new GooalLegend(legendDom, this.data.category, options)

		}
		return chart
	}

	stackedBar(options, legendDom, newWidth) {
		let chart
		this.data = handleStackedBar(options)

		if (options.dataBox.direction == "horizontal") {

			chart = drawStackedBarHori(this.barContainer, this.data, options, newWidth)
			this.legend = new GooalLegend(legendDom, this.data.keyList, options)

		} else {

			chart = drawStackedBar(this.barContainer, this.data, options, newWidth)
			this.legend = new GooalLegend(legendDom, this.data.keyList, options)

		}
		return chart
	}
}