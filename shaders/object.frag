#version 330 core

struct Material {
        sampler2D diffuse;
        sampler2D specular;
        float shininess;
};

struct Light {
        vec3 position;
        vec3 direction;
        float cutoff;
        float outerCutOff;

        vec3 ambient;
        vec3 diffuse;
        vec3 specular;
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

        float theta = dot(lightDir, normalize(-light.direction));
        float epsilon = light.cutoff - light.outerCutOff;
        float intensity = clamp((theta - light.outerCutOff) / epsilon, 0.0, 1.0);

        vec3 diffuse = vec3(0.0f);
        vec3 specular = vec3(0.0f);

        if (theta > light.outerCutOff) {
                float diff = max(dot(norm, lightDir), 0.0);
                diffuse = light.diffuse * diff * vec3(texture(material.diffuse, TexCoords));

                vec3 viewDir = normalize(cameraPos - FragPos);
                vec3 reflectDir = reflect(-lightDir, norm);
                float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
                specular = light.specular * spec * vec3(texture(material.specular, TexCoords));
        }

        FragColor = vec4(ambient + diffuse * intensity + specular * intensity, 1.0);
}
