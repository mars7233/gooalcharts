import * as d3 from 'd3'

export default class GooalTooltip {
    constructor(svg, opt, tooltipCon) {
        this.chartEl = svg
        this.options = opt
        this.tooltipConfig = tooltipCon
        // init
        this.tooltip = this.drawTooltip(this.chartEl, this.options)

    }

    drawTooltip(svg, opt) {
        let commonOpt = opt
        let chartEl = svg
        // init
        let tooltip = d3.select("body")
            .append("div")
            .attr("class", commonOpt.type + "tooltip" + commonOpt.id)
            .style("opacity", 0.0)
            .style("position", "absolute")
            .style("width", "auto")
            .style("height", "auto")
            .style("font-family", "simsun")
            .style("font-size", "14px")
            .style("text-align", "center")
            .style("border-style", "solid")
            .style("border-width", "1px")
            .style("background-color", "white")
            .style("border-radius", "5px")

        let elementClass = "." + commonOpt.type + "Element" + commonOpt.id
        chartEl.selectAll(elementClass)
            .on("mouseover." + commonOpt.type + "tooptip" + commonOpt.id, this.tooltipConfig)
            .on("mousemove." + commonOpt.type + "tooptip" + commonOpt.id, function (d) {
                tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
            })
            .on("mouseout." + commonOpt.type + "tooptip" + commonOpt.id, function (d) {
                tooltip.style("opacity", 0.0)
                    .style("left", "-100px")
                    .style("top", "-100px")
            })

        return tooltip

    }

    redrawTooltips(svg, opt, tooltipCon) {
        let commonOpt = opt
        let chartEl = svg
        let tooltip = this.tooltip
        let elementClass = "." + commonOpt.type + "Element" + commonOpt.id
        chartEl.selectAll(elementClass)
            .on("mouseover." + commonOpt.type + "tooptip" + commonOpt.id, this.tooltipConfig)
            .on("mousemove." + commonOpt.type + "tooptip" + commonOpt.id, function (d) {
                tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
            })
            .on("mouseout." + commonOpt.type + "tooptip" + commonOpt.id, function (d) {
                tooltip.style("opacity", 0.0)
                    .style("left", "-100px")
                    .style("top", "-100px")
            })
        return tooltip
    }

}