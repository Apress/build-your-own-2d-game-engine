/*
 * File: Engine_DefaultResources.js 
 */
/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, SimpleShader: false, TextureShader: false,
  SpriteShader: false */
/* find out more about jslint: http://www.jslint.com/help.html */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
    // Simple Shader
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";  // Path to the VertexShader 
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";  // Path to the simple FragmentShader
    var mConstColorShader = null;

    // Texture Shader
    var kTextureVS = "src/GLSLShaders/TextureVS.glsl";  // Path to the VertexShader 
    var kTextureFS = "src/GLSLShaders/TextureFS.glsl";  // Path to the texture FragmentShader
    var mTextureShader = null;
    var mSpriteShader = null;

    // Default font
    var kDefaultFont = "assets/fonts/system-default-font";
    var getDefaultFont = function () { return kDefaultFont; };

    var _createShaders = function (callBackFunction) {
        gEngine.ResourceMap.setLoadCompleteCallback(null);
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        mTextureShader = new TextureShader(kTextureVS, kTextureFS);
        mSpriteShader =  new SpriteShader(kTextureVS, kTextureFS);
        callBackFunction();
    };

    var getConstColorShader = function () { return mConstColorShader; };
    var getTextureShader = function () { return mTextureShader; };
    var getSpriteShader = function () { return mSpriteShader; };

    var initialize = function (callBackFunction) {
        // constant color shader: SimpleVS, and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // texture shader: 
        gEngine.TextFileLoader.loadTextFile(kTextureVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // load default font
        gEngine.Fonts.loadFont(kDefaultFont);

        gEngine.ResourceMap.setLoadCompleteCallback(function() {_createShaders(callBackFunction);});
    };

    // unload all resources
    var cleanUp = function () {
        mConstColorShader.cleanUp();
        mTextureShader.cleanUp();
        mSpriteShader.cleanUp();

        gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
        gEngine.TextFileLoader.unloadTextFile(kSimpleFS);

        // texture shader: 
        gEngine.TextFileLoader.unloadTextFile(kTextureVS);
        gEngine.TextFileLoader.unloadTextFile(kTextureFS);

        // default font
        gEngine.Fonts.unloadFont(kDefaultFont);
    };

    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        initialize: initialize,
        getConstColorShader: getConstColorShader,
        getTextureShader: getTextureShader,
        getSpriteShader: getSpriteShader,
        getDefaultFont: getDefaultFont,
        cleanUp: cleanUp
    };
    return mPublic;
}());