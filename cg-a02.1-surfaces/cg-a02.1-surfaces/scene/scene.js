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

                var nodeRightElbow = scope.scene.getObjectByName("rEll", true);
                var nodeLeftElbow = scope.scene.getObjectByName("lEll", true);
                var nodeRightShoulder = scope.scene.getObjectByName("rSchul", true);
                var nodeLeftShoulder = scope.scene.getObjectByName("lSchul", true);
                var nodeRightHip = scope.scene.getObjectByName("rHueftG", true);
                var nodeLeftHip = scope.scene.getObjectByName("lHueftG", true);
                var nodeRightKnee = scope.scene.getObjectByName("rKnie", true);
                var nodeLeftKnee = scope.scene.getObjectByName("lKnie", true);
                var nodeBelly = scope.scene.getObjectByName("bauch", true);

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
                    if(nodeRightElbow){
                        var currentRotationX = nodeRightElbow.rotation._x;
                        if(currentRotationX > -2.72){
                            console.log("Rotate Right Elbow CCW");
                            nodeRightElbow.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 69){
                    if(nodeRightElbow){
                        var currentRotationX = nodeRightElbow.rotation._x;
                        if(currentRotationX < 0){
                            console.log("Rotate Right Elbow CW");
                            nodeRightElbow.rotateX(Math.PI/48);
                        }
                    }
                } else if(keyCode == 65){
                    if(nodeLeftElbow){
                        var currentRotationX = nodeLeftElbow.rotation._x;
                        if(currentRotationX > -2.72){
                            console.log("Rotate Left Elbow CW");
                            nodeLeftElbow.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 68){
                    if(nodeLeftElbow){
                        var currentRotationX = nodeLeftElbow.rotation._x;
                        if(currentRotationX < 0){
                            console.log("Rotate Left Elbow CCW");
                            nodeLeftElbow.rotateX(Math.PI/48);
                        }
                    }
                } else if(keyCode == 49){
                    if(nodeRightShoulder){
                        var currentRotationX = nodeRightShoulder.rotation._x;
                        if(currentRotationX < 1.24){
                            console.log("Rotate Right Shoulder CW");
                            nodeRightShoulder.rotateX(Math.PI/48);
                        }
                    }
                } else if(keyCode == 50){
                    if(nodeRightShoulder){
                        var currentRotationX = nodeRightShoulder.rotation._x;
                        if(currentRotationX > -2.0){
                            console.log("Rotate Right Shoulder CCW");
                            nodeRightShoulder.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 51){
                    if(nodeLeftShoulder){
                        var currentRotationX = nodeLeftShoulder.rotation._x;
                        if(currentRotationX < 1.24){
                            console.log("Rotate Left Shoulder CCW");
                            nodeLeftShoulder.rotateX(Math.PI/48);
                        }
                    }
                } else if(keyCode == 52){
                    if(nodeLeftShoulder){
                        var currentRotationX = nodeLeftShoulder.rotation._x;
                        if(currentRotationX > -2.0){
                            console.log("Rotate Left Shoulder CW");
                            nodeLeftShoulder.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 56){
                    if(nodeRightHip){
                        var currentRotationX = nodeRightHip.rotation._x;
                        if(currentRotationX > -2.0){
                            console.log("Rotate Right Hip CCW");
                            nodeRightHip.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 55){
                    if(nodeRightHip){
                        var currentRotationX = nodeRightHip.rotation._x;
                        if(currentRotationX < 1.2){
                            console.log("Rotate Right Hip CW");
                            nodeRightHip.rotateX(Math.PI/48);
                        }
                    }
                } else if(keyCode == 57){
                    if(nodeLeftHip){
                        var currentRotationX = nodeLeftHip.rotation._x;
                        if(currentRotationX < 1.2){
                            console.log("Rotate Left Hip CW");
                            nodeLeftHip.rotateX(Math.PI/48);
                        }
                    }
                } else if(keyCode == 48){
                    if(nodeLeftHip){
                        var currentRotationX = nodeLeftHip.rotation._x;
                        if(currentRotationX > -2.0){
                            console.log("Rotate Left Hip CCW");
                            nodeLeftHip.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 74){
                    if(nodeRightKnee){
                        var currentRotationX = nodeRightKnee.rotation._x;
                        if(currentRotationX < 1.6){
                            console.log("Rotate Right Knee CW");
                            nodeRightKnee.rotateX(Math.PI/48);
                        }
                    }
                } else if(keyCode == 75){
                    if(nodeRightKnee){
                        var currentRotationX = nodeRightKnee.rotation._x;
                        if(currentRotationX > 0){
                            console.log("Rotate Right Knee CCW");
                            nodeRightKnee.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 78){
                    if(nodeLeftKnee){
                        var currentRotationX = nodeLeftKnee.rotation._x;
                        if(currentRotationX < 1.6){
                            console.log("Rotate Left Knee CCW");
                            nodeLeftKnee.rotateX(Math.PI/48);
                        }
                    }
                } else if(keyCode == 77){
                    if(nodeLeftKnee){
                        var currentRotationX = nodeLeftKnee.rotation._x;
                        if(currentRotationX > 0){
                            console.log("Rotate Left Knee CW");
                            nodeLeftKnee.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 86){
                    if(nodeBelly){
                        var currentRotationX = nodeBelly.rotation._x;
                        if(currentRotationX > -0.4){
                            console.log("Rotate Belly CCW");
                            nodeBelly.rotateX(-Math.PI/48);
                        }
                    }
                } else if(keyCode == 66){
                    if(nodeBelly){
                        var currentRotationX = nodeBelly.rotation._x;
                        if(currentRotationX < 0.8){
                            console.log("Rotate Belly CW");
                            nodeBelly.rotateX(Math.PI/48);
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
            this.clearScene = function () {

                if (scope.scene.children.length !=0) {

                    for( var  i = scope.scene.children.length - 1; i >= 0; i--) {

                        var obj = scope.scene.children[i];
                        scope.scene.remove(obj);
                    }
                }
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

    
