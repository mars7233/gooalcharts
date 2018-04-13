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
        let tooltip = setTooltips(this.getPieSVG())
        this.tooltipCon = tooltipConfig
        this.addEvent("mouseover.tooltip", this.tooltipCon)
        return tooltip
    }
    redrawTooltip() {
        let tooltip = redrawTooltips(this.getPieSVG())
        this.addEvent("mouseover.tooltips", this.tooltipCon)
        return tooltip
    }

    addEvent(event, method) {
        return addEvents(this.getPieSVG(), event, method)
    }

    draw() {
        this.PieSVG = pie(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawPie() {
        let parentWith = this.getParentWidth()
        this.PieSVG = pie(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout().data.width)
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
        this.redrawTooltip(this.tooltipConfig)
    }
}