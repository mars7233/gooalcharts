import drawPie from './pieView'
import { handlePieData } from './dataEvents'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import { GooalLegend } from '../drawLegend'

export default class PiePresenter {
    constructor(dom, options, legendDom, layout) {
        this.width = layout.data.width
        this.height = layout.data.height
        this.pieContainer = dom
        this.data = handlePieData(options)
        this.pie = drawPie(this.pieContainer, this.data, options, layout)
        this.legend = new GooalLegend(legendDom, this.data.keys, options)
        this.databoxEvent = new DataBoxEvents(this.pieContainer, options)
        this.databoxEvent.defaultEvents(options)

        return { "chart": this.pieContainer, "category": this.data.keys }
    }
}