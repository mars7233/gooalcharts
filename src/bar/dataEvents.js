import * as d3 from 'd3'
import { getObjFirstValue, getObjValue } from '../tools/gooalArray'
import TemplateElement from 'rollup/dist/typings/ast/nodes/TemplateElement';

let commonOpt
let data

function handleBarData(opt) {
    commonOpt = opt
    // 绑定数据
    data = commonOpt.data

    // 检验数据正确性及完整性(功能待开发)

    let keys = []
    let values = []

    data.forEach(element => {
        let key = getObjValue(0, element)
        let value = getObjValue(1, element)

        keys.push(key)
        values.push(value)
    });

    return { "key": keys, "value": values }
}

function handleGroupedBarData(opt) {
    commonOpt = opt
    // 绑定数据
    data = commonOpt.data

    // 检验数据正确性及完整性(功能待开发)

    let primaryItem = [], secondaryItem = []
    primaryItem = data.map(function (d) { return getObjFirstValue(d) })
    secondaryItem = Object.keys(data[0])
    secondaryItem.splice(0, 1)
    return { "primary": primaryItem, "secondary": secondaryItem }

}

function handleGroupedBarData2(opt) {
    commonOpt = opt
    // 绑定数据
    data = commonOpt.data

    /*// 检验数据正确性及完整性(功能待开发)

    let keys = []
    let values = []
    let categories = []

    data.forEach(element => {
        let key = getObjValue(1, element)
        let value = getObjValue(2, element)

        keys.push(key)
        values.push(value)
        
    });*/
    let keys = []
    let values = []

    data.forEach(element => {
        let key = getObjValue(1, element)
        let value = getObjValue(2, element)

        keys.push(key)
        values.push(value)
    })
    let primaryKey, primaryItem
    primaryKey = Object.keys(data[0])
    primaryItem = data.map(function (d) { return getObjFirstValue(d) })

    if (Object.keys(data[0] == 3)) {
        let set = new Set(primaryItem)
        data.category = Array.from(set)
    }
    return { "key": keys, "value": values, "category":data.category }
}

function handleStackedBar(opt) {

    commonOpt = opt
    // 绑定数据
    let dataset = commonOpt.data

    // 检验数据正确性及完整性(功能待开发)

    let primaryItem, secondaryItem
    primaryItem = dataset.map(function (d) { return getObjFirstValue(d) })
    secondaryItem = Object.keys(dataset[0])
    secondaryItem.splice(0, 1)

    let stack = d3.stack()
        .keys(secondaryItem)
        .offset(d3.stackOffsetDiverging)

    let data = stack(dataset)
    data.forEach(element => {
        let key = element.key
        element.forEach(element => {
            let value = element[1] - element[0]
            element.key = key
            element.value = value
            element.primaryItem = getObjFirstValue(element.data)
        })
    })

    return { "primary": primaryItem, "secondary": secondaryItem, "value": data }
}

export { handleBarData, handleGroupedBarData, handleStackedBar, getObjFirstValue,handleGroupedBarData2 }