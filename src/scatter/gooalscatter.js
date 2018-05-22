import GooalCharts from '../gooalcharts'
import ScatterPresenter from './scatterPresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import LegendEvents from '../chartEvent/legendEvents'



export default class GooalScatter extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getScatterSVG(), this.getOptions())
        this.legendEvents = new LegendEvents(this.getScatterSVG(), this.getOptions())
    }

    getTitleSVG() {
        return this.titleSVG
    }

    getScatterSVG() {
        return this.scatterSVG
    }

    getTooltip() {
        return this.tooltip
    }

    addTooltip(tooltipCon) {
        this.tooltipConfig = tooltipCon
        let tooltip = new GooalTooltip(this.getScatterSVG(), this.getOptions(), tooltipCon)
        this.tooltip = tooltip
        return tooltip.tooltip
    }

    redrawTooltip() {
        let tooltip = this.getTooltip()
        tooltip.redrawTooltips(this.getScatterSVG(), this.getOptions(), this.tooltipConfig)

        return tooltip.tooltip
    }

    setLegend() {

    }

    addEvent(event, method) {
        return dataBoxEvents.addEvents(this.getScatterSVG(), event, method, this.getOptions())
    }

    draw() {
        this.scatterSVG = new ScatterPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawScatter() {

        let parentWith = this.getParentWidth()
        this.scatterSVG = new ScatterPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
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

