import * as d3 from 'd3'
import * as d3legend from 'd3-svg-legend'
import LegendEvent from './chartEvent/legendEvents'

export class GooalLegend {
    constructor(svg, data, opt) {

        this.options = opt
        this.legendOptions = opt.legendBox
        this.isOverWidth = false

        if (this.legendOptions.show == true) {
            this.colorScale = d3.scaleOrdinal()
                .domain(data)
                .range(opt.dataBox.normalColor)
            this.legendBBox = svg.node().getBBox()
            if (opt.type != "bubble") {
                this.drawFakeLegendBox(svg, data, opt)
                // this.drawLegend(svg, data, opt)
            } else {
                this.drawFakeLegendBox(svg, data, opt)
                // this.drawBubbleLegend(svg, data, opt)
            }

            let legend = document.getElementsByClassName(opt.type + "FakeLegendBox" + opt.id)

            document.getElementById(opt.type + "LegendBox" + opt.id)
                .appendChild(legend[0])

            d3.select("." + opt.type + "LegendDeletesoon" + opt.id).remove()
        }
    }

    drawLegend(svg, data, opt) {

        let maxLength = 0
        data.forEach(element => {
            if (String(element).length > maxLength)
                maxLength = String(element).length
        })

        // svg为legendbox，data为key，opt为legend的额外操作（例如，数据逆置、圆或方、颜色）
        // data格式：["key1","key2","key3"]
        svg.append("g")
            .attr("class", opt.type + "Legend" + opt.id)

        let legend = d3legend.legendColor()
            .title(this.legendOptions.title)
            .scale(this.colorScale)
            .shapeWidth(this.legendOptions.icon.x)
            .shapeHeight(this.legendOptions.icon.y)
            .cells(data.length)
            .labelOffset(4)
        if (this.options.legendBox.position == "top")
            legend.orient("horizontal")
                .shapePadding(maxLength * 10 + 30)
        else
            legend.orient("vertical")
                .shapePadding(opt.legendBox.shapePadding)


        this.legend = svg.select("." + opt.type + "Legend" + opt.id)
            .style("font-size", "12px")
            .call(legend)

        this.legend.selectAll(".swatch")
            .data(data)
            .attr("class", opt.type + "LegendElement" + opt.id)

        this.legend.select(".legendCells")
            .attr("transform", function () {

                if (opt.legendBox.title != "")
                    return "translate(0,40)"
                else
                    return null
            })

        this.legend.select(".legendTitle")
            .attr("transform", "translate(0,20)")

        // 处理legend在顶部的情况
        if (this.options.legendBox.position == "top") {
            this.legend.selectAll(".label")
                .attr("transform", "translate(" + (this.legendOptions.icon.x + 10) + "," + (this.legendOptions.icon.y / 2 + 5) + ")")
                .style("text-anchor", "")
        }

        // 当legend数超过20个则另起一列
        if (data.length > 20 && opt.legendBox.position == "right") {
            let colWidth = this.legend.node().getBBox().width
            let currentCol = 0
            this.legend.selectAll("." + "cell")
                .attr("transform", function (d, i) {
                    let col = parseInt(i / 20)
                    let x = col * (colWidth + opt.legendBox.colPadding)
                    let y = (i % 20) * (opt.legendBox.icon.y + opt.legendBox.shapePadding)

                    return "translate(" + x + "," + y + ")"
                })
        }
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
            .shapePadding(10)
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
            .attr("class", opt.type + "LegendElement" + opt.id)
            .attr("x", 0)
            .attr("y", 20)
            .attr("width", 20)
            .attr("height", 90)
            .attr("fill", "transparent")

        let fakeRect2 = colorLegend.append("rect")
            .attr("class", opt.type + "LegendElement" + opt.id)
            .attr("x", 0)
            .attr("y", 110)
            .attr("width", 20)
            .attr("height", 90)
            .attr("fill", "transparent")

        let colorMax = d3.max(colorCategory)
        let colorMin = d3.min(colorCategory)
        let legendOptions = this.legendOptions

        let labelScale = d3.scaleLinear()
            .domain([this.legendOptions.bubbleScale[1] || colorMax, (function () {
                if (legendOptions.bubbleScale[0] == 0)
                    return 0
                else
                    return legendOptions.bubbleScale[0] || colorMin
            })()])
            .range([180, 0])
            .nice()

        colorLegend.append("g")
            .style("font-size", "17px")
            .attr("transform", "translate(" + 20 + "," + 20 + ")")
            .call(d3.axisRight().scale(labelScale).ticks(3))
    }

    legendLayout() {
        let realWidth = d3.select("#" + this.options.type + "FakeLegendBox" + this.options.id).node().getBBox().width
        let realHeight = d3.select("#" + this.options.type + "FakeLegendBox" + this.options.id).node().getBBox().height
        let theoryWidth = d3.select("#" + this.options.type + "FakeLegendBox" + this.options.id).attr("width")
        let dataBox = d3.select("#" + this.options.type + "DataBox" + this.options.id)
        let legendBox = d3.select("#" + this.options.type + "LegendBox" + this.options.id)
        let container = d3.select("#" + this.options.type + "Container" + this.options.id)
        let fakeLegendBox = d3.select("#" + this.options.type + "FakeLegendBox" + this.options.id)

        if (this.options.legendBox.position != "top") {
            if (Number(realWidth) > Number(theoryWidth)) {
                this.isOverWidth = true
                let changeWidth = realWidth + 10
                this.options.layout.legend.width = changeWidth
                this.options.layout.data.width = this.options.width - changeWidth

                legendBox.attr("width", changeWidth)
                legendBox.attr("x", this.options.layout.data.width)
                fakeLegendBox.attr("width", changeWidth)
                dataBox.attr("width", this.options.layout.data.width)
            }

            // d3.select("." + this.options.type + "Legend" + this.options.id).attr("height", realHeight)
            // let opt = this.options
            // // 图例居中
            // legendBox.attr("y", function () {
            //     if (opt.titleBox.position == "top")
            //         return (opt.layout.data.height) / 2 - realHeight / 2 + 50
            //     else
            //         return (opt.layout.data.height) / 2 - realHeight / 2
            // })
        } else {
            this.options.layout.legend.x = this.options.layout.margin.left
            legendBox.attr("x", this.options.layout.margin.left)
        }


    }

    drawFakeLegendBox(svg, data, opt) {
        let deletesoon = d3.select("body")
            .append("svg")
            .attr("class", opt.type + "LegendDeletesoon" + opt.id)
            .attr("width", 0)
            .attr("height", 0)
            .append("svg")
            .attr("class", opt.type + "FakeLegendBox" + opt.id)
            .attr("id", opt.type + "FakeLegendBox" + opt.id)
            .attr("width", opt.layout.legend.width)
        // .attr("height", opt.layout.legend.height)

        let fake = d3.select("#" + opt.type + "FakeLegendBox" + opt.id)

        if (opt.type != "bubble") {
            this.drawLegend(fake, data, opt)
        } else {
            this.drawBubbleLegend(fake, data, opt)
        }

        this.legendLayout()
    }


}