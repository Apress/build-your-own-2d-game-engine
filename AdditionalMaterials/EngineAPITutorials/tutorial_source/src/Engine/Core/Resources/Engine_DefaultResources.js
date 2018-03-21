/*
 * File: Engine_DefaultResources.js 
 */
/*jslint node: true, vars: true, evil: true, white: true */
/*global SimpleShader, TextureShader, SpriteShader,
  LineShader, LightShader, IllumShader, ShadowCasterShader, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
    // Global Ambient color
    var mGlobalAmbientColor = [0.3, 0.3, 0.3, 1];
    var mGlobalAmbientIntensity = 1;
    var getGlobalAmbientIntensity = function () { return mGlobalAmbientIntensity; };
    var setGlobalAmbientIntensity = function (v) { mGlobalAmbientIntensity = v; };
    var getGlobalAmbientColor = function () { return mGlobalAmbientColor; };
    var setGlobalAmbientColor = function (v) { mGlobalAmbientColor = vec4.fromValues(v[0], v[1], v[2], v[3]); };

    // Simple Shader
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";  // Path to the VertexShader 
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";  // Path to the simple FragmentShader
    var mConstColorShader = null;

    // Texture Shader
    var kTextureVS = "src/GLSLShaders/TextureVS.glsl";  // Path to the VertexShader 
    var kTextureFS = "src/GLSLShaders/TextureFS.glsl";  // Path to the texture FragmentShader
    var mTextureShader = null;
    var mSpriteShader = null;
    var kLineFS = "src/GLSLShaders/LineFS.glsl";        // Path to the Line FragmentShader
    var mLineShader = null;

    // Light Shader
    var kLightFS = "src/GLSLShaders/LightFS.glsl";  // Path to the Light FragmentShader
    var mLightShader = null;

    // Illumination Shader
    var kIllumFS = "src/GLSLShaders/IllumFS.glsl";  // Path to the Illumination FragmentShader
    var mIllumShader = null;

    // Shadow shaders
    var kShadowReceiverFS = "src/GLSLShaders/ShadowReceiverFS.glsl";  // Path to the FragmentShader
    var mShadowReceiverShader = null;
    var kShadowCasterFS = "src/GLSLShaders/ShadowCasterFS.glsl";  // Path to the FragmentShader
    var mShadowCasterShader = null;
    
    var kParticleFS = "src/GLSLShaders/ParticleFS.glsl";
    var mParticleShader = null;

    // Default font
    var kDefaultFont = "assets/fonts/system-default-font";
    var getDefaultFont = function () { return kDefaultFont; };

    var _createShaders = function (callBackFunction) {
        gEngine.ResourceMap.setLoadCompleteCallback(null);
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        mTextureShader = new TextureShader(kTextureVS, kTextureFS);
        mSpriteShader =  new SpriteShader(kTextureVS, kTextureFS);
        mLineShader =  new LineShader(kSimpleVS, kLineFS);
        mLightShader = new LightShader(kTextureVS, kLightFS);
        mIllumShader = new IllumShader(kTextureVS, kIllumFS);
        mShadowReceiverShader = new SpriteShader(kTextureVS, kShadowReceiverFS);
        mShadowCasterShader = new ShadowCasterShader(kTextureVS, kShadowCasterFS);
        mParticleShader = new TextureShader(kTextureVS, kParticleFS);
        callBackFunction();
    };

    var getConstColorShader = function () { return mConstColorShader; };
    var getTextureShader = function () { return mTextureShader; };
    var getSpriteShader = function () { return mSpriteShader; };
    var getLineShader = function () { return mLineShader; };
    var getLightShader = function () { return mLightShader; };
    var getIllumShader = function () { return mIllumShader; };
    var getShadowReceiverShader = function () { return mShadowReceiverShader; };
    var getShadowCasterShader = function () { return mShadowCasterShader; };
    var getParticleShader = function () { return mParticleShader };

    var initialize = function (callBackFunction) {
        // constant color shader: SimpleVS, and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // texture shader: 
        gEngine.TextFileLoader.loadTextFile(kTextureVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // Line Shader:
        gEngine.TextFileLoader.loadTextFile(kLineFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // Light Shader
        gEngine.TextFileLoader.loadTextFile(kLightFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // Illumination Shader
        gEngine.TextFileLoader.loadTextFile(kIllumFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // Shadow caster and receiver shaders
        gEngine.TextFileLoader.loadTextFile(kShadowReceiverFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kShadowCasterFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // particle shader
        gEngine.TextFileLoader.loadTextFile(kParticleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        
        // load default font
        gEngine.Fonts.loadFont(kDefaultFont);

        gEngine.ResourceMap.setLoadCompleteCallback(function s() {_createShaders(callBackFunction); });
    };

    // unload all resources
    var cleanUp = function () {
        mConstColorShader.cleanUp();
        mTextureShader.cleanUp();
        mSpriteShader.cleanUp();
        mLineShader.cleanUp();
        mLightShader.cleanUp();
        mIllumShader.cleanUp();
        mShadowReceiverShader.cleanUp();
        mShadowCasterShader.cleanUp();
        mParticleShader.cleanUp();

        gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
        gEngine.TextFileLoader.unloadTextFile(kSimpleFS);

        // texture shader: 
        gEngine.TextFileLoader.unloadTextFile(kTextureVS);
        gEngine.TextFileLoader.unloadTextFile(kTextureFS);

        // Line Shader:
        gEngine.TextFileLoader.unloadTextFile(kLineFS);


        // Light Shader
        gEngine.TextFileLoader.unloadTextFile(kLightFS);

         // Illumination Shader
        gEngine.TextFileLoader.unloadTextFile(kIllumFS);
        
        // Shadow shaders
        gEngine.TextFileLoader.unloadTextFile(kShadowReceiverFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.unloadTextFile(kShadowCasterFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // particle shader
        gEngine.TextFileLoader.unloadTextFile(kParticleFS);

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
        getLineShader: getLineShader,
        getLightShader: getLightShader,
        getIllumShader: getIllumShader,
        getShadowReceiverShader: getShadowReceiverShader,
        getShadowCasterShader: getShadowCasterShader,
        getParticleShader: getParticleShader,
        getDefaultFont: getDefaultFont,
        getGlobalAmbientColor: getGlobalAmbientColor,
        setGlobalAmbientColor: setGlobalAmbientColor,
        getGlobalAmbientIntensity: getGlobalAmbientIntensity,
        setGlobalAmbientIntensity: setGlobalAmbientIntensity,
        cleanUp: cleanUp
    };
    return mPublic;
}());