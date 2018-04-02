import * as d3 from 'd3';

var commonOpt;
var data;
var key = [];
var value = [];

function handleBarData(opt) {
    commonOpt = opt;
    // 绑定数据
    data = commonOpt.data;
    for (var i = 0; i < data.length; i++) {
        key.push(data[i].key);
    }
    for (var i = 0; i < data.length; i++) {
        value.push(data[i].value);
    }
    var dataset = { "key": key, "value": value };
    return dataset;
}

function handleGroupedBarData(opt) {
    commonOpt = opt;
    data = commonOpt.data;
    var primaryItem, secondaryItem;
    primaryItem = data.map(function (d) { return d.State });
    var secondaryItem = Object.keys(data[0]);
    secondaryItem.splice(0, 1);

    return { "primary": primaryItem, "secondary": secondaryItem };
}


export { handleBarData, handleGroupedBarData }