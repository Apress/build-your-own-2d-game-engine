/*
 * File: EngineCore_Audio.js 
 * Provides support for loading and unloading of Audio clips
 */

/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, SimpleShader: false, window: false, alert: false, XMLHttpRequest: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };

/**
 * Default Constructor<p>
 * Provides support for loading and unloading of Audio clips.
 * @class gEngine.AudioClips
 * @type gEngine.AudioClips
 */
gEngine.AudioClips = (function () {
    
//    var AudioNode = function (clipName, buff) {
//        this.mName = clipName;
//        this.mBuffer = buff;
//    };
    
    var mAudioContext = null;
    var mBgAudioNode = null;
    var mLoopedAudioNode = null;
    var mSingleAudioNode = null;
//    var mBgAudioNode = [];

    /**
     * Initializes the audio context to play sounds.
     * @memberOf gEngine.AudioClips
     * @returns {void}
     */
    var initAudioContext = function () {
        try {
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            mAudioContext = new AudioContext();
        } catch (e) {alert("Web Audio Is not supported."); }
    };
    
    /**
     * Standardized load function
     * 
     * @param {type} fileName
     * @param {type} callback
     * @returns {void}
     */
    var load = function (fileName, callback) {
        
        return loadAudio(fileName, callback);
    };

    /**
     * Load Audio Source into the resource map
     * @memberOf gEngine.AudioClips
     * @param {String} clipName
     * @param {type} callback
     * @returns {void}
     */
    var loadAudio = function (clipName, callback) {
        if (!(gEngine.ResourceMap.isAssetLoaded(clipName))) {
            // Update resources in load counter.
            gEngine.ResourceMap.asyncLoadRequested(clipName);

            // Asynchronously request the data from server.
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(clipName + ": loading failed! [Hint: you cannot double click index.html to run this project. " +
                        "The index.html file must be loaded by a web-server.]");
                }
            };
            req.open('GET', clipName, true);
            // Specify that the request retrieves binary data.
            req.responseType = 'arraybuffer';

            req.onload = function () {
                // Asynchronously decode, then call the function in parameter.
                mAudioContext.decodeAudioData(req.response,
                    function (buffer) {
                        gEngine.ResourceMap.asyncLoadCompleted(clipName, buffer);
                    } );
                if (typeof callback !== 'undefined' && callback !== null) {
                    callback();
                }
            };
            req.send();
        } else {
            gEngine.ResourceMap.incAssetRefCount(clipName);
        }
    };

    /**
     * Remove the reference to allow associated memory <p>
     * be available for subsequent garbage collection
     * @memberOf gEngine.AudioClips
     * @param {String} clipName
     * @returns {void}
     */
    var unloadAudio = function (clipName) {
        gEngine.ResourceMap.unloadAsset(clipName);
    };

    /**
     * Play an audioclip one time. no loop
     * @memberOf gEngine.AudioClips
     * @param {String} clipName
     * @returns {void}
     */
    var playACue = function (clipName) {
        var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
        if (clipInfo !== null) {
            // SourceNodes are one use only.
            var sourceNode = mAudioContext.createBufferSource();
            sourceNode.buffer = clipInfo;
            sourceNode.connect(mAudioContext.destination);
            sourceNode.start(0);
        }
    };
    
    var playNonLoopedAudio = function (clipName) {
        var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
        if (clipInfo !== null) {
            mSingleAudioNode = mAudioContext.createBufferSource();
            mSingleAudioNode.buffer = clipInfo;
            mSingleAudioNode.connect(mAudioContext.destination);
            mSingleAudioNode.start(0);
        }
    };
    var stopNonLoopedAudio = function () {
        if (mSingleAudioNode !== null) {
            mSingleAudioNode.stop(0);
            mSingleAudioNode = null;
        }
    };
    
    /**
     * Play a audioclip on repeat. Stops current background clip if playing.
     * @memberOf gEngine.AudioClips
     * @param {String} clipName
     * @returns {void}
     */
    var playBackgroundAudio = function (clipName) {
        var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
        if (clipInfo !== null) {
            // Stop audio if playing.
            stopBackgroundAudio();

            mBgAudioNode = mAudioContext.createBufferSource();
            mBgAudioNode.buffer = clipInfo;
            mBgAudioNode.connect(mAudioContext.destination);
            mBgAudioNode.loop = true;
            mBgAudioNode.start(0);
//            var node = new AudioNode(clipName, mAudioContext.createBufferSource());            
//            mBgAudioNode[clipName] = node;
//            mBgAudioNode[clipName].mBuffer.buffer = clipInfo;
//            mBgAudioNode[clipName].mBuffer.connect(mAudioContext.destination);
//            mBgAudioNode[clipName].mBuffer.loop = true;
//            mBgAudioNode[clipName].mBuffer.start(0);
        }
    };
    
    var playLoopedAudio = function (clipName) {
        if (mLoopedAudioNode === null) {
            var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
            if (clipInfo !== null) {
                mLoopedAudioNode = mAudioContext.createBufferSource();
                mLoopedAudioNode.buffer = clipInfo;
                mLoopedAudioNode.connect(mAudioContext.destination);
                mLoopedAudioNode.loop = true;
                mLoopedAudioNode.start(0);                
            }
        }
    };
    
    var stopLoopedAudio = function () {
        if (mLoopedAudioNode !== null) {
            mLoopedAudioNode.stop(0);
            mLoopedAudioNode = null;
        }
    };

    /**
     * Stops current background audio clip if playing
     * @memberOf gEngine.AudioClips
     * @returns {void}
     */
    var stopBackgroundAudio = function () {
        // Check if the audio is  playing.
        if (mBgAudioNode !== null) {
            mBgAudioNode.stop(0);
            mBgAudioNode = null;
        }
        //mBgAudioNode[clipName].mBuffer.stop(0);
    };
    
    /**
     * Returns if background audio is playing
     * @memberOf gEngine.AudioClips
     * @returns {Boolean} true if background audio is playing
     */
    var isBackgroundAudioPlaying = function () {
        return (mBgAudioNode !== null);
    };
    
    var detuneBackground = function (val) {
        if (mBgAudioNode !== null)
            mBgAudioNode.detune.value = val;
    };
    
    var detuneLoopedAudio = function (val) {
        if (mLoopedAudioNode !== null)
            mLoopedAudioNode.detune.value = val;
    };

    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        load: load,
        initAudioContext: initAudioContext,
        loadAudio: loadAudio,
        unloadAudio: unloadAudio,
        playACue: playACue,
        playBackgroundAudio: playBackgroundAudio,
        stopBackgroundAudio: stopBackgroundAudio,
        isBackgroundAudioPlaying: isBackgroundAudioPlaying,
        playLoopedAudio: playLoopedAudio,
        stopLoopedAudio: stopLoopedAudio,
        detuneBackground: detuneBackground,
        detuneLoopedAudio: detuneLoopedAudio,
        playNonLoopedAudio: playNonLoopedAudio,
        stopNonLoopedAudio: stopNonLoopedAudio
    };
    return mPublic;
}());