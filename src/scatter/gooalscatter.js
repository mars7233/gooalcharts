import GooalCharts from '../gooalcharts'
import scatter from './scatterPresenter'
import title from '../drawTitle'

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

    }

    redrawTooltip() {

    }

    setLegend() {

    }

    addEvent(event, method) {

    }

    draw() {
        this.scatterSVG = scatter(this.getDataBox(), this.getOptions(), this.getLegendBox())
        this.titleSVG = title(this.getTitleBox(), this.getOptions())
    }

    redrawScatter() {
    }
}

