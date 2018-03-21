/*
 * File: Engine_DefaultResources.js 
 */
/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, SimpleShader: false */
/* find out more about jslint: http://www.jslint.com/help.html */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
    // Simple Shader
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";  // Path to the VertexShader 
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";  // Path to the simple FragmentShader

    var mConstColorShader = null;

    var getConstColorShader = function () { return mConstColorShader; };

    var _createShaders = function (callBackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        callBackFunction();
    };

    var initialize = function (callBackFunction) {
        // constant color shader: SimpleVS, and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        gEngine.ResourceMap.setLoadCompleteCallback(function () { _createShaders(callBackFunction); });
    };

    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        initialize: initialize,
        getConstColorShader: getConstColorShader
    };
    return mPublic;
}());