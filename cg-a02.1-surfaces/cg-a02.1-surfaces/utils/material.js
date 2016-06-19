/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var Material=function(scene){

            var point = new THREE.PointsMaterial({color: 0xaaaaaa, size: 10, vertexColors: THREE.VertexColors});

            var wireFrame = new THREE.MeshBasicMaterial({wireframe: true, color: 0x00ffaa});

            var meshBasic = [new THREE.MeshBasicMaterial({color: 0xff0000}), wireFrame];

            this.setMaterial = function (bufferGeometry, text) {

                console.log(bufferGeometry);
                console.log(text);

                if (text == "point") {

                    bufferGeometry.mesh = new THREE.Points(bufferGeometry.geometry, point);
                    scene.addBufferGeometry(bufferGeometry);
                }
                if (text == "wireframe") {

                    bufferGeometry.mesh = new THREE.Mesh(bufferGeometry.geometry, wireFrame);
                    console.log(bufferGeometry);
                    scene.addBufferGeometry(bufferGeometry);
                }
                if (text == "multi") {

                    bufferGeometry.mesh = THREE.SceneUtils.createMultiMaterialObject(bufferGeometry.geometry, meshBasic);
                    scene.addBufferGeometry(bufferGeometry);
                }
            }
        }

        return Material;
        
    }));

/**
 * Created by Clemens on 17.06.2016.
 */
