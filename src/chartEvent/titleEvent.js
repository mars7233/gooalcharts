import * as d3 from 'd3'

function dbClickChangeTitle(svg, options) {
    let titleBox = d3.select("#" + options.type + "TitleBox" + options.id)

    // 绑定双击事件
    svg.on("dblclick", function () {
        let title = svg.text()
        let titleBBox = svg.node().getBBox()
        svg.text("")

        // 在foreignObject中添加input标签
        let foreignObject = titleBox.append("foreignObject")
            .attr("class", options.type + "ForeignObject" + options.id)
            .attr("x", 2)
            .attr("y", 8)
            .attr("width", "99%")
            .attr("height", "100%")
            .html("<input class = " + options.type + "TitleChange" + options.id + "  type = \"text\" >")

        // 配置input标签的样式
        let inputLabel = d3.select("." + options.type + "TitleChange" + options.id)
            .attr("value", title)
            .style("text-align", "center")
            .style("vertical-align", "middle")
            .style("font-family", "Times")
            .style("font-size", "21px")
            .style("width", "100%")
        // .style("x", titleBBox.x - 3)
        // .style("y", -2)
        // .style("outline", "none")
        // .style("border", "0")

        // 绑定enter确定修改标题事件
        inputLabel.on("keydown", function () {
            if (d3.event.key == "Enter") {
                let newTitle = inputLabel.node().value
                // 向配置文件添加新的title
                options.titleBox.title = newTitle
                inputLabel.remove()
                foreignObject.remove()
                svg.attr("x", "50%")
                    .attr("y", 30)
                    .text(newTitle)
                inputLabel.on("keydown", null)
            }
        })
    })

}
export { dbClickChangeTitle }
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