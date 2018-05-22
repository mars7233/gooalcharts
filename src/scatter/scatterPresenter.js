import drawScatter from './scatterView'
import DataBoxEvent from '../chartEvent/dataBoxEvents'
import { handleScatterData } from './dataEvents'
import { GooalLegend } from '../drawLegend'
import drawAxis from '../drawAxis'

export default class ScatterPresenter {
    constructor(dom, options, legendDom, newWidth) {
        this.width = 800
        newWidth != undefined ? this.width = "" : {}
        this.height = 400
        this.scatterContainer = dom
        this.data = handleScatterData(options)
        this.scatter = drawScatter(this.scatterContainer, this.data, options, newWidth)
        this.axis = drawAxis(this.scatter, options, newWidth)
        this.legend = new GooalLegend(legendDom, this.data.category, options)
        this.dataBoxEvents = new DataBoxEvent(this.scatterContainer, options)
        this.dataBoxEvents.defaultEvents(options)

        return this.scatterContainer
    }
}