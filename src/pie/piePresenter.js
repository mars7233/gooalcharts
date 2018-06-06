import drawPie from './pieView'
import { handlePieData } from './dataEvents'
import DataBoxEvents from '../chartEvent/dataBoxEvents'

export default class PiePresenter {
    constructor(dom, options, legendDom, layout) {
        dom.html("")
        this.width = layout.data.width
        this.height = layout.data.height
        this.pieContainer = dom
        this.data = handlePieData(options)
        this.pie = drawPie(this.pieContainer, this.data, options, layout)
        this.databoxEvent = new DataBoxEvents(this.pieContainer, options)
        this.databoxEvent.defaultEvents(options)

        return { "chart": this.pieContainer, "category": this.data.keys }
    }
}