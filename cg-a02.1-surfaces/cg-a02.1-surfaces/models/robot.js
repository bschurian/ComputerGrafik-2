/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var Robot = function(){
            
            var cube = new THREE.CubeGeometry( 1, 1, 1);
            var cylinder = new THREE.CylinderGeometry( 1, 1, 1, 32);
            var sphere = new THREE.SphereGeometry( 1, 32, 32);

            
            var material = new THREE.MeshBasicMaterial( {color: 0x0000aa} );
            material = new THREE.MeshPhongMaterial({color: 0x20407A, specular: 0xD4D4D4, shininess: 0.05, shading: THREE.FlatShading});
            
            var headSize  = [130, 130, 130];
            
            var handSize   = [ 20,  80,  60];
            var uArmSize   = [ 25, 160,  50];
            var ellSize    = [ 25,  15,  15];
            var oArmSize   = [ 35, 200,  35];
            var schulSize  = [ 30,  30,  30];

            var fuSize     = [110,  20, uArmSize[1]];
            var wadeSize   = [100, 200, 100];
            var knieSize   = [ 90, 100,  90];
            var oSchSize   = [110, 100,  50];
            var hueftGSize = [ 40,  40,  45];

            var torsoSize  = [250, 300, 150];
            var bauchSize  = [230, 100, 125];
            var hueftSize  = [200, 200, 110];
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
            this.lSchul.translateX(+(torsoSize[0]/2+schulSize[0]/2));
            this.lSchul.translateY(  torsoSize[1]/2-schulSize[1]/2);

            this.rFu = new THREE.Object3D();
            this.rFu.name = "rFu";
            this.rFu.translateY(-(fuSize[1]/2 + wadeSize[1]/2));
            this.rFu.translateZ(  fuSize[2]/2 - wadeSize[2]/2);
            this.rWade = new THREE.Object3D();
            this.rWade.name = "rWade";
            this.rWade.add(this.rFu);
            this.rWade.translateY(-(wadeSize[1]/2 + knieSize[1]/2));            
            this.rKnie = new THREE.Object3D();
            this.rKnie.name = "rKnie";
            this.rKnie.add(this.rWade);
            this.rKnie.translateY(-(knieSize[1]/2 + oSchSize[1]/2));            
            this.rOSch = new THREE.Object3D();
            this.rOSch.name = "rOSch";
            this.rOSch.add(this.rKnie);
            this.rOSch.translateY(-(oSchSize[1]/2 + hueftGSize[1]/2));            
            this.rHueftG = new THREE.Object3D();
            this.rHueftG.name = "rHueftG";
            this.rHueftG.add(this.rOSch);
            this.rHueftG.translateX(-(hueftSize[0]/2 + hueftGSize[0]/2));
            this.rHueftG.translateY( -hueftSize[1]/2 + hueftGSize[1]/2);            
            
            this.lFu = new THREE.Object3D();
            this.lFu.name = "lFu";
            this.lFu.translateY(-(fuSize[1]/2 + wadeSize[1]/2));            
            this.lFu.translateZ(  fuSize[2]/2 - wadeSize[2]/2);
            this.lWade = new THREE.Object3D();
            this.lWade.name = "lWade";
            this.lWade.add(this.lFu);
            this.lWade.translateY(-(wadeSize[1]/2 + knieSize[1]/2));            
            this.lKnie = new THREE.Object3D();
            this.lKnie.name = "lKnie";
            this.lKnie.add(this.lWade);
            this.lKnie.translateY(-(knieSize[1]/2 + oSchSize[1]/2));            
            this.lOSch = new THREE.Object3D();
            this.lOSch.name = "lOSch";
            this.lOSch.add(this.lKnie);
            this.lOSch.translateY(-(oSchSize[1]/2 + hueftGSize[1]/2));            
            this.lHueftG = new THREE.Object3D();
            this.lHueftG.name = "lHueftG";
            this.lHueftG.add(this.lOSch);
            this.lHueftG.translateX(+(hueftSize[0]/2 + hueftGSize[0]/2));
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
            var scale = function(mesh, scaleArray) {
                mesh.scale.set(scaleArray[0], scaleArray[1], scaleArray[2]);
            };

            this.headSkin = new THREE.Mesh( sphere, material);
            // this.headSkin.rotateY(Math.PI/4);
            scale(this.headSkin, headSize);
            this.head.add(this.headSkin);
                        
            this.rHandSkin = new THREE.Mesh( sphere, material);
            scale(this.rHandSkin, handSize);
            this.rHand.add(this.rHandSkin);                        
            this.rUArmSkin = new THREE.Mesh( cube, material);
            scale(this.rUArmSkin, uArmSize);
            this.rUArm.add(this.rUArmSkin);
            this.rEllSkin = new THREE.Mesh( cylinder, material);
            this.rEllSkin.rotateZ(Math.PI/2);
            scale(this.rEllSkin, ellSize);
            this.rEll.add(this.rEllSkin);
            this.rOArmSkin = new THREE.Mesh( cube, material);
            scale(this.rOArmSkin, oArmSize);
            this.rOArm.add(this.rOArmSkin);            
            this.rSchulSkin = new THREE.Mesh( sphere, material);
            scale(this.rSchulSkin, schulSize);
            this.rSchul.add(this.rSchulSkin);

            this.lHandSkin = new THREE.Mesh( sphere, material);
            scale(this.lHandSkin, handSize);
            this.lHand.add(this.lHandSkin);                        
            this.lUArmSkin = new THREE.Mesh( cube, material);
            scale(this.lUArmSkin, uArmSize);
            this.lUArm.add(this.lUArmSkin);
            this.lEllSkin = new THREE.Mesh( cylinder, material);
            scale(this.lEllSkin, ellSize);
            this.lEllSkin.rotateZ(Math.PI/2);
            this.lEll.add(this.lEllSkin);
            this.lOArmSkin = new THREE.Mesh( cube, material);
            scale(this.lOArmSkin, oArmSize);
            this.lOArm.add(this.lOArmSkin);            
            this.lSchulSkin = new THREE.Mesh( sphere, material);
            scale(this.lSchulSkin, schulSize);
            this.lSchul.add(this.lSchulSkin);

            this.rFuSkin = new THREE.Mesh( cube, material);
            scale(this.rFuSkin, fuSize);
            this.rFu.add(this.rFuSkin);                        
            this.rWadeSkin = new THREE.Mesh( cube, material);
            scale(this.rWadeSkin, wadeSize);
            this.rWade.add(this.rWadeSkin);
            this.rKnieSkin = new THREE.Mesh( cylinder, material);
            scale(this.rKnieSkin, knieSize);
            this.rKnieSkin.rotateZ(Math.PI/2);
            this.rKnie.add(this.rKnieSkin);
            this.rOSchSkin = new THREE.Mesh( cube, material);
            scale(this.rOSchSkin, oSchSize);
            this.rOSch.add(this.rOSchSkin);            
            this.rHueftGSkin = new THREE.Mesh( sphere, material);
            scale(this.rHueftGSkin, hueftGSize);
            this.rHueftG.add(this.rHueftGSkin);            

            this.lFuSkin = new THREE.Mesh( cube, material);
            scale(this.lFuSkin, fuSize);
            this.lFu.add(this.lFuSkin);                        
            this.lWadeSkin = new THREE.Mesh( cube, material);
            scale(this.lWadeSkin, wadeSize);
            this.lWade.add(this.lWadeSkin);
            this.lKnieSkin = new THREE.Mesh( cylinder, material);
            scale(this.lKnieSkin, knieSize);
            this.lKnieSkin.rotateZ(Math.PI/2);
            this.lKnie.add(this.lKnieSkin);
            this.lOSchSkin = new THREE.Mesh( cube, material);
            scale(this.lOSchSkin, oSchSize);
            this.lOSch.add(this.lOSchSkin);            
            this.lHueftGSkin = new THREE.Mesh( sphere, material);
            scale(this.lHueftGSkin, hueftGSize);
            this.lHueftG.add(this.lHueftGSkin);            

            this.torsoSkin = new THREE.Mesh( cube, material);
            scale(this.torsoSkin, torsoSize);
            this.torso.add(this.torsoSkin);
            this.bauchSkin = new THREE.Mesh( cube, material);
            scale(this.bauchSkin, bauchSize);
            this.bauch.add(this.bauchSkin);
            this.huefteSkin = new THREE.Mesh( cube, material);
            scale(this.huefteSkin, hueftSize);
            this.huefte.add(this.huefteSkin);
            
                        
            console.log(this.root);
            
            this.getMesh = function() {
                return this.root;
            }

        };

        return Robot;
    }));

