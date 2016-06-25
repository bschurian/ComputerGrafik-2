/*
 * WebGL core teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 *
 * Fragment Shader: per-vertex-color
 *
 * This shader expects a varying variable fragColor to contain the color
 * to be used for rendering the fragment.
 *
 */




precision medump float;
varying vec3 vColor;

void main(){

gl_FragColor=vec4(vColor,1.0);

}
