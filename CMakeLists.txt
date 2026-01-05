cmake_minimum_required(VERSION 3.23)
cmake_policy(VERSION 3.23)

project(LearnOpenGL)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

include(FetchContent)
FetchContent_Declare(glfw GIT_REPOSITORY https://github.com/glfw/glfw.git GIT_TAG master)
set(GLFW_BUILD_X11 ON)
set(GLFW_BUILD_WAYLAND ON)
FetchContent_MakeAvailable(glfw)


FetchContent_Declare(assimp GIT_REPOSITORY https://github.com/assimp/assimp.git GIT_TAG master)
FetchContent_MakeAvailable(assimp)

add_executable(LearnOpenGL src/main.cpp src/glad.c src/stb_image.cpp)
target_link_libraries(LearnOpenGL glfw assimp)
target_include_directories(LearnOpenGL PRIVATE ${CMAKE_SOURCE_DIR}/include)

# Define DEBUG macro for debug builds using generator expression
target_compile_definitions(LearnOpenGL PRIVATE $<$<CONFIG:Debug>:DEBUG>)

# Copy assets to build directory whenever they change
add_custom_target(copy_assets ALL
				COMMAND ${CMAKE_COMMAND} -E copy_directory
								${CMAKE_SOURCE_DIR}/shaders
								${CMAKE_BINARY_DIR}/shaders

				COMMAND ${CMAKE_COMMAND} -E copy_directory
								${CMAKE_SOURCE_DIR}/textures
								${CMAKE_BINARY_DIR}/textures
				COMMENT "Copying assets to build directory"
)

add_dependencies(LearnOpenGL copy_assets)
