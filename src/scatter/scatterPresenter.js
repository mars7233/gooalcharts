import drawScatter from './scatterView'
import DataBoxEvent from '../chartEvent/dataBoxEvents'
import { handleScatterData } from './dataEvents'
import { GooalAxis } from '../drawAxis'
import * as d3 from 'd3'

export default class ScatterPresenter {
    constructor(dom, options, legendDom, layout) {
        dom.html("")
        this.width = layout.data.width
        this.height = layout.data.height
        this.scatterContainer = dom
        this.data = handleScatterData(options)
        this.scatter = drawScatter(this.scatterContainer, this.data, options, layout)
        // this.axis = drawAxis(this.scatter, options, layout)
        this.axis = new GooalAxis(this.scatter, options, layout)
        this.dataBoxEvents = new DataBoxEvent(this.scatterContainer, options)
        this.dataBoxEvents.defaultEvents(options)

        return { "chart": this.scatterContainer, "category": this.data.category }
    }
}