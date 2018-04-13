import * as d3 from 'd3'
import { getObjFirstValue } from '../tools/gooalArray'

let commonOpt
let data

function handlePieData(opt) {
    commonOpt = opt
    data = commonOpt.data

    let pie = d3.pie()
        .value(function (d) { return d.value })(data)

    let keys = [];

    pie.forEach(element => {
        let key = getObjFirstValue(element.data)
        element.key = key
        keys.push(key)
    })
    pie.keys = keys
    return pie

}

export { handlePieData }