import GooalCharts from '../gooalcharts'
import bar from './barPresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import { addEvents } from '../chartEvent/mouseEvent'
import MouseEvent from '../chartEvent/mouseEvent'

let mouseEvent

export default class GooalBar extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        mouseEvent = new MouseEvent()
    }
    // title
    getTitleSVG() {
        return this.titleSVG
    }

    // bar
    getBarSVG() {
        return this.barSVG
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
        this.barSVG = bar(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        if (this.getTitleOpt != "") {
            this.titleSVG = title(this.getTitleBox(), this.getOptions())
        }
    }

    redrawBar() {
        let parentWith = this.getParentWidth()
        this.barSVG = bar(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        if (this.getTitleOpt != "") {
            this.titleSVG = title(this.getTitleBox(), this.getOptions())
        }
        this.redrawTooltip()
    }

    // events
    addEvent(event, method) {
        return addEvents(this.getBarSVG(), event, method, this.getOptions())
    }

    // select
    selectOn(method) {
        // 开始记录点击事件并关闭其他事件
        return mouseEvent.selectEvent(method, this.getDataBox(), this.getOptions())
    }

    selectOff() {
        // this.redraw()
        // 关闭点击事件返回数据并开启其他事件
        return mouseEvent.selectOff()
    }


}