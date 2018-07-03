import * as d3 from 'd3'


export default class Bubble {
    constructor(dom, data, opt, layout) {
        this.margin = layout.margin
        this.width = layout.data.width
        this.height = layout.data.height

        this.bubbleSVG = dom
        this.dataBox = opt.dataBox
        this.axisBox = opt.axisBox

        this.axisBox.xAxis.title != "" ? this.margin.bottom = this.margin.bottom + 20 : {}
        this.axisBox.yAxis.title != "" ? this.margin.left = this.margin.left + 20 : {}

        this.scale = {
            "xMaxScale": this.axisBox.xAxis.maxScale,
            "yMaxScale": this.axisBox.yAxis.maxScale,
            "xMinScale": this.axisBox.xAxis.minScale,
            "yMinScale": this.axisBox.yAxis.minScale
        }

        return this.drawBubble(data, opt)
    }

    drawBubble(data, opt) {
        let margin = this.margin
        // scale
        let colorScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) {
                return d.category1
            }), d3.max(data, function (d) {
                return d.category1
            })])
            .range([0, 1])
        let color1 = d3.rgb(this.dataBox.normalColor[0])
        let color2 = d3.rgb(this.dataBox.normalColor[1])
        let colorInterpolate = d3.interpolate(color1, color2)
        let sizeScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) {
                return d.category2
            }), d3.max(data, function (d) {
                return d.category2
            })])
            .range(this.dataBox.bubbleRadius)

        this.drawFakeDataBox(opt)
        let fakeAxis = d3.select("." + opt.type + "FakeAxisBox" + opt.id)
        let yScale = d3.scaleBand()
            .domain(data.map(function (d) {
                return d.key
            }))
            .range([0, this.height - margin.bottom - margin.top])
        //隐形坐标轴测坐标宽度
        let hideYAxis = fakeAxis.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("opacity", 0)
            .call(d3.axisLeft().scale(yScale))
        hideYAxis.selectAll("text")
            .each(function (d, i) {
                if (d.length > opt.axisBox.yAxis.maxStringLength) {
                    this.innerHTML = String(d).slice(0, opt.axisBox.yAxis.maxStringLength) + "..."
                }
            })
        hideYAxis.selectAll("text")
            .attr("font-size", "12px")
        let yAxisBBox = hideYAxis.node().getBBox()
        margin.left = yAxisBBox.width + margin.left

        let xScale = d3.scaleLinear()
            .domain([this.scale.xMinScale || d3.min(data, function (d) {
                return d.value
            }), this.scale.xMaxScale || d3.max(data, function (d) {
                return d.value
            })])
            .range([0, this.width - this.margin.left - this.margin.right])

        this.bubbleSVG.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", opt.type + "Element" + opt.id)
            .attr("r", function (d) { return sizeScale(d.category2) })
            .attr("cx", function (d) { return margin.left + xScale(d.value) })
            .attr("cy", function (d) { return margin.top + yScale.bandwidth() / 2 + yScale(d.key) })
            .attr("fill", function (d) {
                return colorInterpolate(colorScale(d.category1))
            })

        d3.select(".deletesoon").remove()
        return { "svg": this.bubbleSVG, "margin": margin, "xScale": xScale, "yScale": yScale }

    }

    drawFakeDataBox(opt) {
        let fake = d3.select("body")
            .append("svg")
            .attr("class", "deletesoon")
            .attr("width", 0)
            .attr("height", 0)
            .append("svg")
            .attr("class", opt.type + "FakeAxisBox" + opt.id)
            .attr("width", opt.layout.data.width)
            .attr("height", opt.layout.data.height)
    }
}