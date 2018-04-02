import * as d3 from 'd3';
import GooalCharts from '../gooalcharts';
import bar from './barPresenter';
import title from '../drawTitle';
import legend from '../drawLegend';
import { setTooltips } from './tooltip';
import { addEvents } from './mouseEvents'

export default class GooalBar extends GooalCharts {
    constructor(dom, options) {
        super(dom, options);
        this.box = [this.getTitleBox(), this.getAxisBox(), this.getLegendBox(), this.getDataBox()]
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
    // tooltip
    setTooltip() {
        return setTooltips(this.getBarSVG());
    }

    // legend
    setLegend(container, options) {

    }

    addEvent(event, method) {
        return addEvents(this.getBarSVG(), event, method);
    }

    draw() {
        this.barSVG = bar(this.getDataBox(), this.getOptions());
        this.titleSVG = title(this.getTitleBox(), this.getOptions());
    }
}