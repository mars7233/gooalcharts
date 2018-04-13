import * as d3 from 'd3'

let tooltip
let scatterEl
let toooltipContent = ""
let data

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
        .style("left", "-100px")
        .style("top", "-100px")
}

function setTooltips(svg, element) {
    tooltip = drawTooltip(svg, element)
    return tooltip
}

function redrawTooltips(svg, element) {
    scatterEl = svg
    scatterEl.selectAll(".mydot")
        .on("mousemove.tooptip", mouseMove)
        .on("mouseout.tooptip", mouseOut)

    return tooltip
}

export { setTooltips, redrawTooltips }
