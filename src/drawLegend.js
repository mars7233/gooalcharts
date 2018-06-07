import * as d3 from 'd3'
import * as d3legend from 'd3-svg-legend'
import LegendEvent from './chartEvent/legendEvents'

export class GooalLegend {
    constructor(svg, data, opt) {

        this.options = opt
        this.legendOptions = opt.legendBox
        this.isOverWidth = false
        this.colorScale = d3.scaleOrdinal().range(opt.dataBox.normalColor)
        this.legendBBox = svg.node().getBBox()
        if (this.legendOptions.show == true) {
            if (opt.type != "bubble") {
                this.drawLegend(svg, data, opt)
            } else {
                this.drawBubbleLegend(svg, data, opt)
            }
        }

    }

    drawLegend(svg, data, opt) {
        // svg为legendbox，data为key，opt为legend的额外操作（例如，数据逆置、圆或方、颜色）
        // data格式：["key1","key2","key3"]
        this.drawFakeLegendBox(svg, data, opt)

        if (this.legendOptions.icon.type == "circle") {
            this.drawCirleLegend(svg, data, opt, this.colorScale)
        } else if (this.legendOptions.icon.type == "rectangle") {
            this.drawRectangleLegend(svg, data, opt, this.colorScale)
        } else {
            this.drawSquareLegend(svg, data, opt, this.colorScale)
        }

        let legendText = this.legend.append("text")
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
            .attr("transform", function (d, i) { return "translate(20," + i * 20 + ")" })

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
            .attr("transform", function (d, i) { return "translate(20," + i * 20 + ")" })

        this.legend.append("circle")
            .attr("cy", 9)
            .attr("r", r)
            .attr("fill", function (d, i) { return colorScale(i) })
    }

    drawRectangleLegend(svg, data, opt) {

    }

    drawBubbleLegend(svg, data, opt) {
        // sizeLegend
        let sizeCategory = data.sizeCategory
        let sizeScale = d3.scaleLinear()
            .domain([d3.min(sizeCategory), d3.max(sizeCategory)])
            .range(opt.dataBox.bubbleRadius)

        svg.append("g")
            .attr("class", opt.type + "sizeLegend" + opt.id)
            .attr("transform", "translate(20,20)")

        let sizelegend = d3legend.legendSize()
            .scale(sizeScale)
            .shape('circle')
            .shapePadding(15)
            .labelOffset(10)
            .orient('vertical')
            .labelFormat(d3.format("d"))
            .title(opt.legendBox.sizeTitle)

        this.sizelegend = svg.select("." + opt.type + "sizeLegend" + opt.id)
            .style("font-size", "17px")
            .call(sizelegend)

        let sizelegendBBox = d3.select("." + opt.type + "sizeLegend" + opt.id).node().getBBox()

        // colorLegend
        let colorCategory = data.colorCategory
        let colorScale = d3.scaleLinear()
            .domain([d3.min(colorCategory), d3.max(colorCategory)])
            .range([0, 1])

        let color1 = d3.rgb(opt.dataBox.normalColor[0])
        let color2 = d3.rgb(opt.dataBox.normalColor[1])

        let colorInterpolate = d3.interpolate(color1, color2)
        colorCategory.sort(function (a, b) {
            return b - a
        })

        let colorLegend = svg.append("g")
            .attr("class", opt.type + "colorLegend" + opt.id)
            .attr("transform", "translate(20," + (sizelegendBBox.height + 40) + ")")

        let colorTitle = colorLegend.append("text")
            .attr("class", opt.type + "ColorTitle" + opt.id)
            .style("font-size", "17px")
            .text(opt.legendBox.colorTitle)

        let defs = colorLegend.append("defs")

        let linearGradient = defs.append("linearGradient")
            .attr("id", opt.type + "linearColor" + opt.id)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr('y2', "100%")

        let stop1 = linearGradient.append("stop")
            .attr("offset", "0%")
            .style("stop-color", color1)

        let stop2 = linearGradient.append("stop")
            .attr("offset", "100%")
            .style("stop-color", color2)

        let colorRect = colorLegend.append("rect")
            .attr("x", 0)
            .attr("y", 20)
            .attr("width", 20)
            .attr("height", 180)
            .style("fill", "url(#" + linearGradient.attr("id") + ")")

        let fakeRect1 = colorLegend.append("rect")
            .attr("class", opt.type + "Legend" + opt.id)
            .attr("x", 0)
            .attr("y", 20)
            .attr("width", 20)
            .attr("height", 90)
            .attr("fill", "transparent")

        let fakeRect2 = colorLegend.append("rect")
            .attr("class", opt.type + "Legend" + opt.id)
            .attr("x", 0)
            .attr("y", 110)
            .attr("width", 20)
            .attr("height", 90)
            .attr("fill", "transparent")

        let labelScale = d3.scaleBand()
            .domain(colorCategory)
            .range([180, 0])

        colorLegend.append("g")
            .style("font-size", "17px")
            .attr("transform", "translate(" + 20 + "," + 20 + ")")
            .call(d3.axisRight().scale(labelScale))
    }

