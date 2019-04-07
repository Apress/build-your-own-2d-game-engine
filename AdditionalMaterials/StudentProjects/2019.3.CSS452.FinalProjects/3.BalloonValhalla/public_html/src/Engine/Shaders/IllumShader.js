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
    this.mNormalTransform = gl.getUniformLocation(this.mCompiledShader, "uTBN");
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
 * Loads per-object model transform to the vertex shader.
 * @memberOf SimpleShader
 * @param {float[]} modelTransform An array of float values representing one or more 4x4 matrices.
 * @returns {void}
 */
IllumShader.prototype.loadObjectTransform = function (modelTransform) {
    SimpleShader.prototype.loadObjectTransform.call(this, modelTransform);
    var gl = gEngine.Core.getGL();
    
    var v = [0, 0, 0, 0];v
    var n = vec3.create();
    var t = vec3.create();
    var b = vec3.create();
    vec3.normalize(n, vec4.transformMat4(v, [0,0,1, 0], modelTransform));
    vec3.normalize(t, vec4.transformMat4(v, [1,0,0, 0], modelTransform));
    vec3.normalize(b, vec4.transformMat4(v, [0,1,0, 0], modelTransform));
    var tbn = mat3.create();
    tbn[0] = t[0];
    tbn[1] = t[1];
    tbn[2] = t[2];
    tbn[3] = b[0];
    tbn[4] = b[1];
    tbn[5] = b[2];
    tbn[6] = n[0];
    tbn[7] = n[1];
    tbn[9] = n[2];
    
    
    // loads the modelTransform matrix into webGL to be used by the vertex shader
    //var invTranspose = mat4.clone(modelTransform);
    //mat4.transpose(invTranspose, invTranspose);
    //mat4.invert(invTranspose, invTranspose);
    gl.uniformMatrix3fv(this.mNormalTransform, false, tbn);
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