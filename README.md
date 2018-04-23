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
参数名 |是否必要 |类型            |默认值 |可选值     |是否可用    |备注
------|-------|----------------|------|----------|----------|--------
id    |是     |Number & String |无    |          |是         |
type  |是     |String          |无     |         |是         |
data  |是     |Array           |无    |          |是         |
width |是     |Number          |无    |          |是         |

>#### data格式：
>*  柱状图
>       * 普通柱状图（barchart）:  `{ "key": key, "value": value } `
>       * 分组柱状图（groupedbar）:  `{ "primiarykey": Key, "secondarykey1": value, "secondarykey2": value2 , ...} `
>       * 堆叠柱状图（stackedbar）: `{ "primiarykey": Key, "secondarykey1": value, "secondarykey2": value2 , ...} `
>* 饼图（piechart）:   `{ "key": key, "value": value } `
>* 散点图（scatterbar）:  `{ "category": category, "key": key, "value": value } `

### titleBox
参数名       |是否必要  |类型   |默认值    |可选值     |是否可用     |备注
------------|--------|-------|---------|----------|-----------|------
show        |否      |Bool   |true     |          |是
position    |否      |String |top      |bottom    |是
title       |否      |String |""       |          |是
fontFamily |否      |String |"Times"  |          |是
fontSize   |否      |String |"21px"   |          |是
fontColor  |否      |String |"#000000"|          |是

### axisBox
参数名               |是否必要  |类型          |默认值    |可选值     |是否可用     |备注
--------------------|--------|--------------|---------|----------|-----------|------
xAxis->show         |否      |Bool          |true     |          |否          
xAxis->position     |否      |              |bottom   |          |否
xAxis->innerPadding |否      |              |0.2      |          |否
xAxis->outPadding   |否      |              |0.1      |          |否
xAxis->title        |否      |String        |""       |          |是
xAxis->fontRotate  |否      |Strin & Number|0        |"auto"    |是
>备注：y轴参数与x轴参数一样

### legendBox
参数名       |是否必要  |类型   |默认值    |可选值     |是否可用     |备注
------------|--------|-------|---------|----------|-----------|------
show        |否      |Bool   |false    |true      |是
position    |否      |       |right    |          |否
color       |否      |数组    |         |          |否

### dataBox
参数名                |是否必要  |类型   |默认值    |可选值     |是否可用     |备注
---------------------|--------|-------|---------|----------|-----------|------
normalColor          |否      |       |         |          |否
selectedColor        |否      |       |         |          |否
direction            |否      |String |vertical |horizontal|是

#### common-options参数示例
```
{
    "id": "8",
    "type": "groupedbar",
    "data": [],
    "width": 1000,
    "titleBox": {
        "show": "true/false",
        "position": "top",
        "title": "This is a GroupedBar",
        "fontFamily": "",
        "fontSize": "",
        "fontColor": ""
    },
    "axisBox": {
        "xAxis": {
            "show": "",
            "position": "top/bottom",
            "innerPadding": "[0-1]",
            "outPadding": "[0-1]",
            "title": "",
            "fontRotate": "auto/custom"
        },
        "yAxis": {
            "show": "",
            "position": "top/bottom",
            "innerPadding": "[0-1]",
            "outPadding": "[0-1]",
            "title": "",
            "fontRotate": "auto/custom"
        }
    },
    "legendBox": {
        "show": true,
        "position": "top/right/bottom"
    },
    "dataBox": {
        "normalColor": [],
        "selectedColor": [],
        "direction": ""
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

