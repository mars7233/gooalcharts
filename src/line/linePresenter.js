import drawLine from './lineView'
import { handleLineData } from './dataEvents'
import drawAxis from '../drawAxis'
import DataBoxEvents from '../chartEvent/dataBoxEvents'

export default class LinePresenter {
    constructor(dom, options, legendDom, newWidth) {
        this.width = 800
        newWidth != undefined ? this.width = "" : {}
        this.height = 400
        this.lineContainer = dom
        this.data = handleLineData(options)
        this.line = drawLine(this.lineContainer, this.data, options, newWidth)
        this.axis = drawAxis(this.line, options, newWidth)
        this.dataBoxEvents = new DataBoxEvents(this.lineContainer, options)
        this.dataBoxEvents.defaultEvents(options)

        return { "chart": this.lineContainer, "category": this.data.category }
    }
}