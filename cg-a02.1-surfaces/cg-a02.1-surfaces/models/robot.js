/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var Robot = function(){
            
            var cube = new THREE.CubeGeometry( 40, 40, 40);
            var cylinder = new THREE.CylinderGeometry( 1, 1, 1, 8);
            var sphere = new THREE.SphereGeometry( 1, 8, 8);
            
            var material = new THREE.MeshBasicMaterial( {color: 0x0000aa} );
            
            var headSize  = [130, 130, 130];
            var handSize  = [ 15,  15,  15];
            var uArmSize  = [ 25,  80,  25];
            var ellSize   = [ 25,  15,  15];
            var oArmSize  = [ 35, 100,  35];
            var schulSize = [ 30,  30,  30];
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
            
            this.bauch;
            this.huefte;
            this.rHueftG;
            this.rOSch;
            this.rKnie;
            this.rWade;
            this.rFu;
            


            this.torso = new THREE.Object3D();
            this.torso.name = "torso";
            this.torso.add(this.head);
            this.torso.add(this.rSchul);
            
            
            //root
            this.root = new THREE.Object3D();
            this.root.add(this.torso);
            

            // skin
            //var cubeMesh = ;
            this.headSkin = new THREE.Mesh( cube, material);
            this.headSkin.rotateY(Math.PI/4);
            this.head.add(this.headSkin);
            
            this.rHandSkin = new THREE.Mesh( cube, material);
            this.rHand.add(this.rHandSkin);
            
            this.rUArmSkin = new THREE.Mesh( cube, material);
            this.rUArm.add(this.rUArmSkin);
            
            this.rEllSkin = new THREE.Mesh( cube, material);
            this.rEll.add(this.rEllSkin);
            
            this.rOArmSkin = new THREE.Mesh( cube, material);
            this.rOArm.add(this.rOArmSkin);

            this.rSchulSkin = new THREE.Mesh( cube, material);
            this.rSchul.add(this.rSchulSkin);

            this.torsoSkin = new THREE.Mesh( cube, material);
            this.torso.add(this.torsoSkin);
            
            console.log(this.root);
            
            this.getMesh = function() {
                return this.root;
            }

        };

        return Robot;
    }));

