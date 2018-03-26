import * as d3 from 'd3';
import GooalCharts from './gooalcharts';
import column from './drawColumn';

export default class GooalColumn extends GooalCharts {
    constructor(dom, options) {
        super(dom, options);
        this.width = this.getWidth();
        this.height = this.getHeight();
        this.container = this.getContainer();
        this.titleBox = this.getTitleBox();
        this.axisBox = this.getAxisBox();
        this.legendBox = this.getLegendBox();
        this.dataBox = this.getDataBox();
    }

    // title
    setTitle() {

    }

    drawTitle(container, options) {

    }

    // column
    setColumn() {

    }

    drawColumn(options) {
        return column(this.getContainer(), options);
    }

    // axis
    setAxis() {

    }

    drawAxis(container, options) {

    }
    // legend
    setLegend() {

    }

    drawLegend(container, options) {

    }


    draw(container, options) {
        this.drawColumn();
        this.drawAxis();
        this.drawTitle();
        this.drawLegend();
    }


}