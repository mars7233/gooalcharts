import GooalCharts from '../gooalcharts'
import PiePresenter from './piePresenter'
import { GooalTitle } from '../drawTitle'
import { GooalLegend } from '../drawLegend'
import GooalTooltip from '../gooaltooltip'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import LegendEvents from '../chartEvent/legendEvents'
import TitleEvents from '../chartEvent/titleEvent'

export default class GooalPie extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getPieSVG(), this.getOptions())
        this.legendEvents = new LegendEvents(this.getPieSVG(), this.getOptions())
        this.titleEvents = new TitleEvents(this.getTitleBox(), this.getOptions())
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
        this.legend = new GooalLegend(this.getLegendBox(), this.pie.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.pie = new PiePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.titleSVG = new GooalTitle(this.getTitleBox(), this.getOptions())
    }

    redrawPie() {
        this.pie = new PiePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.legend = new GooalLegend(this.getLegendBox(), this.pie.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.pie = new PiePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.titleSVG = new GooalTitle(this.getTitleBox(), this.getOptions())
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
        return this.titleEvents.dbClickTitle(callback)
    }
    changeTitle(newTitle) {
        return this.titleSVG.text.text(newTitle)
    }

    mouseoverTitle(callback) {
        this.titleEvents.mouseoverTitle(callback)
    }

    mouseoutTitle(callback) {
        this.titleEvents.mouseoutTitle(callback)
    }

    mouseoverLegend(callback) {
        this.legendEvents.mouseoverLegend(callback)
    }

    mouseoutLegend(callback) {
        this.legendEvents.mouseoutLegend(callback)
    }
}