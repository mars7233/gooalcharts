import * as d3 from 'd3';

var commonOpt;
var data;


function handleBarData(opt) {
    commonOpt = opt;
    // 绑定数据
    data = commonOpt.data;

    // 检验数据正确性及完整性(功能待开发)

    var key = [];
    var value = [];

    for (var i = 0; i < data.length; i++) {
        key.push(data[i].key);
    }
    for (var i = 0; i < data.length; i++) {
        value.push(data[i].value);
    }
    return { "key": key, "value": value };
}

function handleGroupedBarData(opt) {
    commonOpt = opt;
    // 绑定数据
    data = commonOpt.data;

    // 检验数据正确性及完整性(功能待开发)

    var primaryItem, secondaryItem;
    primaryItem = data.map(function (d) { return getObjFirstValue(d) });
    var secondaryItem = Object.keys(data[0]);
    secondaryItem.splice(0, 1);
    return { "primary": primaryItem, "secondary": secondaryItem };

}

function handleStackedBar(opt) {

    commonOpt = opt;
    // 绑定数据
    var dataset = commonOpt.data;

    // 检验数据正确性及完整性(功能待开发)

    var primaryItem, secondaryItem;
    primaryItem = dataset.map(function (d) { return d.month });
    var secondaryItem = Object.keys(dataset[0]);
    secondaryItem.splice(0, 1);

    var stack = d3.stack()
        .keys(secondaryItem)
        .offset(d3.stackOffsetDiverging);

    var data = stack(dataset);
    data.forEach(element => {
        var key = element.key;
        element.forEach(element => {
            var value = element[1] - element[0]
            element.key = key;
            element.value = value;
            element.primaryItem = getObjFirstValue(element.data);
        });
    });

    return { "primary": primaryItem, "secondary": secondaryItem, "value": data };
}

function getObjFirstValue(element) {
    return element[Object.keys(element)[0]];
}
export { handleBarData, handleGroupedBarData, handleStackedBar, getObjFirstValue }