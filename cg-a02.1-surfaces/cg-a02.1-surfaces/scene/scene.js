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

            scope.camera = new THREE.PerspectiveCamera( 72, width / height, 0.1, 2000 );
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();


            //light
            var ambientLight = new THREE.AmbientLight(0x0c0c0c);
            scope.scene.add(ambientLight);

            var spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(-20, 0, 1000);

            spotLight.castShadow = true;

            scope.scene.add(spotLight);

            var audiolistener = new THREE.AudioListener();
            scope.camera.add(audiolistener);
            var sound = new THREE.Audio(audiolistener);
            scope.scene.add(sound);
            var loader = new THREE.AudioLoader();
            loader.load('audio/music.m4a', function(audioBuffer){
                sound.setBuffer(audioBuffer);
            },
            function(xhr){
                console.log(xhr + " loading audio");
            },
            function(xhr){
                console.log("Error while loading audio");
            });

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
                            console.log(currentRotationX);
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

            this.animate = function(){
                sound.play();

                var nodeRightElbow = scope.scene.getObjectByName("rEll", true);
                var nodeLeftElbow = scope.scene.getObjectByName("lEll", true);
                var nodeRightShoulder = scope.scene.getObjectByName("rSchul", true);
                var nodeLeftShoulder = scope.scene.getObjectByName("lSchul", true);
                var nodeRightHip = scope.scene.getObjectByName("rHueftG", true);
                var nodeLeftHip = scope.scene.getObjectByName("lHueftG", true);
                var nodeRightKnee = scope.scene.getObjectByName("rKnie", true);
                var nodeLeftKnee = scope.scene.getObjectByName("lKnie", true);
                var nodeBelly = scope.scene.getObjectByName("bauch", true);

                var animations = [];

                var count = 0;
                var alreadyDanced = false;

                var prepareRightHand = function(){
                    if(nodeRightShoulder){
                        console.log("move 1");
                        var currentRotationX = nodeRightShoulder.rotation._x;
                        if(currentRotationX < -1.0){
                            count = 0;
                            pointWithRightHand();
                            return;
                        }

                        nodeRightShoulder.rotateX(-Math.PI/40);
                    }
                    count++;
                    window.setTimeout(prepareRightHand, 33);
                };


                var pointWithRightHand = function(){
                    if(nodeRightShoulder){
                        console.log("move 2");
                        if(count > 130){
                            count = 0;
                            prepareForDrop();
                            return;
                        }
                        var direction = -1;
                        if((count > 15 && count < 35) || (count > 65) ){
                            direction = 1;
                        }
                        var hipDirection = direction;
                        if(count > 120){
                            hipDirection = -2.74;
                        }

                        nodeLeftHip.rotateX(hipDirection*Math.PI/220);

                        nodeRightShoulder.rotateX(direction*Math.PI/150);

                        count++;
                    }
                    window.setTimeout(pointWithRightHand,25);
                };

                var prepareForDrop = function(){
                    if(nodeBelly){
                        console.log("move 3");
                        if(count > 129){
                            count = 0;
                            randomCameraAngles();
                            return;
                        }

                        var direction = -1;
                        if((count > 15 && count < 45) || (count > 75 && count < 100) || (count > 115 && count < 128)){
                            direction = 1;
                        }
                        nodeBelly.rotateZ(direction*Math.PI/104);
                        count++;
                    }
                    window.setTimeout(prepareForDrop, 25);
                };

                var randomCameraAngles = function(){
                    console.log("camera effects");
                    if(count > 5){
                        count = 0;
                        transitionCameraToDance();
                        return;
                    }

                    switch(count){
                        case 0: break;
                        case 1: scope.camera.position.z = 400;
                            scope.camera.position.y = 300;
                            break;
                        case 2: scope.camera.position.z = 700;
                            scope.camera.position.x = 300;
                            scope.camera.rotation.y = 0.5;
                            break;
                        case 3: scope.camera.position.z = 1200;
                            scope.camera.position.x = -200;
                            scope.camera.position.y = 800;
                            scope.camera.rotation.x = -0.4;
                            scope.camera.rotation.y = 0;
                            break;
                        case 4: scope.camera.position.z = 900;
                            scope.camera.position.x = 400;
                            scope.camera.position.y = 0;
                            scope.camera.rotation.x = 0;
                            scope.camera.rotation.z = 0.4;
                            scope.camera.rotation.y = 0.2;
                            break;
                        case 5: scope.camera.position.z = 600;
                            scope.camera.position.y = -500;
                            scope.camera.position.x = 0;
                            scope.camera.rotation.x = 0.6;
                            scope.camera.rotation.z = 0;
                            scope.camera.rotation.y = 0;
                            break;
                        default: break;
                    }

                    count++;
                    window.setTimeout(randomCameraAngles, 520);
                };

                var transitionCameraToDance = function(){
                    console.log("transition");
                    if(count >= 2){
                        count = 0;
                        danceY();
                        return;
                    }


                    scope.camera.position.x = 0;
                    scope.camera.position.y = 0;
                    scope.camera.position.z = 1000;
                    scope.camera.rotation.x = 0;
                    scope.camera.rotation.y = 0;
                    scope.camera.rotation.z = 0;

                    count++;
                    window.setTimeout(transitionCameraToDance, 100);
                };

                var danceY = function(){
                    console.log("Y");
                    if(count > 70){
                        count = 0;
                        danceM();
                        return;
                    }

                    nodeRightShoulder.rotateZ(-Math.PI/80);
                    nodeLeftShoulder.rotateZ(Math.PI/80);

                    nodeRightHip.rotateZ(-Math.PI/2000);
                    nodeLeftHip.rotateZ(Math.PI/2000);

                    count++;
                    window.setTimeout(danceY, 15);
                };

                var danceM = function(){
                    console.log("M");
                    if(count > 20){
                        count = 0;
                        danceC();
                        return;
                    }

                    nodeRightElbow.rotateZ(-Math.PI/40);
                    nodeLeftElbow.rotateZ(Math.PI/40);

                    nodeRightHip.rotateZ(Math.PI/700);
                    nodeLeftHip.rotateZ(-Math.PI/700);

                    count++;
                    window.setTimeout(danceM, 15);
                };

                var danceC = function(){
                    console.log("C");
                    if(count > 20){
                        count = 0;
                        danceA();
                        return;
                    }

                    nodeLeftShoulder.rotateZ(-Math.PI/40);
                    nodeRightShoulder.rotateZ(-Math.PI/300);

                    count++;
                    window.setTimeout(danceC, 20);
                };

                var danceA = function(){
                    console.log("A");
                    if(count > 40){
                        count = 0;
                        prepareForNextYMCA();
                        return;
                    }

                    nodeLeftShoulder.rotateZ(Math.PI/82);
                    nodeRightShoulder.rotateZ(Math.PI/415);
                    nodeRightElbow.rotateZ(Math.PI/80);
                    nodeLeftElbow.rotateZ(-Math.PI/80);


                    count++;
                    window.setTimeout(danceA, 15);
                };
                
                //ignore this trash
                    var shootAnyExtremity = function(extremityNode, timeSpanInMillis = 4000) {
                        if(extremityNode) {
                            //wiggle maxWiggle deegres radiant aurond x, y and/or z axis
                            var maxWiggleDegrees = 10/180 * Math.PI;
                            var xW = 0;
                            var yW = 0;
                            var zW = 0;
                            var rotateAround = function(axisCounter, axisString, intensity) {
                                if(Math.random() > 0.1) return 0;
                                var prefix = ((Math.random() * 2 / Math.PI * 2 - 1) <= Math.atan(axisCounter)) ? -1 : 1;
                                switch(axisString) {
                                    case "x": 
                                        extremityNode.rotateX(prefix * intensity);
                                        break;
                                    case "y":
                                        extremityNode.rotateY(prefix * intensity);
                                        break;
                                    case "z":
                                        extremityNode.rotateZ(prefix * intensity);
                                        break;
                                    default:
                                        break;
                                }
                                return prefix;
                            };
                            for(var t = 0; t < timeSpanInMillis; t *= timeSpanInMillis / 4) {

                            }
                        }
                    }

                var prepareForNextYMCA = function(){
                    console.log("little break");
                    if(count > 70){
                        count = 0;
                        if(!alreadyDanced){
                            danceY();
                        }
                        alreadyDanced = true;
                        return;
                    }
                    var progressDelay = 90;
                    if(alreadyDanced){
                        progressDelay = 77;
                    }

                    nodeRightShoulder.rotateZ(Math.PI/progressDelay);
                    nodeLeftShoulder.rotateZ(-Math.PI/progressDelay);

                    count++;
                    window.setTimeout(prepareForNextYMCA, 15);
                };


                animations.push(prepareRightHand);
                // animations.push(pointWithRightHand);

                animations.forEach(function(a){
                    a();
                });


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

    
