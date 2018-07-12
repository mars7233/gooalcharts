import * as d3 from 'd3'

export default class TitleEvents {
    constructor(svg, opt) {
        this.svg = svg.select("text")
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
            .style("cursor", "pointer")
            .on("dblclick.changeTitles", callback)
    }

    mouseoverTitle(callback) {
        let svg = this.svg
        let opt = this.opt
        svg.on("mouseover", callback)
    }

    mouseoutTitle(callback) {
        let svg = this.svg
        let opt = this.opt
        svg.on("mouseout", callback)

    }

}