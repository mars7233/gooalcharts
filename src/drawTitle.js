import * as d3 from 'd3';

function drawTitle(dom, options) {
    var svg = dom;
    var titleOpt = options.titleBox;
    svg.append("text")
        .attr("x", 400)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(titleOpt.mainTitle.title);
}

export default function (dom, options) {
    return drawTitle(dom, options);
}