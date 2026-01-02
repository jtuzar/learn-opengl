#version 330 core

struct Material {
        sampler2D diffuse;
        sampler2D specular;
        float shininess;
};

struct Light {
        vec3 position;

        vec3 ambient;
        vec3 diffuse;
        vec3 specular;

        float constant;
        float linear;
        float quadratic;
};

in vec3 Normal;
in vec3 FragPos;
in vec2 TexCoords;

uniform Material material;
uniform Light light;
uniform vec3 cameraPos;

out vec4 FragColor;

void main() {
        vec3 ambient = light.ambient * vec3(texture(material.diffuse, TexCoords));

        vec3 norm = normalize(Normal);
        vec3 lightDir = normalize(light.position - FragPos);

        float diff = max(dot(norm, lightDir), 0.0);
        vec3 diffuse = light.diffuse * diff * vec3(texture(material.diffuse, TexCoords));

        vec3 viewDir = normalize(cameraPos - FragPos);
        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
        vec3 specular = light.specular * spec * vec3(texture(material.specular, TexCoords));

        float distance = length(light.position - FragPos);
        float attenuation = 1.0 / (light.constant + light.linear * distance +
                                light.quadratic * (distance * distance));

        ambient *= attenuation;
        diffuse *= attenuation;
        specular *= attenuation;

        FragColor = vec4(ambient + diffuse + specular, 1.0);
}
