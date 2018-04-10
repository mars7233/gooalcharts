import * as d3 from 'd3'

var barEl
var preColor, curColor

function addEvents(svg, events, methods) {
    barEl = svg
    barEl.selectAll(".myrect")
        .on(events, methods)
}
// default events
function defaultEvents(svg, tooltip) {
    barEl = svg
    barEl.selectAll(".myrect")
        .on("mouseover.highlight", mouseOverHighlight)
        .on("mouseout.highlight", handleMouseOut)
}
// mouse over
function mouseOverHighlight(d) {
    preColor = d3.select(this).style("fill")
    // 悬浮高亮
    d3.select(this).style("fill", "brown")
}

//mouse out 
function handleMouseOut(d) {
    // 取消高亮
    d3.select(this).style("fill", preColor)
}


export { addEvents }
export { defaultEvents }