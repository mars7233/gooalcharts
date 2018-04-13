import * as d3 from 'd3'
import { getObjFirstValue } from '../tools/gooalArray'

var commonOpt
var data

function handleScatterData(opt) {
    commonOpt = opt
    data = commonOpt.data

    var key = []
    var value = []

    var primaryKey, primaryItem
    primaryKey = Object.keys(data[0])
    primaryItem = data.map(function (d) { return getObjFirstValue(d) })

    if (Object.keys(data[0] == 3)) {
        var set = new Set(primaryItem)
        data.category = Array.from(set)
    }

    return data

}

export { handleScatterData }