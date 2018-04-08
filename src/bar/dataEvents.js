import * as d3 from 'd3';

var commonOpt;
var data;
var key = [];
var value = [];

function handleBarData(opt) {
    commonOpt = opt;
    // 绑定数据
    data = commonOpt.data;
    // 检验数据正确性及完整性
    // 功能待开发

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
    // 检验数据正确性及完整性
    // 功能待开发

    var primaryItem, secondaryItem;
    primaryItem = data.map(function (d) { return d.State });
    var secondaryItem = Object.keys(data[0]);
    secondaryItem.splice(0, 1);
    console.log({ "primary": primaryItem, "secondary": secondaryItem })
    return { "primary": primaryItem, "secondary": secondaryItem };

}

function handleStackedBar(opt) {
    var dataset = [
        { month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400 },
        { month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400 },
        { month: new Date(2015, 2, 1), apples: 640, bananas: 960, cherries: 640, dates: 400 },
        { month: new Date(2015, 3, 1), apples: 320, bananas: 480, cherries: 640, dates: 400 }
    ];
    var primaryItem, secondaryItem;
    primaryItem = dataset.map(function (d) { return d.month });
    var secondaryItem = Object.keys(dataset[0]);
    secondaryItem.splice(0, 1);

    var stack = d3.stack()
        .keys(secondaryItem)
        .offset(d3.stackOffsetDiverging);

    data = stack(dataset);
    data.forEach(element => {
        var key = element.key;
        element.forEach(element => {
            var value = element[1] - element[0]
            element.key = key;
            element.value = value;
        });
    });
    // console.log(data);

    return { "primary": primaryItem, "secondary": secondaryItem, "value": data };
}

export { handleBarData, handleGroupedBarData, handleStackedBar }