import GooalCharts from '../gooalcharts'
import LinePresenter from './linePresenter'
import { GooalTitle } from '../drawTitle'
import { GooalLegend } from '../drawLegend'
import { GooalAxis } from '../drawAxis'
import GooalTooltip from '../gooaltooltip'
import LegendEvents from '../chartEvent/legendEvents'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import TitleEvents from '../chartEvent/titleEvent'

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
        this.getLayout().margin = { top: 10, right: 30, bottom: 10, left: 20 }
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

        this.legend = new GooalLegend(this.getLegendBox(), this.line.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.getDataBox().html("")
            this.getLayout().margin = { top: 10, right: 30, bottom: 10, left: 20 }
            this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.titleSVG = new GooalTitle(this.getTitleBox(), this.getOptions())
        this.axis = new GooalAxis(this.line.chart, this.getOptions(), this.getLayout())



    }

    redrawLine() {
        this.getLayout().margin = { top: 10, right: 30, bottom: 10, left: 20 }
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

        this.legend = new GooalLegend(this.getLegendBox(), this.line.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.getDataBox().html("")
            this.getLayout().margin = { top: 10, right: 30, bottom: 10, left: 20 }
            this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.titleSVG = new GooalTitle(this.getTitleBox(), this.getOptions())
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

    // changeTitle
    dbClickTitle(callback) {
        this.titleEvents = new TitleEvents(this.titleSVG.text, this.getOptions())
        this.titleEvents.dbClickTitle(callback)
    }
    changeTitle(newTitle) {
        this.titleSVG.text.text(newTitle)
    }


}