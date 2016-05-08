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


            // draw style for drawing the parametric curve
            this.drawStyle = curveStyle || {width: "2", color: "#0000AA"};

            // initial values in case either parameter is undefined
            try{
                this.funcF = function(t){return eval(funcF||"t")};
                if(funcF == "")throw new Error ("Keine Formel für x angegeben");
                if(this.funcF() == 0 )throw new Error ("Die Eingabe oder das Ergebnis darf nicht null sein");
            } catch(e) {
                if(e.name=="TypeError"){
                    alert("Die Eingabe für x ist keine Funktion");
                }
                else alert(e.message);
                $("#parCrvF1").attr("value", "");
            }

            try{
                this.funcG = function(t){return eval(funcG||"t")};
                if(funcG == "")throw new Error ("Keine Formel für y angegeben");
                if(this.funcG() == 0 )throw new Error ("Die Eingabe oder das ergebnis darf nicht null sein");
            } catch(e) {
                if(e.name=="TypeError"){
                    alert("Die Eingabe für y ist keine Funktion");
                }
                else alert(e.message);
                $("#parCrvF2").attr("value", "");
            }

            this.tmin = parseInt(tmin) || 0;
            this.tmax = parseInt(tmax) || 500;
            this.segmentCount = segmentsCount || 100;
            this.hasTickMarks = false;


            console.log("creating parametric curve with x = ", this.funcF, "; y = ", this.funcG,
                "; tmin: ", this.tmin, "; tmax: ", this.tmax);

        };

        // draw this parametric curve into the provided 2D rendering context
        ParametricCurve.prototype.draw = function (context) {
            var points = this.curvePoints();

            context.beginPath();
            context.moveTo((points[0])[0], (points[0])[1]);

            for(var i = 1; i < points.length; i++){
                context.lineTo((points[i])[0], (points[i])[1]);
            }

            context.lineWidth = this.drawStyle.width;
            context.strokeStyle = this.drawStyle.color;
            context.stroke();

            this.drawTickMarks(context);


        };

        ParametricCurve.prototype.curvePoints = function(){
            var points = [];


                    for (var i = 0; i < this.segmentCount; i++) {
                        var t = this.tmin + i * ((this.tmax - this.tmin) / this.segmentCount);
                        points.push([this.funcF(t), this.funcG(t)]);

                }/*catch(e){
                    alert (e.message);
                }*/



            return points;
        };

        ParametricCurve.prototype.drawTickMarks = function(context){
            // length of tick marks
            var length = 10;

            context.beginPath();
            context.strokeStyle = "FF0000";
            context.lineWidth = 0.5;

            var points = this.curvePoints();

            // for each point (except first and last):
            // 1) determine the vector between this point and the next one
            // 2) calculate the normal ("rotate" the vector at 180 degrees)
            // 3) normalize the result (so its length doesn't depend on the vectors length)
            // 4) set start and end points of the tick mark depending on its given length
            // 5) draw line between start and end point
            for(var i = 1; i < points.length - 1; i++){
                // vector between current point and next point
                var vector = vec2.sub(points[i+1], points[i]);

                // normal of the vector between the two points
                var normal = [vector[1], -vector[0]];

                // normalize the normal
                var normalized = vec2.mult(normal, 1/vec2.length(normal));

                // points for the tick mark
                var tm0 = vec2.add(points[i], vec2.mult(normalized, length/2));
                var tm1 = vec2.sub(points[i], vec2.mult(normalized, length/2));

                // draw line between the tick-mark points
                context.moveTo(tm0[0], tm0[1]);
                context.lineTo(tm1[0], tm1[1]);
            }

            context.stroke();
        };


        // test whether the mouse position is on this curve segment
        ParametricCurve.prototype.isHit = function (context, mousePos) {

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
        ParametricCurve.prototype.createDraggers = function () {
            return [];

        };





        // this module only exports the constructor for Straightcircle objects
        return ParametricCurve;

    })); // define


