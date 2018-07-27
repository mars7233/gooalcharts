import * as d3 from 'd3'
import GooalCharts from '../gooalcharts'
import { GooalTitle } from '../drawTitle'
import { GooalAxis } from '../drawAxis'
import { GooalLegend } from '../drawLegend'
import BarPresenter from '../bar/barPresenter'
import LinePresenter from '../line/linePresenter'
import GooalTooltip from '../gooaltooltip'
import TitleEvents from '../chartEvent/titleEvent'
import DataBoxEvents from '../chartEvent/dataBoxEvents'

export default class GooalCustom extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getBarContainer(), this.getOptions())
        this.titleEvents = new TitleEvents(this.getTitleBox(), this.getOptions())
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
        if (bartooltipconfig) {
            this.bartooltipconfig = bartooltipconfig
            this.options.type = "bar"
            this.bartooltip = new GooalTooltip(this.getBarContainer(), this.getOptions(), bartooltipconfig)
        }
        if (linetooltipconfig) {
            this.linetooltipconfig = linetooltipconfig
            this.options.type = "line"
            this.linetooltip = new GooalTooltip(this.getLineContainer(), this.getOptions(), linetooltipconfig)
        }
        this.options.type = "groupchart"

        if (this.bartooltip && this.linetooltip) {
            return [this.bartooltip.tooltip, this.linetooltip.tooltip]
        } else if (this.bartooltip && !this.linetooltip) {
            return [this.bartooltip.tooltip]
        } else if (!this.bartooltip && this.linetooltip) {
            return [this.line.tooltip]
        }

    }

    redrawTooltip() {
        if (this.bartooltipconfig) {
            this.options.type = "bar"
            this.bartooltip.redrawTooltips(this.getBarContainer(), this.getOptions(), this.bartooltipconfig)
        }
        if (this.linetooltipconfig) {
            this.options.type = "line"
            this.linetooltip.redrawTooltips(this.getLineContainer(), this.getOptions(), this.linetooltipconfig)
        }
        this.options.type = "groupchart"

        if (this.bartooltip && this.linetooltip) {
            return [this.bartooltip.tooltip, this.linetooltip.tooltip]
        } else if (this.bartooltip && !this.linetooltip) {
            return [this.bartooltip.tooltip]
        } else if (!this.bartooltip && this.linetooltip) {
            return [this.line.tooltip]
        }
    }

    draw() {
        this.options.layout.margin = { top: 20, right: 30, bottom: 10, left: 20 }
        let barData = this.options.data[0]
        let lineData = this.options.data[1]

        if ("title2" in this.options.axisBox.xAxis) {
            this.options.layout.margin.top = 45
        }

        this.options.data = barData
        this.options.type = "bar"
        this.options.dataBox.direction = "horizontal"
        this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

        this.options.type = "groupchart"
        this.axis = new GooalAxis(this.bar.chart, this.getOptions(), this.getLayout())

        this.options.layout.margin = { top: 20, right: 30, bottom: 10, left: 20 }
        if ("title2" in this.options.axisBox.xAxis) {
            this.options.layout.margin.top = 45
        }
        this.options.data = lineData
        this.options.type = "line"
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

        this.options.type = "groupchart"
        this.getLegendBox().attr("y", "100px")
        this.legend = new GooalLegend(this.getLegendBox(), [this.options.axisBox.xAxis.title, this.options.axisBox.xAxis.title2], this.getOptions())


        if (this.legend.isOverWidth == true) {
            this.options.layout.margin = { top: 20, right: 30, bottom: 10, left: 20 }

            if ("title2" in this.options.axisBox.xAxis) {
                this.options.layout.margin.top = 45
            }

            this.options.data = barData
            this.options.type = "bar"
            this.options.dataBox.direction = "horizontal"
            this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

            this.options.type = "groupchart"
            this.axis = new GooalAxis(this.bar.chart, this.getOptions(), this.getLayout())

            this.options.layout.margin = { top: 20, right: 30, bottom: 10, left: 20 }
            if ("title2" in this.options.axisBox.xAxis) {
                this.options.layout.margin.top = 45
            }
            this.options.data = lineData
            this.options.type = "line"
            this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

            this.options.type = "groupchart"
        }

        this.titleSVG = new GooalTitle(this.getTitleBox(), this.getOptions())

        this.options.data = [barData, lineData]
    }

    redrawCustom() {
        this.options.layout.margin = { top: 20, right: 30, bottom: 10, left: 20 }
        let barData = this.options.data[0]
        let lineData = this.options.data[1]

        if ("title2" in this.options.axisBox.xAxis) {
            this.options.layout.margin.top = 45
        }

        this.options.data = barData
        this.options.type = "bar"
        this.options.dataBox.direction = "horizontal"
        this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

        this.options.type = "groupchart"
        this.axis = new GooalAxis(this.bar.chart, this.getOptions(), this.getLayout())

        this.options.layout.margin = { top: 20, right: 30, bottom: 10, left: 20 }
        if ("title2" in this.options.axisBox.xAxis) {
            this.options.layout.margin.top = 45
        }
        this.options.data = lineData
        this.options.type = "line"
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.options.type = "groupchart"

        this.getLegendBox().attr("y", "100px")
        this.legend = new GooalLegend(this.getLegendBox(), [this.options.axisBox.xAxis.title, this.options.axisBox.xAxis.title2], this.getOptions())

        if (this.legend.isOverWidth == true) {
            this.options.layout.margin = { top: 20, right: 30, bottom: 10, left: 20 }
            if ("title2" in this.options.axisBox.xAxis) {
                this.options.layout.margin.top = 45
            }

            this.options.data = barData
            this.options.type = "bar"
            this.options.dataBox.direction = "horizontal"
            this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

            this.options.type = "groupchart"
            this.axis = new GooalAxis(this.bar.chart, this.getOptions(), this.getLayout())

            this.options.layout.margin = { top: 20, right: 30, bottom: 10, left: 20 }
            if ("title2" in this.options.axisBox.xAxis) {
                this.options.layout.margin.top = 45
            }
            this.options.data = lineData
            this.options.type = "line"
            this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
            this.options.type = "groupchart"

        }

        this.titleSVG = new GooalTitle(this.getTitleBox(), this.getOptions())

        this.redrawTooltip()

        this.options.data = [barData, lineData]
    }


    // changeTitle
    dbClickTitle(callback) {
        this.titleEvents.dbClickTitle(callback)
    }
    changeTitle(newTitle) {
        this.titleSVG.text.text(newTitle)
    }

    mouseoverTitle(callback) {
        this.titleEvents.mouseoverTitle(callback)
    }

    mouseoutTitle(callback) {
        this.titleEvents.mouseoutTitle(callback)
    }

    // select
    selectOn(method, selFunc) {
        // 开始记录点击事件并关闭其他事件
        this.options.type = "bar"
        this.dataBoxEvents.selectEvent(method, this.getDataBox(), this.getOptions(), selFunc)
        // this.options.type = "groupchart"
    }

    selectOff() {
        // 关闭点击事件返回数据并开启其他事件
        return this.dataBoxEvents.selectOff(this.getOptions())
        this.options.type = "groupchart"
    }


    mouseoverLegend(callback) {
        this.legendEvents.mouseoverLegend(callback)
    }

    mouseoutLegend(callback) {
        this.legendEvents.mouseoutLegend(callback)
    }


}