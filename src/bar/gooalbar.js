import * as d3 from 'd3';
import GooalCharts from '../gooalcharts';
import bar from './barPresenter';
import title from '../drawTitle';
import legend from '../drawLegend';

export default class GooalBar extends GooalCharts {
    constructor(dom, options) {
        super(dom, options);
        // return 
    }

    // title
    getTitleSVG() {
        return this.titleSVG;
    }

    // bar
    getBarSVG() {
        return this.barSVG;
    }

    getTooltip() {

    }

    // legend
    setLegend(container, options) {

    }

    draw() {
        this.barSVG = bar(this.getDataBox(), this.getOptions());
        this.titleSVG = title(this.getTitleBox(), this.getOptions())

    }
}