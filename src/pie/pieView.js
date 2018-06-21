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

function drawPie(dom, data, opt, layout) {
    width = layout.data.width
    height = layout.data.height
    pieSVG = dom
    readConfig(opt)

    let color = d3.scaleOrdinal()
        .range(dataBox.normalColor)
    let radius = (Math.min(width, height) - 50) / 2

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
            .outerRadius(radius + 18)
            .innerRadius(radius)

        let text = pieSVG.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("class", commonOpt.type + "ElementLabel" + commonOpt.id)
            .attr("x", function (d) {
                let labelCoordinate = label.centroid(d)
                labelCoordinate[0] += width / 2
                labelCoordinate[1] += height / 2 + 15
                return labelCoordinate[0]
            })
            .attr("y", function (d) {
                let labelCoordinate = label.centroid(d)
                labelCoordinate[0] += width / 2
                labelCoordinate[1] += height / 2 + 15
                return labelCoordinate[1]
            })
            // .attr("transform", function (d) {
            //     let labelCoordinate = label.centroid(d)
            //     labelCoordinate[0] += width / 2
            //     labelCoordinate[1] += height / 2 + 15
            //     return "translate(" + labelCoordinate + ")"

            // })
            .attr("text-anchor", "middle")
            .text(function (d) {
                // return (100 * d.percent).toFixed(2) + "%"
                return Math.round(d.percent * 10000) / 100 + "%"
            })
        let alpha = 0.6
        let spacing = 15
        let again = false
        function relax() {
            text.each(function (d, i) {
                let a = this
                let da = d3.select(a)
                let x1 = da.attr("x")
                let y1 = da.attr("y")
                let t1 = da._groups[0][0].getBoundingClientRect().top
                let l1 = da._groups[0][0].getBoundingClientRect().left
                let b1 = da._groups[0][0].getBoundingClientRect().bottom
                let r1 = da._groups[0][0].getBoundingClientRect().right
                text.each(function (d, i) {
                    let b = this
                    if (a == b) {
                        return
                    }
                    let db = d3.select(b)
                    if (da.attr("text-anchor") != db.attr("text-anchor")) {
                        return
                    }
                    let x2 = db.attr("x")
                    let y2 = db.attr("y")
                    let t2 = db._groups[0][0].getBoundingClientRect().top
                    let l2 = db._groups[0][0].getBoundingClientRect().left
                    let b2 = db._groups[0][0].getBoundingClientRect().bottom
                    let r2 = db._groups[0][0].getBoundingClientRect().right

                    if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) {// 表示没碰上  
                        return
                    } else {
                        let deltaX = x1 - x2
                        let deltaY = y1 - y2

                        if (Math.abs(deltaY) > spacing) {
                            return
                        }

                        again = true
                        let sign = deltaY > 0 ? 1 : -1
                        let adjust = sign * alpha
                        da.attr('y', +y1 + adjust)
                        db.attr('y', +y2 - adjust)
                    }


                })
            })
            if (again) {
                setTimeout(relax, 20);
            }
        }
        relax()

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

export default function (dom, data, opt, layout) {
    return drawPie(dom, data, opt, layout)
}