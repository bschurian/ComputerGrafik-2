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
            
            var worldCoordFromSurfacePoint = posFunc;

            this.umin=config.umin;
            this.umax=config.umax;
            this.vmin=config.vmin;
            this.vmax=config.vmax;
            this.scal = config.scal;

            this.segments=config.segments;
            var color = new THREE.Color();
            var triangles = config.triangles;

            this.positions = new Float32Array(Math.pow((this.segments + 1), 2) * 3);
            this.colors = new Float32Array(Math.pow((this.segments + 1), 2) * 3);
            this.indices = new Uint32Array(this.segments * this.segments * 2 * 3);

            var countp = 0;
            var countc = 0;
            var counti = 0;
            
            for(var i = 0; i<this.segments+1; i++){
                var u = this.umin + i * ((this.umax - this.umin) / this.segments);
                for(var j = 0; j<this.segments+1; j++){
                    if(i<this.segments && j<this.segments){
                        var p1 = countp / 3;
                        var p2 = (i + 1) * (this.segments + 1) + j;
                        var p3 = countp / 3 + 1;
                        var p4 = (i + 1) * (this.segments + 1) + j + 1;
                        this.indices[counti++] = p1;
                        this.indices[counti++] = p2;
                        this.indices[counti++] = p3;
                        this.indices[counti++] = p2;
                        this.indices[counti++] = p4;
                        this.indices[counti++] = p3;
                    }

                    var v = this.vmin + j * ((this.vmax - this.vmin) / this.segments);

                    var point = worldCoordFromSurfacePoint(u, v);

                    this.positions[countp++] = point[0] * this.scal;
                    this.positions[countp++] = point[1] * this.scal;
                    this.positions[countp++] = point[2] * this.scal;

                    color.setRGB(1, 0, 0 );
                    this.colors[countc++] = color.r;
                    this.colors[countc++] = color.g;
                    this.colors[countc++] = color.b;
                }
            }
            
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

