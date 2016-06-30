



precision mediump float;

struct directionalLight{

    color (0.5, 0.5, 0.75);
    direction (-1, 0, -3);
};

uniform vec3 phongAmbientMaterial;
uniform vec3 phongDiffuseMaterial;
uniform vec3 phongSpecularMaterial;
uniform float phongShininessMaterial;

uniform DirectionalLight directionalLights[Max_Dir_Lights];
uniform vec3 ambientLightColor[1];

varying vec3 vColor;

vec3 phong(vec3 pos, vec3 n, vec3 v) {


    vec3 ambient = phongAmbientMaterial*ambientLightColor[1];


    float ndotv = dot(n,v);
    if(ndotv<0.0)
        return vec3(0,0,0);


    vec3 l = normalize(directionalLight.direction);


    float ndotl = dot(n,-l);
    if(ndotl<=0.0)
        return ambient;


    vec3 diffuse = phongDiffuseMaterial*directionalLight.direction*ndotl;


    vec3 r = reflect(l,n);


    float rdotv = max( dot(r,v), 0.0);


    vec3 specular = phongSpecularMaterial *directionalLight.color  * pow(rdotv,phongShininessMaterial );

    return ambient + diffuse + specular;

}

void main(){

    vec4 ecPosition=modelViewMatrix*vec4(position,1.0);
    vec3 ecNormal=normalize(normalMatrix*normal);
    bool useOrtho=projectionMatrix[2][3]==0;
    vec3 viewDir=useOrtho? vec3(0,0,1) : normalize(-ecPosition.xyz);
    vColor=phong(ecPosition.xyz,ecNormal,viewDir);
    gl_position=projectionMatrix*ecPosition;

}


