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
    
    // volume control support
    // https://www.davrous.com/2015/11/05/creating-fun-immersive-audio-experiences-with-web-audio/
    // https://developer.mozilla.org/en-US/docs/Web/API/GainNode/gain
    // https://www.html5rocks.com/en/tutorials/webaudio/positional_audio/
    var mBgGainNode = null;         // background volume
    var mCueGainNode = null;        // cue/special effects volume
    var mMasterGainNode = null;     // overall/master volume
    var mVolumeMultiplier = 0.05;   // multiplier (a volume of 1 is really loud,
                                    // so multiply this to give illusion of being louder than it is)

    /**
     * Initializes the audio context to play sounds.
     * @memberOf gEngine.AudioClips
     * @returns {void}
     */
    var initAudioContext = function () {
        try {
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            mAudioContext = new AudioContext();
            // connect Master volume control
            mMasterGainNode = mAudioContext.createGain();
            mMasterGainNode.connect(mAudioContext.destination);
            // set default Master volume
            mMasterGainNode.gain.value = 0.5;
            
            // connect Background volume control
            mBgGainNode = mAudioContext.createGain();
            mBgGainNode.connect(mMasterGainNode);
            // set default Background volume
            mBgGainNode.gain.value = 0.5;
            
            // connect Cuevolume control
            mCueGainNode = mAudioContext.createGain();
            mCueGainNode.connect(mMasterGainNode);
            // set default Cue volume
            mCueGainNode.gain.value = 0.5;
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
     * @param {float} volume The volume the cue should be played at
     * @returns {void}
     */
    var playACue = function (clipName, volume) {
        var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
        if (clipInfo !== null) {
            // SourceNodes are one use only.
            var sourceNode = mAudioContext.createBufferSource();
            sourceNode.buffer = clipInfo;
            sourceNode.start(0);
            
            // volume support for cue
            var gainNode = mAudioContext.createGain();
            sourceNode.connect(gainNode);
            gainNode.connect(mCueGainNode);
            gainNode.gain.value = volume * mVolumeMultiplier;
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
            mBgAudioNode.loop = true;
            mBgAudioNode.start(0);
            
            // connect volume accordingly
            mBgAudioNode.connect(mBgGainNode);
        }
    };
    
    /**
     * Set the volume of the background audio clip
     * @memberOf gEngine.AudioClips
     * @param {float} volume
     * @returns {void}
     */
    var setBackgroundVolume = function (volume) {
        if(mBgGainNode !== null) {
            mBgGainNode.gain.value = (volume * mVolumeMultiplier);
        }
    };
    
    /**
     * Increment the volume of the background audio clip
     * @memberOf gEngine.AudioClips
     * @param {float} increment
     * @returns {void}
     */
    var incBackgroundVolume = function (increment) {
        if(mBgGainNode !== null) {
            mBgGainNode.gain.value += (increment * mVolumeMultiplier);
            
            // need this since volume increases when negative
            if(mBgGainNode.gain.value < 0) {
                setBackgroundVolume(0);
            }
        }
    };
    
    /**
     * Set the Master volume
     * @memberOf gEngine.AudioClips
     * @param {float} volume
     * @returns {void}
     */
    var setMasterVolume = function (volume) {
        if(mMasterGainNode !== null) {
            mMasterGainNode.gain.value = (volume * mVolumeMultiplier);
        }
    };
    
    /**
     * Increment the Master volume
     * @memberOf gEngine.AudioClips
     * @param {float} increment
     * @returns {void}
     */
    var incMasterVolume = function (increment) {
        if(mMasterGainNode !== null) {
            mMasterGainNode.gain.value += (increment * mVolumeMultiplier);
            
            // need this since volume increases when negative
            if(mMasterGainNode.gain.value < 0) {
                mMasterGainNode.gain.value = 0;
            }
        }
    };
    
    /**
     * Set the Cue volume
     * @memberOf gEngine.AudioClips
     * @param {type} volume
     * @returns {undefined}
     */
    var setCueVolume = function (volume) {
        if(mCueGainNode !== null) {
            mCueGainNode.gain.value = (volume * mVolumeMultiplier);
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
        setBackgroundVolume: setBackgroundVolume,
        incBackgroundVolume: incBackgroundVolume,
        setMasterVolume: setMasterVolume,
        incMasterVolume: incMasterVolume,
        setCueVolume: setCueVolume,
        stopBackgroundAudio: stopBackgroundAudio,
        isBackgroundAudioPlaying: isBackgroundAudioPlaying
    };
    return mPublic;
}());