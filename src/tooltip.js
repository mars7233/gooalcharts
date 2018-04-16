import * as d3 from 'd3'

let tooltip
let chartEl
let tooltipContent = ""
let data
let commonOpt


function drawTooltip(svg, opt) {
    chartEl = svg
    commonOpt = opt
    // init
    tooltip = d3.select("body")
        .append("div")
        .attr("class", opt.type + "tooltip" + opt.id)
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

    let elementClass = "." + opt.type + "element" + opt.id
    chartEl.selectAll(elementClass)
        .on("mousemove." + opt.type + "tooptip", mouseMove)
        .on("mouseout." + opt.type + "tooptip", mouseOut)

    return tooltip

}

function mouseMove(d) {
    console.log(commonOpt.type + " mouse move " + commonOpt.id)
    tooltip.style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY + 20) + "px")

}

function mouseOut(d) {
    console.log(commonOpt.type + " mouse out " + commonOpt.id)

    tooltip.style("opacity", 0.0)
        .style("left", "-100px")
        .style("top", "-100px")
}

function redrawTooltips(svg, opt) {
    chartEl = svg
    commonOpt = opt
    chartEl.selectAll("." + opt.type + "element" + opt.id)
        .on("mousemove.tooptip", mouseMove)
        .on("mouseout.tooptip", mouseOut)

    return tooltip
}

export { drawTooltip, redrawTooltips }


