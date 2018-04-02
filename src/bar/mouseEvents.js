import * as d3 from 'd3';

var barEl, tooltipEl;
var preColor, curColor;

function addEvents(svg, events, methods) {
    barEl.selectAll(".myrect")
        .on(events, methods);
}
// default events
function defaultEvents(svg, tooltip) {
    barEl = svg;
    tooltipEl = tooltip;
    barEl.selectAll(".myrect")
        .on("mouseover.highlight", mouseOverHighlight)
        // .on("mouseover.tooltips", mouseOverTooltip)
        .on("mousemove.highlight", handleMouseMove)
        .on("mouseout.highlight", handleMouseOut)
}
// mouse over
function mouseOverHighlight(d) {
    preColor = d3.select(this).style("fill");
    // 悬浮高亮
    d3.select(this).style("fill", "brown");
}

function mouseOverTooltip(d) {
    // tooltip
    tooltipEl.html("<div>" + "name: " + d.name + "</br>" + "value: " + d.value + "</div>")
        .style("padding", "5px")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY + 20) + "px")
        .style("opacity", 1.0);
}

// mouse move
function handleMouseMove(d) {
    tooltipEl.style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY + 20) + "px");
}

//mouse out 
function handleMouseOut(d) {
    // 取消高亮
    d3.select(this).style("fill", preColor);
    tooltipEl.style("opacity", 0.0);
}


export { addEvents }
export { defaultEvents }