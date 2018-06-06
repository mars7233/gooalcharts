export default class GooalOptions {
    constructor(opt) {
        this.status = true
        this.options = opt
        this.optionsAdjust(opt)
        return status
    }

    optionsAdjust(opt) {
        let defaultOptions = {
            "id": "",
            "type": "",
            "data": [],
            "width": 1000,
            "height": 450,
            "layout": layoutDefault,
            "titleBox": titleDefault,
            "axisBox": axisDefault,
            "legendBox": legendDefault,
            "dataBox": dataDefault
        }

        let layoutDefault = {
            // "margin": {
            //     "top": 20,
            //     "bottom": 20,
            //     "left": 20,
            //     "right": 20,
            // },
            "title": {
                "x": 0,
                "y": 0,
                "width": undefined,
                "height": 50,
            },
            "data": {
                "x": undefined,
                "y": undefined,
                "width": defaultOptions.width,
                "height": 400,
            },
            "legend": {
                "x": undefined,
                "y": undefined,
                "width": undefined,
                "height": 400,
            }
        }

        let titleDefault = {
            "show": false,
            "width": 0,
            "height": 0,
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
        }

        let legendDefault = {
            "show": false,
            "width": 0,
            "height": 0,
            "position": "right",
            "title": "This is legend title",
            "icon": {
                "type": "square",
                "x": "18",
                "y": "",
                "r": "9"
            }
        }

        let normalRadius, hoverRadius
        let dataDefault = {
            "width": 0,
            "height": 0,
            "normalColor": ["#005397", "#FACA0C", "#F3C9DD", "#0BBCD6", "#BFB5D7", "#BEA1A5", "#A6CFE2", "#371722", "#C7C6C4", "#DABAAE", "#DB9AAD", "#F1C3B8", "#EF3E4A", "#C0C2CE", "#EEC0DB", "#B6CAC0", "#C5BEAA", "#FDF06F", "#EDB5BD", "#17C37B", "#2C3979", "#1B1D1C", "#E88565", "#FFEFE5", "#F4C7EE", "#77EEDF", "#E57066", "#FBFE56", "#A7BBC3", "#3C485E", "#055A5B", "#178E96", "#D3E8E1", "#CBA0AA", "#9C9CDD", "#20AD65", "#E75153", "#4F3A4B", "#112378", "#A82B35", "#FEDCCC", "#00B28B", "#9357A9", "#C6D7C7", "#B1FDEB", "#BEF6E9", "#776EA7", "#EAEAEA", "#EF303B", "#1812D6", "#FFFDE7", "#D1E9E3", "#7DE0E6", "#3A745F", "#CE7182", "#340B0B", "#F8EBEE", "#FF9966", "#002CFC", "#75FFC0", "#FB9B2A", "#FF8FA4", "#000000", "#083EA7", "#674B7C", "#19AAD1", "#12162D", "#121738", "#0C485E", "#FC3C2D", "#864BFF", "#EF5B09", "#97B8A3", "#FFD101", "#C26B6A", "#E3E3E3", "#FF4C06", "#CDFF06", "#0C485E", "#1F3B34", "#384D9D", "#E10000", "#F64A00", "#89937A", "#C39D63", "#00FDFF", "#B18AE0", "#96D0FF", "#3C225F", "#FF6B61", "#EEB200", "#F9F7E8", "#EED974", "#F0CF61", "#B7E3E4"],
            "hoverColor": "#A12D31",
            "selectedColor": "#A12D31",
            "direction": "vertical",
            "padWidth": 0,
            "showLabel": false,
            "radius": 3,
            "hoverRadius": 10,
            "bubbleRadius": [5, 10]
        }

        "width" in opt ? {} : opt.width = 1000
        "height" in opt ? {} : opt.height = 450

        // layout
        if ("layout" in opt) {

        } else {
            opt.layout = layoutDefault
        }

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
                "minScale" in xAxis ? {} : xAxis.minScale = axisDefault.xAxis.minScale
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
                "minScale" in yAxis ? {} : yAxis.minScale = axisDefault.yAxis.minScale
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
                opt.legendBox.icon = legendDefault.icon
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
            "radius" in dataBox ? {} : dataBox.radius = dataDefault.radius
            // hoverRadius 默认等于radius，如果赋值则为hoverRadius
            "hoverRadius" in dataBox ? dataBox.hoverRadius = dataDefault.hoverRadius : dataBox.hoverRadius = dataBox.radius
            "bubbleRadius" in dataBox ? {} : dataBox.bubbleRadius = dataDefault.bubbleRadius
        } else {
            opt.dataBox = dataDefault
        }
    }

    optionsExport() {
        return this.options
    }


}