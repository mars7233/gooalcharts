import * as d3 from 'd3'

let barEl
let preColor, curColor
let commonOpt

function addEvents(svg, events, methods, opt) {
    commonOpt = opt
    barEl = svg
    barEl.selectAll("." + opt.type + "element" + opt.id)
        .on(events, methods)
}
// default events
function defaultEvents(svg, options) {
    // options  鼠标悬浮颜色、大小
    commonOpt = options
    barEl = svg
    barEl.selectAll("." + commonOpt.type + "element" + commonOpt.id)
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