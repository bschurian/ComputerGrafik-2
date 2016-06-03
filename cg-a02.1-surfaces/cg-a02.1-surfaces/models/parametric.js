/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var ParametricSurface = function (posFunc, config) {



            this.umin=config.umin;
            this.umax=config.umax;
            this.vmin=config.vmin;
            this.vmax=config.vmax;
            this.segments=config.segments;
            var color = new THREE.Color();

            this.positions = new Float32Array(this.segments * 3);
            this.colors = new Float32Array(this.segments * 3);

            var ellipsoid=posFunc;

            var countp=0;
            var countc=0;

            for(var i=0; i<this.segments;i++){

                console.log(i+1 + ". Schleifendurchlauf erste Schleife");


                var u = this.umin + i * ((this.umax - this.umin) / this.segments);

                console.log("u: " + u);

                for(var j=0; j<this.segments;j++){

                    var v = this.vmin + j * ((this.vmax - this.vmin) / this.segments);

                    console.log("v: " + v);

                    var point=ellipsoid(u,v);

                    var x=point[0];
                    var y=point[1];
                    var z=point[2];

                    this.positions[ countp++]  = x;
                    this.positions[ countp++] = y;
                    this.positions[ countp++] = z;

                    console.log("Größe von positions: " + this.positions.length);

                    console.log("x: " + x + " y: " + y + " z: " + z);

                    color.setRGB( 1,0,0 );

                    this.colors[ countc++] = color.r;
                    this.colors[ countc++] = color.g;
                    this.colors[ countc++] = color.b;
                }
            }

            console.log(this.positions.length);
            console.log(this.segments);
            console.log(this.colors.length);

            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

        };

        return ParametricSurface;
    }));

