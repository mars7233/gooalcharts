import GooalCharts from '../gooalcharts'
import LinePresenter from './linePresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import { addEvents } from '../chartEvent/dataBoxEvents'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import LegendEvents from '../chartEvent/legendEvents'

export default class GooalLine extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getLineSVG(), this.getOptions())
        this.legendEvents = new LegendEvents(this.getLineSVG(), this.getOptions())
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
        return this.dataBoxEvents.addEvents(this.getLineSVG(), event, method, this.getOptions())
    }

    draw() {
        this.lineSVG = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawLine() {
        this.lineSVG = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.redrawTooltip()

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