import * as d3 from 'd3'

let width = 800
let height = 400
let scatterSVG
let xScale, yScale
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
    dataBox = options.dataBox
}


function drawScatter(dom, data, opt, layout) {
    let margin = layout.margin
    width = layout.data.width
    height = layout.data.height

    scatterSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}
    axisBox.yAxis.title != "" ? margin.left = margin.left + 20 : {}

    // 比例尺
    let xMaxScale, yMaxScale
    let xMinScale, yMinScale
    xMaxScale = axisBox.xAxis.maxScale
    yMaxScale = axisBox.yAxis.maxScale
    xMinScale = axisBox.xAxis.minScale
    yMinScale = axisBox.yAxis.minScale

    yScale = d3.scaleLinear()
        .domain([yMinScale || d3.min(data, function (d) {
            return d.value
        }), yMaxScale || d3.max(data, function (d) {
            return d.value
        })])
        .range([height - margin.bottom - margin.top, 0])

    let colorScale = d3.scaleOrdinal()
        .range(dataBox.normalColor)

    drawFakeDataBox(commonOpt)
    let fakeAxis = d3.select("." + opt.type + "FakeAxisBox" + opt.id)

    //隐形坐标轴测坐标宽度
    let hideYAxis = fakeAxis.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    hideYAxis.selectAll("text")
        .attr("font-size", "12px")
    hideYAxis.selectAll("text")
        .each(function (d, i) {
            if (d.length > commonOpt.axisBox.yAxis.maxStringLength) {
                this.innerHTML = String(d).slice(0, commonOpt.axisBox.yAxis.maxStringLength) + "..."
            }
        })
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    if (axisBox.xAxis.type == "discrete") {
        xScale = d3.scalePoint()
            .domain(data.map(function (d) {
                return d.key
            }))
            .range([0, width - margin.right - margin.left])
    } else {
        xScale = d3.scaleLinear()
            .domain([xMinScale || d3.min(data, function (d) {
                return d.key
            }), xMaxScale || d3.max(data, function (d) {
                return d.key
            })])
            .range([0, width - margin.right - margin.left])
    }


    scatterSVG.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("r", dataBox.radius)
        .attr("cx", function (d) { return margin.left + xScale(d.key) })
        .attr("cy", function (d) { return margin.top + yScale(d.value) })
        .style("fill", function (d) {
            if ("category" in d) return colorScale(d.category)
            else return colorScale(1)
        })
        .attr("normalColor", function (d) {
            if ("category" in d) return colorScale(d.category)
            else return colorScale(1)
        })

    d3.select(".deletesoon").remove()
    return { "svg": scatterSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

function drawFakeDataBox(opt) {
    let fake = d3.select("body")
        .append("svg")
        .attr("class", "deletesoon")
        .attr("width", 0)
        .attr("height", 0)
        .append("svg")
        .attr("class", opt.type + "FakeAxisBox" + opt.id)
        .attr("width", opt.layout.data.width)
        .attr("height", opt.layout.data.height)
    // .attr("opacity", 0)
}

export default function (dom, data, opt, layout) {
    return drawScatter(dom, data, opt, layout)
}