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



uniform vec3 phongAmbientMaterial;
uniform vec3 phongDiffuseMaterial;
uniform vec3 phongSpecularMaterial;
uniform vec3 ambientLightColor[1];


attribute vec3 position;
attribute vec3 normal;

uniform vec3 directionalLightColor[MAX_DIR_LIGHTS];
uniform vec3 directionalLightDirection[MAX_DIR_LIGHTS];

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

varying vec3 vColor;

void main() {

     vec4 ecPosition = modelViewMatrix*vec4(position, 1.0);
     vec3 ecNormal = normalize(normalMatrix*normal );
     bool useOrtho=projectionMatrix[2][3]==0;
     vec viewDir=useOrtho? vec3(0,0,1) : normalize(-ecPosition.xyz);
     vColor= phong(ecPosition.xyz, ecNormal, viewDir,directionalLightDirection[MAX_DIR_LIGHTS],directionalLightColor[MAX_DIR_LIGHTS] );
     gl_Position = projetionMatrix*ecPosition;
}

vec3 phong(vec3 p, vec3 v, vec3 n, vec3 lightPos, vec3 lightColor) {
    if(dot(v,n) < 0.0)
        return vec3(0,0,0); // back-face

    vec3 toLight = normalize(lightPos - p);
    vec3 reflectLight = reflect(-toLight, n);

    float ndots = max( dot(toLight,n), 0.0);
    float rdotv = max( dot(reflectLight, v), 0.0);

    vec3 ambi = phongAmbientMaterial * ambientLightColor[1];
    vec3 diff = phongDiffuseMaterial * ndots * lightColor;
    vec3 spec = phongSpecularMaterial * pow(rdotv, phongShininessMaterial ) * lightColor;

    return ambi + diff + spec;
}
