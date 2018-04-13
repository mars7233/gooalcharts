import GooalCharts from '../gooalcharts'
import scatter from './scatterPresenter'
import title from '../drawTitle'
import { setTooltips, redrawTooltips } from './tooltip'
import { addEvents } from './mouseEvents'

export default class GooalScatter extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.draw()
    }

    getTitleSVG() {
        return this.titleSVG
    }

    getScatterSVG() {
        return this.scatterSVG
    }

    addTooltip(tooltipConfig) {
        let tooltip = setTooltips(this.getScatterSVG())
        this.tooltipCon = tooltipConfig
        this.addEvent("mouseover.tooltip", this.tooltipCon)
        return tooltip
    }

    redrawTooltip() {
        let tooltip = redrawTooltips(this.getScatterSVG())
        this.addEvent("mouseover.tooltip", this.tooltipCon)
        return tooltip
    }

    setLegend() {

    }

    addEvent(event, method) {
        return addEvents(this.getScatterSVG(), event, method)
    }

    draw() {
        this.scatterSVG = scatter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawScatter() {
        let parentWith = this.getParentWidth()
        this.scatterSVG = scatter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.redrawTooltip(this.tooltipCon)
    }
}

