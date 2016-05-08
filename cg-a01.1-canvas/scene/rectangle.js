/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: rectangle
 *
 * A Rectagnle knows how to draw itself into a specified 2D context,
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
         *  A simple rectangle that can be dragged
         *  around by corners that are opposite to each other.
         *  Parameters:
         *  - point0 and point1: array objects representing [x,y] two corners
         *  - lineStyle: object defining width and color attributes for line drawing,
         *       begin of the form { width: 2, color: "#00FF00" } and an optional fill value "false"
         */

        var Rectangle = function (point0, point1, lineStyle) {

            console.log("creating rectangle from [" +
                point0[0] + "," + point0[1] + "] to [" +
                point1[0] + "," + point1[1] + "].");

            // draw style for drawing the line
            this.drawStyle = lineStyle || {width: "2", color: "#0000AA"};
            this.drawStyle.fill = lineStyle.fill || false;

            // initial values in case either point is undefined
            this.p0 = point0 || [10, 10];
            this.p1 = point1 || [50, 10];
        };

        // draw this rectangle into the provided 2D rendering context
        Rectangle.prototype.draw = function (context) {

            // draw actual rectangle
            context.beginPath();

            // set points to be drawn
            context.rect(this.p0[0], this.p0[1], this.p1[0]-this.p0[0], this.p1[1]-this.p0[1])
            
            // set drawing style
            context.lineWidth = this.drawStyle.width;
            context.strokeStyle = this.drawStyle.color;
            context.fillStyle = this.drawStyle.color;

            // actually start drawing
            if (this.drawStyle.fill) {
                context.fill();
            };
            context.stroke();

        };

        // test whether the mouse position is on this rectangle
        Rectangle.prototype.isHit = function (context, pos) {
            //if filled rectangle entire area registers clicks
            if(this.drawStyle.fill) {
                //check if in rectangle
                var sensitivity = this.drawStyle.width / 2 + 2;
                return (pos[0] >= Math.min(this.p0[0], this.p1[0]) - (sensitivity))
                    && (pos[1] >= Math.min(this.p0[1], this.p1[1]) - (sensitivity))
                    && (pos[0] <= Math.max(this.p0[0], this.p1[0]) + (sensitivity))
                    && (pos[1] <= Math.max(this.p0[1], this.p1[1]) + (sensitivity));
            }else{            
                //iterate through all the edges of the Rectangle
                var allLines = [this.p0,[this.p0[0], this.p1[1]], this.p1, [this.p1[0], this.p0[1]]];
                for(var i=0; i<allLines.length; i++){
                    // project point on the lines of the rectangle, get parameter of that projection point
                    var t = vec2.projectPointOnLine(pos, allLines[i], allLines[(i+1)%4]);
                    console.log("t:", t," ", i);

                    // outside the line segment?
                    if (t < 0.0 || t > 1.0) {
                        continue;
                    }

                    // coordinates of the projected point
                    var p = vec2.add(allLines[i], vec2.mult(vec2.sub(allLines[(i+1)%4], allLines[i]), t));
                    // distance of the point from the line
                    var d = vec2.length(vec2.sub(p, pos));

                    // allow 2 pixels extra "sensitivity"
                    if(d <= (this.drawStyle.width / 2) + 2) return true;
                };
                return false;
            };
        };

        // return list of draggers to manipulate this rectangle
        Rectangle.prototype.createDraggers = function () {

            var draggerStyle = {radius: 4, color: this.drawStyle.color, width: 0, fill: true}
            var draggers = [];

            // create closure and callbacks for dragger
            var _rect = this;
            var getP0 = function () {
                return _rect.p0;
            };
            var getP1 = function () {
                return _rect.p1;
            };
            var setP0 = function (dragEvent) {
                _rect.p0 = dragEvent.position;
            };
            var setP1 = function (dragEvent) {
                _rect.p1 = dragEvent.position;
            };
            draggers.push(new PointDragger(getP0, setP0, draggerStyle));
            draggers.push(new PointDragger(getP1, setP1, draggerStyle));

            return draggers;

        };


        // this module only exports the constructor for Rectangle objects
        return Rectangle;

    })); // define

    
