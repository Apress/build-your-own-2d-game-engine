/* 
 * File: NaormalMapShader.js
 * Subclass from LightShader (to take advantage of light sources)
 */
/*jslint node: true, vars: true */
/*global gEngine, SpriteShader, LightShader, ShaderLightAtIndex, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
/**
 * Default Constructor<p>
 * Subclass from LightShader (to take advantage of light sources)
 * @param {string} vertexShaderPath filepath of the Vertex Shader.
 * @param {string} fragmentShaderPath filepath of the Fragment Shader.
 * @returns {IllumShader} An intsnace of IllumShader.
 * @class IllumShader
 */
function IllumShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    LightShader.call(this, vertexShaderPath, fragmentShaderPath);  // call super class constructor

    // this is the material property of the Renderable
    this.mMaterial = null;
    this.mMaterialLoader = new ShaderMaterial(this.mCompiledShader);

    var gl = gEngine.Core.getGL();
    // Reference to the camera position
    this.mCameraPos = null;  // points to a vec3
    this.mCameraPosRef = gl.getUniformLocation(this.mCompiledShader, "uCameraPosition");

    // reference to the normal map sampler
    this.mNormalSamplerRef = gl.getUniformLocation(this.mCompiledShader, "uNormalSampler");
}
gEngine.Core.inheritPrototype(IllumShader, LightShader);
//</editor-fold>

// <editor-fold desc="Public Methods">

// Overriding the Activation of the shader for rendering
/**
 * Activate the shader for rendering.
 * @param {float[]} pixelColor [R, G, B, A] Sets the shader pixel color.
 * @param {Camera} aCamera Camera to draw to
 * @returns {void}
 * @memberOf IllumShader
 */
IllumShader.prototype.activateShader = function(pixelColor, aCamera) {
    // first call the super class's activate
    LightShader.prototype.activateShader.call(this, pixelColor, aCamera);
    var gl = gEngine.Core.getGL();
    gl.uniform1i(this.mNormalSamplerRef, 1); // binds to texture unit 1
    // do not need to set up texture coordinate buffer
    // as we are going to use the ones from the sprite texture 
    // in the fragment shader
    this.mMaterialLoader.loadToShader(this.mMaterial);
    gl.uniform3fv(this.mCameraPosRef, this.mCameraPos);
};

/**
 * Set shadder material and camera position
 * @param {Material} m Material of shader
 * @param {vec2} p Camera position of shader
 * @returns {void}
 * @memberOf IllumShader
 */
IllumShader.prototype.setMaterialAndCameraPos = function(m, p) {
    this.mMaterial = m;
    this.mCameraPos = p;
};
//</editor-fold>