/* 
 * File: LightShader.js
 * Subclass from SpriteShader
 *          Supports light illumination
 */
/*jslint node: true, vars: true */
/*global gEngine, SpriteShader, vec3 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
// constructor 
function LightShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);  // call SimpleShader constructor

    // glsl uniform position references
    this.mColorRef = null;
    this.mPosRef = null;
    this.mRadiusRef = null;
    this.mIsOnRef = null;

    this.mLight = null; // <-- this is the light source in the Game Engine
    //
    // create the references to these uniforms in the LightShader
    var shader = this.mCompiledShader;
    var gl = gEngine.Core.getGL();
    this.mColorRef = gl.getUniformLocation(shader, "uLightColor");
    this.mPosRef = gl.getUniformLocation(shader, "uLightPosition");
    this.mRadiusRef = gl.getUniformLocation(shader, "uLightRadius");
    this.mIsOnRef = gl.getUniformLocation(shader, "uLightOn");
}
gEngine.Core.inheritPrototype(LightShader, SpriteShader);
//</editor-fold>

// <editor-fold desc="Public Methods">

// Overriding the Activation of the shader for rendering
LightShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);

    // now push the light information to the shader
    if (this.mLight !== null) {
        this._loadToShader(aCamera);
    } else {
        gEngine.Core.getGL().uniform1i(this.mIsOnRef, false); // <-- switch off the light!
    }
};

LightShader.prototype.setLight = function (l) {
    this.mLight = l;
};

LightShader.prototype._loadToShader = function (aCamera) {
    var gl = gEngine.Core.getGL();
    gl.uniform1i(this.mIsOnRef, this.mLight.isLightOn());
    if (this.mLight.isLightOn()) {
        var p = aCamera.wcPosToPixel(this.mLight.getPosition());
        var r = aCamera.wcSizeToPixel(this.mLight.getRadius());
        var c = this.mLight.getColor();

        gl.uniform4fv(this.mColorRef, c);
        gl.uniform3fv(this.mPosRef, vec3.fromValues(p[0], p[1], p[2]));
        gl.uniform1f(this.mRadiusRef, r);
    }
};
//</editor-fold>