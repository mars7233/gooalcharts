import GooalCharts from '../gooalcharts'
import LinePresenter from './linePresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import { GooalLegend } from '../drawLegend'
import LegendEvents from '../chartEvent/legendEvents'
import { GooalAxis } from '../drawAxis'

export default class GooalLine extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getLineContainer(), this.getOptions())
        this.legendEvents = new LegendEvents(this.getLineContainer(), this.getOptions())
    }

    // title
    getTitleSVG() {
        return this.titleSVG
    }

    // line
    getLineSVG() {
        return this.line.chart
    }

    getLineContainer() {
        return this.line.container
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
        let tooltip = new GooalTooltip(this.getLineContainer(), this.getOptions(), tooltipConfig)
        this.tooltip = tooltip
        return tooltip.tooltip
    }

    redrawTooltip() {
        let tooltip = this.getTooltip()
        tooltip.redrawTooltips(this.getLineContainer(), this.getOptions(), this.tooltipConfig)
        return tooltip.tooltip
    }

    addEvent(event, method) {
        return this.dataBoxEvents.addEvents(this.getLineContainer(), event, method, this.getOptions())
    }

    draw() {
        this.getLayout().margin = { top: 10, right: 10, bottom: 10, left: 20 }
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.legend = new GooalLegend(this.getLegendBox(), this.line.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.axis = new GooalAxis(this.line.chart, this.getOptions(), this.getLayout())



    }

    redrawLine() {
        this.getLayout().margin = { top: 10, right: 10, bottom: 10, left: 20 }
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.legend = new GooalLegend(this.getLegendBox(), this.line.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.axis = new GooalAxis(this.line.chart, this.getOptions(), this.getLayout())
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