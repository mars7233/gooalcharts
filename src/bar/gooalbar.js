import GooalCharts from '../gooalcharts';
import bar from './barPresenter';
import title from '../drawTitle';
import legend from '../drawLegend';
import { setTooltips, redrawTooltips } from './tooltip';
import { addEvents } from './mouseEvents'

export default class GooalBar extends GooalCharts {
    constructor(dom, options) {
        super(dom, options);

        this.draw();
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
    addTooltip(tooltipConfig) {
        var tooltip = setTooltips(this.getBarSVG());
        this.tooltipCon = tooltipConfig;
        this.addEvent("mouseover.tooltip", this.tooltipCon);
        return tooltip;
    }

    redrawTooltip() {
        var tooltip = redrawTooltips(this.getBarSVG());
        this.addEvent("mouseover.tooltips", this.tooltipCon);
        return tooltip;
    }

    // legend
    setLegend(container, options) {

    }

    addEvent(event, method) {
        return addEvents(this.getBarSVG(), event, method);
    }

    draw() {
        console.log(this.legendBox);
        this.barSVG = bar(this.getDataBox(), this.getOptions(), this.legendBox);
        this.titleSVG = title(this.getTitleBox(), this.getOptions());
        // this.boxLayout();
    }

    redrawBar() {
        var parentWith = this.getParentWidth();
        this.barSVG = bar(this.getDataBox(), this.getOptions(), this.getLegendBox(), parentWith * 0.8);
        this.titleSVG = title(this.getTitleBox(), this.getOptions());
        this.redrawTooltip(this.tooltipConfig);

    }
}