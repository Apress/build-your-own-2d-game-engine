/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: Engine_Core.js 
 * 
 * This object encapsulates our game API
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//  Global variable EngineCore
//  the following syntax enforces there can only be one instance of EngineCore object
var gEngine = gEngine || { };
    // initialize the variable while ensuring it is not redefined


gEngine.Core = (function () {
    // instance variables
    // The graphical context to draw to
    var mGL = null;

    //**----------------------------
    // Public methods:
    //**-----------------------------
    //
    // Accessor of the webgl context
    var getGL = function () { return mGL; };

    var startScene = function (myGame) {
        myGame.loadScene.call(myGame); // Called in this way to keep correct context
        gEngine.GameLoop.start(myGame); // start the game loop after async loading is done
    };
    
    // initialize all of the EngineCore components
    var initializeEngineCore = function (htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize(htmlCanvasID);
        gEngine.AudioClips.initAudioContext();
        gEngine.Physics.initialize();
        gEngine.LayerManager.initialize();
        
        // Inits DefaultResoruces, when done, invoke startScene(myGame).
        gEngine.DefaultResources.initialize(function () {
            startScene(myGame);
        });
    };

    // initialize the WebGL, the vertex buffer and compile the shaders
    var _initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);

        // Get standard webgl, or experimental
        // binds webgl to the Canvas area on the web-page to the variable mGL 
        mGL = canvas.getContext("webgl", {alpha: false, depth: true, stencil: true}) ||
                canvas.getContext("experimental-webgl", {alpha: false, depth: true, stencil: true});

        // Allows transperency with textures.
        mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
        mGL.enable(mGL.BLEND);

        // Set images to flip the y axis to match the texture coordinate space.
        mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);
        
        // make sure depth testing is enabled
        mGL.enable(mGL.DEPTH_TEST);
        mGL.depthFunc(mGL.LEQUAL);
              
        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
    };

    // Clears the draw area and draws one square
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);  // set the color to be cleared
        mGL.clear(mGL.COLOR_BUFFER_BIT | mGL.STENCIL_BUFFER_BIT | mGL.DEPTH_BUFFER_BIT);
                // clear to the color previously set
    };
    
    var inheritPrototype = function (subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };
    
    var cleanUp = function () {
        gEngine.VertexBuffer.cleanUp();
        gEngine.DefaultResources.cleanUp();
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
