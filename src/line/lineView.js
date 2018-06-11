import * as d3 from 'd3'
import FunctionDeclaration from 'rollup/dist/typings/ast/nodes/FunctionDeclaration';

let width = 800
let height = 400
let lineSVG
let tooltip
let xScale, yScale
let xMaxScale, yMaxScale
let xMinScale, yMinScale
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
    dataBox = options.dataBox
    xMaxScale = axisBox.xAxis.maxScale
    yMaxScale = axisBox.yAxis.maxScale
    xMinScale = axisBox.xAxis.minScale
    yMinScale = axisBox.yAxis.minScale
}

function drawLine(dom, data, opt, layout) {
    let margin = layout.margin
    width = layout.data.width
    height = layout.data.height
    lineSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}
    axisBox.yAxis.title != "" ? margin.left = margin.left + 20 : {}

    // 比例尺
    yScale = d3.scaleLinear()
        .domain([yMinScale || d3.min(opt.data, function (d) {
            return d.value
        }), yMaxScale || d3.max(opt.data, function (d) {
            return d.value
        })])
        .range([height - margin.bottom - margin.top, 0])

    let zScale = d3.scaleOrdinal()
        .domain(data.category)
        .range(dataBox.normalColor)

    drawFakeDataBox(commonOpt)
    let fakeAxis = d3.select("." + opt.type + "FakeAxisBox" + opt.id)

    //隐形坐标轴测坐标宽度
    let hideYAxis = fakeAxis.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    if (axisBox.xAxis.type == "discrete") {
        console.log(data)
        xScale = d3.scalePoint()
            .domain(opt.data.map(function (d) {
                return d.key
            }))
            .range([0, width - margin.right - margin.left])

    } else {
        xScale = d3.scaleLinear()
            .domain([xMinScale || d3.min(opt.data, function (d) {
                return d.key
            }), xMaxScale || d3.max(opt.data, function (d) {
                return d.key
            })])
            .range([0, width - margin.right - margin.left])

    }


    // 线生成器
    let lineGenerator = d3.line()
        .x(function (d) {
            return xScale(d.key)
        })
        .y(function (d) {
            return yScale(d.value)
        })
        .curve(d3.curveMonotoneX)

    // 绘制数据
    data.forEach(element => {
        lineSVG.append("path")
            .attr("class", commonOpt.type + "Path" + commonOpt.id)
            .attr("d", lineGenerator(element.values))
            .attr("fill", "none")
            .attr("normalColor", function (d) {
                zScale(element.key)
            })
            .attr("stroke", function (d) {
                return zScale(element.key)
            })
            .attr("stroke-width", "2px")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
    })

    // 添加圆点
    lineSVG.selectAll("circle")
        .data(opt.data)
        .enter()
        .append("svg:circle")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("cx", function (d, i) {
            let cx = d.key
            return xScale(cx)
        })
        .attr("cy", function (d) {
            let cy = d.value
            return yScale(cy)
        })
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("r", commonOpt.dataBox.radius)
        .attr("normalColor", function (d) {
            if ("category" in d)
                return zScale(d.category)
            else
                return zScale(0)
        })
        .attr("fill", function (d) {
            if ("category" in d)
                return zScale(d.category)
            else
                return zScale(0)

        })

    d3.select(".deletesoon").remove()

    return { 'svg': lineSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
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
    return drawLine(dom, data, opt, layout)
}