    legendLayout() {
        let realWidth = d3.select("#" + this.options.type + "FakeLegendBox" + this.options.id).node().getBBox().width
        let realHeight = d3.select("#" + this.options.type + "FakeLegendBox" + this.options.id).node().getBBox().height
        let theoryWidth = d3.select("#" + this.options.type + "FakeLegendBox" + this.options.id).attr("width")
        // console.log(realWidth)
        let dataBox = d3.select("#" + this.options.type + "DataBox" + this.options.id)
        let legendBox = d3.select("#" + this.options.type + "LegendBox" + this.options.id)
        let container = d3.select("#" + this.options.type + "Container" + this.options.id)

        if (realWidth > theoryWidth) {
            this.isOverWidth = true
            let changeWidth = realWidth + 10
            this.options.layout.legend.width = changeWidth
            // this.options.layout.legend.y = this.options.height / 2 - realHeight / 2
            // console.log(this.options.layout.legend.width)
            // // this.options.width = this.options.width + changeWidth - theoryWidth
            // // container.attr("width", this.options.width)
            this.options.layout.data.width = this.options.width - changeWidth
            // // console.log(this.options.layout.data.width)

            legendBox.attr("width", changeWidth)
            legendBox.attr("x", this.options.layout.data.width)
            dataBox.attr("width", this.options.layout.data.width)

        }

    }

    drawFakeLegendBox(svg, data, opt) {
        let deletesoon = d3.select("body")
            .append("svg")
            .attr("class", opt.type + "Deletesoon" + opt.id)
            .attr("width", 0)
            .attr("height", 0)
            .append("svg")
            .attr("class", opt.type + "FakeLegendBox" + opt.id)
            .attr("id", opt.type + "FakeLegendBox" + opt.id)
            .attr("width", opt.layout.legend.width)
            .attr("height", opt.layout.legend.height)

        let fake = d3.select("#" + opt.type + "FakeLegendBox" + opt.id)

        if (this.legendOptions.icon.type == "circle") {
            this.drawCirleLegend(fake, data, opt, this.colorScale)

        } else if (this.legendOptions.icon.type == "rectangle") {
            this.drawRectangleLegend(fake, data, opt, this.colorScale)
        } else {
            this.drawSquareLegend(fake, data, opt, this.colorScale)

        }

        let legendText = this.legend.append("text")
            .attr("class", opt.type + "LegendText" + opt.id)
            .attr("x", 34)
            .attr("y", 9)
            .attr("dy", ".35em")
            // .attr("text-anchor", "end")
            .text(function (d) { return d })

        this.legendLayout()

        d3.select("." + opt.type + "Deletesoon" + opt.id).remove()
    }


}