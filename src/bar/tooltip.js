import * as d3 from 'd3';

var tooltip;
var chartEl;
var tooltipContent = "";
var data;

function drawTooltip(svg) {
    chartEl = svg;
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
        .style("border-radius", "5px");

    chartEl.selectAll(".myrect")
        .on("mousemove.tooptip", mouseMove)
        .on("mouseout.tooptip", mouseOut);

    return tooltip;

}
function mouseOver(d) {
    tooltip.html("<div>" + "</div>");
}

function mouseMove(d) {
    tooltip.style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY + 20) + "px");
}

function mouseOut(d) {
    tooltip.style("opacity", 0.0);
}

function setTooltips(svg) {
    drawTooltip(svg);
    return tooltip;
}

export { setTooltips }
