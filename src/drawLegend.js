import * as d3 from 'd3'
import LegendEvent from './chartEvent/legendEvents'
import { getObjFirstValue } from './tools/gooalArray'

export default function (svg, data, opt) {
    return drawLegend(svg, data, opt)
}

export class GooalLegend {
    constructor(svg, data, opt) {
        this.options = opt
        this.legendOptions = opt.legendBox
        this.colorScale = d3.scaleOrdinal().range(opt.dataBox.normalColor)
        this.legendBBox = svg.node().getBBox()
        if (this.legendOptions.show == true) {
            this.drawLegend(svg, data, opt)
            this.legendLayout(this.legend)
        }
    }

    drawLegend(svg, data, opt) {
        // svg为legendbox，data为key，opt为legend的额外操作（例如，数据逆置、圆或方、颜色）
        // data格式：["key1","key2","key3"]
        // console.log(opt)
        if (this.legendOptions.icon.type == "circle") {
            this.drawCirleLegend(svg, data, opt, this.colorScale)
        } else if (this.legendOptions.icon.type == "rectangle") {
            this.drawRectangleLegend(svg, data, opt, this.colorScale)
        } else {
            this.drawSquareLegend(svg, data, opt, this.colorScale)
        }

        this.legend.append("text")
            .attr("class", opt.type + "LegendText" + opt.id)
            .attr("x", 34)
            .attr("y", 9)
            .attr("dy", ".35em")
            // .attr("text-anchor", "end")
            .text(function (d) { return d })
    }

    drawSquareLegend(svg, data, opt, colorScale) {
        let x = this.legendOptions.icon.x || 18
        this.legend = svg.selectAll(".legend")
            .data(data)
            .enter()
            .append("g")
            .attr("class", opt.type + "Legend" + opt.id)
            .attr("transform", function (d, i) { return "translate(10," + i * 20 + ")" })

        this.legend.append("rect")
            .attr("width", x)
            .attr("height", x)
            .attr("fill", function (d, i) { return colorScale(i) })
    }

    drawCirleLegend(svg, data, opt, colorScale) {
        let r = this.legendOptions.icon.r || 7

        this.legend = svg.selectAll(".legend")
            .data(data)
            .enter()
            .append("g")
            .attr("class", opt.type + "Legend" + opt.id)
            .attr("transform", function (d, i) { return "translate(10," + i * 20 + ")" })

        this.legend.append("circle")
            .attr("cy", 9)
            .attr("r", r)
            .attr("fill", function (d, i) { return colorScale(i) })
    }

    drawRectangleLegend(svg, data, opt) {

    }

    legendLayout(legend) {
        if (legend.node().getBBox().width > this.legendBBox.width) {

        }
    }


}