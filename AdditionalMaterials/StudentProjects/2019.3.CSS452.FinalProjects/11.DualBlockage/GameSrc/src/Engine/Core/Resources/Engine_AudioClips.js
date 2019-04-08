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
    var mAudioContext = null;
    var mBgAudioNode = null;

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
     * Load Audio Source into the resource map
     * @memberOf gEngine.AudioClips
     * @param {String} clipName
     * @returns {void}
     */
    var loadAudio = function (clipName) {
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
                    }
                    );
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
    };

    /**
     * Returns if background audio is playing
     * @memberOf gEngine.AudioClips
     * @returns {Boolean} true if background audio is playing
     */
    var isBackgroundAudioPlaying = function () {
        return (mBgAudioNode !== null);
    };

    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        initAudioContext: initAudioContext,
        loadAudio: loadAudio,
        unloadAudio: unloadAudio,
        playACue: playACue,
        playBackgroundAudio: playBackgroundAudio,
        stopBackgroundAudio: stopBackgroundAudio,
        isBackgroundAudioPlaying: isBackgroundAudioPlaying
    };
    return mPublic;
}());