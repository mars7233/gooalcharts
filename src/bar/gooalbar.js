import GooalCharts from '../gooalcharts'
import BarPresenter from './barPresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import { GooalLegend } from '../drawLegend'
import LegendEvents from '../chartEvent/legendEvents'

export default class GooalBar extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getBarSVG(), this.getOptions())
        this.legendEvents = new LegendEvents(this.getBarSVG(), this.getOptions())
    }
    // title
    getTitleSVG() {
        return this.titleSVG
    }

    // bar
    getBarSVG() {
        return this.bar.chart
    }

    // tooltip
    getTooltip() {
        return this.tooltip
    }

    addTooltip(tooltipConfig) {
        this.tooltipConfig = tooltipConfig
        let tooltip = new GooalTooltip(this.getBarSVG(), this.getOptions(), tooltipConfig)
        this.tooltip = tooltip

        return tooltip.tooltip
    }

    redrawTooltip() {
        let tooltip = this.getTooltip()
        tooltip.redrawTooltips(this.getBarSVG(), this.getOptions(), this.tooltipConfig)
        return tooltip.tooltip
    }

    // draw
    draw() {
        this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.legend = new GooalLegend(this.getLegendBox(), this.bar.category, this.getOptions())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawBar() {
        let parentWith = this.getParentWidth()
        this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.legend = new GooalLegend(this.getLegendBox(), this.bar.category, this.getOptions())
        if (this.getTitleOpt != "") {
            this.titleSVG = title(this.getTitleBox(), this.getOptions())
        }
        this.redrawTooltip()
    }

    // events
    addEvent(event, method) {
        return this.dataBoxEvents.addEvents(this.getBarSVG(), event, method, this.getOptions())
    }

    // select
    selectOn(method) {
        // 开始记录点击事件并关闭其他事件
        return this.dataBoxEvents.selectEvent(method, this.getDataBox(), this.getOptions())
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