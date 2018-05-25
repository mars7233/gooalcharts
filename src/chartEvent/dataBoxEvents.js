import * as d3 from 'd3'

let chartEl
let preColor, curColor
let preRadius, curRadius
// let selectedColor = "brown"
// let hoverColor = "brown"
let commonOpt
let selectedData = []

// select
function restoreColor(options) {
    // 还原element的color
    chartEl.selectAll("." + options.type + "Element" + options.id)._groups[0].forEach(element => {
        element.style.fill = element.getAttribute("normalColor")
    });
}

function cleanSelectEvent(options) {
    chartEl.selectAll("." + options.type + "Element" + options.id)
        .on("click.singleSelect", null)
        .on("click.multiSelect", null)
}

function clearSelectData(options) {
    selectedData = []
    restoreColor(options)
}



export default class DataBoxEvents {
    constructor(svg, options) {
        chartEl = svg
        this.options = options
    }

    defaultEvents(opt) {
        this.selectData = []
        let dataBox = this.options.dataBox
        this.options = opt
        let options = this.options
        let hoverColor = dataBox.hoverColor
        let selectedColor = dataBox.selectedColor
        // console.log(options)

        chartEl.selectAll("." + this.options.type + "Element" + this.options.id)
            .on("mouseover.highlight", function (d) {
                if (options.type == "scatter") {
                    preRadius = d3.select(this).attr("r")
                    // 悬浮高亮
                    // d3.select(this).style("fill", "brown")
                    d3.select(this).attr("r", options.dataBox.hoverRadius)
                } else {
                    // 悬浮高亮
                    d3.select(this).style("fill", hoverColor)
                }
            })
            .on("mouseout.highlight", function (d) {
                if (options.type == "scatter") {
                    d3.select(this).attr("r", preRadius)
                } else {
                    let normalColor = d3.select(this).attr("normalColor")
                    // 取消高亮
                    d3.select(this).style("fill", normalColor)
                }
            })

        chartEl.selectAll("." + this.options.type + "Path" + this.options.id)
            .on("mouseover.highlight", function (d) {
                d3.select(this).style("stroke", hoverColor)
            })
            .on("mouseout.highlight", function (d) {
                let normalColor = d3.select(this).attr("normalColor")
                d3.select(this).style("stroke", normalColor)
            })

    }

    addEvents(svg, events, methods, options) {
        chartEl = svg
        chartEl.selectAll("." + options.type + "Element" + options.id)
            .on(events, methods)
    }

    selectEvent(method, svg, options, selData) {
        // this.selectData = selData
        console.log(selData)
        selData.splice(0, selData.length)
        let dataBox = this.options.dataBox
        let normalColor
        let selectedColor = dataBox.selectedColor
        chartEl = svg
        chartEl.selectAll("." + options.type + "Element" + options.id)
            .on("mouseover.highlight", null)
            .on("mouseout.highlight", null)
        this.handleClickOutside(options, selData)
        if (method == "single") {//单选事件
            selectedData = []
            restoreColor(options)
            cleanSelectEvent(options)
            chartEl.selectAll("." + options.type + "Element" + options.id)
                .on("click.singleSelect", function (d, i) {
                    if (d3.select(this).style("fill") == selectedColor) {// 如果元素已被选中则取消选择
                        restoreColor(options)

                        selectedData = []

                        selData.splice(0, selData.length)
                    } else {// 如果元素未被选中则选择
                        normalColor = d3.select(this).style("fill")
                        restoreColor(options)
                        d3.select(this).style("fill", selectedColor)
                        selectedColor = d3.select(this).style("fill")

                        selectedData = []
                        selectedData.push(d)

                        selData.splice(0, selData.length)
                        selData.push(d)
                    }
                })

        } else if (method == "multiple") {//多选事件
            selectedData = []
            restoreColor(options)
            cleanSelectEvent(options)
            chartEl.selectAll("." + options.type + "Element" + options.id)
                .on("click.multiSelect", function (d, i) {
                    let normalColor = d3.select(this).attr("normalColor")
                    let overlapFlag = false
                    if (selectedData.length == 0) {// 如果选择的元素集为空，则把该元素加入选择集中
                        selectedData.push(d)
                        selData.push(d)
                        d3.select(this).style("fill", selectedColor)
                    } else {
                        let count = 0
                        for (let element of selectedData) {
                            if (d == element) {// 如果选择集内元素重复，则删除该元素
                                overlapFlag = true
                                selectedData.splice(count, 1)
                                selData.splice(count, 1)
                                d3.select(this).style("fill", normalColor)
                                count--
                            }
                            count++
                        }
                        if (overlapFlag == false) {// 如果选择集中没有当前选中元素，则把元素加入选择集中
                            selectedData.push(d)
                            selData.push(d)
                            d3.select(this).style("fill", selectedColor)
                        }
                    }
                    console.log(selectedData)
                })
        } else {
            console.log("wrong select method")
        }
    }

    selectOff(options) {
        // console.log(this.selectData)
        let finalData = selectedData
        selectedData = []
        this.defaultEvents(options)
        cleanSelectEvent(options)
        restoreColor(options)
        return finalData
    }

    handleClickOutside(options, selData) {
        document.getElementById(options.type + "Container" + options.id).onclick = function (e) {
            var e = e ? e : window.event;
            var tar = e.srcElement || e.target;
            var tarClass = tar.className;
            var tarId = tar.id;
            // console.log(tarClass);
            // console.log(tarId);
            if (tarId == options.type + "Container" + options.id) {
                // clearSelectData(options)
                selectedData = []
                restoreColor(options)
                selData.splice(0, selData.length)
            }
        }
    }

}

export { addEvents }
export { defaultEvents }
export { selectEvent }