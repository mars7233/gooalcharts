import * as d3 from 'd3'

export default class TitleEvents {
    constructor(svg, opt) {
        this.svg = svg
        this.opt = opt
    }

    dbClickMainTitle(callback) {
        let svg = this.svg
        let opt = this.opt
        // 绑定双击事件
        svg.on("dblclick", callback)
    }

    dbClickTitle(callback) {
        d3.selectAll("." + this.opt.type + "title" + this.opt.id)
            .on("dblclick.changeTitles", callback)
    }
}