import * as d3 from 'd3'

var commonOpt
var data

function handlePieData(opt) {
    commonOpt = opt
    data = commonOpt.data

    var pie = d3.pie()
        .value(function (d) {
            return d.value
        })(data)

    pie.forEach(element => {
        var key = element.data.key
        element.key = key
    })

    return pie

}

export { handlePieData }