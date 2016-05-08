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
    
        /**
         *  A bezier-curve that can be dragged
         *  around by its control points.
         *  Parameters:
         *  - point0-point3: array objects representing [x,y] coordinates of a control point
         *  - curveStyle: object defining width and color attributes for line drawing,
         *       begin of the form { width: 2, color: "#00FF00" }
         */
        var BezierCurve = function(cp0, cp1, cp2, cp3, segmentCount, curveStyle){
            this.cp0 = [cp0[0] ||   10, cp0[1] ||  10];
            this.cp1 = [cp1[0] ||  210, cp1[1] ||  10];
            this.cp2 = [cp2[0] ||   10, cp2[1] || 210];
            this.cp3 = [cp3[0] ||  210, cp3[1] || 210];
            
            
            this.segmentCount = segmentCount || 100;

            console.log("creating bezier-curve with control points ", this.cp0, this.cp1, this.cp2, this.cp3, " and ", this.segmentCount, " segments.");

            this.drawStyle = curveStyle || {width: "2", color: "#0000AA"};

            this.b0 = function(t){ return Math.pow(1-t,3);};
            this.b1 = function(t){ return 3*t*Math.pow(1-t,2);};
            this.b2 = function(t){ return 3*t*t*(1-t);};
            this.b3 = function(t){ return Math.pow(t,3);};

        }
        
               // draw this parametric curve into the provided 2D rendering context
        BezierCurve.prototype.draw = function (context) {
            var points = this.curvePoints();

            context.beginPath();
            context.moveTo((points[0])[0], (points[0])[1]);

            for(var i = 1; i < points.length; i++){
                context.lineTo((points[i])[0], (points[i])[1]);
            }

            context.lineWidth = this.drawStyle.width;
            context.strokeStyle = this.drawStyle.color;
            context.stroke();

        };

        BezierCurve.prototype.curvePoints = function(){
            var points = [];

            for(var i = 0; i < this.segmentCount; i++){
                var t = i*(1/this.segmentCount);
                points.push([this.b0(t)*this.cp0[0]+this.b1(t)*this.cp1[0]+this.b2(t)*this.cp2[0]+this.b3(t)*this.cp3[0], this.b0(t)*this.cp0[1]+this.b1(t)*this.cp1[1]+this.b2(t)*this.cp2[1]+this.b3(t)*this.cp3[1]]);
            }
                        
            return points;
        };

        // test whether the mouse position is on this curve segment
        BezierCurve.prototype.isHit = function (context, mousePos) {

            var points = this.curvePoints();
            for(var i = 0; i < points.length -1; i++){
                var distance = vec2.projectPointOnLine(mousePos, points[i], points[i+1]);
                // outside the line segment?
                if (distance < 0.0 || distance > 1.0) {
                    continue;
                }
                // coordinates of the projected point
                var p = vec2.add(points[i], vec2.mult(vec2.sub(points[i+1], points[i]), distance));

                // distance of the point from the line
                var d = vec2.length(vec2.sub(p, mousePos));

                // allow 2 pixels extra "sensitivity"
                if(d <= (this.drawStyle.width / 2) + 2){
                    return true;
                }
            }
            return false;
        };

        // list of draggers empty as Object should only be2 manipulated through the GUI
        BezierCurve.prototype.createDraggers = function () {
            return [];

        };
    
        // this module only exports the constructor for beziercurve objects
        return BezierCurve;

    })//
);//define