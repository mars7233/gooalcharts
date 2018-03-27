import * as d3 from 'd3';

function drawTitle(dom, options) {
    var svg = dom;
    console.log(dom);
    svg.append("text")
        .attr("x", 400)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Title");
}

export default function (dom, options) {
    return drawTitle(dom, options);
}