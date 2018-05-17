![npm](https://img.shields.io/npm/v/npm.svg) ![babel](https://img.shields.io/badge/babel-v6.26-blue.svg) ![d3](https://img.shields.io/badge/d3-v4.13-blue.svg) ![rollup](https://img.shields.io/badge/rollup-v0.57-blue.svg) ![uglify-js](https://img.shields.io/badge/uglifyjs-v2.8-blue.svg)
# Gooalcharts

## 下载依赖&打包

Use `npm install` to install dependence and run all scripts, and build gooalcharts.js file.

## 用法

``` 
//柱形图
let barchart = new gooalcharts.barInit(dom, options) 

//饼图
let piechart = new gooalcharts.pieInit(dom, options) 

//散点图
let scatterchart = new gooalcharts.scatterInit(dom, options)
```

## Model
![](http://git.soyomics.com:9000/mars/gooal-charts/raw/master/demand&design/model.png)

## 配置项
参数名 |是否必要 |类型            |默认值 |可选值     |是否可用    |描述
------|-------|----------------|------|----------|----------|--------
id    |是     |Number & String |无    |          |是         |
type  |是     |String          |无     |         |是         |
data  |是     |Array           |无    |          |是         |
width |是     |Number          |无    |          |是         |

>#### data格式：
>*  柱状图
>       * 普通柱状图（barchart）:  `{ "key": key, "value": value } `
>       * 分组柱状图（groupedbar）:  `{ "primiarykey": Key, "secondarykey1": value, "secondarykey2": value2 , ...} `
>       * 分组柱状图2（groupedbar2）：`{ "category": category,"key": key,"value": value}`
>       * 堆叠柱状图（stackedbar）: `{ "primiarykey": Key, "secondarykey1": value, "secondarykey2": value2 , ...} `
>* 饼图（piechart）:   `{ "key": key, "value": value } `
>* 散点图（scatterbar）:  `{ "category": category, "key": key, "value": value } `

### titleBox
参数名       |是否必要  |类型   |默认值    |可选值     |是否可用     |描述
------------|--------|-------|---------|----------|-----------|------
show        |否      |Bool   |true     |          |是           |标题是否显示
position    |否      |String |top      |bottom    |是           |标题的位置，top或者bottom
title       |否      |String |""       |          |是           |标题的文字
fontFamily  |否      |String |"Times"  |          |是           |标题的字体
fontSize    |否      |String |"21px"   |          |是           |标题字体的大小
fontColor   |否      |String |"#000000"|          |是           |标题字体的颜色
editable    |否      |Bool   |false    |          |是           |标题是否可编辑

### axisBox
参数名               |是否必要  |类型          |默认值    |可选值     |是否可用     |描述
--------------------|--------|--------------|---------|----------|-----------|------
xAxis->show         |否      |Bool          |true     |          |否         |坐标轴是否显示          
xAxis->position     |否      |String        |bottom   |          |否         |坐标轴的位置
xAxis->innerPadding |否      |Number        |0.2      |          |否         |柱状图inner间距
xAxis->outPadding   |否      |Number        |0.1      |          |否         |柱状图out间距
xAxis->title        |否      |String        |""       |          |是         |坐标轴标题
xAxis->fontRotate   |否      |Strin & Number|0        |"auto"    |是         |坐标轴刻度旋转
xAxis->maxScale     |否      |Number        |data.max |          |是         |坐标轴最大值
xAxis->minScale     |否      |Number        |data.max |          |是         |坐标轴最小值
>备注：y轴参数与x轴参数一样

### legendBox
参数名       |是否必要  |类型   |默认值    |可选值     |是否可用     |描述
------------|--------|-------|---------|----------|-----------|------
show        |否      |Bool   |false    |true      |是         |图例是否显示
position    |否      |String |right    |          |否         |图例的位置
title       |否      |String |""       |          |是         |图例的标题
icon->type  |否      |String |square   |          |是         |图例的样式
icon->x     |否      |Number |18       |          |是         |图例的长度
icon->y     |否      |Number |         |          |是         |图例的宽度（若无y则为正方形）

icon->r     |否      |Number |9        |          |是         |图例的半径

### dataBox
参数名                |是否必要  |类型   |默认值    |可选值     |是否可用     |描述
---------------------|--------|-------|---------|----------|-----------|------
normalColor          |否      |Array  |         |          |否          |图表数据的绘制颜色
hoverColor           |否      |String |#A12D31  |          |否          |图表数据的悬浮颜色
selectedColor        |否      |String |#A12D31  |          |否          |图表数据被选择时的颜色
direction            |否      |String |vertical |horizontal|是          |柱状图的方向
padWidth             |否      |Number |0        |          |是          |饼状图的padding宽度
showLabel            |否      |Bool   |false    |          |是          |饼状图的百分比label
radius               |否      |Number |3        |          |是         |散点图的半径
hoverRadius          |否      |Number |等于raidus|          |是         |散点图的悬浮半径在没有设置的情况下，默认等于半径

#### common-options参数示例
```
{
    "id": "8",
    "type": "groupedbar",
    "data": [],
    "width": 1000,
    "height": 450,
    "titleBox": {
        "show": false,
        "position": "top",
        "title": "This is Title",
        "fontFamily": "Times",
        "fontSize": "21px",
        "fontColor": "#000000",
        "editable": false
    },
    "axisBox": {
        "xAxis": {
            "show": true,
            "position": "bottom",
            "innerPadding": 0.2,
            "outPadding": 0.1,
            "title": "",
            "fontRotate": 0,
            "maxScale": undefined,
            "minScale": undefined
        },
        "yAxis": {
            "show": true,
            "position": "bottom",
            "innerPadding": 0.2,
            "outPadding": 0.1,
            "title": "",
            "fontRotate": 0,
            "maxScale": undefined,
            "minScale": undefined
        }
    },
    "legendBox": {
        "show": false,
        "position": "right",
        "title": "This is legend title",
        "icon": {
            "type": "square",
            "x": "18",
            "y": "",
            "r": "9"
        }
    },
    "dataBox": {
        "normalColor": ['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
        "hoverColor": "#A12D31",
        "selectedColor": "#A12D31",
        "direction": "vertical",
        "padWidth": 0,                  
        "showLabel": false,     
        "radius": 3,
        "hoverRadius":3
    }
}
```


## Project File Tree
```
.
├── README.md
├── build
│   ├── gooalcharts.js
│   └── gooalcharts.min.js
├── common-options.json
├── index.html
├── package-lock.json
├── package.json
├── rollup.config.js
├── src
│   ├── bar
│   │   ├── barPresenter.js
│   │   ├── barView.js
│   │   ├── barViewHorizon.js
│   │   ├── dataEvents.js
│   │   ├── gooalbar.js
│   │   ├── groupedBarView.js
│   │   ├── groupedBarViewHorizon.js
│   │   ├── mouseEvents.js
│   │   ├── stackedBarView.js
│   │   └── stackedBarViewHorizon.js
│   ├── drawAxis.js
│   ├── drawLegend.js
│   ├── drawTitle.js
│   ├── gooalcharts.js
│   ├── gooaltooltip.js
│   ├── init.js
│   ├── main.js
│   ├── pie
│   │   ├── dataEvents.js
│   │   ├── gooalpie.js
│   │   ├── mouseEvents.js
│   │   ├── piePresenter.js
│   │   ├── pieView.js
│   │   └── tooltip.js
│   ├── scatter
│   │   ├── dataEvents.js
│   │   ├── gooalscatter.js
│   │   ├── mouseEvents.js
│   │   ├── scatterPresenter.js
│   │   └── scatterView.js
│   ├── tools
│   │   ├── gooalArray.js
│   │   └── multtext.js
│   └── tooltip.js
├── test
│   └── gooal-test.js
└── tree.md

7 directories, 41 files

```

