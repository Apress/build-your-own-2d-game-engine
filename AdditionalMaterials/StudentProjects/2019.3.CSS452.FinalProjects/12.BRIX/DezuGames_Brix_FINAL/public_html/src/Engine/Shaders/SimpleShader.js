/* 
 * File: SimpleShader.js
 * 
 * Implements a SimpleShader object.
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, alert: false, XMLHttpRequest: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
/**
 * constructor of SimpleShader object.
 * @class SimpleShader
 * @param {string} vertexShaderPath filepath of the Vertex Shader.
 * @param {string} fragmentShaderPath filepath of the Fragment Shader.
 * @returns {SimpleShader} An intsnace of SimpleShader.
 */
function SimpleShader(vertexShaderPath, fragmentShaderPath) {
    // instance variables
    // Convention: all instance variables: mVariables
    this.mCompiledShader = null; // reference to the compiled shader in webgl context.
    this.mShaderVertexPositionAttribute = null; // reference to SquareVertexPosition within the shader.
    this.mPixelColor = null; // reference to the pixelColor uniform in the fragment shader.
    this.mModelTransform = null; // reference to model transform matrix in vertex shader.
    this.mViewProjTransform = null; // reference to the View/Projection matrix in the vertex shader.
    this.mGlobalAmbientColor = null; // refrence to the globalAmbientColor uniform in the fragment shader.
    this.mGlobalAmbientIntensity = null; // refrence to the globalAmbientIntensity uniform in the fragment shader.

    var gl = gEngine.Core.getGL();

    // start of constructor code
    // 
    // Step A: load and compile vertex and fragment shaders
    this.mVertexShader = this._compileShader(vertexShaderPath, gl.VERTEX_SHADER);
    this.mFragmentShader = this._compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

    // Step B: Create and link the shaders into a program.
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, this.mVertexShader);
    gl.attachShader(this.mCompiledShader, this.mFragmentShader);
    gl.linkProgram(this.mCompiledShader);

    // Step C: check for error
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }

    // Step D: gets a reference to the aSquareVertexPosition attribute within the shaders.
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(
        this.mCompiledShader,
        "aSquareVertexPosition"
    );

    // Step E: gets references to the uniform variables: uPixelColor, uModelTransform, and uViewProjTransform
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
    this.mGlobalAmbientColor = gl.getUniformLocation(this.mCompiledShader, "uGlobalAmbientColor");
    this.mGlobalAmbientIntensity = gl.getUniformLocation(this.mCompiledShader, "uGlobalAmbientIntensity");
}
//</editor-fold>

// <editor-fold desc="Public Methods">

/**
 * Access to the compiled shader
 * @memberOf SimpleShader
 * @returns {WebGLProgram} A reference to the SimpleShaders Shader Program.
 */
SimpleShader.prototype.getShader = function () { return this.mCompiledShader; };

/**
 * Activate the shader for rendering.
 * @memberOf SimpleShader
 * @param {float[]} pixelColor [R, G, B, A] Sets the shader pixel color.
 * @param {Camera} aCamera Camera to draw to
 * @returns {void}
 */
SimpleShader.prototype.activateShader = function (pixelColor, aCamera) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, aCamera.getVPMatrix());
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,              // each element is a 3-float (x,y.z)
        gl.FLOAT,       // data type is FLOAT
        false,          // if the content is normalized vectors
        0,              // number of bytes to skip in between elements
        0);             // offsets to the first element
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
    gl.uniform4fv(this.mGlobalAmbientColor, gEngine.DefaultResources.getGlobalAmbientColor());
    gl.uniform1f(this.mGlobalAmbientIntensity, gEngine.DefaultResources.getGlobalAmbientIntensity());
};

/**
 * Loads per-object model transform to the vertex shader.
 * @memberOf SimpleShader
 * @param {float[]} modelTransform An array of float values representing one or more 4x4 matrices.
 * @returns {void}
 */
SimpleShader.prototype.loadObjectTransform = function (modelTransform) {
    var gl = gEngine.Core.getGL();
        // loads the modelTransform matrix into webGL to be used by the vertex shader
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};

/**
 * Detaches and removes the shader from the Shader Program
 * @memberOf SimpleShader
 * @returns {void}
 */
SimpleShader.prototype.cleanUp = function () {
    var gl = gEngine.Core.getGL();
    gl.detachShader(this.mCompiledShader, this.mVertexShader);
    gl.detachShader(this.mCompiledShader, this.mFragmentShader);
    gl.deleteShader(this.mVertexShader);
    gl.deleteShader(this.mFragmentShader);
};
//-- end of public methods
// </editor-fold>

// <editor-fold desc="Private Methods">
//**-----------------------------------
// Private methods not mean to call by outside of this object
//    naming convention: starts with an "_"
// **------------------------------------

/**
 * Returns a compiled shader from a shader in the dom.<p>
 * The id is the id of the script in the html tag.
 * @memberOf SimpleShader
 * @param {string} filePath Filepath of the shader.
 * @param {Number} shaderType Either gl.FRAGMENT_SHADER or gl.VERTEX_SHADER constants.
 * @returns {WebGLShader} Shader object of type fragment or vertex shader.
 */
SimpleShader.prototype._compileShader = function (filePath, shaderType) {
    var gl = gEngine.Core.getGL();
    var shaderSource = null, compiledShader = null;

    // Step A: Access the shader textfile
    shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);

    if (shaderSource === null) {
        alert("WARNING: Loading of:" + filePath + " Failed!");
        return null;
    }

    // Step B: Create the shader based on the shader type: vertex or fragment
    compiledShader = gl.createShader(shaderType);

    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    // Step D: check for errors and return results (null if error)
    // The log info is how shader compilation errors are typically displayed.
    // This is useful for debugging the shaders.
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
};
//-- end of private methods
//</editor-fold>