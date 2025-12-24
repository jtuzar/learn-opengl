#version 330 core

in vec3 ourColor;
in vec2 TexCoord;

uniform sampler2D texture1;
uniform sampler2D texture2;

out vec4 FragColor;

void main() {
        vec2 invertedCoords = vec2(-TexCoord.x, TexCoord.y);
        FragColor = mix(texture(texture1, TexCoord), texture(texture2, invertedCoords), 0.2);
}
