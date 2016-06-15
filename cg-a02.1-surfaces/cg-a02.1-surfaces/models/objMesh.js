/* requireJS module definition */
define(["three",  "objloader"],
    (function(THREE, OBJLoader ) {

        "use strict";
        
        var objLoader = new THREE.OBJLoader();
    
        var OBJMesh = function (location, config) {
            
            var color = new THREE.Color();
            
            this.mesh = undefined;
            var mesh = this.mesh;
            var material;            
            objLoader.load(location, function(object) {
                mesh = object;
            });
            
            //this.mesh.material = material;
            
            this.getMesh = function() {
                return this.mesh;
            }
        };

        return OBJMesh;
    
    }));

