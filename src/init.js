import * as d3 from 'd3';
import column from "./gooal-column";

var containerWidth, containerHeight = 0;
var container = ""
var titleBox, axisBox, legendBox, drawBox = "";
var chartType = ""

// 初始化入口
function chartsInit(dom, options) {
    // 初始化容器
    container = new gooalConatiner(dom, options);

    // 判断图表类型
    chartType = options.type;
    if (chartType == "column") {
        column(container, options);
    }
}


class gooalConatiner {
    constructor(dom, options) {
        this.width = options.width;
        this.height = options.height;
        this.container = this.containerInit(dom);
        this.titleBox = this.titleBoxInit(options.titleBox);
        this.axisBox = this.axisBoxInit(options.axisBox);
        this.legendBox = this.legendBoxInit(options.legendBox);
        this.drawBox = this.drawBoxInit(options.drawBox);
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

    drawBoxInit(drawbox) {

    }
}

export default function (dom, options) {
    return chartsInit(dom, options);

}