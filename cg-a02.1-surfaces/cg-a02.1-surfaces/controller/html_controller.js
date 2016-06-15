/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "BufferGeometry", "random", "band", "parametric", "objmesh"],
    (function($,BufferGeometry, Random, Band, ParametricSurface, OBJMesh) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {


            $("#random").show();
            $("#band").hide();
            $("#box").hide();
            $("#sphere").hide();
            $("#torusKnot").hide();
            $("#parametricSurface").hide();
            $("#obj").hide();

            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#band").hide();
                $("#box").hide();
                $("#sphere").hide();
                $("#torusKnot").hide();
                $("#parametricSurface").hide();
                $("#obj").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#band").show();
                $("#box").hide();
                $("#sphere").hide();
                $("#torusKnot").hide();
                $("#parametricSurface").hide();
                $("#obj").hide();
            }));

            $("#btnBoxGeometry").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#box").show();
                $("#sphere").hide();
                $("#torusKnot").hide();
                $("#parametricSurface").hide();
                $("#obj").hide();
            }));

            $("#btnSphere").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#box").hide();
                $("#sphere").show();
                $("#torusKnot").hide();
                $("#parametricSurface").hide();
                $("#obj").hide();
            }));

            $("#btnTorusKnot").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#box").hide();
                $("#sphere").hide();
                $("#parametricSurface").hide();
                $("#torusKnot").show();
                $("#obj").hide();
            }));

            $("#btnParametric").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#box").hide();
                $("#sphere").hide();
                $("#torusKnot").hide();
                $("#parametricSurface").show();
                $("#obj").hide();
            }));
            
            $("#btnObj").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#box").hide();
                $("#sphere").hide();
                $("#torusKnot").hide();
                $("#parametricSurface").hide();
                $("#obj").show();
            }));

            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());
                
                bufferGeometryRandom.setMeshType("Point");

                scene.addBufferGeometry(bufferGeometryRandom);
            }));


            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };


                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry();
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                bufferGeometryBand.setMeshType("Point");

                scene.addBufferGeometry(bufferGeometryBand);
            }));

            $("#btnNewBox").click( (function() {


                var x = parseInt($("#xKoordinate").attr("value"));
                var y = parseInt($("#yKoordinate").attr("value"));
                var z = parseInt($("#zKoordinate").attr("value"));
                var color = $("#boxFarbe").attr("value");
                var geometry = new THREE.BoxGeometry( x, y, z );
                var material = new THREE.MeshBasicMaterial(  { color: color } );
                var cube = new THREE.Mesh( geometry, material );
                scene.scene.add( cube );
                
            }));

            $("#btnNewSphere").click( function() {

                var radius = parseInt($("#radiusSphere").attr("value"));
                var color = $("#boxFarbe").attr("value");
                var geometry = new THREE.SphereGeometry( radius);
                var material = new THREE.MeshBasicMaterial(  { color: color } );
                var sphere = new THREE.Mesh( geometry, material );
                scene.scene.add( sphere );
               
            });

            $("#btnNewTorusKnot").click( function() {

                var radius = parseInt($("#radiusKnot").attr("value"));
                var tube = parseInt($("#tube").attr("value"));
                var tubularSegments = parseInt($("#tubularSegmentsKnot").attr("value"));
                var radialSegments = parseInt($("#radialSegmentsKnot").attr("value"));
                var color = parseInt($("#torusKnotFarbe").attr("value"));



                var geometry = new THREE.TorusKnotGeometry( radius, tube, tubularSegments, radialSegments);
                var material = new THREE.MeshBasicMaterial(  { color: color } );
                var knot = new THREE.Mesh( geometry, material );
                scene.scene.add( knot );

            });


            $("#btnNewParametricSurface").click( function() {

                var config = {
                    segments : parseInt($("#segments").attr("value")),
                    umin : parseFloat($("#umin").attr("value")),
                    umax : parseFloat($("#umax").attr("value")),
                    vmin : parseFloat($("#vmin").attr("value")),
                    vmax : parseFloat($("#vmax").attr("value")),
                    scal : parseFloat($("#paraSkal").attr("value")),
                    tX : parseFloat($("#paraTX").attr("value")),
                    tY : parseFloat($("#paraTY").attr("value")),
                    tZ : parseFloat($("#paraTZ").attr("value"))
                };

                console.log("neues ParametricSurface erstellt mit: " + "umin: " + parseInt($("#umin").attr("value")) + " umax: " + parseInt($("#umax").attr("value")) +
                    " vmin: " + parseInt($("#vmin").attr("value"))  + " vmax: " + parseInt($("#vmax").attr("value")) + " segments: " + parseInt($("#segments").attr("value")));
                                
                var posFunc = function(u, v){return eval($("#paraFunc").attr("value") || "[u, v, 0];")};

                var surface = new ParametricSurface(posFunc, config);
                var bufferGeometrySurface = new BufferGeometry();
                bufferGeometrySurface.addAttribute("position", surface.getPositions());
                bufferGeometrySurface.addIndices(surface.getIndices());
                bufferGeometrySurface.addAttribute("color", surface.getColors());
                
                bufferGeometrySurface.setMeshType($("input[name=paraMaterial]:checked").val());
                
                scene.addBufferGeometry(bufferGeometrySurface);
                if($("#turning").attr("checked"))scene.startTurningGeometry();
                
            });

            $("#btnNewDromedar").click( function() {
                var config = {
                    
                };
                
                var objMesh = new OBJMesh("mesh/obj/dromedar.obj", config);
                scene.addMesh(objMesh.getMesh());
            });

            
            var paraFSet = function(id, func, umin = 0, umax = 10, vmin = 0, vmax = 10, scal = 50){
                $(id).click(function(){
                    $("#paraFunc").val(func);
                    $("#umin").val(umin);
                    $("#umax").val(umax);
                    $("#vmin").val(vmin);
                    $("#vmax").val(vmax);
                    $("#paraSkal").val(scal);
                });                                
            };
            paraFSet("#fForSphere", "[Math.sin(u)*Math.cos(v), Math.sin(v), Math.cos(u)*Math.cos(v)]", 0, Math.PI*2, 0, Math.PI*2, 400);
            paraFSet("#fForFlower", "[(u-(u*u*u/3+u*v*v)), (v-(v*v*v/3+u*u*v)), (u*u-v*v)]", -2, 2, -2, 2, 100);
            paraFSet("#fForApple", "[Math.cos(u)*(4 + 3.8 * Math.cos(v)), Math.sin(u)*(4 + 3.8 * Math.cos(v)), ((Math.cos(v)+Math.sin(v)-1) * (1+Math.sin(v)) * Math.log(1-Math.PI * v/10)+7.5*Math.sin(v))]", 0, 2*Math.PI, -Math.PI, Math.PI, 50);

        };

        // return the constructor function
        return HtmlController;


    })); // require



            
