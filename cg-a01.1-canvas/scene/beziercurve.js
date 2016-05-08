/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: Bezier_Curve
 *
 * A bezier curve knows how to draw itself into a specified 2D context and
 * can tell whether a certain mouse position "hits" the object
 */


/* requireJS module definition */
define(["util", "vec2", "Scene", "Point"],
    (function (util, vec2, Scene, Point) {
        "use strict";

        // TODO doc
        var BezierCurve = function(cp0, cp1, cp2, cp3, segmentCount, curveStyle){
            this.cp0 = cp0;
            this.cp1 = cp1;
            this.cp2 = cp2;
            this.cp3 = cp3;

            this.segmentCount = segmentCount || 100;
            this.drawStyle = curveStyle || {width: "2", color: "#0000AA"};

            this.b0 = function(t){ return Math.pow(1-t,3);};
            this.b1 = function(t){ return 3*t*Math.pow(1-t,2);};
            this.b2 = function(t){ return 3*t*t*(1-t);};
            this.b3 = function(t){ return Math.pow(t,3);};

        }
    }));
