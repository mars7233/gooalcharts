import * as d3 from 'd3'
import { getObjValue } from '../tools/gooalArray';
import { getObjFirstValue as first, getObjKey } from '../tools/gooalArray';

let width = 800
let height = 400
let lineSVG
let tooltip
let xScale_0, xScale_1, yScale
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    if ("axisBox" in options) {
        axisBox = options.axisBox
    }
    if ("dataBox" in options) {
        dataBox = options.dataBox
    }
}

function drawGroupedLine(dom, data, opt, newWidth) {
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }
    if (newWidth != undefined) {
        width = newWidth
    }

    lineSVG = dom
    readConfig(opt)

    if ("axisBox" in commonOpt) {
        let axisBox = commonOpt.axisBox
        if ("yAxis" in axisBox)
            if ("title" in axisBox.yAxis) {
                margin.left = margin.left + 20
            }
        if ("xAxis" in axisBox) {
            if ("title" in axisBox.xAxis) {
                margin.bottom = margin.bottom + 20
            }
        }
    }

    let primaryItem, secondaryItem
    primaryItem = data.categoryList
    secondaryItem = data.keyList

    // 比例尺
    let xMaxScale, yMaxScale
    if ("xAxis" in axisBox && "maxScale" in axisBox.xAxis) {
        xMaxScale = axisBox.xAxis.maxScale
    }
    if ("yAxis" in axisBox && "maxScale" in axisBox.yAxis) {
        yMaxScale = axisBox.yAxis.maxScale
    }
    // console.log(secondaryItem)
    yScale = d3.scaleLinear()
                .domain([0, yMaxScale || d3.max(opt.data, function (d) {
                    return d3.max(secondaryItem, function (key) {
                        return d[key]
                    })
                })])
                .range([height - margin.bottom - margin.top, 0])
    
                
    let zScale = d3.scaleOrdinal()
                .range(['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])
    
    // 隐形坐标轴测坐标宽度
    let hideYAxis = lineSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left
    
    xScale_0 = d3.scaleBand()
                .domain(primaryItem)
                .range([0, width - margin.right - margin.left])
                // .paddingInner(0.2)
                // .paddingOuter(0.1)
    
    xScale_1 = d3.scaleBand()
                .domain(secondaryItem)
                .range([0, xScale_0.bandwidth()])
                .paddingInner(0.2)
    console.log(xScale_0.bandwidth())
               
    // 线生成器
    
    let groupedline_generator1 = d3.line()
        .x(function (d, i) {
            return xScale_0(primaryItem[i])
        })
        .y(function (d, i) {
            return yScale(d.Beijing)
        })
   
    let groupedline_generator2 = d3.line()
        .x(function (d, i) {
            return xScale_0(primaryItem[i])
        })
        .y(function (d, i) {
            return yScale(d.Shanghai)
        })
    
    let groupedline_generator3 = d3.line()
        .x(function (d, i) {
            return xScale_0(primaryItem[i])
        })
        .y(function (d, i) {
            return yScale(d.Guangzhou)
        })
    // console.log(opt.data)
    console.log(opt.data)
    console.log(data)
    
    // 绘制数据
    lineSVG.append("path")
        .attr("d", groupedline_generator1(opt.data))
        .attr("fill", "none")
        .attr("stroke", function(d) {
            return zScale(0)
        })
        .attr("stroke-width", "2px")
        .attr("transform", "translate(" + (xScale_0.bandwidth()-margin.right) + ", " + margin.top + ")")
    
    // 添加圆点
    lineSVG.selectAll("circle")
        .data(opt.data)
        .enter()
        .append("svg:circle")
        .attr("cx", function (d, i) {
            return xScale_0(primaryItem[i])
        })
        .attr("cy", function (d) {
            return yScale(d.Beijing)
        })
        .attr("transform", "translate(" + (xScale_0.bandwidth()-margin.right) + ", " + margin.top + ")")
        .attr("r", 5)
        .attr("fill", function(d) {
            return zScale(0)
        })
        
    lineSVG.append("path")
        .attr("d", groupedline_generator2(opt.data))
        .attr("fill", "none")
        .attr("stroke", function(d) {
            return zScale(1)
        })
        .attr("stroke-width", "2px")
        .attr("transform", "translate(" + (xScale_0.bandwidth()-margin.right) + ", " + margin.top + ")")
    
    // 添加圆点
    lineSVG.append("g")
        .selectAll("circle")
        .data(opt.data)
        .enter()
        .append("svg:circle")
        .attr("cx", function (d, i) {
            return xScale_0(primaryItem[i])
        })
        .attr("cy", function (d) {
            return yScale(d.Shanghai)
        })
        .attr("transform", "translate(" + (xScale_0.bandwidth()-margin.right) + ", " + margin.top + ")")
        .attr("r", 5)
        .attr("fill", function(d) {
            return zScale(1)
        })

    lineSVG.append("path")
        .attr("d", groupedline_generator3(opt.data))
        .attr("fill", "none")
        .attr("stroke", function (d) {
            return zScale(2)
        })
        .attr("stroke-width", "2px")
        .attr("transform", "translate(" + (xScale_0.bandwidth()-margin.right) + ", " + margin.top + ")")
    
    // 添加圆点
    lineSVG.append("g")
        .selectAll("circle")
        .data(opt.data)
        .enter()
        .append("svg:circle")
        .attr("cx", function (d, i) {
            return xScale_0(primaryItem[i])
        })
        .attr("cy", function (d) {
            return yScale(d.Guangzhou)
        })
        .attr("transform", "translate(" + (xScale_0.bandwidth()-margin.right) + ", " + margin.top + ")")
        .attr("r", 5)
        .attr("fill", function(d) {
            return zScale(2)
        })
    
    

    return { 'svg': lineSVG, "margin": margin, "xScale": xScale_0, "yScale": yScale }
}

export default function (dom, data, opt, newWidth) {
    return drawGroupedLine(dom, data, opt, newWidth)
}