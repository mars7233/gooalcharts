import * as d3 from 'd3'

let width = 800
let height = 400
let pieSVG
let commonOpt, axisBox, dataBox
let path
let padWidth

function readConfig(options) {
    commonOpt = options
    dataBox = options.dataBox
    padWidth = options.dataBox.padWidth
}

function drawPie(dom, data, opt, newWidth) {
    if (newWidth != undefined) {
        width = newWidth
    }
    pieSVG = dom
    readConfig(opt)

    let color = d3.scaleOrdinal()
        .range(dataBox.normalColor)
    let radius = (Math.min(width, height) - 25) / 2

    path = d3.arc()
        .outerRadius(commonOpt.dataBox.showLabel == true ? radius - 20 : radius)
        .innerRadius(0)

    pieSVG.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
        .append("path")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("fill", function (d, i) { return color(i) })
        .attr("normalColor", function (d, i) { return color(i) })
        .transition()
        .duration(1000)
        // .attr("d", function (d) {
        //     return path(d)
        // })
        .attrTween("d", arcTween)
        .style("stroke", "white")
        .style("stroke-width", padWidth)

    // label
    if (commonOpt.dataBox.showLabel == true) {
        let label = d3.arc()
            .outerRadius(radius + 15)
            .innerRadius(radius)

        let text = pieSVG.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("class", commonOpt.type + "ElementLabel" + commonOpt.id)
            .attr("transform", function (d) {
                let labelCoordinate = label.centroid(d)
                labelCoordinate[0] += width / 2
                labelCoordinate[1] += height / 2 + 10
                return "translate(" + labelCoordinate + ")"

            })
            .attr("text-anchor", "middle")
            .text(function (d) {
                // return (100 * d.percent).toFixed(2) + "%"
                return Math.round(d.percent * 10000) / 100 + "%"
            })
    }
    return pieSVG

}

function arcTween(a) { //<-- a is the datum bound to each arc
    let startAngle = a.startAngle; //<-- keep reference to start angle
    let i = d3.interpolate(a.startAngle, a.endAngle); //<-- interpolate start to end
    return function (t) {
        return path({ //<-- return arc at each iteration from start to interpolate end
            startAngle: startAngle,
            endAngle: i(t)
        });
    };
}

export default function (dom, data, opt, newWidth) {
    return drawPie(dom, data, opt, newWidth)
}