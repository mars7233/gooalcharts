import * as d3 from 'd3'
import GooalCharts from '../gooalcharts'
import drawTitle from '../drawTitle'
import GooalBar from '../bar/gooalbar'
import BarPresenter from '../bar/barPresenter'

export default class GooalCustom extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
    }

    draw() {
        this.options.type = "bar"
        this.options.dataBox.direction = "horizontal"
        this.title = drawTitle(this.getTitleBox(), this.getOptions())
        this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
    }
}