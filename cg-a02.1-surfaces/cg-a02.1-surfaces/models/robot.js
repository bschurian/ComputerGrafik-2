/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var Robot = function(){
            
            var cube = new THREE.CubeGeometry( 1,1,1 );
            var cylinder = new THREE.CylinderGeometry( 1, 1, 1, 1);
            var sphere = new THREE.SphereGeometry( 1, 1, 1);
            
            var material = new THREE.MeshPhongMaterial( {color: 0xf02222} );
            var phong = new THREE.MeshPhongMaterial({color: 0x969595, specular: 0xDED9D9, shininess: 0});

            var headSize  = [130, 130, 130];
            var handSize  = [ 15,  15,  15];
            var uArmSize  = [ 25,  80,  25];
            var ellSize   = [ 25,  15,  15];
            var oArmSize  = [ 35, 100,  35];
            var schulSize = [ 15, 15, 15 ];
            var torsoSize = [250, 400, 150];
            // weitere Groessen

            // skeleton
            this.head = new THREE.Object3D();
            this.head.name = "head";
            this.head.translateY(torsoSize[1]/2 + headSize[1]/2);
            // weitere Skelett-Elemente
            
            this.rHand = new THREE.Object3D();
            this.rHand.name = "rHand";
            this.rHand.translateY(-(handSize[1]/2 + uArmSize[1]/2));

            this.rUArm = new THREE.Object3D();
            this.rUArm.name = "rUArm";
            this.rUArm.add(this.rHand);
            this.rUArm.translateY(-(uArmSize[1]/2 + ellSize[1]/2));

            this.rEll = new THREE.Object3D();
            this.rEll.name = "rEll";
            this.rEll.add(this.rUArm);
            this.rEll.translateY(-(ellSize[1]/2 + oArmSize[1]/2));

            this.rOArm = new THREE.Object3D();
            this.rOArm.name = "rOArm";
            this.rOArm.add(this.rEll);
            this.rOArm.translateY(-(oArmSize[1]/2 - schulSize[1]/2));

            this.rSchul = new THREE.Object3D();
            this.rSchul.name = "rSchul";
            this.rSchul.add(this.rOArm);
            this.rSchul.translateX(-(torsoSize[0]/2+schulSize[0]/2));
            this.rSchul.translateY(  torsoSize[1]/2-schulSize[1]/2);


            this.torso = new THREE.Object3D();
            this.torso.name = "torso";
            this.torso.add(this.head);
            this.torso.add(this.rSchul);

            //root
            this.root = new THREE.Object3D();
            this.root.add(this.torso);
            

            // skin
            //var cubeMesh = ;
            this.headSkin = new THREE.Mesh( cube, phong);
            this.headSkin.rotateY(Math.PI/4);
            this.headSkin.scale.set(headSize[0], headSize[1], headSize[2]);
            this.head.add(this.headSkin);
            
            this.rHandSkin = new THREE.Mesh( cube, phong);
            this.rHandSkin.scale.set(handSize[0], handSize[1], handSize[2]);
            this.rHand.add(this.rHandSkin);
            
            this.rUArmSkin = new THREE.Mesh( cube, phong);
            this.rUArmSkin.scale.set(uArmSize[0], uArmSize[1], uArmSize[2]);
            this.rUArm.add(this.rUArmSkin);

            this.rEllSkin = new THREE.Mesh( cube, phong);
            this.rEllSkin.scale.set(ellSize[0], ellSize[1], ellSize[2]);
            this.rEll.add(this.rEllSkin);

            
            this.rOArmSkin = new THREE.Mesh( cube, phong);
            this.rOArmSkin.scale.set(oArmSize[0], oArmSize[1], oArmSize[2]);
            this.rOArm.add(this.rOArmSkin);

            this.rSchulSkin = new THREE.Mesh( new THREE.CubeGeometry(1,1,1), phong);
            this.rSchulSkin.scale.set(schulSize[0], schulSize[1], schulSize[2]);
            this.rSchul.add(this.rSchulSkin);

            this.torsoSkin = new THREE.Mesh( cube, phong);
            this.torsoSkin.scale.set(torsoSize[0], torsoSize[1], torsoSize[2]);
            this.torso.add(this.torsoSkin);
            
            console.log(this.root);
            
            this.getMesh = function() {
                return this.root;
            }

        };

        return Robot;
    }));

