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

    containerInit(dom) {
        var container = d3.select(dom)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
        return container;
    }

    titleBoxInit(titlebox) {

    }

    axisBoxInit(axisbox) {

    }

    legendBoxInit(legendbox) {

    }

    dataBoxInit(drawbox) {

    }
};
