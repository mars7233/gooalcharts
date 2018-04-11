import * as d3 from 'd3'

var tooltip
var barEl
var tooltipContent = ""
var data

function drawTooltip(svg) {
    barEl = svg
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

    barEl.selectAll(".myrect")
        .on("mousemove.tooptip", mouseMove)
        .on("mouseout.tooptip", mouseOut)

    return tooltip

}
function mouseOver(d) {
    tooltip.html("<div>" + "</div>")
}

function mouseMove(d) {
    tooltip.style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY + 20) + "px")
}

function mouseOut(d) {
    tooltip.style("opacity", 0.0)
        .style("left", "-100px")
        .style("top", "-100px")
}

function setTooltips(svg) {
    drawTooltip(svg)
    return tooltip
}

function redrawTooltips(svg) {
    barEl = svg
    barEl.selectAll(".myrect")
        .on("mousemove.tooptip", mouseMove)
        .on("mouseout.tooptip", mouseOut)

    return tooltip
}

export { setTooltips, redrawTooltips }
