/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var Material = function(){

            var point = new THREE.PointsMaterial({color: 0xaaaaaa, size: 10, vertexColors: THREE.VertexColors});

            var wireFrame = new THREE.MeshBasicMaterial({wireframe: true, color: 0x00ffaa});

            var meshBasic = [new THREE.MeshBasicMaterial({color: 0xff0000}), wireFrame];

            this.setMaterial = function (geometry, text) {
                var mesh;
                switch(text){
                    case "point":
                        mesh = new THREE.Points(geometry, point);
                        break;
                    case "wireframe":
                        mesh = new THREE.Mesh(geometry, wireFrame);
                        break;
                    case "multi":
                        mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, meshBasic);
                        break;
                    default:
                        console.warn("something went wrong with giving "+geometry+" its material");
                }
                console.log(mesh);
                return mesh;
            }
        }

        return Material;
        
    }));

/**
 * Created by Clemens on 17.06.2016.
 */
