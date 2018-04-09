import * as d3 from 'd3';

function drawGroupedBarLegend(svg, data) {
    var zScale = d3.scaleOrdinal()
        .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var legend = svg.selectAll(".legend")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", zScale);


    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        // .attr("text-anchor", "end")
        .text(function (d) { return d; });

}

function drawStackedBarLegend() {

}

export { drawGroupedBarLegend, drawStackedBarLegend }