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

            this.positions = [];
            this.colors = [];

            var umin=config.umin;
            var umax=config.umax;
            var vmin=config.vmin;
            var vmax=config.vmax
            var segments=config.segments;
            var color = new THREE.Color();
            



            var ellipsoid=posFunc;

            for(var u=umin;u<=umax;u+=((umax-umin)/segments)){

                for(var v=vmin;v<=vmax;v+=((vmax-vmin)/segments)){

                    var point=ellipsoid(u,v);
                    this.positions.push(point[0]);
                    this.positions.push(point[1]);
                    this.positions.push(point[2]);
                    
                    color.setRGB( 1,0,0 );
                    
                    this.colors.push(color.r);
                    this.colorscolors.push(color.g);
                    this.colorscolors.push(color.b);
                }
            }

            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

        };

        return ParametricSurface;
    }));

