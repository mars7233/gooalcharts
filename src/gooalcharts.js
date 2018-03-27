import * as d3 from 'd3';
// Initialize container 
export default class GooalCharts {

    constructor(dom, options) {
        // options
        this.options = options;
        this.width = options.width;
        this.height = options.height;
        this.titleOpt = options.titleBox;
        this.axisOpt = options.axisBox;
        this.legendOpt = options.legendBox;
        this.dataOpt = options.dataBox;

        // initialize container & ...Box & ...BBox
        this.container = this.containerInit(dom);

        this.titleBox = this.titleBoxInit(options.titleBox);
        this.titleBBox = this.titleBox.node().getBBox();

        this.legendBox = this.legendBoxInit(options.legendBox);
        this.legendBBox = this.legendBox.node().getBBox();

        this.dataBox = this.dataBoxInit(options.dataBox);
        this.dataBBox = this.dataBox.node().getBBox();
        // console.log(this.dataBBox);

        this.axisBox = this.axisBoxInit(options.axisBox);
        // this.axisBBox = this.axisBox.node().getBBox();

        this.boxLayout();
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
    // options
    getOptions() {
        return this.options
    }
    getTitleOpt() {
        return this.titleOpt;
    }

    getLegendOpt() {
        return this.legendOpt;
    }

    getDataOpt() {
        return this.dataOpt;
    }

    getAxisOpt() {
        return this.axisOpt;
    }

    // BBox
    getTitleBBox() {
        return this.titleBBox;
    }

    getLegendBBox() {
        return this.legendBBox;
    }

    getDataBBox() {
        return this.dataBBox;
    }

    getAxisBBox() {
        return this.axisBBox;
    }

    // container
    containerInit(dom) {
        var container = d3.select(dom)
            .append("svg")
            .attr("class", "container")
            .attr("width", this.width)
            .attr("height", this.height);
        return container;
    }

    getContainer() {
        return this.container;
    }

    // titlebox
    titleBoxInit(titleOpt) {
        // 创建titleBox
        var titleBox = this.container
            .append("svg")
            .attr("class", function () {
                if (titleOpt.position == "top" || titleOpt.position == "") { return "topTitleBox"; }
                else if (titleOpt.position == "bottom") { return "bottomTitleBox"; }
                else { return "topTitleBox"; }
            });

        // 添加填充
        titleBox.append("rect")
            .attr("width", "100%")
            .attr("height", 40)
            .style("fill-opacity", 0);
        return titleBox;
    }

    getTitleBox() {
        return this.titleBox;
    }

    // axisbox
    axisBoxInit(axisOpt) {
        var axisBox;

        return axisBox;
    }

    getAxisBox() {
        return this.axisBox;
    }

    // legend box
    legendBoxInit(legendOpt) {
        var legendBox = this.container
            .append("svg")
            .attr("class", "legendBox");
        return legendBox;
    }

    getLegendBox() {
        return this.legendBox;
    }

    // databox
    dataBoxInit(dataOpt) {
        var dataBox = this.container.append("svg")
            .attr("class", "dataBox")
            .attr("width", 800)
            .attr("height", 400);
        return dataBox;
    }

    getDataBox() {
        return this.dataBox;
    }

    // 调整box布局
    boxLayout() {
        var titleBBox = this.getTitleBBox();
        var dataBBox = this.getDataBBox();
        var legendBBox = this.getLegendBBox();
        var axisBBox = this.getAxisBBox();

        var titleOpt = this.getTitleOpt();
        var legendOpt = this.getLegendOpt();

        this.titleBox
            .attr("y", function () {
                var titleBoxY = 0;
                if (titleOpt.position == "bottom") { titleBoxY = legendBBox.height + 400; }
                return titleBoxY;
            })

        this.dataBox
            .attr("y", function () {
                var dataBoxY = titleBBox.height;
                if (legendOpt.position == "top") { dataBoxY = dataBoxY + legendBBox.height }
                if (titleOpt.position == "bottom") { dataBoxY = dataBoxY - titleBBox.height }
                return dataBoxY;
            })

        this.legendBox
            .attr("x", function () {

            })
            .attr("y", function () {

            })
    }
};
