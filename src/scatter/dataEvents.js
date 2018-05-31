import * as d3 from 'd3'
import { getObjFirstValue, getObjKey, getObjValue } from '../tools/gooalArray'

let data

function handleScatterData(opt) {
    data = opt.data

    let primaryKey, primaryItem
    primaryKey = Object.keys(data[0])
    primaryItem = data.map(function (d) { return getObjFirstValue(d) })

    if (Object.keys(data[0]).length == 3) {
        let set = new Set(primaryItem)
        data.category = Array.from(set)
    } else {
        data.category = [0]
    }

    return data

}

function handleBubbleData(opt) {
    data = opt.data
    let keys = Object.keys(data[0])

    if (Object.keys(data[0] == 4)) {

        let category1 = new Set(data.map(function (d) { return getObjValue(0, d) }))
        let category2 = new Set(data.map(function (d) { return getObjValue(1, d) }))
        data.category1 = Array.from(category1)
        data.category2 = Array.from(category2)
    }
    return data

}

export { handleScatterData, handleBubbleData }