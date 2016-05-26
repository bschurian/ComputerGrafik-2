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
define(["jquery", "BufferGeometry", "random", "band"],
    (function($,BufferGeometry, Random, Band) {
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



            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#band").hide();
                $("#box").hide();
                $("#sphere").hide();
                $("#torusKnot").hide();

            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#band").show();
                $("#box").hide();
                $("#sphere").hide();
                $("#torusKnot").hide();

            }));

            $("#btnBoxGeometry").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#box").show();
                $("#sphere").hide();
                $("#torusKnot").hide();
            }));

            $("#btnSphere").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#box").hide();
                $("#sphere").show();
                $("#torusKnot").hide();
            }));

            $("#btnTorusKnot").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#box").hide();
                $("#sphere").hide();
                $("#torusKnot").show();
            }));
            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

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

                scene.addBufferGeometry(bufferGeometryBand);
            }));

            $("#btnNewBox").click( (function() {


                var x = parseInt($("#xKoordinate").attr("value"))
                var y = parseInt($("#yKoordinate").attr("value"))
                var z = parseInt($("#zKoordinate").attr("value"))
                var color = $("#boxFarbe").attr("value")
                var geometry = new THREE.BoxGeometry( x, y, z );
                var material = new THREE.MeshBasicMaterial(  { color: color } );
                var cube = new THREE.Mesh( geometry, material );
                scene.scene.add( cube );
                alert(cube.geometry.parameters.height)
                alert(cube.geometry.parameters.width)
                alert(cube.material.color)
            }));

            $("#btnNewSphere").click( (function() {

                var radius = parseInt($("#radiusSphere").attr("value"))
                var color = $("#boxFarbe").attr("value")
                var geometry = new THREE.SphereGeometry( radius);
                var material = new THREE.MeshBasicMaterial(  { color: color } );
                var sphere = new THREE.Mesh( geometry, material );
                scene.scene.add( sphere )
               
            }));

            $("#btnNewTorusKnot").click( (function() {

                var radius = parseInt($("#radiusKnot").attr("value"))
                var tube = parseInt($("#tube").attr("value"))
                var tubularSegments = parseInt($("#tubularSegmentsKnot").attr("value"))
                var radialSegments = parseInt($("#radialSegmentsKnot").attr("value"))
                var color = parseInt($("#torusKnotFarbe").attr("value"))



                var geometry = new THREE.TorusKnotGeometry( radius, tube, tubularSegments, radialSegments);
                var material = new THREE.MeshBasicMaterial(  { color: color } );
                var knot = new THREE.Mesh( geometry, material );
                scene.scene.add( knot )

            }));
            
            


        };

        // return the constructor function
        return HtmlController;


    })); // require



            
