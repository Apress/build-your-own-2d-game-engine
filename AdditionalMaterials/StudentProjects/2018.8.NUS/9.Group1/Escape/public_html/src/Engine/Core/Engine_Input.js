/*
 * File: EngineCore_Input.js 
 * Provides input support
 */
/*jslint node: true, vars: true */
/*global document, window*/
/* find out more about jslint: http://www.jslint.com/help.html */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };

/**
 * Input Class
 * @class gEngine.Input
 * @type gEngine.Input
 */
gEngine.Input = (function () {
    // Key code constants
    /**
     * @memberOf gEngine.Input
     * @type{enum} kKeys - Input keyCodes.
     */
    var kKeys = {
        // arrows
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,

        // space bar
        Space: 32,

        // numbers 
        Zero: 48,
        One: 49,
        Two: 50,
        Three: 51,
        Four: 52,
        Five : 53,
        Six : 54,
        Seven : 55,
        Eight : 56,
        Nine : 57,

        // Alphabets
        A : 65,
        B : 66,
        C : 67,
        D : 68,
        E : 69,
        F : 70,
        G : 71,
        H : 72,
        I : 73,
        J : 74,
        K : 75,
        L : 76,
        M : 77,
        N : 78,
        O : 79,
        P : 80,
        Q : 81,
        R : 82,
        S : 83,
        T : 84,
        U : 85,
        V : 86,
        W : 87,
        X : 88,
        Y : 89,
        Z : 90,

        LastKeyCode: 222
    };

    /**
     * @memberOf gEngine.Input
     * @type{enum} mouseButton - Mouse button input codes.
     */
    var kMouseButton = {
        Left: 0,
        Middle: 1,
        Right: 2
    };

    // Previous key state
    var mKeyPreviousState = [];     // a new array
    // The pressed keys.
    var mIsKeyPressed = [];
    // Click events: once an event is set, it will remain there until polled
    var mIsKeyClicked = [];


    // Support mouse
    var mCanvas = null;
    var mButtonPreviousState = [];
    var mIsButtonPressed = [];
    var mIsButtonClicked = [];
    var mMousePosX = -1;
    var mMousePosY = -1;

    // <editor-fold desc="Event handler functions">
    //<editor-fold desc="Keyboard handlers">
    var _onKeyDown = function (event) {
        mIsKeyPressed[event.keyCode] = true;
    };
    var _onKeyUp = function (event) {
        mIsKeyPressed[event.keyCode] = false;
    };
    //</editor-fold>

    //<editor-fold desc="Mouse handlers">
    var _onMouseMove = function (event) {
        var inside = false;
        var bBox = mCanvas.getBoundingClientRect();
        // In Canvas Space now. Convert via ratio from canvas to client.
        var x = Math.round((event.clientX - bBox.left) * (mCanvas.width / bBox.width));
        var y = Math.round((event.clientY - bBox.top) * (mCanvas.width / bBox.width));

        if ((x >= 0) && (x < mCanvas.width) &&
            (y >= 0) && (y < mCanvas.height)) {
            mMousePosX = x;
            mMousePosY = mCanvas.height - 1 - y;
            inside = true;
        }
        return inside;
    };

    // Mouse down event listener
    var _onMouseDown = function (event) {
        if (_onMouseMove(event)) {
            mIsButtonPressed[event.button] = true;
        }
    };

    // Mouse up event listener
    var _onMouseUp = function (event) {
        _onMouseMove(event);
        mIsButtonPressed[event.button] = false;
    };
    //</editor-fold>
    //</editor-fold>

    /**
     * Initialize the input manager.<p>
     * Intitalize and intsntiate input listeners.
     * @memberOf gEngine.Input
     * @param {GLCanvas} canvasID - HTML canvas
     * @returns {void}
     */
    var initialize = function (canvasID) {
        //<editor-fold desc="Keyboard support">
        var i;
        for (i = 0; i < kKeys.LastKeyCode; i++) {
            mIsKeyPressed[i] = false;
            mKeyPreviousState[i] = false;
            mIsKeyClicked[i] = false;
        }
        // register handlers 
        window.addEventListener('keyup', _onKeyUp);
        window.addEventListener('keydown', _onKeyDown);
        //</editor-fold>

        //<editor-fold desc="Mouse support">
        for (i = 0; i < 3; i++) {
            mButtonPreviousState[i] = false;
            mIsButtonPressed[i] = false;
            mIsButtonClicked[i] = false;
        }
        window.addEventListener('mousedown', _onMouseDown);
        window.addEventListener('mouseup', _onMouseUp);
        window.addEventListener('mousemove', _onMouseMove);
        mCanvas = document.getElementById(canvasID);
        //</editor-fold>
    };

    /**
     * Update function called on Gameloop.
     * @memberOf gEngine.Input
     * @returns {void}
     */
    var update = function () {
        var i;
        for (i = 0; i < kKeys.LastKeyCode; i++) {
            mIsKeyClicked[i] = (!mKeyPreviousState[i]) && mIsKeyPressed[i];
            mKeyPreviousState[i] = mIsKeyPressed[i];
        }
        for (i = 0; i < 3; i++) {
            mIsButtonClicked[i] = (!mButtonPreviousState[i]) && mIsButtonPressed[i];
            mButtonPreviousState[i] = mIsButtonPressed[i];
        }
    };

    /**
     * Function for GameEngine programmer to test if a key is pressed down<p>
     * returns if key is pressed.
     * @memberOf gEngine.Input
     * @param {Number|keys} keyCode - key to check for pressed state.
     * @returns {Boolean} true if key is pressed
     */
    var isKeyPressed = function (keyCode) {
        return mIsKeyPressed[keyCode];
    };

    /**
     * returns if key is clicked.
     * @memberOf gEngine.Input
     * @param {Number|keys} keyCode - key to check for clicked state.
     * @returns {Boolean} true if key is clicked
     */
    var isKeyClicked = function (keyCode) {
        return (mIsKeyClicked[keyCode]);
    };

    /**
     * returns if button is pressed.
     * @memberOf gEngine.Input
     * @param {Number|mouseButton} button - button to check for pressed state.
     * @returns {Boolean} true if button is pressed.
     */
    var isButtonPressed = function (button) {
        return mIsButtonPressed[button];
    };

    /**
     * returns if button is clicked.
     * @memberOf gEngine.Input
     * @param {Number|mouseButton} button - button to check for ckicked state.
     * @returns {Boolean} true if button is clicked.
     */
    var isButtonClicked = function (button) {
        return mIsButtonClicked[button];
    };
    
    /**
     * Returns mouse X position.
     * @memberOf gEngine.Input
     * @returns {Number} X position of mouse.
     */
    var getMousePosX = function () { return mMousePosX; };
    
    /**
     * Returns mouse Y position.
     * @memberOf gEngine.Input
     * @returns {Number} Y position of mouse.
     */
    var getMousePosY = function () { return mMousePosY; };

    var mPublic = {
        initialize: initialize,
        update: update,

        // keyboard support
        isKeyPressed: isKeyPressed,
        isKeyClicked: isKeyClicked,
        keys: kKeys,

        // Mouse support
        isButtonPressed: isButtonPressed,
        isButtonClicked: isButtonClicked,
        getMousePosX: getMousePosX,       // invalid if no corresponding buttonPressed or buttonClicked
        getMousePosY: getMousePosY,
        mouseButton: kMouseButton
    };
    return mPublic;
}());