/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: Engine_AudioClips.js 
 * 
 * This file supports the management of audio
 */

var gEngine = gEngine || {};

gEngine.AudioClips = (function () {
    var mAudioContext = null;
    var mBgAudioNode = null;

    var initAudioContext = function () {
        try {
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            mAudioContext = new AudioContext();
        }
        catch (e) {
            alert("Web Audio Is not supported.");
        }
    };

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
    var stopBackgroundAudio = function () {
        // Check if the audio is  playing.
        if (mBgAudioNode !== null) {
            mBgAudioNode.stop(0);
            mBgAudioNode = null;
        }
    };

    var isBackgroundAudioPlaying = function () {
        return (mBgAudioNode !== null);
    };

    var loadAudio = function (clipName) {
        if (!(gEngine.ResourceMap.isAssetLoaded(clipName))) {
            // Update resources in load counter.
            gEngine.ResourceMap.asyncLoadRequested(clipName);

            // Asyncrounsly request the data from server.
            var req = new XMLHttpRequest();

            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(clipName +
                            ": loading failed! [Hint: you cannot double click index.html to run this project." +
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
                        });
            };
            req.send();
        } else {
            gEngine.ResourceMap.incAssetRefCount(clipName);
        }
    };

    var unloadAudio = function (clipName) {
        gEngine.ResourceMap.unloadAsset(clipName);
    };


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