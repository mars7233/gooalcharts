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
import drawAxis from '../drawAxis'

export default class BarPresenter {
	constructor(dom, options, legendDom, layout) {
		this.width = layout.data.width
		this.height = layout.data.height
		this.barContainer = dom

		// 普通柱状图
		if (options.type == "bar") {
			this.chart = this.Bar(options, layout)
			// 分组柱状图
		} else if (options.type == "groupedbar") {
			this.chart = this.groupedBar(options, legendDom, layout)

		} else if (options.type == "groupedbar2") {
			this.chart = this.groupedBar2(options, legendDom, layout)

			// 堆叠柱状图
		} else if (options.type == "stackedbar") {
			this.chart = this.stackedBar(options, legendDom, layout)
		}

		this.axis = drawAxis(this.chart, options, layout)
		this.legend
		this.category

		this.dataBoxEvent = new DataBoxEvents(this.barContainer, options)
		this.dataBoxEvent.defaultEvents(options)

		// 返回bar容器
		return { "chart": this.barContainer, "category": this.category }
	}

	Bar(options, layout) {
		let chart
		this.data = handleBarData(options)

		if (options.dataBox.direction == "horizontal") {
			chart = drawBarHori(this.barContainer, this.data, options, layout)
		} else {
			chart = drawBar(this.barContainer, this.data, options, layout)
		}
		return chart
	}

	groupedBar(options, legendDom, layout) {
		let chart
		this.data = handleGroupedBarData(options)
		this.category = this.data.keyList

		if (options.dataBox.direction == "horizontal") {

			chart = drawGroupedBarHori(this.barContainer, this.data, options, layout)

		} else {

			chart = drawGroupedBar(this.barContainer, this.data, options, layout)

		}
		return chart
	}

	groupedBar2(options, legendDom, layout) {
		let chart
		this.data = handleGroupedBarData2(options)
		this.category = this.data.category

		if (options.dataBox.direction == "horizontal") {

			chart = drawGroupedBarHori2(this.barContainer, this.data, options, layout)

		} else {

			chart = drawGroupedBar2(this.barContainer, this.data, options, layout)

		}
		return chart
	}

	stackedBar(options, legendDom, layout) {
		let chart
		this.data = handleStackedBar(options)
		this.category = this.data.keyList

		if (options.dataBox.direction == "horizontal") {

			chart = drawStackedBarHori(this.barContainer, this.data, options, layout)

		} else {

			chart = drawStackedBar(this.barContainer, this.data, options, layout)

		}
		return chart
	}
}