/*
 * File: Engine_ResourceMap.js 
 */
/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, alert: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

gEngine.ResourceMap = (function () {
    var MapEntry = function (rName) {
        this.mAsset = rName;
        this.mRefCount = 1;
    };

    // Number of outstanding load operations
    var mNumOutstandingLoads = 0;

    // Callback function when all textures are loaded
    var mLoadCompleteCallback = null;

    // Resource storage
    var mResourceMap = {};

   /*
    * Register one more resource to load
    */
    var asyncLoadRequested = function (rName) {
        mResourceMap[rName] = new MapEntry(rName); // place holder for the resource to be loaded
        ++mNumOutstandingLoads;
    };

    var asyncLoadCompleted = function (rName, loadedAsset) {
        if (!isAssetLoaded(rName)) {
            alert("gEngine.asyncLoadCompleted: [" + rName + "] not in map!");
        }
        mResourceMap[rName].mAsset = loadedAsset;
        --mNumOutstandingLoads;
        _checkForAllLoadCompleted();
    };

    var _checkForAllLoadCompleted = function () {
        if ((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null)) {
            // ensures the load complete call back will only be called once!
            var funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback = null;
            funToCall();
        }
    };

    // Make sure to set the callback _AFTER_ all load commands are issued
    var setLoadCompleteCallback = function (funct) {
        mLoadCompleteCallback = funct;
        // in case all loading are done
        _checkForAllLoadCompleted();
    };

    //<editor-fold desc="Asset checking functions">
    var retrieveAsset = function (rName) {
        var r = null;
        if (rName in mResourceMap) {
            r = mResourceMap[rName].mAsset;
        } else {
            alert("gEngine.retrieveAsset: [" + rName + "] not in map!");
        }
        return r;
    };

    var isAssetLoaded = function (rName) {
        return (rName in mResourceMap);
    };

    var incAssetRefCount = function (rName) {
        mResourceMap[rName].mRefCount += 1;
    };

    var unloadAsset = function (rName) {
        var c = 0;
        if (rName in mResourceMap) {
            mResourceMap[rName].mRefCount -= 1;
            c = mResourceMap[rName].mRefCount;
            if (c === 0) {
                delete mResourceMap[rName];
            }
        }
        return c;
    };
    //</editor-fold>

    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        //<editor-fold desc="asynchronous resource loading support">
        asyncLoadRequested: asyncLoadRequested,
        asyncLoadCompleted: asyncLoadCompleted,
        setLoadCompleteCallback: setLoadCompleteCallback,
        //</editor-fold>
        //<editor-fold desc="resource storage and reference count support">
        retrieveAsset: retrieveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded,
        incAssetRefCount: incAssetRefCount
        //</editor-fold>
    };
    return mPublic;
}());