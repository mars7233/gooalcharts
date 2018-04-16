import GooalCharts from '../gooalcharts'
import bar from './barPresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import { addEvents } from './mouseEvents'

export default class GooalBar extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
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
        return tooltip
    }

    addEvent(event, method) {
        return addEvents(this.getBarSVG(), event, method, this.getOptions())
    }

    draw() {
        this.barSVG = bar(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawBar() {
        let parentWith = this.getParentWidth()
        this.barSVG = bar(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        let tooltip = this.redrawTooltip()

    }
}