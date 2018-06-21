import * as d3 from 'd3'

export default class TitleEvents {
    constructor(svg, opt) {
        this.svg = svg
        this.opt = opt
    }

    dbClickTitle(callback) {
        let svg = this.svg
        let opt = this.opt
        // 绑定双击事件
        svg.on("dblclick", callback)
    }
}