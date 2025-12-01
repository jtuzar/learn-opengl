cmake_minimum_required(VERSION 3.23)

project(LearnOpenGL)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

find_package(glfw3 REQUIRED)

add_executable(LearnOpenGL src/main.cpp src/glad.c)
target_link_libraries(LearnOpenGL glfw)
target_include_directories(LearnOpenGL PRIVATE ${CMAKE_SOURCE_DIR}/include)
