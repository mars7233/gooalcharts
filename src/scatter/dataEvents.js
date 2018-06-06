import * as d3 from 'd3'

function handleScatterData(opt) {
    let data = opt.data

    let primaryKey, primaryItem
    primaryKey = Object.keys(data[0])
    primaryItem = data.map(function (d) { return d.category })

    if ("category" in opt.data[0]) {
        let set = new Set(primaryItem)
        data.category = Array.from(set)
    } else {
        data.category = [0]
    }
    return data

}

function handleBubbleData(opt) {
    let data = opt.data

    let category1 = new Set(data.map(function (d) { return d.category1 }))
    let category2 = new Set(data.map(function (d) { return d.category2 }))
    data.category1 = Array.from(category1)
    data.category2 = Array.from(category2)

    return data

}

export { handleScatterData, handleBubbleData }