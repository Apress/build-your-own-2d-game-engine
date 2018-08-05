/*
 * File: Engine_DefaultResources.js 
 */
/*jslint node: true, vars: true, evil: true, white: true */
/*global SimpleShader, TextureShader, SpriteShader,
  LineShader, LightShader, IllumShader, ShadowCasterShader, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };

/**
 * 
 * @class gEngine.DefaultResources
 * @type Function|Engine_DefaultResources_L21.mPublic
 */
gEngine.DefaultResources = (function () {
    // Global Ambient color
    var mGlobalAmbientColor = [0.3, 0.3, 0.3, 1];
    var mGlobalAmbientIntensity = 1;
    
    /**
     * Return Global Ambient Intensity Value
     * @memberOf gEngine.DefaultResources
     * @returns {Number} Global Ambient Intensity Value
     */
    var getGlobalAmbientIntensity = function () { return mGlobalAmbientIntensity; };
    
    /**
     * Set Global Ambient Intensity Value
     * @memberOf gEngine.DefaultResources
     * @param {Number} v Global Ambient Intensity Value
     * @returns {void}
     */
    var setGlobalAmbientIntensity = function (v) { mGlobalAmbientIntensity = v; };
    
    /**
     * Return Global Ambient Color [R, G, B, A]
     * @memberOf gEngine.DefaultResources
     * @returns {Float[]} Global Ambient Color
     */
    var getGlobalAmbientColor = function () { return mGlobalAmbientColor; };
    
    /**
     * Set Global Ambient Color [R, G, B, A]
     * @memberOf gEngine.DefaultResources
     * @param {type} v Global Ambient Color
     * @returns {void}
     */
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
    
    /**
     * Return the Global default font
     * @memberOf gEngine.DefaultResources
     * @returns {String} Default font name
     */
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

    /**
     * Return the Constant Color Shader
     * @memberOf gEngine.DefaultResources
     * @returns {SimpleShader} Simple Shader
     */
    var getConstColorShader = function () { return mConstColorShader; };
    
    /**
     * Return the Texture Shader
     * @memberOf gEngine.DefaultResources
     * @returns {TextureShader} Texture Shader
     */
    var getTextureShader = function () { return mTextureShader; };
    
    /**
     * Return the Sprite Shader
     * @memberOf gEngine.DefaultResources
     * @returns {SpriteShader} Sprite Shader
     */
    var getSpriteShader = function () { return mSpriteShader; };
    
    /**
     * Return the Line Shader
     * @memberOf gEngine.DefaultResources
     * @returns {LineShader} Line Shader
     */
    var getLineShader = function () { return mLineShader; };
    
    /**
     * Return the Light Shader
     * @memberOf gEngine.DefaultResources
     * @returns {LightShader} Light Shader
     */
    var getLightShader = function () { return mLightShader; };
    
    /**
     * Return the Illum Shader
     * @memberOf gEngine.DefaultResources
     * @returns {IllumShader} Illum Shader
     */
    var getIllumShader = function () { return mIllumShader; };
    
    /**
     * Return the Shadow Receiver Shader
     * @memberOf gEngine.DefaultResources
     * @returns {SpriteShader} Shadow Receiver Shader
     */
    var getShadowReceiverShader = function () { return mShadowReceiverShader; };
    
    /**
     * Return the Shadow Caster Shader
     * @memberOf gEngine.DefaultResources
     * @returns {ShadowCasterShader} Shadow Caster Shader
     */
    var getShadowCasterShader = function () { return mShadowCasterShader; };
    
    /**
     * Return the Particle Shader
     * @memberOf gEngine.DefaultResources
     * @returns {TextureShader} Particle Shader
     */
    var getParticleShader = function () { return mParticleShader };

    /**
     * Initilize Default Resources.<p>
     * Calls callBackFunction when finished loading.
     * @memberOf gEngine.DefaultResources
     * @param {Function} callBackFunction to call after loading completes
     * @returns {void}
     */
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

    /**
     * unload all resources
     * @memberOf gEngine.DefaultResources
     * @returns {void}
     */
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