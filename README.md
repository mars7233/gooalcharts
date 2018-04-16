# Gooalcharts

## 下载依赖&打包

Use `npm install` to install dependence and run all scripts, and build gooalcharts.js file.

## 用法

``` 
let chart = new gooalcharts.init(dom, options) 
```

## Model
<img src=http://git.soyomics.com:9000/mars/gooal-charts/raw/master/demand&design/model.png width = "300" height = "280" align = "center">

## 配置项
参数名 |是否必要 |类型            |默认值 |可选值     |是否可用    |备注
------|-------|----------------|------|----------|----------|--------
id    |是     |Number & String |无    |          |是         |
type  |是     |String          |无     |         |是         |
data  |是     |Array           |无    |          |是         |
width |是     |Number          |无    |          |是         |

### titleBox
参数名       |是否必要  |类型   |默认值    |可选值     |是否可用     |备注
------------|--------|-------|---------|----------|-----------|------
show        |否      |Bool   |true     |          |否
position    |否      |String |top      |bottom    |是
title       |否      |String |""       |          |是
font-family |否      |       |         |          |否
font-size   |否      |       |         |          |否
font-color  |否      |       |black    |          |否

### axisBox
参数名               |是否必要  |类型   |默认值    |可选值     |是否可用     |备注
--------------------|--------|-------|---------|----------|-----------|------
xAxis->show         |否      |Bool   |true     |          |否          
xAxis->position     |否      |       |bottom   |          |否
xAxis->innerPadding |否      |       |0.2      |          |否
xAxis->outPadding   |否      |       |0.1      |          |否
xAxis->title        |否      |       |""       |          |否
xAxis->font-rotate  |否      |       |0        |          |否
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

#### 参数示例
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
        "font-family": "",
        "font-size": "",
        "font-color": ""
    },
    "axisBox": {
        "xAxis": {
            "show": "",
            "position": "top/bottom",
            "innerPadding": "[0-1]",
            "outPadding": "[0-1]",
            "title": "",
            "font-rotate": "auto/custom"
        },
        "yAxis": {
            "show": "true/false",
            "data": "",
            "position": "left/right",
            "innerPadding": "[0-1]",
            "outPadding": "[0-1]",
            "title": "",
            "font-rotate": "auto/custom"
        }
    },
    "legendBox": {
        "show": "true",
        "position": "top/right/bottom",
        "color": []
    },
    "dataBox": {
        "normal-color": "",
        "selected-color": "",
        "direction": "horizontal"
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
│   │   ├── dataEvents.js
│   │   ├── gooalbar.js
│   │   ├── groupedBarView.js
│   │   ├── mouseEvents.js
│   │   ├── stackedBarView.js
│   │   └── tooltip.js
│   ├── drawLegend.js
│   ├── drawTitle.js
│   ├── gooalcharts.js
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
│   │   ├── scatterView.js
│   │   └── tooltip.js
│   └── tools
│       └── multtext.js
├── test
│   └── gooal-test.js
└── tree.md

7 directories, 36 files


```

