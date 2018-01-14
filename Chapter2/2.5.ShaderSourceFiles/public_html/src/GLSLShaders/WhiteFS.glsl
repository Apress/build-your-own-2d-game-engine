// this is the fragment (or pixel) shader

void main(void)  {
    // for every pixel called (within the square) sets
    // constant color white with alpha-channel value of 1.0
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
        