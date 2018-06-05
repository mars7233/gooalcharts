import * as d3 from 'd3'
import GooalCharts from '../gooalcharts'
import drawTitle from '../drawTitle'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import GooalBar from '../bar/gooalbar'
import BarPresenter from '../bar/barPresenter'
import LinePresenter from '../line/linePresenter'
import { GooalAxis } from '../drawAxis'
import GooalTooltip from '../gooaltooltip'

export default class GooalCustom extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getBarContainer(), this.getOptions())
    }
    getBarContainer() {
        return this.bar.container
    }

    getLineContainer() {
        return this.line.container
    }

    // tooltip
    getTooltip() {
        return this.tooltip
    }

    addTooltip(bartooltipconfig, linetooltipconfig) {
        this.bartooltipconfig = bartooltipconfig
        this.linetooltipconfig = linetooltipconfig

        this.options.type = "bar"
        this.bartooltip = new GooalTooltip(this.getBarContainer(), this.getOptions(), bartooltipconfig)

        this.options.type = "line"
        this.linetooltip = new GooalTooltip(this.getLineContainer(), this.getOptions(), linetooltipconfig)
        this.options.type = "groupchart"

        return [this.bartooltip.tooltip, this.linetooltip.tooltip]
    }

    redrawTooltip() {

        this.options.type = "bar"
        this.bartooltip.redrawTooltips(this.getBarContainer(), this.getOptions(), this.bartooltipconfig)

        this.options.type = "line"
        this.linetooltip.redrawTooltips(this.getLineContainer(), this.getOptions(), this.linetooltipconfig)
        this.options.type = "groupchart"

        return [this.bartooltip.tooltip, this.linetooltip.tooltip]
    }

    draw() {
        this.options.layout.margin = { top: 20, right: 10, bottom: 10, left: 20 }
        let barData = this.options.data[0]
        let lineData = this.options.data[1]

        if ("title2" in this.options.axisBox.xAxis) {
            this.options.layout.margin.top = 45
        }
        this.options.data = barData
        this.options.type = "bar"
        this.options.dataBox.direction = "horizontal"
        this.title = drawTitle(this.getTitleBox(), this.getOptions())
        this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

        this.options.type = "groupchart"
        this.axis = new GooalAxis(this.bar.chart, this.getOptions(), this.getLayout())

        this.options.layout.margin = { top: 20, right: 10, bottom: 10, left: 20 }
        if ("title2" in this.options.axisBox.xAxis) {
            this.options.layout.margin.top = 45
        }
        this.options.data = lineData
        this.options.type = "line"
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

        this.options.type = "groupchart"

        this.options.data = [barData, lineData]
    }

    redrawCustom() {
        this.options.layout.margin = { top: 20, right: 10, bottom: 10, left: 20 }
        let barData = this.options.data[0]
        let lineData = this.options.data[1]

        if ("title2" in this.options.axisBox.xAxis) {
            this.options.layout.margin.top = 45
        }
        this.options.data = barData
        this.options.type = "bar"
        this.options.dataBox.direction = "horizontal"
        this.title = drawTitle(this.getTitleBox(), this.getOptions())
        this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

        this.options.type = "groupchart"
        this.axis = new GooalAxis(this.bar.chart, this.getOptions(), this.getLayout())

        this.options.layout.margin = { top: 20, right: 10, bottom: 10, left: 20 }
        if ("title2" in this.options.axisBox.xAxis) {
            this.options.layout.margin.top = 45
        }
        this.options.data = lineData
        this.options.type = "line"
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.options.type = "groupchart"
        this.redrawTooltip()

        this.options.data = [barData, lineData]
    }
}