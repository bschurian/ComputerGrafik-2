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

        var ParametricCurve = function (funcF, funcG, tmin, tmax, segmentsCount, curveStyle) {

            console.log("creating parametric curve with x = ", funcF, "; y = ", funcG,
            "; tmin: ", tmin, "; tmax: ", tmax);

            // draw style for drawing the parametric curve
            this.drawStyle = curveStyle || {width: "2", color: "#0000AA"};

            // initial values in case either parameter is undefined
            console.log(funcF, "------", funcG);
            try{
                this.funcF = function(t){return eval(funcF)};
            } catch(err) {
                this.funcF = function(t){return t;};
            }

            try{
                this.funcG = function(t){return eval(funcG)};
            } catch(err) {
                this.funcG = function(t){return t;};
            }

            this.tmin = tmin || 0;
            this.tmax = tmax || 10;
            this.segmentCount = segmentsCount || 10;

        };

        // draw this parametric curve into the provided 2D rendering context
        ParametricCurve.prototype.draw = function (context) {
            var points = this.curvePoints();
            console.log(points);

            context.beginPath();
            context.moveTo((points[0])[0], (points[0])[1]);

            for(var i = 1; i < points.length; i++){
                context.lineTo((points[i])[0], (points[i])[1]);
            }

            context.lineWidth = this.drawStyle.width;
            context.strokeStyle = this.drawStyle.color;
            context.stroke();

        };

        ParametricCurve.prototype.curvePoints = function(){
            var points = [];

            console.log("segm: ", this.segmentCount);
            for(var i = 0; i < this.segmentCount; i++){
                var t = this.tmin + i*((this.tmax-this.tmin)/this.segmentCount);
                console.log("t: ", t, " tmin: ", this.tmin, " tmax: ", this.tmax);
                points.push([this.funcF(t), this.funcG(t)]);
            }

            return points;
        }


        // test whether the mouse position is on this curve segment
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


