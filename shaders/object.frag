#version 330 core

struct Material {
        vec3 ambient;
        vec3 diffuse;
        vec3 specular;
        float shininess;
};

struct Light {
        vec3 positionView;

        vec3 ambient;
        vec3 diffuse;
        vec3 specular;
};

in vec3 Normal;
in vec3 FragPos;

uniform Material material;
uniform Light light;

out vec4 FragColor;

void main() {
        vec3 ambient = light.ambient * material.ambient;

        vec3 norm = normalize(Normal);
        vec3 lightDir = normalize(light.positionView.xyz - FragPos);

        float diff = max(dot(norm, lightDir), 0.0);
        vec3 diffuse = light.diffuse * (diff * material.diffuse);

        vec3 viewDir = normalize(-FragPos);
        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
        vec3 specular = light.specular * (spec * material.specular);

        FragColor = vec4(ambient + diffuse + specular, 1.0);
}
