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

    let colorCategory = new Set(data.map(function (d) { return d.category1 }))
    let sizeCategory = new Set(data.map(function (d) { return d.category2 }))
    data.category = {
        "colorCategory": Array.from(colorCategory),
        "sizeCategory": Array.from(sizeCategory)
    }

    return data

}

export { handleScatterData, handleBubbleData }