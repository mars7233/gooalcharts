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
├── README.md
├── build                      //生成目录
│   ├── gooalcharts.js     
│   └── gooalcharts.min.js
├── common-options.json        //公共接口文件
├── index.html
├── node_modules               //依赖
├── package-lock.json
├── package.json               //npm配置
├── rollup.config.js           //rollup配置
├── src                        //项目源码
│   ├── gooal-axis
│   ├── gooal-column.js
│   ├── gooalcharts.js
│   ├── init.js
│   └── main.js
└── test                       //测试
    └── gooal-test.js
```

