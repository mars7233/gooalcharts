import drawLine from './lineView'
import { handleLineData } from './dataEvents'
import { GooalAxis } from '../drawAxis'
import DataBoxEvents from '../chartEvent/dataBoxEvents'

export default class LinePresenter {
    constructor(dom, options, legendDom, layout) {
        this.width = layout.data.width
        this.height = layout.data.height
        this.lineContainer = dom
        this.data = handleLineData(options)
        this.line = drawLine(this.lineContainer, this.data, options, layout)
        // this.axis = drawAxis(this.line, options, layout)
        this.axis = new GooalAxis(this.line, options, layout)
        this.dataBoxEvents = new DataBoxEvents(this.lineContainer, options)
        this.dataBoxEvents.defaultEvents(options)

        return { "chart": this.lineContainer, "category": this.data.category }
    }
}