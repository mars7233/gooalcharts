import * as d3 from 'd3'
import { getObjFirstValue, getObjValue } from '../tools/gooalArray'
import TemplateElement from 'rollup/dist/typings/ast/nodes/TemplateElement';

function handleBarData(opt) {
    let commonOpt = opt
    // 绑定数据
    let data = commonOpt.data

    // 检验数据正确性及完整性(功能待开发)

    let keys = []
    let values = []

    data.forEach(element => {
        keys.push(element.key)
        values.push(element.value)
    });

    return { "key": keys, "value": values }
}

function handleGroupedBarData(opt) {
    let commonOpt = opt
    // 绑定数据
    let data = commonOpt.data

    // 检验数据正确性及完整性(功能待开发)

    let primaryItem = [], secondaryItem = []
    primaryItem = data.map(function (d) { return getObjFirstValue(d) })
    secondaryItem = Object.keys(data[0])
    secondaryItem.splice(0, 1)
    return { "categoryList": primaryItem, "keyList": secondaryItem }

}

function handleGroupedBarData2(opt) {
    let commonOpt = opt
    // 绑定数据
    let data = commonOpt.data

    let keys = []
    let values = []
    let categorys = []

    data.sort(function (a, b) {
        return d3.ascending(a.category, b.category)
    })

    data.forEach(element => {
        categorys.push(element.category)
        keys.push(element.key)
        values.push(element.value)
    })

    let categorySet = new Set(categorys)
    categorys = Array.from(categorySet)
    categorys.sort(function (a, b) {
        return d3.ascending(a, b)
    })

    data.category = categorys


    return { "key": keys, "value": values, "category": data.category }
}

function handleStackedBar(opt) {

    let commonOpt = opt
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
            element.category = key
            element.key = getObjFirstValue(element.data)
            element.value = value
        })
    })
    return { "categoryList": primaryItem, "keyList": secondaryItem, "value": data }
}

export { handleBarData, handleGroupedBarData, handleStackedBar, getObjFirstValue, handleGroupedBarData2 }