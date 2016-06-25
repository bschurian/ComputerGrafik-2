/*
 * WebGL core teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 *
 * Vertex Shader: Per-Vertex-Color
 *
 * This shader expects each vertex to come with two attributes:
 * vertexPosition and vertexColor.
 *
 * the vertex position is transformed by modelViewMatrix and
 * projectionMatrix; vertexColor is "passed through" to the 
 * fragment shader using a varying variable named fragColor.
 *
 */



precision mediump float;

uniform vec3 phongAmbientMaterial;
uniform vec3 phongDiffuseMaterial;
uniform vec3 phongSpecularMaterial;
uniform float phongShininessMaterial;

//uniform vec3 ambientLightColor[1];

//varying vec3 position;
//varying vec3 normal;

//uniform vec3 directionalLightColor[MAX_DIR_LIGHTS];
//uniform vec3 directionalLightDirection[MAX_DIR_LIGHTS];

//uniform mat4 modelViewMatrix;
//uniform mat4 projectionMatrix;

varying vec3 vColor;
/*
vec3 phong(vec3 pos, vec3 n, vec3 v) {

    // ambient
    vec3 ambient = phongAmbientMaterial*ambientLightColor[1];

    // back face towards viewer?
    float ndotv = dot(n,v);
    if(ndotv<0.0)
        return vec3(0,0,0);

    // vector from light to current point
    vec3 l = normalize(directionalLightDirection[MAX_DIR_LIGHTS]);

    // cos of angle between light and surface. 0 = light behind surface
    float ndotl = dot(n,-l);
    if(ndotl<=0.0)
        return ambient;

    // diffuse
    vec3 diffuse = phongDiffuseMaterial*directionalLightColor[MAX_DIR_LIGHTS]*ndotl;

     // reflected light direction = perfect reflection direction
    vec3 r = reflect(l,n);

    // angle between reflection dir and viewing dir
    float rdotv = max( dot(r,v), 0.0);

    // specular
    vec3 specular = phongSpecularMaterial *directionalLightColor[MAX_DIR_LIGHTS]  * pow(rdotv,phongShininessMaterial );

    return ambient + diffuse + specular;

}
*/
void main(){
/*
    vec4 ecPosition=modelViewMatrix*vec4(position,1.0);
    vec3 ecNormal=normalize(normalMatrix*normal);
    bool useOrtho=projectionMatrix[2][3]==0;
    vec3 viewDir=useOrtho? vec3(0,0,1) : normalize(-ecPosition.xyz);
    vColor=phong(ecPosition.xyz,ecNormal,viewDir);
    gl_position=projectionMatrix*ecPosition;
*/
    gl_Position = projectionMatrix *
               modelViewMatrix *
               vec4(position,1.0);
    gl_PointSize = 3.0;
    vColor = vec3( 0.7, 0, 0 );
}


