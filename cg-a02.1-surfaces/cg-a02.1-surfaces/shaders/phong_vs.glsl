



precision mediump float;


struct DirectionalLight{

     vec3 color;
     vec3 direction;
};

uniform vec3 phongAmbientMaterial;
uniform vec3 phongDiffuseMaterial;
uniform vec3 phongSpecularMaterial;
uniform float phongShininessMaterial;
uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];
uniform vec3 ambientLightColor[1];



varying vec3 vColor;

vec3 phong(vec3 pos, vec3 n, vec3 v) {


    vec3 ambient = phongAmbientMaterial*ambientLightColor[0];


    float ndotv = dot(n,v);
    if(ndotv<0.0)
        return vec3(0,0,0);


    vec3 l = normalize(directionalLights[0].direction);


    float ndotl = dot(n,-l);
    if(ndotl<=0.0)
        //directionalLights[0].color;
        //ambientLightColor[0];
        return vec3(1.0,1.0,1.0);
        //return ambient;


    vec3 diffuse = phongDiffuseMaterial*directionalLights[0].direction*ndotl;


    vec3 r = reflect(l,n);


    float rdotv = max( dot(r,v), 0.0);


    vec3 specular = phongSpecularMaterial *directionalLights[0].color  * pow(rdotv,phongShininessMaterial );

    return ambient + diffuse + specular;

//    return vec3(1.0,0.0,0.0);

}

void main(){

    vec4 ecPosition=modelViewMatrix*vec4(position,1.0);
    vec3 ecNormal=normalize(normalMatrix*normal);
    bool useOrtho=false;
    //projectionMatrix[2][3]==0;
    vec3 viewDir=useOrtho? vec3(0,0,1) : normalize(-ecPosition.xyz);
    vColor=phong(ecPosition.xyz,ecNormal,viewDir);
    gl_Position=projectionMatrix*ecPosition;

}


