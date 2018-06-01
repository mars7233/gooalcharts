import drawLine from './lineView'
import { handleLineData } from './dataEvents'

import DataBoxEvents from '../chartEvent/dataBoxEvents'

export default class LinePresenter {
    constructor(dom, options, legendDom, layout) {
        dom.html("")
        layout.margin = { top: 10, right: 10, bottom: 10, left: 20 }
        this.width = layout.data.width
        this.height = layout.data.height
        this.lineContainer = dom
        this.data = handleLineData(options)
        this.line = drawLine(this.lineContainer, this.data, options, layout)
        // this.axis = drawAxis(this.line, options, layout)
        
        this.dataBoxEvents = new DataBoxEvents(this.lineContainer, options)
        this.dataBoxEvents.defaultEvents(options)

        return { "chart": this.line, "category": this.data.category, "container": this.lineContainer }
    }
}