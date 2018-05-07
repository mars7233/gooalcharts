import * as d3 from 'd3'

let chartEl
let preColor, curColor
let selectColor = "brown"
let hoverColor = "brown"
let commonOpt
let selectedData = []

function addEvents(svg, events, methods, opt) {
    commonOpt = opt
    chartEl = svg
    chartEl.selectAll("." + opt.type + "Element" + opt.id)
        .on(events, methods)
}
// default events
function defaultEvents(svg, options) {
    // options  鼠标悬浮颜色、大小
    commonOpt = options
    chartEl = svg
    if ("dataBox" in commonOpt) {
        let dataBox = commonOpt.dataBox
        if ("hoverColor" in dataBox) {
            hoverColor = dataBox.hoverColor
        }
        if ("selectColor" in dataBox) {
            selectColor = dataBox.selectColor
        }
    }
    chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)
        .on("mouseover.highlight", mouseOverHighlight)
        .on("mouseout.highlight", handleMouseOut)
}

// mouse over
function mouseOverHighlight(d) {
    preColor = d3.select(this).style("fill")
    // 悬浮高亮
    d3.select(this).style("fill", hoverColor)
}

// mouse out 
function handleMouseOut(d) {
    let normalColor = d3.select(this).attr("normalColor")
    // 取消高亮
    d3.select(this).style("fill", normalColor)
}

// select
function handleSelect(d) {

}

function singleSelect(data) {

}

function multiSelect(data) {

}


export { addEvents }
export { defaultEvents }
export { selectEvent }
export default class MouseEvent {
    selectEvent(method, svg, options) {
        commonOpt = options
        chartEl = svg
        chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)
            .on("mouseover.highlight", null)
            .on("mouseout.highlight", null)

        if (method == "single") {
            chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)
                .on("click.singleSelect", function (d, i) {
                    chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)._groups[0].forEach(element => {
                        element.style.fill = element.getAttribute("normalColor")
                    });
                    d3.select(this).style("fill", selectColor)
                    selectedData = d
                })
        } else if (method == "multiple") {
            chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)
                .on("click.multiSelect", function (d, i) {
                    let normalColor = d3.select(this).attr("normalColor")
                    let overlapFlag = false
                    if (selectedData.length == 0) {
                        // 如果选择的元素集为空，则把该元素加入选择集中
                        selectedData.push(d)
                        d3.select(this).style("fill", selectColor)
                    } else {
                        let count = 0
                        for (let element of selectedData) {
                            if (d == element) {
                                // 如果选择集内元素重复，则删除该元素
                                overlapFlag = true
                                selectedData.splice(count, 1)
                                d3.select(this).style("fill", normalColor)
                                count--
                            }
                            count++
                        }
                        if (overlapFlag == false) {
                            // 如果选择集中没有当前选中元素，则把元素加入选择集中
                            selectedData.push(d)
                            d3.select(this).style("fill", selectColor)
                        }
                    }
                    console.log(selectedData)
                })
        } else {
            console.log("wrong select method")
        }
    }

    selectOff() {
        let finalData = selectedData
        selectedData = []
        defaultEvents(chartEl, commonOpt)
        chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)
            .on("click.singleSelect", null)
            .on("click.multiSelect", null)
        return finalData
    }

}