import GooalCharts from '../gooalcharts'
import ScatterPresenter from './scatterPresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import { GooalLegend } from '../drawLegend'
import LegendEvents from '../chartEvent/legendEvents'
import { GooalAxis } from '../drawAxis'

export default class GooalScatter extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getScatterContainer(), this.getOptions())
        this.legendEvents = new LegendEvents(this.getScatterContainer(), this.getOptions())
    }

    getTitleSVG() {
        return this.titleSVG
    }

    getScatterSVG() {
        return this.scatter.chart
    }
    getScatterContainer() {
        return this.scatter.container
    }

    getTooltip() {
        return this.tooltip
    }

    addTooltip(tooltipCon) {
        this.tooltipConfig = tooltipCon
        let tooltip = new GooalTooltip(this.getScatterContainer(), this.getOptions(), tooltipCon)
        this.tooltip = tooltip
        return tooltip.tooltip
    }

    redrawTooltip() {
        let tooltip = this.getTooltip()
        tooltip.redrawTooltips(this.getScatterContainer(), this.getOptions(), this.tooltipConfig)

        return tooltip.tooltip
    }


    addEvent(event, method) {
        return dataBoxEvents.addEvents(this.getScatterContainer(), event, method, this.getOptions())
    }

    draw() {
        this.scatter = new ScatterPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.legend = new GooalLegend(this.getLegendBox(), this.scatter.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.scatter = new ScatterPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.axis = new GooalAxis(this.getScatterSVG(), this.getOptions(), this.getLayout())
    }

    redrawScatter() {

        let parentWith = this.getParentWidth()
        this.scatter = new ScatterPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.legend = new GooalLegend(this.getLegendBox(), this.scatter.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.scatter = new ScatterPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.axis = new GooalAxis(this.getScatterSVG(), this.getOptions(), this.getLayout())
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

