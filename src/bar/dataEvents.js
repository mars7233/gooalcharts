var commonOpt;
var data;
var name = [];
var value = [];

function handleData(opt) {
    commonOpt = opt;

    // 绑定数据
    data = commonOpt.data

    for (var i = 0; i < data.length; i++) {
        name.push(data[i].name);
    }
    for (var i = 0; i < data.length; i++) {
        value.push(data[i].value);
    }

    var dataset = { "name": name, "value": value };
    return dataset;
}

export { handleData }