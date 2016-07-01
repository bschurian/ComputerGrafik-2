/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";

        var Planet = function(config) {


            this.root = new THREE.Object3D();

            
            var scope = this;

            // implement ShaderMaterial using the code from
            // the lecture
            
            scope.material = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.merge([
                    THREE.UniformsLib['lights'],
                    {
                        phongDiffuseMaterial: {type: 'c', value: new THREE.Color(1, 0, 0)},
                        phongSpecularMaterial: {type: 'c', value: new THREE.Color(0.7, 0.7, 0.7)},
                        phongAmbientMaterial: {type: 'c', value: new THREE.Color(0.8, 0.2, 0.2)},
                        phongShininessMaterial: {type: 'f', value: 16.0},
                        topographyTexture: {type: 't', value: {}},
                        daytimeTexture: {type: 't', value: {}},
                        nighttimeTexture: {type: 't', value: {}},
                        cloudedTexture: {type: 't', value: {}},
                        daytimeTextureBool: {type: 'i', value: 0},
                        nighttimeTextureBool: {type: 'i', value: 0},
                        cloudedTextureBool: {type: 'i', value: 0}
                    }
                ]),
                vertexShader: Shaders.getVertexShader("planet"),
                fragmentShader: Shaders.getFragmentShader("planet"),
                lights: true
            });
            
            // load and create required textures
            var textureLoader = new THREE.TextureLoader();
                        
            textureLoader.load( "textures/earth_topography_2048.jpg", function(texture) {
                scope.material.uniforms.topographyTexture.value = texture;
            });
            if(config.day == true){
                textureLoader.load( "textures/earth_month04.jpg", function(texture) {
                    scope.material.uniforms.daytimeTexture.value = texture;
                });
            }
            if(config.night == true){
                textureLoader.load( "textures/earth_at_night_2048.jpg", function(texture) {
                    scope.material.uniforms.nighttimeTexture.value = texture;
                });
            }
            if(config.clouded == true){
                textureLoader.load( "textures/earth_clouds_2048.jpg", function(texture) {
                    scope.material.uniforms.cloudedTexture.value = texture;
                });
            }
            
            // hint:
            // texture can be assigned only when it is loaded completely
            // and then can be set like any other uniform variable
            // material.uniforms.<uniform-var-name>.value   = <uniform-value>;
            
            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry(400, 100,100), scope.material );
            scope.mesh.name = "planet";
                        
            scope.root.add(scope.mesh);




            this.getMesh = function() {
                return this.root;
            };


        }; // constructor

        return Planet;

    })); // define module


