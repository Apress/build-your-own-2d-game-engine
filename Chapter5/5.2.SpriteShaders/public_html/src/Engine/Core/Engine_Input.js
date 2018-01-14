/*
 * File: EngineCore_Input.js 
 * Provides input support
 */
/*jslint node: true, vars: true */
/*global gEngine: false, window: false */
/* find out more about jslint: http://www.jslint.com/help.html */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

gEngine.Input = (function () {
    // Key code constants
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
        D : 68,
        E : 69,
        F : 70,
        G : 71,
        I : 73,
        J : 74,
        K : 75,
        L : 76,
        R : 82,
        S : 83,
        W : 87,

        LastKeyCode: 222
    };

    // Previous key state
    var mKeyPreviousState = [];     // a new array
    // The pressed keys.
    var mIsKeyPressed = [];
    // Click events: once an event is set, it will remain there until polled
    var mIsKeyClicked = [];


    // Event handler functions
    var _onKeyDown = function (event) {
        mIsKeyPressed[event.keyCode] = true;
    };
    var _onKeyUp = function (event) {
        mIsKeyPressed[event.keyCode] = false;
    };

    var initialize = function () {
        var i;
        for (i = 0; i < kKeys.LastKeyCode; i++) {
            mIsKeyPressed[i] = false;
            mKeyPreviousState[i] = false;
            mIsKeyClicked[i] = false;
        }

        // register handlers 
        window.addEventListener('keyup', _onKeyUp);
        window.addEventListener('keydown', _onKeyDown);
    };

    var update = function () {
        var i;
        for (i = 0; i < kKeys.LastKeyCode; i++) {
            mIsKeyClicked[i] = (!mKeyPreviousState[i]) && mIsKeyPressed[i];
            mKeyPreviousState[i] = mIsKeyPressed[i];
        }
    };

    // Function for GameEngine programmer to test if a key is pressed down
    var isKeyPressed = function (keyCode) {
        return mIsKeyPressed[keyCode];
    };

    var isKeyClicked = function (keyCode) {
        return (mIsKeyClicked[keyCode]);
    };

    var mPublic = {
        initialize: initialize,
        update: update,
        isKeyPressed: isKeyPressed,
        isKeyClicked: isKeyClicked,
        keys: kKeys
    };
    return mPublic;
}());