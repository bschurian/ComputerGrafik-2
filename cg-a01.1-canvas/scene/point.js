/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: point
 *
 * A Point knows how to draw itself into a specified 2D context,
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
         *  A simple straight point that can be dragged
         *  around by its endpoints.
         *  Parameters:
         *  - point0 : array object representing [x,y] coordinates of center point
         *  - drawStyle: object defining width and color attributes for point drawing,
         *       begin of the form { width: 2, color: "#00FF00" }
         */

        var Point = function (point0, drawStyle) {

            console.log("creating point at [" +
                point0[0] + "," + point0[1] + "].");

            // draw style for drawing the circle
            this.drawStyle = drawStyle || {width: "2", color: "#0000AA"};
            this.drawStyle.fill = drawStyle.fill || "false";

            // initial values in case either parameter is undefined
            this.center = point0 || [10, 10];
            this.radius = 5;
        };

        // draw this circle into the provided 2D rendering context
        Point.prototype.draw = function (context) {

            // draw actual point
            context.beginPath();

            // set points to be drawn
            context.arc(this.center[0], this.center[1], Math.max(2, this.radius), 0, 2*Math.PI);
            context.closePath();
            
            // set drawing style
            context.lineWidth = this.drawStyle.width;
            context.strokeStyle = this.drawStyle.color;
            context.fillStyle = this.drawStyle.color;
            
            // trigger the actual drawing
            if (this.drawStyle.fill) {
                context.fill();
            };            
            
            // actually start drawing
            context.stroke();

        };

        // test whether the mouse position is on this point
        Point.prototype.isHit = function (context, mousePos) {

            // check whether distance between mouse and point's center
            // is less or equal ( radius + (style width)/2 )
            var dx = mousePos[0] - this.center[0];
            var dy = mousePos[1] - this.center[1];
            var r = this.radius + this.drawStyle.width / 2;
            return (dx * dx + dy * dy) <= (r * r);

        };

        // return list of draggers to manipulate this point
        Point.prototype.createDraggers = function () {

            var draggerStyle = {radius: 4, color: this.drawStyle.color, width: 0, fill: true}
            var draggers = [];

            // create closure and callbacks for dragger
            var _point = this;
            var getP0 = function () {
                return _point.center;
            };
            var setP0 = function (dragEvent) {
                _point.center = dragEvent.position;
            };
            draggers.push(new PointDragger(getP0, setP0, draggerStyle));

            return draggers;

        };


        // this module only exports the constructor for point objects
        return Point;

    })); // define

    
