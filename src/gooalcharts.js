import * as d3 from 'd3';

export default class GooalCharts {

    constructor(dom, options) {
        this.width = options.width;
        this.height = options.height;
        this.container = this.containerInit(dom);
        this.titleBox = this.titleBoxInit(options.titleBox);
        this.axisBox = this.axisBoxInit(options.axisBox);
        this.legendBox = this.legendBoxInit(options.legendBox);
        this.dataBox = this.dataBoxInit(options.drawBox);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    // container
    containerInit(dom) {
        var container = d3.select(dom)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("class", "container");
        return container;
    }
    getContainer() {
        return this.container;
    }

    // titlebox
    titleBoxInit(titlebox) {
        var titleBox;
        return titleBox;
    }

    getTitleBox() {
        return this.titleBox;
    }

    // axisbox
    axisBoxInit(axisbox) {
        var axisBox;
        return axisBox;
    }

    getAxisBox() {
        return this.axisBox;
    }

    // legend box
    legendBoxInit(legendbox) {
        var legendBox;
        return legendBox;
    }

    getLegendBox() {
        return this.legendBox;
    }

    // databox
    dataBoxInit(drawbox) {
        var drawBox;
        return drawBox;
    }

    getDataBox() {
        return this.dataBox;
    }
};
