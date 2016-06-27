/**
 * Created by Clemens on 24.06.2016.
 */

define(["three", "shaders"],
    (function (THREE, Shaders) {

       var PhongSphere=function(){

           this.root=new THREE.Object3D();

           var scope=this;

           scope.material = new THREE.ShaderMaterial({
               uniforms: THREE.UniformsUtils.merge([
                   THREE.UniformsLib['lights'],
                   {
                       phongDiffuseMaterial: {type: 'c', value: new THREE.Color(1, 0, 0)},
                       phongSpecularMaterial: {type: 'c', value: new THREE.Color(0.7, 0.7, 0.7)},
                       phongAmbientMaterial: {type: 'c', value: new THREE.Color(0.8, 0.2, 0.2)},
                       phongShininessMaterial: {type: 'f', value: 16.0},
                   }
               ]),
               vertexShader: Shaders.getVertexShader("vertex_color"),
               fragmentShader: Shaders.getFragmentShader("vertex_color"),
               lights: true
           });

           scope.mesh = new THREE.Mesh(new THREE.SphereGeometry(400, 100, 100), scope.material);
           scope.mesh.name = "phongSphere";

           scope.root.add(scope.mesh);

           this.getMesh = function () {
               return this.root;
           };

       };
        return PhongSphere;
    }));
