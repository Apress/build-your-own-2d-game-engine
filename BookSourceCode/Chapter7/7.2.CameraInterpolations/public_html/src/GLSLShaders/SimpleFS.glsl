// this is the fragment (or pixel) shader that 
// outputs constant red color for every pixel rendered.

precision mediump float; 
    // sets the precision for floating point computation

// Color of pixel
uniform vec4 uPixelColor;  

void main(void) {
    // for every pixel called sets to the user specified color
    gl_FragColor = uPixelColor;
}