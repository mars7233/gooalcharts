import * as d3 from 'd3';
import GooalCharts from '../gooalcharts';
import bar from './barPresenter';
import title from '../drawTitle';

export default class GooalBar extends GooalCharts {
    constructor(dom, options) {
        super(dom, options);
        // return 
    }

    // title
    setTitle(container, options) {
        return title(this.getTitleBox(), this.getOptions())
    }

    // column
    setBar(options) {
        return bar(this.getDataBox(), this.getOptions());
    }

    // axis
    setAxis(container, options) {

    }
    // legend
    setLegend(container, options) {

    }

    draw(container, options) {
        this.setBar();
        this.setAxis();
        this.setTitle();
        this.setLegend();
    }
}