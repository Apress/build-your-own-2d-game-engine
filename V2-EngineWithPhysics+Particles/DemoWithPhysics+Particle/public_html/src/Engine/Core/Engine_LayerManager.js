/*
 * File: Engine_LayerManager.js 
 * Central storage for all elements that would be drawn 
 */
/*jslint node: true, vars: true, white: true*/
/*global GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

//  Global variable EngineCore
//  the following syntax enforces there can only be one instance of EngineCore object
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };
    // initialize the variable while ensuring it is not redefined

/**
 * Layer enum
 * @memberOf gEngine.eLayer
 * @type enum|eLayer
 */
gEngine.eLayer = Object.freeze({
    eBackground: 0,
    eShadowReceiver: 1,
    eActors: 2,
    eFront: 3,
    eHUD: 4
});

/**
 * Global variable EngineLayerManager<p>
 * Central storage for all elements that would be drawn 
 * @class gEngine.eLayer
 * @type gEngine.LayerManager
 */
gEngine.LayerManager = (function () {
    // instance variables
    var kNumLayers = 5;
    
    var mAllLayers = [];
    
    /**
     * Initilize the LayerManager
     * @memberOf gEngine.LayerManager
     * @returns {void}
     */
    var initialize = function() {
        mAllLayers[gEngine.eLayer.eBackground] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eShadowReceiver] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eActors] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eFront] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eHUD] = new GameObjectSet();
    };
    
    /**
     * Initilize the LayerManager
     * @memberOf gEngine.LayerManager
     * @returns {void}
     */
    var cleanUp = function() {
        initialize();
    };
    
    /**
     * Draw all Layers
     * @memberOf gEngine.LayerManager
     * @param {Camera} aCamera to draw Layers too
     * @returns {void}
     */
    var drawAllLayers = function(aCamera) {
        var i;
        for (i=0; i<kNumLayers; i++) {
            mAllLayers[i].draw(aCamera);
        }
    };
    
    /**
     * Update all Layers
     * @memberOf gEngine.LayerManager
     * @returns {void}
     */
    var updateAllLayers = function() {
        var i;
        for (i=0; i<kNumLayers; i++) {
            mAllLayers[i].update();
        }
    };
    
    // operations on the layers
    
    /**
     * Draw layer index
     * @memberOf gEngine.eLayer
     * @param {Number} layerEnum layer index to draw
     * @param {Camera} aCamera to draw layer to
     * @returns {void}
     */
    var drawLayer = function(layerEnum, aCamera) {
        mAllLayers[layerEnum].draw(aCamera);
    };
    
    /**
     * Update layer index
     * @memberOf gEngine.LayerManager
     * @param {Number} layerEnum layer index to update
     * @returns {void}
     */
    var updateLayer = function(layerEnum) {
        mAllLayers[layerEnum].update();
    };
    
    /**
     * Add Renderable to Layer
     * @memberOf gEngine.LayerManager
     * @param {Number} layerEnum layer index to add to
     * @param {Renderable} obj to add to Layer
     * @returns {void}
     */
    var addToLayer = function(layerEnum, obj) {
        mAllLayers[layerEnum].addToSet(obj);
    };
    
    /**
     * add the shadow caster objects (obj) to the layer manager.
     * @memberOf gEngine.LayerManager
     * @param {ShadowCaster} obj object to add
     * @returns {void}
     */
    var addAsShadowCaster = function(obj) {
        var i;
        for (i = 0; i<mAllLayers[gEngine.eLayer.eShadowReceiver].size(); i++) {
            mAllLayers[gEngine.eLayer.eShadowReceiver].getObjectAt(i).addShadowCaster(obj);
        }
    };
    
    /**
     * Remove object from Layer
     * @memberOf gEngine.LayerManager
     * @param {Number} layerEnum layer index to remove from
     * @param {Renderable} obj to remove from set
     * @returns {void}
     */
    var removeFromLayer = function(layerEnum, obj) {
        mAllLayers[layerEnum].removeFromSet(obj);
    };
    
    /**
     * Move the obj such that it will be drawn on top of all other objects in the layer
     * @memberOf gEngine.LayerManager
     * @param {Number} layerEnum layer index to move
     * @param {Renderanle} obj Object to move
     * @returns {void}
     */
    var moveToLayerFront = function(layerEnum, obj) {
        mAllLayers[layerEnum].moveToLast(obj);
    };
    
    /**
     * Return the count of obects within layer
     * @memberOf gEngine.LayerManager
     * @param {Number} layerEnum Layer index
     * @returns {Number}
     */
    var layerSize = function(layerEnum) {
        return mAllLayers[layerEnum].size();
    };

    var mPublic = {
      initialize: initialize,
      drawAllLayers: drawAllLayers,
      updateAllLayers: updateAllLayers,
      cleanUp: cleanUp,
      
      drawLayer: drawLayer,
      updateLayer: updateLayer,
      addToLayer: addToLayer,
      addAsShadowCaster: addAsShadowCaster,
      removeFromLayer: removeFromLayer,
      moveToLayerFront: moveToLayerFront,
      layerSize: layerSize
    };

    return mPublic;
}());
