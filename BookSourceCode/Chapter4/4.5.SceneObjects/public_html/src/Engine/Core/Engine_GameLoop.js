/*
 * File: EngineCore_Loop.js 
 * Implements the game loop functionality of gEngine
 */
/*jslint node: true, vars: true */
/*global gEngine: false, requestAnimationFrame: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

gEngine.GameLoop = (function () {
    var kFPS = 60;          // Frames per second
    var kMPF = 1000 / kFPS; // Milliseconds per frame.

    // Variables for timing gameloop.
    var mPreviousTime = Date.now();
    var mLagTime;


    // The current loop state (running or should stop)
    var mIsLoopRunning = false;

    var mMyGame = null;

    // This function assumes it is sub-classed from MyGame
    var _runLoop = function () {
        if (mIsLoopRunning) {
            // Step A: set up for next call to _runLoop and update input!
            requestAnimationFrame(function () { _runLoop.call(mMyGame); });

            // Step B: compute how much time has elapsed since we last RunLoop was executed
            var currentTime = Date.now();
            var elapsedTime = currentTime - mPreviousTime;
            mPreviousTime = currentTime;
            mLagTime += elapsedTime;

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

    var start = function (myGame) {
        mMyGame = myGame;
        gEngine.ResourceMap.setLoadCompleteCallback(
            function () {
                mMyGame.initialize();
                _startLoop();
            }
        );
    };

    var stop = function () {
        mIsLoopRunning = false;
    };

    var mPublic = {
        start: start,
        stop: stop
    };
    return mPublic;
}());