/*
 * File: EngineCore.js 
 * The first iteration of what the core of our game engine would look like.
 */
/*jslint node: true, vars: true, evil: true, bitwise: true */
/*global document */
/* find out more about jslint: http://www.jslint.com/help.html */

//  Global variable EngineCore
//  the following syntax enforces there can only be one instance of EngineCore object
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };
    // initialize the variable while ensuring it is not redefined

/**
 * Global variable EngineCore
 * @class gEngine.Core
 * @type gEngine.Core
 */
gEngine.Core = (function () {
    // instance variables
    // The graphical context to draw to
    var mGL = null;
    // initialize the WebGL, the vertex buffer and compile the shaders
    var _initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);

        // Get the standard or experimental webgl and binds to the Canvas area
        // store the results to the instance variable mGL
        mGL = canvas.getContext("webgl", {alpha: false, depth: true, stencil: true}) ||
              canvas.getContext("experimental-webgl", {alpha: false, depth: true, stencil: true});

        // Allows transperency with textures.
        mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
        mGL.enable(mGL.BLEND);

        // Set images to flip y axis to match the texture coordinate space.
        mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);

        // make sure depth testing is enabled
        mGL.enable(mGL.DEPTH_TEST);
        mGL.depthFunc(mGL.LEQUAL);

        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
    };

    //**----------------------------
    // Public methods:
    //**-----------------------------
    /**
     * Accessor of the webgl context
     * @memberOf gEngine.Core
     * @returns {WebGLContext}
     */
    var getGL = function () { return mGL; };

    /**
     * Loads the scene and starts the gameloop
     * @memberOf gEngine.Core
     * @param {Scene} scene  to load
     * @returns {void}
     */
    var startScene = function (scene) {
        scene.loadScene.call(scene); // Called in this way to keep correct context
        gEngine.GameLoop.start(scene); // will wait until async loading is done and call scene.initialize()
    };

    /**
     * initialize all of the EngineCore components
     * @memberOf gEngine.Core
     * @param {String} htmlCanvasID
     * @param {Class} myGame
     * @returns {void}
     */
    var initializeEngineCore = function (htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize(htmlCanvasID);
        gEngine.AudioClips.initAudioContext();
        gEngine.Physics.initialize();
        gEngine.LayerManager.initialize();

        // Inits DefaultResources, when done, invoke the anonymous function to call startScene(myGame).
        gEngine.DefaultResources.initialize(function () { startScene(myGame); });
    };

    /**
     * Clears the draw area and draws one square
     * @memberOf gEngine.Core
     * @param {Float} color [R, G, B, A] Color array
     * @returns {void}
     */
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);     // set the color to be cleared
        mGL.clear(mGL.COLOR_BUFFER_BIT | mGL.STENCIL_BUFFER_BIT | mGL.DEPTH_BUFFER_BIT);
                    // clear to the color, stencil bit, and depth buffer bits
    };

    /**
     * Inherits a SuperClass prototype functions into the SubClass
     * @memberOf gEngine.Core
     * @param {Class} subClass class to inherit to
     * @param {Class} superClass class to inherit from
     * @returns {void}
     */
    var inheritPrototype = function (subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };
    
    /**
    * Detaches and removes the resources from the DefaultResources Program
    * @memberOf gEngine.Core
    * @returns {void}
     */
    var cleanUp = function () {
        gEngine.DefaultResources.cleanUp();
        gEngine.VertexBuffer.cleanUp();
    };
    // -- end of public methods

    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        inheritPrototype: inheritPrototype,
        startScene: startScene,
        cleanUp: cleanUp
    };

    return mPublic;
}());
