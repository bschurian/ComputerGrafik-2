/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: polygon
 *
 *
 */

define(["util", "Scene"],
    function(util, Scene){

        "use strict";

        /**
         *  A polygon drawn around the control points of a Bezier curve
         *  Parameters:
         *  - getCP0, getCP1, getCP2, getCP3: callback returning the respective control point
         *  - setCP0, setCP1, setCP2, setCP3: callback setting a new value to the respective control point
         *  - polyStyle: object defining width and color attributes for line drawing
         */
        var Polygon = function(getCP0, getCP1, getCP2, getCP3, setCP0, setCP1, setCP2, setCP3, polyStyle){

            this.setCP0 = setCP0;
            this.setCP1 = setCP1;
            this.setCP2 = setCP2;
            this.setCP3 = setCP3;

            this.getCP0 = getCP0;
            this.getCP1 = getCP1;
            this.getCP2 = getCP2;
            this.getCP3 = getCP3;

            this.drawStyle = polyStyle;
        };

        // draws a polygon around the four control points of a Bezier curve
        Polygon.prototype.draw = function(context){

            context.beginPath();

            context.moveTo(this.getCP0()[0], this.getCP0()[1]);
            context.lineTo(this.getCP1()[0], this.getCP1()[1]);
            context.lineTo(this.getCP2()[0], this.getCP2()[1]);
            context.lineTo(this.getCP3()[0], this.getCP3()[1]);

            context.lineWidth = this.drawStyle.width;
            context.strokeStyle = this.drawStyle.color;

            context.stroke();
        };

        return Polygon;

});