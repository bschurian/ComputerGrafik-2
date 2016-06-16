/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var Robot = function(){
            
            var cube = new THREE.CubeGeometry( 40, 40, 40);
            var cylinder = new THREE.CylinderGeometry( 1, 1, 1, 8);
            var sphere = new THREE.SphereGeometry( 1, 8, 8);
            
            var material = new THREE.MeshBasicMaterial( {color: 0x0000aa} );
            // var phong = new THREE.MeshPhongMaterial({coli});
            
            var headSize  = [130, 130, 130];

            var handSize   = [ 15,  15,  15];
            var uArmSize   = [ 25,  80,  25];
            var ellSize    = [ 25,  15,  15];
            var oArmSize   = [ 35, 100,  35];
            var schulSize  = [ 30,  30,  30];

            var fuSize     = [100, 100, 100];
            var wadeSize   = [100, 100, 100];
            var knieSize   = [100, 100, 100];
            var oSchSize   = [ 70, 100,  50];
            var hueftGSize = [ 65,  20,  45];

            var torsoSize  = [250, 300, 150];
            var bauchSize  = [230, 100, 125];
            var hueftSize  = [200, 200, 100];
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

            this.lHand = new THREE.Object3D();
            this.lHand.name = "lHand";
            this.lHand.translateY(-(handSize[1]/2 + uArmSize[1]/2));
            this.lUArm = new THREE.Object3D();
            this.lUArm.name = "lUArm";
            this.lUArm.add(this.lHand);
            this.lUArm.translateY(-(uArmSize[1]/2 + ellSize[1]/2));
            this.lEll = new THREE.Object3D();
            this.lEll.name = "lEll";
            this.lEll.add(this.lUArm);
            this.lEll.translateY(-(ellSize[1]/2 + oArmSize[1]/2));
            this.lOArm = new THREE.Object3D();
            this.lOArm.name = "lOArm";
            this.lOArm.add(this.lEll);
            this.lOArm.translateY(-(oArmSize[1]/2 - schulSize[1]/2));
            this.lSchul = new THREE.Object3D();
            this.lSchul.name = "lSchul";
            this.lSchul.add(this.lOArm);
            this.lSchul.translateX(-(torsoSize[0]/2+schulSize[0]/2));
            this.lSchul.translateY(  torsoSize[1]/2-schulSize[1]/2);

            this.rFu = new THREE.Object3D();
            this.rFu.name = "rFu";
            this.rFu.translateY(-(fuSize[1]/2 - wadeSize[1]/2));
            this.rWade = new THREE.Object3D();
            this.rWade.name = "rWade";
            this.rWade.add(this.rFu);
            this.rWade.translateY(-(wadeSize[1]/2 - knieSize[1]/2));
            this.rKnie = new THREE.Object3D();
            this.rKnie.name = "rKnie";
            this.rKnie.add(this.rWade);
            this.rKnie.translateY(-(knieSize[1]/2 - oSchSize[1]/2));
            this.rOSch = new THREE.Object3D();
            this.rOSch.name = "rOSch";
            this.rOSch.add(this.rKnie);
            this.rOSch.translateY(-(oSchSize[1]/2 - hueftGSize[1]/2));
            this.rHueftG = new THREE.Object3D();
            this.rHueftG.name = "rHueftG";
            this.rHueftG.add(this.rOSch);
            this.rHueftG.translateX(-(hueftSize[0]/2 + hueftGSize[0]/2));
            this.rHueftG.translateY( -hueftSize[1]/2 + hueftGSize[1]/2);

            this.lFu = new THREE.Object3D();
            this.lFu.name = "lFu";
            this.lFu.translateY(-(fuSize[1]/2 - wadeSize[1]/2));
            this.lWade = new THREE.Object3D();
            this.lWade.name = "lWade";
            this.lWade.add(this.lFu);
            this.lWade.translateY(-(wadeSize[1]/2 - knieSize[1]/2));
            this.lKnie = new THREE.Object3D();
            this.lKnie.name = "lKnie";
            this.lKnie.add(this.lWade);
            this.lKnie.translateY(-(knieSize[1]/2 - oSchSize[1]/2));
            this.lOSch = new THREE.Object3D();
            this.lOSch.name = "lOSch";
            this.lOSch.add(this.lKnie);
            this.lOSch.translateY(-(oSchSize[1]/2 - hueftGSize[1]/2));
            this.lHueftG = new THREE.Object3D();
            this.lHueftG.name = "lHueftG";
            this.lHueftG.add(this.lOSch);
            this.lHueftG.translateX(-(hueftSize[0]/2 + hueftGSize[0]/2));
            this.lHueftG.translateY( -hueftSize[1]/2 + hueftGSize[1]/2);

            this.torso = new THREE.Object3D();
            this.torso.name = "torso";
            this.torso.translateY(  torsoSize[1]/2 + bauchSize[1]/2);
            this.bauch = new THREE.Object3D();
            this.bauch.name = "bauch";
            this.bauch.add(this.torso);
            this.bauch.translateY(  bauchSize[1]/2 + hueftSize[1]/2);
            this.huefte = new THREE.Object3D();
            this.huefte.name = "huefte";
            this.huefte.add(this.bauch);

            this.torso.add(this.head);
            this.torso.add(this.rSchul);
            this.torso.add(this.lSchul);
            this.huefte.add(this.rHueftG);
            this.huefte.add(this.lHueftG);

            //root
            this.root = new THREE.Object3D();
            this.root.add(this.huefte);
            

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

