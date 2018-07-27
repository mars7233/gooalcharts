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
            .on("click.changeColor", stopPropagation, true)

        function stopPropagation(d, i) {
            var event = d3.event
            //    阻止事件向后传递
            event.stopPropagation();
            changeColorConfig(d, i)
        }
    }

    mouseoverLegend(call) {
        d3.selectAll("." + this.options.type + "LegendElement" + this.options.id)
            .on("mouseover.overLegend", call)
    }

    mouseoutLegend(call) {
        d3.selectAll("." + this.options.type + "LegendElement" + this.options.id)
            .on("mouseover.overLegend", call)
    }

    changeColor(index, color) {
        let normalColor = this.options.dataBox.normalColor
        normalColor[index] = color
    }
}