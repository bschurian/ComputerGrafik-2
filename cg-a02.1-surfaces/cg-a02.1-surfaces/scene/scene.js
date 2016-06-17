/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn, 
 * plus a background fill style.
 *
 */



/* requireJS module definition */
define(["three", "util", "shaders", "BufferGeometry", "random", "band", "parametric", "robot"],
    (function(THREE, util, shaders, BufferGeometry, Random, Band, ParametricSurface, Robot) {

        "use strict";

        /*
         * Scene constructor
         */
        var Scene = function(renderer, width, height) {

            // the scope of the object instance
            var scope = this;

            scope.renderer = renderer;
            scope.t = 0.0;

            scope.camera = new THREE.PerspectiveCamera( 66, width / height, 0.1, 2000 );
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();


            //light
            var ambientLight = new THREE.AmbientLight(0x0c0c0c);
            scope.scene.add(ambientLight);

            var spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(-20, 0, 1000);

            spotLight.castShadow = true;

            scope.scene.add(spotLight);
            //

            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);


            function onDocumentKeyDown(event){
                // Get the key code of the pressed key
                var keyCode = event.which;

                var nodeRightEllbow = scope.scene.getObjectByName("rEll", true);
                var nodeLeftEllbow = scope.scene.getObjectByName("lEll", true);

                // Cursor up
                if(keyCode == 38){
                    console.log("cursor up");
                    scope.currentMesh.rotation.x += 0.05;
                    // Cursor down
                } else if(keyCode == 40){
                    console.log("cursor down");
                    scope.currentMesh.rotation.x += -0.05;
                    // Cursor left
                } else if(keyCode == 37){
                    console.log("cursor left");
                    scope.currentMesh.rotation.y += 0.05;
                    // Cursor right
                } else if(keyCode == 39){
                    console.log("cursor right");
                    scope.currentMesh.rotation.y += -0.05;
                } else if(keyCode == 81){
                    console.log("button Q");
                    if(nodeRightEllbow){
                        var currentRotationX = nodeRightEllbow.rotation._x;
                        if(currentRotationX > -2.72){
                            nodeRightEllbow.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 69){
                    console.log("button E");
                    if(nodeRightEllbow){
                        var currentRotationX = nodeRightEllbow.rotation._x;
                        if(currentRotationX < 0){
                            nodeRightEllbow.rotateX(Math.PI/48);
                        }
                    }
                } else if(keyCode == 65){
                    console.log("button A");
                    if(nodeLeftEllbow){
                        var currentRotationX = nodeLeftEllbow.rotation._x;
                        if(currentRotationX > -2.72){
                            nodeLeftEllbow.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 68){
                    console.log("button D");
                    if(nodeLeftEllbow){
                        var currentRotationX = nodeLeftEllbow.rotation._x;
                        if(currentRotationX < 0){
                            nodeLeftEllbow.rotateX(Math.PI/48);
                        }
                    }
            }
            };
            
            this.addMesh = function(mesh) {
                
                scope.currentMesh = mesh;
                scope.scene.add(scope.currentMesh);
                
            }
            
            this.addBufferGeometry = function(bufferGeometry) {

                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add(scope.currentMesh );

            }
            
            this.startTurningGeometry = function(){
                
                setInterval(function(){
                    scope.currentMesh.rotation.x += 0.0011;
                    scope.currentMesh.rotation.y += 0.001;
                    scope.draw;
                }, 100);
                
            }
            
            /*
             * drawing the scene
             */
            this.draw = function() {

                requestAnimFrame( scope.draw );

                scope.renderer.render(scope.scene, scope.camera);

            };
        };


        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define

    
