import * as d3 from 'd3'

let width = 800
let height = 400
let commonOpt

export class GooalAxis {
    constructor(chart, opt, layout) {
        this.svg = chart.svg
        this.margin = chart.margin
        this.xScale = chart.xScale
        this.yScale = chart.yScale
        this.fontRotate = 0
        this.commonOpt = opt

        this.width = layout.data.width
        this.height = layout.data.height

        this.axisBox = opt.axisBox
        this.xtitle = this.axisBox.xAxis.title
        this.ytitle = this.axisBox.yAxis.title

        this.fontRotate = this.axisBox.xAxis.fontRotate
        this.fontRotate == "auto" ? this.fontRotate = 65 : {}


        this.drawAxis(chart, opt, layout)
        d3.select(".deletesoon").remove()
    }

    drawAxis(chart, opt, layout) {
        // 缺少x轴刻度参数配置（是否旋转，旋转角度）
        // 坐标轴标题的字体大小、颜色、字体
        let svg = chart.svg
        let margin = chart.margin
        let xScale = chart.xScale
        let yScale = chart.yScale
        let fontRotate = 0
        let xtitle = "", ytitle = ""
        let commonOpt = opt

        width = layout.data.width
        height = layout.data.height

        let axisBox = commonOpt.axisBox
        xtitle = axisBox.xAxis.title
        ytitle = axisBox.yAxis.title

        fontRotate = axisBox.xAxis.fontRotate
        if (fontRotate == "auto") {
            fontRotate = 65
        }
        // fakeAxis
        this.drawFakeDataBox(opt)
        let fakeAxis = d3.select("." + opt.type + "FakeAxisBoxx" + opt.id)
        let fakexAxis = fakeAxis.append("g")
            .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
            .attr("class", commonOpt.type + "FakexAxis" + commonOpt.id)
            .attr("id", commonOpt.type + "FakexAxis" + commonOpt.id)
            .call(d3.axisBottom().scale(xScale))

        let fakeyAxis = fakeAxis.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", commonOpt.type + "FakeyAxis" + commonOpt.id)
            .attr("id", commonOpt.type + "FakeyAxis" + commonOpt.id)
            .call(d3.axisLeft().scale(yScale))

        // 坐标刻度旋转
        if (fontRotate != 0) {
            fakeAxis.selectAll("text")
                .attr("transform", "rotate(-" + fontRotate + ")")
                .style("text-anchor", "end")
                .attr("dx", function () {
                    if (fontRotate != 90 && fontRotate != "90") { return "-.8em" }
                    else { return "-1em" }
                })
                .attr("dy", function () {
                    if (fontRotate != 90 && fontRotate != "90") { return ".5em" }
                    return "-.5em"
                })
        }

        // 根据坐标轴调整container高度
        let xAxisBBox = fakexAxis.node().getBBox()
        let yAxisBBox = d3.select("." + commonOpt.type + "FakeyAxis" + commonOpt.id).node().getBBox()
        // console.log(yAxisBBox)
        commonOpt.layout.xAxisBBox = xAxisBBox
        commonOpt.layout.yAxisBBox = yAxisBBox

        let container = d3.select("#" + commonOpt.type + "Container" + commonOpt.id)
        let containerHeight = Number(container.attr("height"))
        container.attr("height", function () { return xAxisBBox.height + containerHeight })

        let dataBox = d3.select("#" + commonOpt.type + "DataBox" + commonOpt.id)
        let dataBoxHeight = Number(dataBox.attr("height"))
        dataBox.attr("height", function () { return xAxisBBox.height + dataBoxHeight })

        let titleBox = d3.select("#" + commonOpt.type + "TitleBox" + commonOpt.id)
        let titleBoxY = Number(titleBox.attr("y"))
        let titleBoxClass = titleBox.attr("class")
        if (titleBoxClass == "bottomTitleBox") {
            titleBox.attr("y", function () { return titleBoxY + xAxisBBox.height })
        }


        // 绘制刻度
        let xAxis = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
            .attr("class", commonOpt.type + "xAxis" + commonOpt.id)
            .attr("id", commonOpt.type + "xAxis" + commonOpt.id)
            .call(d3.axisBottom().scale(xScale))

        let yAxis = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", commonOpt.type + "yAxis" + commonOpt.id)
            .attr("id", commonOpt.type + "yAxis" + commonOpt.id)
            .call(d3.axisLeft().scale(yScale))

        // 坐标刻度旋转
        if (fontRotate != 0) {
            xAxis.selectAll("text")
                .attr("transform", "rotate(-" + fontRotate + ")")
                .style("text-anchor", "end")
                .attr("dx", function () {
                    if (fontRotate != 90 && fontRotate != "90") { return "-.8em" }
                    else { return "-1em" }
                })
                .attr("dy", function () {
                    if (fontRotate != 90 && fontRotate != "90") { return ".5em" }
                    return "-.5em"
                })
        }


        // 坐标轴标题
        // x轴
        if (xtitle != "") {
            svg.append("text")
                .attr("class", opt.type + "xTitle" + opt.id)
                .attr("transform", "translate(" + ((width - margin.left - margin.right) / 2 + margin.left) + "," + (height - margin.bottom + 20 + xAxisBBox.height) + ")")
                .attr("text-anchor", "middle")
                .text(xtitle)
        }
        // y轴
        if (ytitle != "") {
            svg.append("text")
                .attr("class", opt.type + "yTitle" + opt.id)
                .attr("transform", "translate(" + (margin.left - yAxisBBox.width) / 2 + "," + (yAxisBBox.height / 2) + ")" + " rotate(-90)")
                // .attr("transform", "rotate(-90)")
                // .attr("x", 0 - ((height - margin.top - margin.bottom) / 2))
                // .attr("y", margin.left - yAxisBBox.width - 15)
                .attr("text-anchor", "middle")
                .text(ytitle)
        }

        d3.select("." + opt.type + "Deletesoon" + opt.id).remove()

    }

    drawFakeDataBox(opt) {
        let fake = d3.select("body")
            .append("svg")
            .attr("class", opt.type + "Deletesoon" + opt.id)
            .attr("width", 0)
            .attr("height", 0)
            .append("svg")
            .attr("class", opt.type + "FakeAxisBoxx" + opt.id)
            .attr("width", opt.layout.data.width)
            .attr("height", opt.layout.data.height)
        // .attr("opacity", 0)
    }

    axisTextFromat(opt) {
        d3.select("." + opt.type + "")
    }
}
