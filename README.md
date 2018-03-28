# Gooalcharts

## Installing & publish & test

Use `npm install` to install dependence and run all scripts, and build gooalcharts.js file.

## How to use

``` 
gooalcharts.init(dom, options) 
```

## Model
![model](http://git.soyomics.com:9000/mars/gooal-charts/raw/master/demand&design/model.png)

## Project File Tree
```
.
├── README.md         
├── build                       //最终生成的可用文件
│   ├── gooalcharts.js
│   └── gooalcharts.min.js
├── common-options.json         //公共option文件
├── demand&design
│   └── model.png
├── index.html                  
├── package-lock.json
├── package.json                //项目配置
├── rollup.config.js            //rollup配置
├── src                         //项目源码
│   ├── bar                     //柱状图
│   │   ├── barPresenter.js
│   │   ├── barView.js
│   │   ├── gooalbar.js
│   │   └── mouseEvents.js
│   ├── drawLegend.js
│   ├── drawTitle.js
│   ├── gooalcharts.js
│   ├── init.js                 //初始化方法
│   ├── main.js                 //打包入口文件
│   └── tools
│       └── multtext.js
├── test                        //
│   └── gooal-test.js
└── tree.md

```

