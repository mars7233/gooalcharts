import * as d3 from 'd3'
import GooalCharts from '../gooalcharts'
import drawTitle from '../drawTitle'
import GooalBar from '../bar/gooalbar'
import BarPresenter from '../bar/barPresenter'
import LinePresenter from '../line/linePresenter'
import { GooalAxis } from '../drawAxis'

export default class GooalCustom extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
    }

    draw() {
        console.log(this.options)
        let barData = this.options.data[0]
        let lineData = this.options.data[1]
        this.options.data = barData
        this.options.type = "bar"
        this.options.dataBox.direction = "horizontal"
        this.title = drawTitle(this.getTitleBox(), this.getOptions())
        this.bar = new BarPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        this.options.type = "groupchart"
        this.axis = new GooalAxis(this.bar.chart, this.getOptions(), this.getLayout())

        this.options.data = lineData
        this.options.type = "line"
        this.line = new LinePresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

    }
}