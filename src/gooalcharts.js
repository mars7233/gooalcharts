import * as d3 from 'd3'
// Initialize container 
export default class GooalCharts {

    constructor(dom, options) {

        // options
        this.dom = dom
        this.options = options
        this.id = options.id
        this.width = options.width
        this.height = 450
        this.titleOpt = options.titleBox
        this.axisOpt = options.axisBox
        this.legendOpt = options.legendBox
        this.dataOpt = options.dataBox

        // initialize container & ...Box & ...BBox
        this.container = this.setContainer(dom)

        this.titleBox = this.setTitleBox(options.titleBox)
        this.titleBBox = this.titleBox.node().getBBox()

        this.dataBox = this.setDataBox(options.dataBox)
        this.dataBBox = this.dataBox.node().getBBox()

        this.legendBox = this.setLegendBox(options.legendBox)
        this.legendBBox = this.legendBox.node().getBBox()

        this.axisBox = this.setAxisBox(options.axisBox)
        // this.axisBBox = this.axisBox.node().getBBox()

        this.boxLayout()

        window.addEventListener('resize', this.resize(this, 500))
    }

    resize(chart, delay) {
        var timer = null
        return function () {
            clearTimeout(timer)
            timer = setTimeout(function () {
                chart.redraw()
            }, delay)
        }
    }
    // dom
    getDom() {
        return this.dom
    }

    // id
    getId() {
        return this.id
    }
    // width
    getWidth() {
        return this.width
    }

    setWidth(value) {
        this.width = value
    }

    // height
    getHeight() {
        return this.height
    }

    setHeight(value) {
        this.height = value
    }

    // options
    getOptions() {
        return this.options
    }
    getTitleOpt() {
        return this.titleOpt
    }

    getLegendOpt() {
        return this.legendOpt
    }

    getDataOpt() {
        return this.dataOpt
    }

    getAxisOpt() {
        return this.axisOpt
    }

    // BBox
    getTitleBBox() {
        return this.titleBBox
    }

    getLegendBBox() {
        return this.legendBBox
    }

    getDataBBox() {
        return this.dataBBox
    }

    getAxisBBox() {
        return this.axisBBox
    }

    // container
    getContainer() {
        return this.container
    }

    setContainer(dom) {
        var container = d3.select(dom)
            .append("svg")
            .attr("class", this.getOptions().type + " container")
            .attr("id", this.getOptions().type + "Container" + this.getId())
            .attr("width", this.getWidth())
            .attr("height", this.getHeight())
        return container
    }

    // titlebox
    getTitleBox() {
        return this.titleBox
    }

    setTitleBox(titleOpt) {
        var titleBox = this.container
            .append("svg")
            .attr("class", function () {
                if (titleOpt.position == "top" || titleOpt.position == "") { return "topTitleBox" }
                else if (titleOpt.position == "bottom") { return "bottomTitleBox" }
                else { return "topTitleBox" }
            })
            .attr("id", this.getOptions().type + "TitleBox" + this.getId())

        // 添加填充
        titleBox.append("rect")
            .attr("width", "100%")
            .attr("height", 40)
            .style("fill-opacity", 0)
            .style("opacity", 0.0)
        return titleBox
    }

    // axisbox
    setAxisBox(axisOpt) {
        var axisBox

        return axisBox
    }

    getAxisBox() {
        return this.axisBox
    }

    // legend box
    getLegendBox() {
        return this.legendBox
    }
    setLegendBox(legendOpt) {
        var legendBox = this.container
            .append("svg")
            .attr("class", "legendBox")
            .attr("id", this.getOptions().type + "LegendBox" + this.getId())
        if (legendOpt.show == "true" || this.getOptions().type == "bar") {
            legendBox.attr("width", this.width * 0.2)
                .attr("height", 400)

            legendBox.append("rect")
                .attr("width", "100%")
                .attr("height", "100%")
                .style("fill-opacity", 0)
                .style("opacity", 0.0)
        }
        return legendBox
    }

    // databox
    getDataBox() {
        return this.dataBox
    }

    setDataBox(dataOpt) {
        var dataBox = this.container.append("svg")
            .attr("class", "dataBox")
            .attr("id", this.getOptions().type + "DataBox" + this.getId())
            .attr("width", this.getWidth() * 0.8)
            .attr("height", 400)
        return dataBox
    }

    // 
    getParentWidth() {
        var parentNode = document.getElementById(this.getOptions().type + "Container" + this.getId()).parentNode
        console.log(parentNode.clientWidth)

        return parentNode.clientWidth
    }

    // 调整box布局
    boxLayout() {
        var titleOpt = this.getTitleOpt()
        var legendOpt = this.getLegendOpt()
        var container, title, data, legend, axis

        // title = { "x": "", "y": "", "width": "", "height": "" }

        var title = this.getTitleBBox()
        var dataBBox = this.getDataBBox()
        var legend = this.getLegendBBox()
        var axisBBox = this.getAxisBBox()

        var containerWidth = this.getWidth()

        this.titleBox
            .attr("y", function () {
                var titleBoxY = 0
                if (titleOpt.position == "bottom") { titleBoxY = legend.height + 400 }
                return titleBoxY
            })

        this.dataBox
            .attr("y", function () {
                var dataBoxY = title.height
                if (legendOpt.position == "top") { dataBoxY = dataBoxY + legend.height }
                if (titleOpt.position == "bottom") { dataBoxY = dataBoxY - title.height }
                return dataBoxY
            })

        this.legendBox
            .attr("x", function () {
                var legendBoxX = containerWidth * 0.8
                return legendBoxX
            })
            .attr("y", function () {
                var legendBoxY = title.height
                return legendBoxY
            })
    }

    redraw() {
        // console.log(this.options.type)
        var parentWidth = this.getParentWidth()
        console.log("当前容器宽: " + parentWidth + "px")

        this.getContainer().remove()

        var options = this.options
        options.width = parentWidth
        this.setWidth(parentWidth)

        // reset container & ...Box & ...BBox
        this.container = this.setContainer(this.dom)

        this.titleBox = this.setTitleBox(options.titleBox)
        this.titleBBox = this.titleBox.node().getBBox()

        this.legendBox = this.setLegendBox(options.legendBox)
        this.legendBBox = this.legendBox.node().getBBox()

        this.dataBox = this.setDataBox(options.dataBox)
        this.dataBBox = this.dataBox.node().getBBox()

        // this.axisBox = this.seta(options.axisBox)
        // this.axisBBox = this.axisBox.node().getBBox()

        this.boxLayout()
        this.redrawBar()
        this.redrawPie()
        this.redrawScatter()
    }

    redrawBar() { }
    redrawPie() { }
    redrawScatter() { }
}
