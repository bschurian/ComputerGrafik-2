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

        var ObjMesh = function(scene, config) {
            var objM = this;
            this.text = config.text;
            
            var manager = new THREE.LoadingManager();
            var loader = new THREE.OBJLoader(manager);

            var loadedObj = undefined;
            var path = 'mesh/loaders/dromedar.obj';

            loader.load(path, function(geometry){
                
                console.log(geometry);
                
                var kidG;
                geometry.traverse( function (child){
                   if(child instanceof THREE.Mesh) kidG = child.geometry;
                });
                geometry.children[0] = (new Material).setMaterial(kidG, config.text);
                
                loadedObj = geometry.children[0];
                loadedObj.scale.set(100,100,100);
                console.log(loadedObj);
                
                scene.addMesh(loadedObj);
            });
        };

        return ObjMesh;
    }));
