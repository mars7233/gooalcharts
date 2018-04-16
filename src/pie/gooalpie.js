import GooalCharts from '../gooalcharts'
import pie from './piePresenter'
import title from '../drawTitle'
import { setTooltips, redrawTooltips } from './tooltip'
import GooalTooltip from '../gooaltooltip'
import { addEvents } from './mouseEvents'

export default class GooalPie extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.draw()
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
        return addEvents(this.getPieSVG(), event, method, this.getOptions())
    }

    draw() {
        this.PieSVG = pie(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawPie() {
        let parentWith = this.getParentWidth()
        this.PieSVG = pie(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.tooltip = this.redrawTooltip()
    }
}