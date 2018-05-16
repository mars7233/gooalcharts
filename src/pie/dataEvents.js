import * as d3 from 'd3'
import { getObjFirstValue } from '../tools/gooalArray'

let commonOpt
let data

function handlePieData(opt) {
    commonOpt = opt
    data = commonOpt.data

    let pie = d3.pie()
        .sort(null)
        .value(function (d) { return d.value })(data)

    let keys = []
    let sum = d3.sum(pie, function (d) {
        return d.value
    })

    pie.forEach(element => {
        let key = getObjFirstValue(element.data)
        let percent = element.value / sum
        element.key = key
        element.percent = percent
        keys.push(key)
    })
    pie.keys = keys
    return pie

}

export { handlePieData }