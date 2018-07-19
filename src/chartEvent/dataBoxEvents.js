import * as d3 from 'd3'

let selectedData = []


export default class DataBoxEvents {
    constructor(svg, options) {
        this.chartEl = svg
        this.options = options
        this.selectedData = []
    }

    defaultEvents(opt) {
        let chartEl = this.chartEl
        this.selectData = []
        let dataBox = this.options.dataBox
        this.options = opt
        let options = this.options
        let hoverColor = dataBox.hoverColor
        let selectedColor = dataBox.selectedColor
        let preRadius = dataBox.radius
        // console.log(options)

        chartEl.selectAll("." + this.options.type + "Element" + this.options.id)
            .on("mouseover.highlight", function (d) {
                if (options.type == "scatter") {
                    preRadius = d3.select(this).attr("r")
                    // 悬浮高亮
                    // d3.select(this).style("fill", "brown")
                    d3.select(this).attr("r", options.dataBox.hoverRadius)
                } else if (options.type == "line") {
                    d3.select(this).style("fill", hoverColor)
                    chartEl.select("." + "category-" + (d.category || "0"))
                        .style("stroke", hoverColor)
                } else {
                    // 悬浮高亮
                    d3.select(this).style("fill", hoverColor)
                }
            })
            .on("mouseout.highlight", function (d) {
                if (options.type == "scatter") {
                    d3.select(this).attr("r", preRadius)
                } else if (options.type == "line") {
                    let normalColor = d3.select(this).attr("normalColor")
                    // 取消高亮
                    d3.select(this).style("fill", normalColor)

                    // let pathNormalColor = chartEl.select("." + "category-" + (d.category || "0"))
                    //     .attr("normalColor")
                    chartEl.select("." + "category-" + (d.category || "0")).style("stroke", normalColor)
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
        let chartEl = svg
        chartEl.selectAll("." + options.type + "Element" + options.id)
            .on(events, methods)
    }

    selectEvent(method, svg, options, selFunc) {
        let selectedData = this.selectedData
        let restoreColor = this.restoreColor
        let cleanSelectEvent = this.cleanSelectEvent
        let selData = []
        // this.selectData = selData
        // console.log(selData)
        selData.splice(0, selData.length)

        let dataBox = this.options.dataBox
        let normalColor
        let selectedColor = dataBox.selectedColor
        let chartEl = svg
        chartEl.selectAll("." + options.type + "Element" + options.id)
            .on("mouseover.highlight", null)
            .on("mouseout.highlight", null)

        this.handleClickOutside(options, selData, selFunc)
        selData.splice(0, selData.length) //清空数组
        if (method == "single") {//单选事件
            selectedData = []
            restoreColor(chartEl, options)
            cleanSelectEvent(chartEl, options)
            chartEl.selectAll("." + options.type + "Element" + options.id)
                .on("click.singleSelect", function (d, i) {

                    let overlapFlag = false
                    let normalColor = d3.select(this).style("fill")
                    for (let element of selectedData) {
                        if (d == element) {
                            overlapFlag = true

                            restoreColor(chartEl, options)

                            selectedData = []

                            selData.splice(0, selData.length)

                            d.selected = false

                        }

                    }

                    if (overlapFlag == false) {

                        restoreColor(chartEl, options)
                        d3.select(this).style("fill", selectedColor)
                        selectedColor = d3.select(this).style("fill")

                        selectedData = []
                        selectedData.push(d)

                        selData.splice(0, selData.length)
                        selData.push(d)

                        d.selected = true
                    }
                    selFunc(selectedData, d, i)
                })

        } else if (method == "multiple") {//多选事件
            selectedData.splice(0, selectedData.length)
            restoreColor(chartEl, options)
            cleanSelectEvent(chartEl, options)
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
                                d.selected = false
                            }
                            count++
                        }
                        if (overlapFlag == false) {// 如果选择集中没有当前选中元素，则把元素加入选择集中
                            selectedData.push(d)
                            selData.push(d)
                            d3.select(this).style("fill", selectedColor)
                            d.selected = true
                        }
                    }
                    // console.log(selectedData)
                    selFunc(selectedData, d, i)
                })
        } else {
            console.log("wrong select method")
        }
    }

    selectOff(options) {
        // console.log(this.selectData)
        let finalData = this.selectedData
        this.selectedData.splice(0, this.selectedData.length)
        this.defaultEvents(options)
        this.cleanSelectEvent(this.chartEl, options)
        this.restoreColor(this.chartEl, options)
        return finalData
    }

    handleClickOutside(options, selData, selFunc) {
        let restoreColor = this.restoreColor
        let chartEl = this.chartEl
        let selectedData = this.selectedData
        document.getElementById(options.realType + "Container" + options.id).onclick = function (e) {
            var e = e ? e : window.event;
            var tar = e.srcElement || e.target;
            var tarClass = tar.className;
            var tarId = tar.id;
            // console.log(tarClass);
            // console.log(tarId);
            if (tarId == options.realType + "Container" + options.id) {
                // clearSelectData(options)
                selectedData.splice(0, selectedData.length)
                restoreColor(chartEl, options)
                selData.splice(0, selData.length)
                selFunc(selectedData, undefined, 0)
            }
        }
    }

    restoreColor(svg, options) {
        let chartEl = svg
        // 还原element的color
        chartEl.selectAll("." + options.type + "Element" + options.id)._groups[0].forEach(element => {
            element.style.fill = element.getAttribute("normalColor")
        });
    }

    cleanSelectEvent(svg, options) {
        let chartEl = svg
        chartEl.selectAll("." + options.type + "Element" + options.id)
            .on("click.singleSelect", null)
            .on("click.multiSelect", null)
    }

}

export { addEvents }
export { defaultEvents }
export { selectEvent }