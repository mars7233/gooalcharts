import * as d3 from 'd3'
import { getObjFirstValue, getObjValue } from '../tools/gooalArray';

let commonOpt
let data

function handleLineData(opt) {
    commonOpt = opt
    // 绑定数据
    data = commonOpt.data

    var dataSet = []
    data.forEach(element => {
        let x = getObjValue(0, element)
        let y = getObjValue(1, element)
        var d = []
        d.push(x)
        d.push(y)
        dataSet.push(d)
    });

    dataSet.sort(function (a, b) {
        return a[0] - b[0]
    });

    let ds = []
    dataSet.forEach(element => {
        var x = element[0]
        var y = element[1]
        ds.push({ "x": x, "y": y })

    });

    return ds
}

function handleCurveLineData(opt) {
    commonOpt = opt
    // 绑定数据
    data = commonOpt.data

    var dataSet = []
    data.forEach(element => {
        let x = getObjValue(0, element)
        let y = getObjValue(1, element)
        var d = []
        d.push(x)
        d.push(y)
        dataSet.push(d)
    });

    dataSet.sort(function (a, b) {
        return a[0] - b[0]
    });

    let ds = []
    dataSet.forEach(element => {
        var x = element[0]
        var y = element[1]
        ds.push({ "x": x, "y": y })

    });

    return ds
}

function handleGroupedLineData(opt) {
    commonOpt = opt

    // 绑定数据
    data = commonOpt.data
    let primaryItem = [], secondaryItem = []
    primaryItem = data.map(function (d) { return getObjFirstValue(d) })
    
    let d_1 = []
    let d_2 = []
    let d_3 = []
    data.forEach(element => {
        d_1.push(getObjValue(1, element))
        d_2.push(getObjValue(2, element))
        d_3.push(getObjValue(3, element))
    })
    let dataList = [d_1, d_2, d_3]
    secondaryItem = Object.keys(data[0])
    secondaryItem.splice(0, 1)
    return { "categoryList": primaryItem, "keyList": secondaryItem, "dataList": dataList }
}
export { handleLineData, handleCurveLineData, handleGroupedLineData, getObjFirstValue }