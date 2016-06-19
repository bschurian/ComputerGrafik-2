/*
 * Module: ObjMesh
 */

/* requireJS module definition */
define(["three", "objloader","material"],
    (function(THREE, OBJLoader, Material) {

        "use strict";

        /**
         * @param scene  - reference to the scene
         * @constructor
         */

        var ObjMesh = function(scene,mat) {

            var manager = new THREE.LoadingManager();
            var loader = new THREE.OBJLoader(manager);

            var loadedObj = undefined;
            var path = 'mesh/loaders/dromedar.obj';
            var material = new THREE.MeshBasicMaterial({color: 'yellow'});

            if (mat == "point") {

               material = new THREE.PointsMaterial({color: 0xaaaaaa, size: 10, vertexColors: THREE.VertexColors});
            }
            if (mat == "wireframe") {

               material = new THREE.MeshBasicMaterial({wireframe: true, color: 0x00ffaa});
            }
            /*if (mat == "multi") {

              material= [new THREE.MeshBasicMaterial({color: 0xff0000}), new THREE.MeshBasicMaterial({wireframe: true, color: 0x00ffaa})];
            }*/

            loader.load(path, function(geometry){

                 geometry.traverse(function (child) {

                 if (child instanceof THREE.Mesh) {
                 child.material = material;
                 }
                 });

                loadedObj = geometry;
                console.log(geometry);
                geometry.scale.set(100,100,100);
                scene.addMesh(geometry);
            });

            this.getMesh = function() {
                
                return loadedObj;
            };
        };

        return ObjMesh;
    }));
