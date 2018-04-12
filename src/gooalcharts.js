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
        this.dataBox = this.setDataBox(options.dataBox)
        this.legendBox = this.setLegendBox(options.legendBox)
        this.axisBox = this.setAxisBox(options.axisBox)

        this.layout = this.boxLayout()

        this.draw()
        this.titleBBox = this.titleBox.node().getBBox()
        this.dataBBox = this.dataBox.node().getBBox()
        this.legendBBox = this.legendBox.node().getBBox()
        // this.axisBBox = this.axisBox.node().getBBox()




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

    getLayout() {
        return this.layout
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
        return parentNode.clientWidth
    }

    // 调整box布局
    boxLayout() {
        var titleOpt = this.getTitleOpt()
        var legendOpt = this.getLegendOpt()

        var titleBox = this.getTitleBox()
        var dataBox = this.getDataBox()
        var legendBox = this.getLegendBox()

        var containerWidth = this.getWidth()

        var title = { "x": 0, "y": 0, "width": containerWidth, "height": 40 }
        var data = { "x": 0, "y": 0, "width": 0, "height": 400 }
        var legend = { "x": 0, "y": 0, "width": 0, "height": 0 }
        var axis = { "x": 0, "y": 0, "width": 0, "height": 0 }


        if (titleOpt.position == "bottom") {
            title.y = data.height + 10
            data.x = 0
            legend.x = 0
        } else {
            title.y = 0
            data.y = title.height
            legend.y = title.height
        }

        if (legendOpt.show == "true") {
            legend.x = containerWidth * 0.8
            legend.width = containerWidth * 0.2
            data.width = containerWidth * 0.8
        } else {
            legend.width = 0
            data.width = containerWidth
        }

        titleBox.attr("y", title.y)
        dataBox.attr("y", data.y)
            .attr("width", data.width)

        legendBox.attr("x", legend.x)
            .attr("y", legend.y)
            .attr("width", legend.width)

        return { "title": title, "data": data, "legend": legend }
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
        this.legendBox = this.setLegendBox(options.legendBox)
        this.dataBox = this.setDataBox(options.dataBox)

        this.axisBox = this.setAxisBox(options.axisBox)
        // this.axisBBox = this.axisBox.node().getBBox()

        this.titleBBox = this.titleBox.node().getBBox()
        this.dataBBox = this.dataBox.node().getBBox()
        this.legendBBox = this.legendBox.node().getBBox()
        // this.axisBBox = this.axisBox.node().getBBox()

        this.layout = this.boxLayout()
        this.redrawBar()
        this.redrawPie()
        this.redrawScatter()
    }
    draw() { }
    redrawBar() { }
    redrawPie() { }
    redrawScatter() { }
}
