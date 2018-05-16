let defaultOptions = {
    "id": "",
    "type": "",
    "data": [],
    "width": 1000,
    "titleBox": titleDefault,
    "axisBox": axisDefault,
    "legendBox": legendDefault,
    "dataBox": dataDefault
}

let titleDefault = {
    "show": false,
    "position": "top",
    "title": "This is Title",
    "fontFamily": "Times",
    "fontSize": "21px",
    "fontColor": "#000000",
    "editable": false
}

let axisDefault = {
    "xAxis": {
        "show": true,
        "position": "bottom",
        "innerPadding": 0.2,
        "outPadding": 0.1,
        "title": "",
        "fontRotate": 0,
        "maxScale": undefined
    },
    "yAxis": {
        "show": true,
        "position": "bottom",
        "innerPadding": 0.2,
        "outPadding": 0.1,
        "title": "",
        "fontRotate": 0,
        "maxScale": undefined
    }
}

let legendDefault = {
    "show": false,
    "position": "right",
    "title": "This is legend title",
    "icon": {
        "type": "square",
        "x": "18",
        "y": "",
        "r": "9"
    }
}

let dataDefault = {
    "normalColor": ['#0c6ebb', '#11bce8', '#9beffa', "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
    "hoverColor": "#A12D31",
    "selectedColor": "#A12D31",
    "direction": "vertical",
    "padWidth": 0,
    "showLabel": false
}


let optionsAdjust = function (opt) {
    // titleBox
    if ("titleBox" in opt) {
        let titleBox = opt.titleBox
        "show" in titleBox ? {} : titleBox.show = titleDefault.show
        "position" in titleBox ? {} : titleBox.position = titleDefault.position
        "title" in titleBox ? {} : titleBox.title = titleDefault.title
        "fontFamily" in titleBox ? {} : titleBox.fontFamily = titleDefault.fontFamily
        "fontSize" in titleBox ? {} : titleBox.fontSize = titleDefault.fontSize
        "fontColor" in titleBox ? {} : titleBox.fontColor = titleDefault.fontColor
        "editable" in titleBox ? {} : titleBox.editable = titleDefault.editable
    } else {
        opt.titleBox = titleDefault
    }

    // axisBox
    if ("axisBox" in opt) {
        let axisBox = opt.axisBox
        // xAxis
        if ("xAxis" in axisBox) {
            let xAxis = axisBox.xAxis
            "show" in xAxis ? {} : xAxis.show = axisDefault.xAxis.show
            "position" in xAxis ? {} : xAxis.position = axisDefault.xAxis.show
            "innerPadding" in xAxis ? {} : xAxis.innerPadding = axisDefault.xAxis.innerPadding
            "outPadding" in xAxis ? {} : xAxis.outPadding = axisDefault.xAxis.outPadding
            "title" in xAxis ? {} : xAxis.title = ""
            "fontRotate" in xAxis ? {} : xAxis.fontRotate = axisDefault.xAxis.fontRotate
            "maxScale" in xAxis ? {} : xAxis.maxScale = axisDefault.xAxis.maxScale
        } else {
            opt.axisBox.xAxis = axisDefault.xAxis
        }
        // yAxis
        if ("yAxis" in axisBox) {
            let yAxis = axisBox.yAxis
            "show" in yAxis ? {} : yAxis.show = axisDefault.yAxis.show
            "position" in yAxis ? {} : yAxis.position = axisDefault.yAxis.show
            "innerPadding" in yAxis ? {} : yAxis.innerPadding = axisDefault.yAxis.innerPadding
            "outPadding" in yAxis ? {} : yAxis.outPadding = axisDefault.yAxis.outPadding
            "title" in yAxis ? {} : yAxis.title = ""
            "fontRotate" in yAxis ? {} : yAxis.fontRotate = axisDefault.yAxis.fontRotate
            "maxScale" in yAxis ? {} : yAxis.maxScale = axisDefault.yAxis.maxScale
        } else {
            opt.axisBox.yAxis = axisDefault.yAxis
        }

    } else {
        opt.axisBox = axisDefault
    }

    // legendBox
    if ("legendBox" in opt) {
        let legendBox = opt.legendBox
        "show" in legendBox ? {} : legendBox.show = legendDefault.show
        "position" in legendBox ? {} : legendBox.position = legendDefault.position
        "title" in legendBox ? {} : legendBox.title = legendDefault.title
        if ("icon" in legendBox) {
            let icon = opt.legendBox.icon
            "type" in icon ? {} : icon.type = legendDefault.icon.type
            "x" in icon ? {} : icon.x = legendDefault.icon.x
            "y" in icon ? {} : icon.y = legendDefault.icon.y
            "r" in icon ? {} : icon.r = legendDefault.icon.r
        } else {
            opt.icon = legendDefault.icon
        }
    } else {
        opt.legendBox = legendDefault
    }

    // dataBox
    if ("dataBox" in opt) {
        let dataBox = opt.dataBox
        "normalColor" in dataBox ? {} : dataBox.normalColor = dataDefault.normalColor
        "hoverColor" in dataBox ? {} : dataBox.hoverColor = dataDefault.hoverColor
        "selectedColor" in dataBox ? {} : dataBox.selectedColor = dataDefault.selectedColor
        "direction" in dataBox ? {} : dataBox.direction = dataDefault.direction
        "padWidth" in dataBox ? {} : dataBox.padWidth = dataDefault.padWidth
        "showLabel" in dataBox ? {} : dataBox.showLabel = dataDefault.showLabel
    } else {
        opt.dataBox = dataDefault
    }
}

export default class GooalOptions {
    constructor(opt) {
        this.status = true
        this.options = opt
        optionsAdjust(opt)
        return status
    }

    optionsExport() {
        return this.options
    }


}