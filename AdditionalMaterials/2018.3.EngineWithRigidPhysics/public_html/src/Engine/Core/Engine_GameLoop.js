/*
 * File: EngineCore_Loop.js 
 * Implements the game loop functionality of gEngine
 */
/*jslint node: true, vars: true, white: true */
/*global gEngine: false, requestAnimationFrame: false, LoadingIconConfig: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };

/**
 * Global variable EngineGameLoop<p>
 * Implements the game loop functionality of gEngine
 * @class gEngine.GameLoop
 * @type gEngine.GameLoop
 */
gEngine.GameLoop = (function () {
    var kFPS = 60;          // Frames per second
    var kFrameTime = 1 / kFPS;
    var kMPF = 1000 * kFrameTime; // Milliseconds per frame.

    // Variables for timing gameloop.
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;

    // The current loop state (running or should stop)
    var mIsLoopRunning = false;

    var mMyGame = null;

    // This function assumes it is sub-classed from MyGame
    var _runLoop = function () {
        if (mIsLoopRunning) {
            // Step A: set up for next call to _runLoop and update input!
            requestAnimationFrame(function () { _runLoop.call(mMyGame); });

            // Step B: compute how much time has elapsed since we last RunLoop was executed
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;

            // Step C: Make sure we update the game the appropriate number of times.
            //      Update only every Milliseconds per frame.
            //      If lag larger then update frames, update until caught up.
            while ((mLagTime >= kMPF) && mIsLoopRunning) {
                gEngine.Input.update();
                this.update();      // call Scene.update()
                mLagTime -= kMPF;
            }
            // Step D: now let's draw
            this.draw();    // Call Scene.draw()
        } else {
            // this scene is done, unload it!
            mMyGame.unloadScene();
        }
    };

    // update and draw functions must be set before this.
    var _startLoop = function () {
        // Step A: reset frame time 
        mPreviousTime = Date.now();
        mLagTime = 0.0;

        // Step B: remember that loop is now running
        mIsLoopRunning = true;

        // Step C: request _runLoop to start when loading is done
        requestAnimationFrame(function () { _runLoop.call(mMyGame); });
    };

    /**
     * Start the Gameloop's Loop
     * @memberOf gEngine.GameLoop
     * @param {Scene} myGame to set as the active scene
     * @returns {void}
     */
    var start = function (myGame) {
        mMyGame = myGame;
        gEngine.ResourceMap.setLoadCompleteCallback(
            function () {
                gEngine.LoadingIconConfig.stop();
                mMyGame.initialize();
                _startLoop();
            }
        );
    };

    /**
     * Stop the Gameloop's Loop
     * @memberOf gEngine.GameLoop
     * @returns {void}
     */
    var stop = function () {
        mIsLoopRunning = false;
    };
    
    /**
     * Return the interval time of the GameLoop
     * @memberOf gEngine.GameLoop
     * @returns {Number} Interval time
     */
    var getUpdateIntervalInSeconds = function () {
        return kFrameTime;
    };
    
    var mPublic = {
        start: start,
        stop: stop,
        getUpdateIntervalInSeconds: getUpdateIntervalInSeconds
    };
    return mPublic;
}());