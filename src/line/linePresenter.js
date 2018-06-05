import drawLine from './lineView'
import drawLineHori from './lineViewHorizon'
import { handleLineData, handleLineHoriData } from './dataEvents'

import DataBoxEvents from '../chartEvent/dataBoxEvents'

export default class LinePresenter {
    constructor(dom, options, legendDom, layout) {
        // dom.html("")
        this.width = layout.data.width
        this.height = layout.data.height
        this.lineContainer = dom
        if (options.dataBox.direction == "horizontal") {
            this.data = handleLineHoriData(options)
            this.line = drawLineHori(this.lineContainer, this.data, options, layout)
        } else {
            this.data = handleLineData(options)
            this.line = drawLine(this.lineContainer, this.data, options, layout)
            // this.axis = drawAxis(this.line, options, layout)
        }
        this.dataBoxEvents = new DataBoxEvents(this.lineContainer, options)
        this.dataBoxEvents.defaultEvents(options)

        return { "chart": this.line, "category": this.data.category, "container": this.lineContainer }
    }
}