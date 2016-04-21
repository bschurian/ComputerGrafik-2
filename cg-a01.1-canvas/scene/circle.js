/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: straight_Circle
 *
 * A StraighCircle knows how to draw itself into a specified 2D context,
 * can tell whether a certain mouse position "hits" the object,
 * and implements the function createDraggers() to create a set of
 * draggers to manipulate itself.
 *
 */


/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function (util, vec2, Scene, PointDragger) {

        "use strict";

        /**
         *  A simple straight circle that can be dragged
         *  around by its endpoints.
         *  Parameters:
         *  - point0 and point1: array objects representing [x,y] coordinates of start and end point
         *  - circleStyle: object defining width and color attributes for circle drawing,
         *       begin of the form { width: 2, color: "#00FF00" }
         */

        var Circle = function (point0, radius, circleStyle) {

            console.log("creating straight circle at [" +
                point0[0] + "," + point0[1] + "] with radius " + radius + ".");

            // draw style for drawing the circle
            this.circleStyle = circleStyle || {width: "2", color: "#0000AA"};

            // initial values in case either point is undefined
            this.p0 = point0 || [10, 10];
            this.radius = radius || 10;
        };

        // draw this circle into the provided 2D rendering context
        Circle.prototype.draw = function (context) {

            // draw actual circle
            context.beginPath();

            // set points to be drawn
            context.arc(this.p0[0], this.p0[1], this.radius, 0, 2*Math.PI);
            
            // set drawing style
            context.circleWidth = this.circleStyle.width;
            context.strokeStyle = this.circleStyle.color;

            // actually start drawing
            context.stroke();

        };

        // test whether the mouse position is on this circle segment
        Circle.prototype.isHit = function (context, mousePos) {


            // check whether distance between mouse and circle's center
            // is less or equal ( radius + (style width)/2 )
            var dx = mousePos[0] - p0[0];
            var dy = mousePos[1] - p0[1];
            var r = this.radius + this.drawStyle.width / 2;
            return (dx * dx + dy * dy) <= (r * r);

        };

        // return list of draggers to manipulate this circle
        Circle.prototype.createDraggers = function () {

            var draggerStyle = {radius: 4, color: this.circleStyle.color, width: 0, fill: true}
            var draggers = [];

            // create closure and callbacks for dragger
            var _circle = this;
            var getP0 = function () {
                return _circle.p0;
            };
            var getP1 = function () {
                return [_circle.p0[0], _circle.p0[1]+_circle.radius];
            };
            var setP0 = function (dragEvent) {
                _circle.p0 = dragEvent.position;
            };
            var setP1 = function (dragEvent) {
                _circle.p1 = dragEvent.position;
            };
            draggers.push(new PointDragger(getP0, setP0, draggerStyle));
            draggers.push(new PointDragger(getP1, setP1, draggerStyle));

            return draggers;

        };


        // this module only exports the constructor for Straightcircle objects
        return Circle;

    })); // define

    
