/*
 * Module: ObjMesh
 */

/* requireJS module definition */
define(["three", "objloader"],
    (function(THREE, OBJLoader) {

        "use strict";

        /**
         * @param scene  - reference to the scene
         * @constructor
         */

        var ObjMesh = function(scene) {

            var manager = new THREE.LoadingManager();
            var loader = new THREE.OBJLoader(manager);

            var loadedObj = undefined;
            var path = 'mesh/loaders/dromedar.obj';
            var material = new THREE.MeshBasicMaterial({color: 'yellow'});

            var onProgress = function ( xhr ) {
                if ( xhr.lengthComputable ) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log( Math.round(percentComplete, 2) + '% downloaded' );
                }
            };

            var onError = function ( xhr ) {
                //console.log("ERROR");
            };

            loader.load(path, function(geometry){

                /* geometry.traverse(function (child) {

                 if (child instanceof THREE.Mesh) {
                 child.material = material;
                 }
                 });*/

                // loadedObj = geometry;


                

                loadedObj = geometry;
                geometry.scale.set(100,100,100);
                scene.addMesh(geometry);
                

            },onProgress, onError);

            console.log("abc");
            console.log(loadedObj);



            this.getMesh = function() {
                
                return loadedObj;
            };
        };

        return ObjMesh;
    }));
