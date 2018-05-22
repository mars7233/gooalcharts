import GooalCharts from '../gooalcharts'
import PiePresenter from './piePresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
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
        return this.PieSVG
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
        this.PieSVG = new PiePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawPie() {
        let parentWith = this.getParentWidth()
        this.PieSVG = new PiePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
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