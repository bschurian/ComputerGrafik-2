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
            var triangles = config.triangles;

            this.positions = new Float32Array(Math.pow((this.segments + 1), 2) * 3);
            this.colors = new Float32Array(Math.pow((this.segments + 1), 2) * 3);
            this.indices = new Uint32Array(this.segments * this.segments * 2 * 3);

            var pointFunc = posFunc;

            var countp = 0;
            var countc = 0;
            
            for(var i = 0; i<this.segments+1; i++){
                var u = this.umin + i * ((this.umax - this.umin) / this.segments);
                for(var j = 0; j<this.segments+1; j++){
                    var v = this.vmin + j * ((this.vmax - this.vmin) / this.segments);

                    var point = pointFunc(u, v);

                    var x = point[0];
                    var y = point[1];
                    var z = point[2];
                    this.positions[countp++] = x;
                    this.positions[countp++] = y;
                    this.positions[countp++] = z;

                    color.setRGB(1, 0, 0 );
                    this.colors[countc++] = color.r;
                    this.colors[countc++] = color.g;
                    this.colors[countc++] = color.b;
                }
            }

            console.log(countp);
            
            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };
            
            this.getIndices = function() {
                return this.indices;
            };

        };

        return ParametricSurface;
    }));

