/*
 * File: Engine_ResourceMap.js 
 */
/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, alert: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };

/**
 * Default Constructor
 * @class gEngine.ResourceMap
 * @type gEngine.ResourceMap
 */
gEngine.ResourceMap = (function () {
    
    /**
     * ResourceMap node containing name and refrence count of resource
     * @memberOf gEngine.ResourceMap
     * @param {String} rName
     * @returns {MapEntry}
     */
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

   /**
    * Register one more resource to load
    * @memberOf gEngine.ResourceMap
    * @param {String} rName name of resource to load
    * @returns {void}
    */
    var asyncLoadRequested = function (rName) {
        mResourceMap[rName] = new MapEntry(rName); // place holder for the resource to be loaded
        ++mNumOutstandingLoads;
    };

    /**
     * Callback for when reource is loaded into the ResourceMap
     * @memberOf gEngine.ResourceMap
     * @param {String} rName
     * @param {File} loadedAsset asset to load into ResourceMap
     * @returns {void}
     */
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

    /**
     * Make sure to set the callback _AFTER_ all load commands are issued
     * @memberOf gEngine.ResourceMap
     * @param {Function} funct callback Function
     * @returns {void}
     */
    var setLoadCompleteCallback = function (funct) {
        mLoadCompleteCallback = funct;
        // in case all loading are done
        _checkForAllLoadCompleted();
    };

    //<editor-fold desc="Asset checking functions">
    /**
     * Return the asset of rName
     * @memberOf gEngine.ResourceMap
     * @param {String} rName name of asset to return
     * @returns {File} asset associtated to rName
     */
    var retrieveAsset = function (rName) {
        var r = null;
        if (rName in mResourceMap) {
            r = mResourceMap[rName].mAsset;
        } else {
            alert("gEngine.retrieveAsset: [" + rName + "] not in map!");
        }
        return r;
    };

    /**
     * Returns if asset is loaded into map
     * @memberOf gEngine.ResourceMap
     * @param {String} rName name of asset
     * @returns {Boolean} true if rName is loaded in ResourceMap
     */
    var isAssetLoaded = function (rName) {
        return (rName in mResourceMap);
    };

    /**
     * Increment the refrence count of asser rName
     * @memberOf gEngine.ResourceMap
     * @param {String} rName name of asset to increment refrence count
     * @returns {void}
     */
    var incAssetRefCount = function (rName) {
        mResourceMap[rName].mRefCount += 1;
    };

    /**
     * Remove the reference to allow associated memory <p>
     * be available for subsequent garbage collection
     * @memberOf gEngine.ResourceMap
     * @param {String} rName name of asset to unload
     * @returns {Number} Refrence count of asset
     */
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