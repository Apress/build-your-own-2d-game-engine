// For NetBeans Syntax Highlight: http://plugins.netbeans.org/plugin/46515/glsl-syntax-highlighter 
//
// This is the vertex shader 
attribute vec3 aSquareVertexPosition;  // Vertex shader expects one vertex position

// to transform the vertex position
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

// used for line drawing 
uniform float uPointSize;

void main(void) {
    // Convert the vec3 into vec4 for scan conversion and
    // transform by uModelTransform and uViewProjTransform before
    // assign to gl_Position to pass the vertex to the fragment shader
    gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0); 

    // only use for line drawing
    gl_PointSize = uPointSize;
}
