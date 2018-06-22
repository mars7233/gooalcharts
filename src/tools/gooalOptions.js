export default class GooalOptions {
    constructor(opt) {
        this.status = true
        this.options = opt
        this.optionsAdjust(opt)
        return status
    }

    optionsAdjust(opt) {
        this.defaultOptions = {
            "id": "",
            "type": "",
            "realType": "",
            "data": [],
            "width": 1000,
            "minWidth": 400,
            "height": 400,
            "minHeight": 400,
            "layout": this.layoutDefault,
            "titleBox": this.titleDEfault,
            "axisBox": this.axisDefault,
            "legendBox": this.legendDefault,
            "dataBox": this.dataDefault
        }

        this.layoutDefault = {
            // "margin": {
            //     "top": 20,
            //     "bottom": 20,
            //     "left": 20,
            //     "right": 30,
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
                "width": this.defaultOptions.width,
                // "height": 370,
            },
            "legend": {
                "x": undefined,
                "y": undefined,
                "width": undefined,
                "height": 400,
            }
        }

        this.titleDEfault = {
            "show": false,
            "width": 0,
            "height": 0,
            "position": "top",
            "title": "This is Title",
            "fontFamily": "Arial",
            "fontSize": "18px",
            "fontColor": "#000000",
            "editable": false
        }

        this.axisDefault = {
            "xAxis": {
                "show": true,
                "type": "linear",
                "position": "bottom",
                "innerPadding": 0.2,
                "outPadding": 0.1,
                "title": "",
                "fontRotate": 0,
                "maxScale": undefined,
                "minScale": undefined,
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

        this.legendDefault = {
            "show": false,
            "width": 0,
            "height": 0,
            "position": "right",
            "title": "",
            "sizeTitle": "Size Title",
            "colorTitle": "Color Title",
            "shapePadding": 6,
            "colPadding": 36,
            "icon": {
                "type": "square",
                "x": 14,
                "y": 14,
                "r": 9
            },
            "bubbleScale": []
        }

        let normalRadius, hoverRadius
        this.dataDefault = {
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
            "bubbleRadius": [5, 10],
            "maxBandWidth": 48
        }

        "width" in opt ? {} : opt.width = this.defaultOptions.width
        "height" in opt ? {} : opt.height = this.defaultOptions.height
        "minHeight" in opt ? {} : opt.minHeight = this.defaultOptions.minHeight
        "minWidth" in opt ? {} : opt.minWidth = this.defaultOptions.minWidth
        opt.realType = opt.type.concat()

        // layout
        if ("layout" in opt) {

        } else {
            opt.layout = this.layoutDefault
        }

        // titleBox
        if ("titleBox" in opt) {
            let titleBox = opt.titleBox
            "show" in titleBox ? {} : titleBox.show = this.titleDEfault.show
            "position" in titleBox ? {} : titleBox.position = this.titleDEfault.position
            "title" in titleBox ? {} : titleBox.title = this.titleDEfault.title
            "fontFamily" in titleBox ? {} : titleBox.fontFamily = this.titleDEfault.fontFamily
            "fontSize" in titleBox ? {} : titleBox.fontSize = this.titleDEfault.fontSize
            "fontColor" in titleBox ? {} : titleBox.fontColor = this.titleDEfault.fontColor
            "editable" in titleBox ? {} : titleBox.editable = this.titleDEfault.editable
        } else {
            opt.titleBox = this.titleDEfault
        }

        // axisBox
        if ("axisBox" in opt) {
            let axisBox = opt.axisBox
            // xAxis
            if ("xAxis" in axisBox) {
                let xAxis = axisBox.xAxis
                "show" in xAxis ? {} : xAxis.show = this.axisDefault.xAxis.show
                "type" in xAxis ? {} : xAxis.type = this.axisDefault.xAxis.type
                "position" in xAxis ? {} : xAxis.position = this.axisDefault.xAxis.show
                "innerPadding" in xAxis ? {} : xAxis.innerPadding = this.axisDefault.xAxis.innerPadding
                "outPadding" in xAxis ? {} : xAxis.outPadding = this.axisDefault.xAxis.outPadding
                "title" in xAxis ? {} : xAxis.title = ""
                "fontRotate" in xAxis ? {} : xAxis.fontRotate = this.axisDefault.xAxis.fontRotate
                "maxScale" in xAxis ? {} : xAxis.maxScale = this.axisDefault.xAxis.maxScale
                "minScale" in xAxis ? {} : xAxis.minScale = this.axisDefault.xAxis.minScale
            } else {
                opt.axisBox.xAxis = this.axisDefault.xAxis
            }
            // yAxis
            if ("yAxis" in axisBox) {
                let yAxis = axisBox.yAxis
                "show" in yAxis ? {} : yAxis.show = this.axisDefault.yAxis.show
                "position" in yAxis ? {} : yAxis.position = this.axisDefault.yAxis.show
                "innerPadding" in yAxis ? {} : yAxis.innerPadding = this.axisDefault.yAxis.innerPadding
                "outPadding" in yAxis ? {} : yAxis.outPadding = this.axisDefault.yAxis.outPadding
                "title" in yAxis ? {} : yAxis.title = ""
                "fontRotate" in yAxis ? {} : yAxis.fontRotate = this.axisDefault.yAxis.fontRotate
                "maxScale" in yAxis ? {} : yAxis.maxScale = this.axisDefault.yAxis.maxScale
                "minScale" in yAxis ? {} : yAxis.minScale = this.axisDefault.yAxis.minScale
            } else {
                opt.axisBox.yAxis = this.axisDefault.yAxis
            }

        } else {
            opt.axisBox = this.axisDefault
        }

        // legendBox
        if ("legendBox" in opt) {
            let legendBox = opt.legendBox
            "show" in legendBox ? {} : legendBox.show = this.legendDefault.show
            "position" in legendBox ? {} : legendBox.position = this.legendDefault.position
            "title" in legendBox ? {} : legendBox.title = this.legendDefault.title
            "sizeTitle" in legendBox ? {} : legendBox.sizeTitle = this.legendDefault.sizeTitle
            "colorTitle" in legendBox ? {} : legendBox.colorTitle = this.legendDefault.colorTitle
            "bubbleScale" in legendBox ? {} : legendBox.bubbleScale = this.legendDefault.bubbleScale
            "shapePadding" in legendBox ? {} : legendBox.shapePadding = this.legendDefault.shapePadding
            "colPadding" in legendBox ? {} : legendBox.colPadding = this.legendDefault.colPadding
            if ("icon" in legendBox) {
                let icon = opt.legendBox.icon
                "type" in icon ? {} : icon.type = this.legendDefault.icon.type
                "x" in icon ? {} : icon.x = this.legendDefault.icon.x
                "y" in icon ? {} : icon.y = this.legendDefault.icon.y
                "r" in icon ? {} : icon.r = this.legendDefault.icon.r
            } else {
                opt.legendBox.icon = this.legendDefault.icon
            }
        } else {
            opt.legendBox = this.legendDefault
        }

        // dataBox
        if ("dataBox" in opt) {
            let dataBox = opt.dataBox
            if ("normalColor" in dataBox) {

            } else {
                dataBox.normalColor = []
                this.dataDefault.normalColor.forEach(element => {
                    dataBox.normalColor.push(element)
                });
            }
            "hoverColor" in dataBox ? {} : dataBox.hoverColor = this.dataDefault.hoverColor
            "selectedColor" in dataBox ? {} : dataBox.selectedColor = this.dataDefault.selectedColor
            "direction" in dataBox ? {} : dataBox.direction = this.dataDefault.direction
            "padWidth" in dataBox ? {} : dataBox.padWidth = this.dataDefault.padWidth
            "showLabel" in dataBox ? {} : dataBox.showLabel = this.dataDefault.showLabel
            "radius" in dataBox ? {} : dataBox.radius = this.dataDefault.radius
            // hoverRadius 默认等于radius，如果赋值则为hoverRadius
            "hoverRadius" in dataBox ? dataBox.hoverRadius = this.dataDefault.hoverRadius : dataBox.hoverRadius = dataBox.radius
            "bubbleRadius" in dataBox ? {} : dataBox.bubbleRadius = this.dataDefault.bubbleRadius
            "maxBandWidth" in dataBox ? {} : dataBox.maxBandWidth = this.dataDefault.maxBandWidth
        } else {
            opt.dataBox = this.dataDefault
        }
    }

    optionsExport() {
        return this.options
    }


}