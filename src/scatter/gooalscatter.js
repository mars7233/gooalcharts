import GooalCharts from '../gooalcharts'
import scatter from './scatterPresenter'
import title from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import { addEvents } from './mouseEvents'


export default class GooalScatter extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
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
        return addEvents(this.getScatterSVG(), event, method, this.getOptions())
    }

    draw() {
        console.log(2333)
        this.scatterSVG = scatter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawScatter() {

        let parentWith = this.getParentWidth()
        this.scatterSVG = scatter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.redrawTooltip()
    }
}

