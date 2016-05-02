/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: Parametric_Curve
 *
 * A parametric curve knows how to draw itself into a specified 2D context and
 * can tell whether a certain mouse position "hits" the object
 */


/* requireJS module definition */
define(["util", "vec2", "Scene", "Point"],
    (function (util, vec2, Scene, Point) {

        "use strict";

        //TODO: change comment
        /**
         *  A simple circle that can be dragged
         *  around by its center point.
         *  Parameters:
         *  - point0: array object representing [x,y] coordinates of center point
         *  - radius: value representing the radius of the circle
         *  - circleStyle: object defining width and color attributes for line drawing,
         *       begin of the form { width: 2, color: "#00FF00" }
         */

        var ParametricCurve = function (funcF, radius, circleStyle) {

            console.log("creating straight circle at [" +
                point0[0] + "," + point0[1] + "] with radius " + radius + ".");

            // draw style for drawing the circle
            this.drawStyle = circleStyle || {width: "2", color: "#0000AA"};

            // initial values in case either parameter is undefined
            this.p0 = point0 || [10, 10];
            this.radius = parseInt(radius) || 10;
        };

        // draw this circle into the provided 2D rendering context
        ParametricCurve.prototype.draw = function (context) {

            // draw actual circle
            context.beginPath();

            // set points to be drawn
            context.arc(this.p0[0], this.p0[1], Math.max(2, this.radius), 0, 2*Math.PI);

            // set drawing style
            context.lineWidth = this.drawStyle.width;
            context.strokeStyle = this.drawStyle.color;

            // actually start drawing
            context.stroke();

        };

        // test whether the mouse position is on this circle segment
        ParametricCurve.prototype.isHit = function (context, mousePos) {


            // check whether distance between mouse and circle's center
            // is less or equal ( radius + (style width)/2 ) and greater or equal ( radius + (style width)/2 )
            var dx = mousePos[0] - this.p0[0];
            var dy = mousePos[1] - this.p0[1];
            var outerR = this.radius + this.drawStyle.width / 2;
            var innerR = this.radius - this.drawStyle.width / 2;
            console.log("circ oute "+((dx * dx + dy * dy) <= (outerR * outerR))+"   inn "+((dx+ dy) >= (innerR)));
            return ((dx * dx + dy * dy) <= (outerR * outerR)) && ((dx+ dy) >= (innerR));

        };

        // list of draggers empty as Object should only be manipulated through the GUI
        ParametricCurve.prototype.createDraggers = function () {

            return [];

        };


        // this module only exports the constructor for Straightcircle objects
        return ParametricCurve;

    })); // define


