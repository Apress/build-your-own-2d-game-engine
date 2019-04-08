// For NetBeans Syntax Higlight: http://plugins.netbeans.org/plugin/46515/glsl-syntax-highlighter 
//
// This is the vertex shader 

//
attribute vec3 aSquareVertexPosition;   // Vertex shader expects one vertex position
attribute vec2 aTextureCoordinate;      // This is the texture coordinate attribute

// texture coordinate that maps image to the square
varying vec2 vTexCoord;

// to transform the vertex position
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

void main(void) { 
    // Convert the vec3 into vec4 for scan conversion and
    // transform by uModelTransform and uViewProjTransform before
    // assign to gl_Position to pass the vertex to the fragment shader
    gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0); 
    
    // pass the texture coordinate to the fragment shader
    vTexCoord = aTextureCoordinate;
}
