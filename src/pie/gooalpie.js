import GooalCharts from '../gooalcharts'
import pie from './piePresenter'
import title from '../drawTitle'
import { setTooltips, redrawTooltips } from './tooltip'
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
    addTooltip(tooltipConfig) {
        var tooltip = setTooltips(this.getPieSVG())
        this.tooltipCon = tooltipConfig
        this.addEvent("mouseover.tooltip", this.tooltipCon)
        return tooltip
    }
    redrawTooltip() {
        var tooltip = redrawTooltips(this.getPieSVG())
        this.addEvent("mouseover.tooltips", this.tooltipCon)
        return tooltip
    }

    addEvent(event, method) {
        return addEvents(this.getPieSVG(), event, method)
    }

    draw() {
        this.PieSVG = pie(this.getDataBox(), this.getOptions())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawPie() {
        var parentWith = this.getParentWidth()
        this.PieSVG = pie(this.getDataBox(), this.getOptions(), this.getLegendBox(), parentWith * 0.8)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.redrawTooltip(this.tooltipConfig)
    }
}