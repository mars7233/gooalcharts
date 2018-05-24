import * as d3 from 'd3'

export default class GooalLayout {
    constructor(opt, titleBox, dataBox, legendBox) {
        this.containerWidth = opt.width
        this.containerHeight = opt.height

        this.titleOpt = opt.titleBox
        this.legendOpt = opt.legendBox
        this.dataOpt = opt.dataBox

        this.titleBox = titleBox
        this.dataBox = dataBox
        this.legendBox = legendBox

        this.data = { "x": 0, "y": 0, "width": this.containerWidth, "height": 400 }
        this.title = { "x": 0, "y": 0, "width": this.data.width, "height": 50 }
        this.legend = { "x": 0, "y": 0, "width": 0, "height": 400 }
        // this.title = this.titleOpt.layout
        // this.data = this.dataOpt.layout
        // this.legend = this.legendOpt.layout
        this.adjustLayout()
        this.layout = { "title": this.title, "data": this.data, "legend": this.legend }
        opt.layout = this.layout
        return this.layout
    }

    adjustLayout() {
        if (this.legendOpt.show == false) {
            // dataBox
            this.data.width = this.containerWidth

            // legendBox
            this.legend.x = 0
            this.legend.y = 0
            this.legend.width = 0
            this.legend.height = 0

        } else {
            // dataBox
            this.data.width = this.containerWidth * 0.8

            // legendBox
            this.legend.x = this.data.width
            this.legend.width = this.containerWidth - this.data.width
            this.legend.height = this.data.height
        }

        if (this.titleOpt.show == false) {
            this.title.x = 0
            this.title.y = 0
            this.title.width = 0
            this.title.height = 0
            this.data.height = this.containerHeight
        } else if (this.titleOpt.show == true) {
            if (this.titleOpt.position == "bottom") {
                // titleBox
                this.title.width = this.data.width
                this.title.y = this.data.height
            } else {
                // titleBox
                this.title.width = this.data.width
                this.title.height = 50

                // dataBox
                this.data.x = 0
                this.data.y = this.title.height

                // legendBox
                this.legend.y = this.title.height
            }
        }

        this.titleBox.attr("x", this.title.x)
            .attr("y", this.title.y)
            .attr("width", this.title.width)
            .attr("height", this.title.height)

        this.dataBox.attr("y", this.data.y)
            .attr("width", this.data.width)
            .attr("height", this.data.height)

        this.legendBox.attr("x", this.legend.x)
            .attr("y", this.legend.y)
            .attr("width", this.legend.width)
            .attr("height", this.legend.height)

    }



    changeTitleLayout(attribute, value) {
        if (attribute == "width") {

        } else if (attribute == "height") {

        }
    }

    changeDataLayout(attribute, value) {
        if (attribute == "width") {

        } else if (attribute == "height") {

        }
    }

    changeLegendLayout(attribute, value) {
        if (attribute == "width") {
            if (this.legendOpt.position == "right") {
                this.legend.width = value
                this.data.width = this.containerWidth - this.legend.width
            }
        } else if (attribute == "height") {

        }

    }
}