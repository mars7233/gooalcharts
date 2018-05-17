import * as d3 from 'd3'
import { getObjFirstValue, getObjValue, getObjFirstKey, getObjKey } from '../tools/gooalArray';

let commonOpt
let data

function handleLineData(opt) {
    commonOpt = opt
    if (Object.keys(commonOpt.data[0]).length == 3) {
        data = d3.nest()
            .key(function (d) {
                return getObjFirstValue(d)
            }).entries(commonOpt.data)
        data.category = []
        data.forEach(element => {
            getObjValue(1, element).sort(sortNumber)
            data.category.push(getObjFirstValue(element))

        })
        console.log(data)
    } else if (Object.keys(commonOpt.data[0]).length == 2) {
        data = []
        data[0] = { "key": 0, "values": commonOpt.data }
        data[0].values.sort(sortNumber)
        data.category = ["0"]
    }

    return data
}

function sortNumber(a, b) {
    return Object.keys(commonOpt.data[0]).length == 3 ? getObjValue(1, a) - getObjValue(1, b) : getObjValue(0, a) - getObjValue(0, b)
}
export { handleLineData }