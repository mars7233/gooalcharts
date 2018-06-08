import * as d3 from 'd3'

export default class LegendEvents {
    constructor(svg, opt, changeColorConfig) {
        this.svg = svg
        this.options = opt
        this.selectItem
    }

    getLegendItem(changeColorConfig) {
        this.changeColorConfig = changeColorConfig
        d3.selectAll("." + this.options.type + "LegendElement" + this.options.id)
            .on("click.changeColor", this.changeColorConfig)
    }

    changeColor(index, color) {
        let normalColor = this.options.dataBox.normalColor
        normalColor[index] = color
    }
}