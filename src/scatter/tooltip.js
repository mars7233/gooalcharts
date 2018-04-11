import * as d3 from 'd3'

var tooltip
var scatterEl
var toooltipContent = ""
var data

function drawTooltip(svg, element) {
    scatterEl = svg
    // init
    tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
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

    scatterEl.selectAll(".mydot")
        .on("mousemove.tooptip", mouseMove)
        .on("mouseout.tooptip", mouseOut)

    return tooltip
}


function mouseMove(d) {
    tooltip.style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY + 20) + "px")
}

function mouseOut(d) {
    tooltip.style("opacity", 0.0)
        .style("left", 10000 + "px")
        .style("top", 10000 + "px")
}

function setTooltips(svg, element) {
    tooltip = drawTooltip(svg, element)
    return tooltip
}

function redrawTooltips(svg, element) {
    pieEl = svg
    pieEl.selectAll(".mydot")
        .on("mousemove.tooptip", mouseMove)
        .on("mouseout.tooptip", mouseOut)

    return tooltip
}

export { setTooltips, redrawTooltips }
