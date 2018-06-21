import * as d3 from 'd3'

let commonOpt
let data

function handleLineData(opt) {
    if ("category" in opt.data[0]) {
        data = d3.nest()
            .key(function (d) {
                return d.category
            }).entries(opt.data)
        data.category = []
        data.forEach(element => {
            element.values.sort(sortNumber)
            data.category.push(element.key)
        })
    } else {
        data = []
        data[0] = { "key": 0, "values": opt.data }
        data[0].values.sort(sortNumber)
        data.category = ["0"]
    }

    if (opt.data.map(function (d) { return d.key }).length > 5 && opt.axisBox.xAxis.type == "discrete") {
        opt.axisBox.xAxis.fontRotate = "auto"
    }

    return data
}

function handleLineHoriData(opt) {
    let keys = []
    let values = []
    data = opt.data
    data.forEach(element => {
        let key = element.key
        let value = element.value

        keys.push(key)
        values.push(value)


    });

    return { "key": keys, "value": values }
}

function sortNumber(a, b) {
    return a.key - b.key
}
export { handleLineData, handleLineHoriData }