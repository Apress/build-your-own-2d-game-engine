/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: Engine_GameLoop.js 
 * 
 * This is the file that contains the logic for our game loop
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var gEngine = gEngine || { };

gEngine.GameLoop = (function() {
    var kFPS = 60;           // Frames per second
    var kFrameTime = 1 / kFPS;
    var kMPF = 1000 * kFrameTime;  // Milleseconds per frame.

    // Variables for timing gameloop.
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;

    // The current loop state (running or should stop)
    var mIsLoopRunning = false;

    // Reference to game logic
    var mMyGame = null;

    var start = function (myGame) {
        mMyGame = myGame;
        gEngine.ResourceMap.setLoadCompleteCallback(
                function () {
                    mMyGame.initialize();
                    _startLoop();
                });
    };
    
    var stop = function () {
        mIsLoopRunning = false;
    };
    
    var _startLoop = function () {
        // Step A: reset frame time
        mPreviousTime = Date.now();
        mLagTime = 0.0;
        
        // Step B: remember that loop is now running
        mIsLoopRunning = true;
        
        // Step C: request _runLoop to start when loading is done
        requestAnimationFrame(function () {
            _runLoop.call(mMyGame);
        });
    };
    
    // This function assumes it is sub-classed from MyGame
    var _runLoop = function () {
        if (mIsLoopRunning) {
            // Step A: set up for next call to _runLoop and update input!
            // requestAnimationFrame is a javascript routine that you send a function
            // to call for updating animation.  In this case, we send in an anonymous
            // function that is called with mMyGame as a parameter.
            window.requestAnimationFrame(function () {
                _runLoop.call(mMyGame);
            });

            // Step B: compute elapsed time since last RunLoop was executed
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;

            // Step C: update the game the appropriate number of times.
            //      Update only every Milliseconds per frame.
            //      If lag larger then update frames, update until caught up.
            while ((mLagTime >= kMPF) && mIsLoopRunning) {
                gEngine.Input.update();
                this.update();      // call Scene.update()
                mLagTime -= kMPF;
            }
            // Step D: now let's draw
            this.draw();    // Call MyGame.draw()
        } else {
            // the game loops has stopped, unload current scene!
            mMyGame.unloadScene();
        }
    };
  
    var getUpdateIntervalInSeconds = function () {
        return kFrameTime;
    };
    
    var mPublic = {
        start: start,
        stop: stop,
        getUpdateIntervalInSeconds: getUpdateIntervalInSeconds
    };
    return mPublic;
} ());

