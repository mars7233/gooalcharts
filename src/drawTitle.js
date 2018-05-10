import * as d3 from 'd3'
import { dbClickChangeTitle as changeTitle } from './chartEvent/mouseEvent'

let titleOpt
let title = ""
let fontFamily = "Times"
let fontSize = "21px"
let fontColor = "#000000"

function drawTitle(dom, options) {
    let svg = dom

    titleOpt = options.titleBox
    title = titleOpt.title || title
    fontFamily = titleOpt.fontFamily || fontFamily
    fontSize = titleOpt.fontSize || fontSize
    fontColor = titleOpt.fontColor || fontColor

    let text = svg.append("text")
        .attr("class", options.type + "Title" + options.id)
        .attr("x", "50%")
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-family", fontFamily)
        .style("font-size", fontSize)
        .style("color", fontColor)
        .text(title)

    // changeTitle(text, options)

}

export default function (dom, options) {
    return drawTitle(dom, options)
}