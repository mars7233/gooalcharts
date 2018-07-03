import GooalCharts from '../gooalcharts'
import ScatterPresenter from './scatterPresenter'
import { GooalAxis } from '../drawAxis'
import { GooalLegend } from '../drawLegend'
import { GooalTitle } from '../drawTitle'
import GooalTooltip from '../gooaltooltip'
import LegendEvents from '../chartEvent/legendEvents'
import DataBoxEvents from '../chartEvent/dataBoxEvents'
import TitleEvents from '../chartEvent/titleEvent'

export default class GooalScatter extends GooalCharts {
    constructor(dom, options) {
        super(dom, options)
        this.dataBoxEvents = new DataBoxEvents(this.getScatterContainer(), this.getOptions())
        this.legendEvents = new LegendEvents(this.getScatterContainer(), this.getOptions())
    }

    getTitleSVG() {
        return this.titleSVG
    }

    getScatterSVG() {
        return this.scatter.chart
    }
    getScatterContainer() {
        return this.scatter.container
    }

    getTooltip() {
        return this.tooltip
    }

    addTooltip(tooltipCon) {
        this.tooltipConfig = tooltipCon
        let tooltip = new GooalTooltip(this.getScatterContainer(), this.getOptions(), tooltipCon)
        this.tooltip = tooltip
        return tooltip.tooltip
    }

    redrawTooltip() {
        let tooltip = this.getTooltip()
        tooltip.redrawTooltips(this.getScatterContainer(), this.getOptions(), this.tooltipConfig)

        return tooltip.tooltip
    }


    addEvent(event, method) {
        return this.dataBoxEvents.addEvents(this.getScatterContainer(), event, method, this.getOptions())
    }

    draw() {
        this.scatter = new ScatterPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

        this.legend = new GooalLegend(this.getLegendBox(), this.scatter.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.scatter = new ScatterPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.titleSVG = new GooalTitle(this.getTitleBox(), this.getOptions())
        this.axis = new GooalAxis(this.getScatterSVG(), this.getOptions(), this.getLayout())
    }

    redrawScatter() {
        this.scatter = new ScatterPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())

        this.legend = new GooalLegend(this.getLegendBox(), this.scatter.category, this.getOptions())
        if (this.legend.isOverWidth == true) {
            this.scatter = new ScatterPresenter(this.getDataBox(), this.getOptions(), this.getLegendBox(), this.getLayout())
        }
        this.titleSVG = new GooalTitle(this.getTitleBox(), this.getOptions())
        this.axis = new GooalAxis(this.getScatterSVG(), this.getOptions(), this.getLayout())
        this.redrawTooltip()
    }

    // select
    selectOn(method, selFunc) {
        // 开始记录点击事件并关闭其他事件
        return this.dataBoxEvents.selectEvent(method, this.getDataBox(), this.getOptions(), selFunc)
    }

    selectOff() {
        // 关闭点击事件返回数据并开启其他事件
        return this.dataBoxEvents.selectOff(this.getOptions())
    }

    // changeColor
    getLegendItem(changeColorConfig) {
        this.changeColorConfig = changeColorConfig
        return this.legendEvents.getLegendItem(changeColorConfig)
    }

    changeColor(index, color) {
        return this.legendEvents.changeColor(index, color)
    }

    // changeTitle
    dbClickTitle(callback) {
        this.titleEvents = new TitleEvents(this.titleSVG.text, this.getOptions())
        this.titleEvents.dbClickTitle(callback)
    }
    changeTitle(newTitle) {
        this.titleSVG.text.text(newTitle)
    }


}

