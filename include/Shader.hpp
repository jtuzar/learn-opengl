#ifndef SHADER_H
#define SHADER_H

#include "glm/ext/matrix_float4x4.hpp"
#include <glad/glad.h>

#include <iostream>
#include <string>

class Shader {
  private:
    void checkCompileErrors(int shader, std::string type) {
        int success;
        char infoLog[1024];
        if (type != "PROGRAM") {
            glGetShaderiv(shader, GL_COMPILE_STATUS, &success);
            if (!success) {
                glGetShaderInfoLog(shader, 1024, NULL, infoLog);
                std::cout
                    << "ERROR::SHADER_COMPILATION_ERROR of type: " << type
                    << "\n"
                    << infoLog
                    << "\n -- "
                       "--------------------------------------------------- -- "
                    << std::endl;
            }
        } else {
            glGetProgramiv(shader, GL_LINK_STATUS, &success);
            if (!success) {
                glGetProgramInfoLog(shader, 1024, NULL, infoLog);
                std::cout
                    << "ERROR::PROGRAM_LINKING_ERROR of type: " << type << "\n"
                    << infoLog
                    << "\n -- "
                       "--------------------------------------------------- -- "
                    << std::endl;
            }
        }
    };
    void checkLinkingErrors(int shaderProgram);

  public:
    // program ID
    unsigned int ID;

    // construcotr reads and builds the shader
    Shader(const char *vertexPath, const char *fragmentPath);

    // use/activate shader
    void use();

    // utility unifrom functions
    void setBool(const std::string &name, bool value) const;
    void setInt(const std::string &name, int value) const;
    void setFloat(const std::string &name, float value) const;
    void setMat4(const std::string &name, const glm::mat4 &mat) const;
};

#endif
