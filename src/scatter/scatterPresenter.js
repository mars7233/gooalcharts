import drawScatter from './scatterView'
import Bubble from './bubbleView'
import DataBoxEvent from '../chartEvent/dataBoxEvents'
import { handleScatterData, handleBubbleData } from './dataEvents'

export default class ScatterPresenter {
    constructor(dom, options, legendDom, layout) {
        dom.html("")
        layout.margin = { top: 10, right: 10, bottom: 10, left: 20 }
        this.width = layout.data.width
        this.height = layout.data.height
        this.scatterContainer = dom

        if (options.type == "bubble") {
            this.data = handleBubbleData(options)
            this.scatter = new Bubble(this.scatterContainer, this.data, options, layout)
            return { "chart": this.scatter, "category": this.data.category, "container": this.scatterContainer }
        } else {
            this.data = handleScatterData(options)
            this.scatter = drawScatter(this.scatterContainer, this.data, options, layout)
            // this.axis = drawAxis(this.scatter, options, layout)

            this.dataBoxEvents = new DataBoxEvent(this.scatterContainer, options)
            this.dataBoxEvents.defaultEvents(options)
            return { "chart": this.scatter, "category": this.data.category, "container": this.scatterContainer }
        }


    }
}