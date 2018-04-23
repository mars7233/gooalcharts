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
        this.legendOpt = options.legendBox
        this.dataOpt = options.dataBox

        // initialize container & ...Box & ...BBox
        this.container = this.setContainer(dom)
        this.titleBox = this.setTitleBox(options.titleBox)
        this.dataBox = this.setDataBox(options.dataBox)
        this.legendBox = this.setLegendBox(options.legendBox)

        this.layout = this.boxLayout()

        this.draw()
        this.titleBBox = this.titleBox.node().getBBox()
        this.dataBBox = this.dataBox.node().getBBox()
        this.legendBBox = this.legendBox.node().getBBox()

        window.addEventListener('resize', this.resize(this, 500))
    }

    // 设置刷新定时器
    resize(chart, delay) {
        let timer = null
        return function () {
            clearTimeout(timer)
            timer = setTimeout(function () { chart.redraw() }, delay)
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
        let container = d3.select(dom)
            .append("svg")
            .attr("class", this.getOptions().type + " Container")
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
        let titleBox = this.container
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

    // legend box
    getLegendBox() {
        return this.legendBox
    }
    setLegendBox(legendOpt) {
        let legendBox = this.container
            .append("svg")
            .attr("class", "legendBox")
            .attr("id", this.getOptions().type + "LegendBox" + this.getId())
        if (legendOpt.show == true || this.getOptions().type == "bar") {
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
        let dataBox = this.container.append("svg")
            .attr("class", "dataBox")
            .attr("id", this.getOptions().type + "DataBox" + this.getId())
            .attr("width", this.getWidth() * 0.8)
            .attr("height", 400)
        return dataBox
    }

    // 获取父元素宽度
    getParentWidth() {
        let parentNode = document.getElementById(this.getOptions().type + "Container" + this.getId()).parentNode
        return parentNode.clientWidth
    }

    // 调整box布局
    boxLayout() {
        let titleOpt = this.getTitleOpt()
        let legendOpt = this.getLegendOpt()

        let titleBox = this.getTitleBox()
        let dataBox = this.getDataBox()
        let legendBox = this.getLegendBox()

        let containerWidth = this.getWidth()

        let title = { "x": 0, "y": 0, "width": containerWidth, "height": 40 }
        let data = { "x": 0, "y": 0, "width": 0, "height": 400 }
        let legend = { "x": 0, "y": 0, "width": 0, "height": 0 }

        if (titleOpt.position == "bottom") {
            title.y = data.height + 10
            data.x = 0
            legend.x = 0
        } else {
            title.y = 0
            data.y = title.height
            legend.y = title.height
        }

        if (legendOpt.show == true) {
            legend.x = containerWidth * 0.8
            legend.width = containerWidth * 0.2
            data.width = containerWidth * 0.8
        } else {
            legend.width = 0
            data.width = containerWidth
        }

        titleBox.attr("y", title.y)
            .attr("width", data.width)

        dataBox.attr("y", data.y)
            .attr("width", data.width)

        legendBox.attr("x", legend.x)
            .attr("y", legend.y)
            .attr("width", legend.width)

        return { "title": title, "data": data, "legend": legend }
    }

    redraw() {
        // console.log(this.options.type)
        let parentWidth = this.getParentWidth()
        console.log("当前容器宽: " + parentWidth + "px")

        this.getContainer().remove()

        let options = this.options
        options.width = parentWidth
        this.setWidth(parentWidth)

        // reset container & ...Box & ...BBox
        this.container = this.setContainer(this.dom)

        this.titleBox = this.setTitleBox(options.titleBox)
        this.legendBox = this.setLegendBox(options.legendBox)
        this.dataBox = this.setDataBox(options.dataBox)

        this.titleBBox = this.titleBox.node().getBBox()
        this.dataBBox = this.dataBox.node().getBBox()
        this.legendBBox = this.legendBox.node().getBBox()

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
