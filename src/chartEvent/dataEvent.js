import * as d3 from 'd3'

let chartEl
let preColor, curColor
let selectColor = "brown"
let hoverColor = "brown"
let commonOpt
let selectedData = []

function addEvents(svg, events, methods, options) {
    commonOpt = options
    chartEl = svg
    chartEl.selectAll("." + options.type + "Element" + options.id)
        .on(events, methods)
}
// 默认事件（）
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
function restoreColor() {
    // 还原element的color
    chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)._groups[0].forEach(element => {
        element.style.fill = element.getAttribute("normalColor")
    });
}

function cleanSelectEvent() {
    chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)
        .on("click.singleSelect", null)
        .on("click.multiSelect", null)
}

function clearSelect() {
    selectedData = []
    restoreColor()
}

function handleClickOutside(options) {
    document.getElementById(options.type + "Container" + options.id).onclick = function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        var tarClass = tar.className;
        var tarId = tar.id;
        // console.log(tarClass);
        // console.log(tarId);
        if (tarId == options.type + "Container" + options.id) {
            clearSelect()
        }
    }
}

export default class MouseEvent {
    constructor() {

    }
    selectEvent(method, svg, options) {
        commonOpt = options
        chartEl = svg
        chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)
            .on("mouseover.highlight", null)
            .on("mouseout.highlight", null)
        handleClickOutside(commonOpt)
        if (method == "single") {//单选事件
            selectedData = null
            restoreColor()
            cleanSelectEvent()
            chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)
                .on("click.singleSelect", function (d, i) {
                    if (d3.select(this).style("fill") == selectColor) {// 如果元素已被选中则取消选择
                        restoreColor()
                        selectedData = null
                    } else {// 如果元素未被选中则选择
                        restoreColor()
                        d3.select(this).style("fill", selectColor)
                        selectedData = d
                        console.log(selectedData)
                    }
                })
        } else if (method == "multiple") {//多选事件
            selectedData = []
            restoreColor()
            cleanSelectEvent()
            chartEl.selectAll("." + commonOpt.type + "Element" + commonOpt.id)
                .on("click.multiSelect", function (d, i) {
                    let normalColor = d3.select(this).attr("normalColor")
                    let overlapFlag = false
                    if (selectedData.length == 0) {// 如果选择的元素集为空，则把该元素加入选择集中
                        selectedData.push(d)
                        d3.select(this).style("fill", selectColor)
                    } else {
                        let count = 0
                        for (let element of selectedData) {
                            if (d == element) {// 如果选择集内元素重复，则删除该元素
                                overlapFlag = true
                                selectedData.splice(count, 1)
                                d3.select(this).style("fill", normalColor)
                                count--
                            }
                            count++
                        }
                        if (overlapFlag == false) {// 如果选择集中没有当前选中元素，则把元素加入选择集中
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
        cleanSelectEvent()
        restoreColor()
        return finalData
    }

}

export { addEvents }
export { defaultEvents }
export { selectEvent }