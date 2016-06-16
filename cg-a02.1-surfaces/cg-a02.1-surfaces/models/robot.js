/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var Robot = function(){

            var headSize = [];
            var torsoSize = [];
            // weitere Groessen

            // root
            this.root = new THREE.Object3D();

            // skeleton
            this.head = new THREE.Object3D();
            this.head.name = "head";
            this.head.translateY(torsoSize[1]/2 + headSize[1]/2);
            // weitere Skelett-Elemente


            this.torso = new THREE.Object3D();
            this.torso.name = "torso";
            this.torso.add(this.head);
            // das gleiche fuer alle Elemente


            // skin
            this.headSkin = new THREE.Mesh( new THREE.CubeGeometry( headSize[0], headSize[1], headSize[2]),
                new THREE.MeshNormalMaterial());
            this.headSkin.rotateY(Math.PI/4);
            this.head.add(this.headSkin);


            this.torsoSkin = new THREE.Mesh( new THREE.CubeGeometry( torsoSize[0], torsoSize[1], torsoSize[2]),
                new THREE.MeshNormalMaterial());
            this.torso.add(this.torsoSkin);



            this.root.add(this.torso);

        };

        return Robot;
    }));

