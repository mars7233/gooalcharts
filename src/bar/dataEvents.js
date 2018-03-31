import * as d3 from 'd3';

var commonOpt;
var data;
var name = [];
var value = [];

function handleBarData(opt) {
    commonOpt = opt;

    // 绑定数据
    data = commonOpt.data;

    for (var i = 0; i < data.length; i++) {
        name.push(data[i].name);
    }
    for (var i = 0; i < data.length; i++) {
        value.push(data[i].value);
    }

    var dataset = { "name": name, "value": value };
    return dataset;
}

function handleGroupedBarData(dom, data, opt) {
    d3.csv("./data.csv", function (d, i, columns) {
        for (var i = 1, n = columns.length; i < n; ++i) { d[columns[i]] = +d[columns[i]]; }

        return d;
    }, function (error, data) {
        // console.log(data);
        var name = data.columns.slice(1);
        console.log(name)
        drawGroupedBar(dom, data);
        return { "name": name, "data": data };
    })
}


export { handleBarData, handleGroupedBarData }