precision mediump float;

uniform sampler2D topographyTexture;

varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;


void main() {
    vUv = uv;
    
    ecNormal = vec3(1, 0, 0);
    ecPosition = vec4(position, 1.0);
    
    gl_Position = projectionMatrix * modelViewMatrix * ecPosition;

}