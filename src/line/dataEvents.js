import * as d3 from 'd3'
import { getObjValue } from '../tools/gooalArray';

let commonOpt
let data

function handleLineData(opt) {
    commonOpt = opt
    // 绑定数据
    data = commonOpt.data

    var dataSet = []
    data.forEach(element => {
        let x = getObjValue(0, element)
        let y = getObjValue(1, element)
        var d = []
        d.push(x)
        d.push(y)
        dataSet.push(d)
    });

    dataSet.sort(function(a, b){
        return a[0] - b[0]
    });

    let ds = []
    dataSet.forEach(element => {
        var x = element[0]
        var y = element[1]
        ds.push({"x": x,"y": y})
        
    });

    return ds
}

export { handleLineData }