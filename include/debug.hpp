#ifndef DEBUG_H
#define DEBUG_H

#ifdef DEBUG

#include <glad/glad.h>

void APIENTRY glDebugOutput(GLenum source, GLenum type, unsigned int id,
                            GLenum severity, GLsizei length,
                            const char *message, const void *userParam);

#endif // DEBUG

#endif
