/**
 * For NetBeans Syntax Higlight: http://plugins.netbeans.org/plugin/46515/glsl-syntax-highlighter 
 * this is the vertex shader 
 */

//Vertex shader expects one vertex position
attribute vec3 aSquareVertexPosition;

//This is the texture coordinate attribute
attribute vec2 aTextureCoordinate;

//Texture coordinate that maps image to the square
varying vec2 vTexCoord;

//To transform the vertex position
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

void main(void) { 
    //Convert the vec3 into vec4 for scan conversion and
    //    transform by uModelTransform and uViewProjTransform before
    //    assign to gl_Position to pass the vertex to the fragment shader
    gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0); 
    
    //Pass the texture coordinate to the fragment shader
    vTexCoord = aTextureCoordinate;
}
