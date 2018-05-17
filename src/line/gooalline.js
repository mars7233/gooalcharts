import GooalCharts from '../gooalcharts'
import line from './linePresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import { addEvents } from '../chartEvent/dataEvent'

export default class GooalLine extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
    }
    // title
    getTitleSVG() {
        return this.titleSVG
    }

    // line
    getLineSVG() {
        return this.lineSVG
    }

    // tooltip
    getTooltip() {
        return this.tooltip
    }

    addTooltip(tooltipConfig) {
        this.tooltipConfig = tooltipConfig
        let tooltip = new GooalTooltip(this.getLineSVG(), this.getOptions(), tooltipConfig)
        this.tooltip = tooltip

        return tooltip.tooltip
    }

    redrawTooltip() {
        let tooltip = this.getTooltip()
        tooltip.redrawTooltips(this.getBarSVG(), this.getOptions(), this.tooltipConfig)
        return tooltip.tooltip
    }

    addEvent(event, method) {
        return addEvents(this.getLineSVG(), event, method, this.getOptions())
    }

    draw() {
        this.lineSVG = line(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawLine() {
        this.lineSVG = line(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.redrawTooltip()

    }
}