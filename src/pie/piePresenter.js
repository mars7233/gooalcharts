import drawPie from './pieView'
import { handlePieData } from './dataEvents'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import { GooalLegend } from '../drawLegend'

export default class PiePresenter {
    constructor(dom, options, legendDom, newWidth) {
        this.width = 800
        newWidth != undefined ? this.width = "" : {}
        this.height = 400
        this.pieContainer = dom
        this.data = handlePieData(options)
        this.pie = drawPie(this.pieContainer, this.data, options, newWidth)
        this.legend = new GooalLegend(legendDom, this.data.keys, options)
        this.databoxEvent = new DataBoxEvents(this.pieContainer, options)
        this.databoxEvent.defaultEvents(options)

        return this.pieContainer
    }
}