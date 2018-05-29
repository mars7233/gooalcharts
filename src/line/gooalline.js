import GooalCharts from '../gooalcharts'
import LinePresenter from './linePresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import { GooalLegend } from '../drawLegend'
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
        return this.line.chart
    }

    // legend
    getLegend() {
        return this.legend
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
        tooltip.redrawTooltips(this.getLineSVG(), this.getOptions(), this.tooltipConfig)
        return tooltip.tooltip
    }

    addEvent(event, method) {
        return this.dataBoxEvents.addEvents(this.getLineSVG(), event, method, this.getOptions())
    }

    draw() {
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.legend = new GooalLegend(this.getLegendBox(), this.line.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }


    }

    redrawLine() {
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.legend = new GooalLegend(this.getLegendBox(), this.line.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
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