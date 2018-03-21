/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: Engine_DefaultResources.js 
 * 
 * This file supports the loading of the resources loaded by
 * all games using this engine.
 */

"use strict";

var gEngine = gEngine || {};


gEngine.DefaultResources = (function () {

    // Simple Shader GLSL Shader file paths
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";  // Path to the VertexShader
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";  // Path to the simple FragmentShader
    var mConstColorShader = null; // variable for the SimpleShader object

    // Texture Shader
    var kTextureVS = "src/GLSLShaders/TextureVS.glsl";  // Path to VertexShader
    var kTextureFS = "src/GLSLShaders/TextureFS.glsl";  // Path to FragmentShader
    var mTextureShader = null;
    var mSpriteShader = null;
    var mLineShader = null;
    var kLineFS = "src/GLSLShaders/LineFS.glsl";        // Path to the Line FragmentShader
    
    // Light Shader
    var kLightFS = "src/GLSLShaders/LightFS.glsl";
    var mLightShader = null;
    
    // Illumination Shader
    var kIllumFS = "src/GLSLShaders/IllumFS.glsl";
        // Path to the Illumination FragmentShader
    
    var mIllumShader = null;
    
    // Shadow shaders
    var kShadowReceiverFS = "src/GLSLShaders/ShadowReceiverFS.glsl";
    
    // Path to the FragmentShader
    var mShadowReceiverShader = null;
    var kShadowCasterFS = "src/GLSLShaders/ShadowCasterFS.glsl";
    
    // Path to the FragmentShader
    var mShadowCasterShader = null;
    
    // Default font
    var kDefaultFont = "assets/fonts/system-default-font";
    
    // Global Ambient color
    var mGlobalAmbientColor = [0.3, 0.3, 0.3, 1];
    var mGlobalAmbientIntensity = 1;
    
    // Particle support
    var kParticleFS = "src/GLSLShaders/ParticleFS.glsl";
    var mParticleShader = null;

    var getDefaultFont = function() { return kDefaultFont; };
    
    var getConstColorShader = function () {
        return mConstColorShader;
    };  // assessor

    var getTextureShader = function () {
        return mTextureShader;
    };

    var getSpriteShader = function () {
        return mSpriteShader;
    };
    
    var getLineShader = function () { return mLineShader; };
    var getLightShader = function () { return mLightShader; };
    var getIllumShader = function() { return mIllumShader; };
    
    var getGlobalAmbientIntensity = function () {
        return mGlobalAmbientIntensity;
    };
    var setGlobalAmbientIntensity = function (v) {
        mGlobalAmbientIntensity = v;
    };
    var getGlobalAmbientColor = function () {
        return mGlobalAmbientColor;
    };
    var setGlobalAmbientColor = function (v) {
        mGlobalAmbientColor = vec4.fromValues(v[0], v[1], v[2], v[3]);
    };
    var getShadowReceiverShader = function () { return mShadowReceiverShader; };
    var getShadowCasterShader = function () { return mShadowCasterShader; };
    var getParticleShader = function () { return mParticleShader; };

    // callback function after loadings are done
    var _createShaders = function (callBackFunction) {
        gEngine.ResourceMap.setLoadCompleteCallback(null);
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        mTextureShader = new TextureShader(kTextureVS, kTextureFS);
        mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
        mLineShader = new LineShader(kSimpleVS, kSimpleFS);
        mLightShader = new LightShader(kTextureVS, kLightFS);
        mIllumShader = new IllumShader(kTextureVS, kIllumFS);
        mShadowReceiverShader = new SpriteShader(kTextureVS, kShadowReceiverFS); 
        mShadowCasterShader = new ShadowCasterShader(kTextureVS, kShadowCasterFS);
        mParticleShader = new TextureShader(kTextureVS, kParticleFS);
        callBackFunction();
    };

    // initiate asynchronous loading of GLSL Shader files
    var initialize = function (callBackFunction) {
        // constant color shader: SimpleVS, and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS,
                gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS,
                gEngine.TextFileLoader.eTextFileType.eTextFile);

        // texture shader:
        gEngine.TextFileLoader.loadTextFile(kTextureVS,
                gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureFS,
                gEngine.TextFileLoader.eTextFileType.eTextFile);
                
        // Line Shader:
        gEngine.TextFileLoader.loadTextFile(kLineFS,
                gEngine.TextFileLoader.eTextFileType.eTextFile);

        // Light Shader
        gEngine.TextFileLoader.loadTextFile(kLightFS,
                gEngine.TextFileLoader.eTextFileType.eTextFile);
                
        // Illumination Shader
        gEngine.TextFileLoader.loadTextFile(kIllumFS,
                gEngine.TextFileLoader.eTextFileType.eTextFile);

        // Shadow caster and receiver shaders
        gEngine.TextFileLoader.loadTextFile(kShadowReceiverFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kShadowCasterFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        
        // Particle shader
        gEngine.TextFileLoader.loadTextFile(kParticleFS,
              gEngine.TextFileLoader.eTextFileType.eTextFile);
              
        // load default font
        gEngine.Fonts.loadFont(kDefaultFont);
        
        gEngine.ResourceMap.setLoadCompleteCallback(
                function () {
                    _createShaders(callBackFunction);
                });
    };
    
    var cleanUp = function () {
        mConstColorShader.cleanUp();
        mTextureShader.cleanUp();
        mSpriteShader.cleanUp();
        mIllumShader.cleanUp();
        mShadowReceiverShader.cleanUp();
        mShadowCasterShader.cleanUp();
        
        gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
        gEngine.TextFileLoader.unloadTextFile(kSimpleFS);
        
        // textuire shader:
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
        
        // Particle shader
        gEngine.TextFileLoader.unloadTextFile(kParticleFS);
        
        // default font
        gEngine.Fonts.unloadFont(kDefaultFont);
    };

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