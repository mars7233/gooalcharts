import * as d3 from 'd3'
import { getObjFirstValue } from '../tools/gooalArray'

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
        let key, value
        ({ key, value } = element)  // 解构赋值
        keys.push(key)
        values.push(value)
    });

    // for (let i = 0; i < data.length; i++) {
    //     keys.push(data[i].key)
    // }
    // for (let i = 0; i < data.length; i++) {
    //     values.push(data[i].value)
    // }
    return { "key": keys, "value": values }
}

function handleGroupedBarData(opt) {
    commonOpt = opt
    // 绑定数据
    data = commonOpt.data

    // 检验数据正确性及完整性(功能待开发)

    let primaryItem, secondaryItem
    primaryItem = data.map(function (d) { return getObjFirstValue(d) })
    secondaryItem = Object.keys(data[0])
    secondaryItem.splice(0, 1)
    return { "primary": primaryItem, "secondary": secondaryItem }

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

export { handleBarData, handleGroupedBarData, handleStackedBar, getObjFirstValue }