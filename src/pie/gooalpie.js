import GooalCharts from '../gooalcharts'
import PiePresenter from './piePresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import { GooalLegend } from '../drawLegend'
import LegendEvents from '../chartEvent/legendEvents'

export default class GooalPie extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getPieSVG(), this.getOptions())
        this.legendEvents = new LegendEvents(this.getPieSVG(), this.getOptions())
    }

    getTitleSVG() {
        return this.titleSVG;
    }

    getPieSVG() {
        return this.pie.chart
    }
    // tooltip
    getTooltip() {
        return this.tooltip
    }

    addTooltip(tooltipConfig) {
        let tooltip = new GooalTooltip(this.getPieSVG(), this.getOptions(), tooltipConfig)
        this.tooltipConfig = tooltipConfig
        this.tooltip = tooltip
        return tooltip.tooltip
    }

    redrawTooltip() {
        let tooltip = this.getTooltip()
        tooltip.redrawTooltips(this.getPieSVG(), this.getOptions(), this.tooltipConfig)
        return tooltip.tooltip
    }

    addEvent(event, method) {
        return this.dataBoxEvents.addEvents(this.getPieSVG(), event, method, this.getOptions())
    }

    draw() {
        this.pie = new PiePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.legend = new GooalLegend(this.getLegendBox(), this.pie.category, this.getOptions())
    }

    redrawPie() {
        let parentWith = this.getParentWidth()
        this.pie = new PiePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.legend = new GooalLegend(this.getLegendBox(), this.pie.category, this.getOptions())
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