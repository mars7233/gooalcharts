import * as d3 from 'd3';
import GooalCharts from './gooalcharts';
import column from './drawColumn';
import title from './drawTitle'

export default class GooalColumn extends GooalCharts {
    constructor(dom, options) {
        super(dom, options);
    }

    // title
    setTitle() {

    }

    drawTitle(container, options) {
        return title(this.getTitleBox(), options)
    }

    // column
    setColumn() {

    }

    drawColumn(options) {
        return column(this.getDataBox(), options);
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