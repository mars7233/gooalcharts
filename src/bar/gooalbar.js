import GooalCharts from '../gooalcharts'
import BarPresenter from './barPresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import { GooalLegend } from '../drawLegend'
import LegendEvents from '../chartEvent/legendEvents'
import { GooalAxis } from '../drawAxis'

export default class GooalBar extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getBarContainer(), this.getOptions())
        this.legendEvents = new LegendEvents(this.getBarContainer(), this.getOptions())
    }
    // title
    getTitleSVG() {
        return this.titleSVG
    }

    // bar
    getBarSVG() {
        return this.bar.chart
    }

    getBarContainer() {
        return this.bar.container
    }

    // tooltip
    getTooltip() {
        return this.tooltip
    }

    addTooltip(tooltipConfig) {
        this.tooltipConfig = tooltipConfig
        let tooltip = new GooalTooltip(this.getBarContainer(), this.getOptions(), tooltipConfig)
        this.tooltip = tooltip

        return tooltip.tooltip
    }

    redrawTooltip() {
        let tooltip = this.getTooltip()
        tooltip.redrawTooltips(this.getBarContainer(), this.getOptions(), this.tooltipConfig)
        return tooltip.tooltip
    }

    // draw
    draw() {
        this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.legend = new GooalLegend(this.getLegendBox(), this.bar.category, this.getOptions())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.axis = new GooalAxis(this.getBarSVG(), this.getOptions(), this.getLayout())
    }

    redrawBar() {
        let parentWith = this.getParentWidth()
        this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.legend = new GooalLegend(this.getLegendBox(), this.bar.category, this.getOptions())
        if (this.getTitleOpt != "") {
            this.titleSVG = title(this.getTitleBox(), this.getOptions())
        }
        if (this.legend.isOverWidth == true) {
            this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.axis = new GooalAxis(this.getBarSVG(), this.getOptions(), this.getLayout())
        this.redrawTooltip()
    }

    // events
    addEvent(event, method) {
        return this.dataBoxEvents.addEvents(this.getBarContainer(), event, method, this.getOptions())
    }

    // select
    selectOn(method, selectData) {
        // 开始记录点击事件并关闭其他事件
        return this.dataBoxEvents.selectEvent(method, this.getDataBox(), this.getOptions(), selectData)
    }

    selectOff() {
        // 关闭点击事件返回数据并开启其他事件
        return this.dataBoxEvents.selectOff(this.getOptions())
    }

    // changeColor
    getLegendItem(changeColorConfig) {
        this.changeColorConfig = changeColorConfig
        return this.legendEvents.getLegendItem(changeColorConfig)
    }

    changeColor(index, color) {
        return this.legendEvents.changeColor(index, color)
    }

}