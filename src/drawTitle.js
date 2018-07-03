import * as d3 from 'd3'


export default function (dom, options) {
    return drawTitle(dom, options)
}

export class GooalTitle {
    constructor(dom, opt) {
        this.text = opt.titleBox.title
        this.drawTitle(dom, opt)
    }
    drawTitle(dom, options) {
        let svg = dom
        let titleOpt = options.titleBox
        let title = titleOpt.title
        let fontFamily = titleOpt.fontFamily
        let fontSize = titleOpt.fontSize
        let fontColor = titleOpt.fontColor

        if (titleOpt.show == true) {

            this.text = svg.append("text")
                .attr("class", options.type + "Title" + options.id + " " + options.type + "title" + options.id)
                .attr("x", function () {
                    if (options.type != "piechart")
                        return (options.layout.data.width - options.layout.margin.left) / 2 + options.layout.margin.left
                    else
                        return options.layout.data.width / 2
                })
                .attr("y", 30)
                .attr("text-anchor", "middle")
                .style("font-family", fontFamily)
                .style("font-size", fontSize)
                .style("color", fontColor)
                .text(title)


        }
    }
}