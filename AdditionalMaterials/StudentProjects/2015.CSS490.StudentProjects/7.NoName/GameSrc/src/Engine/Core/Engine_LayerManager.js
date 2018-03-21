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

var gEngine = gEngine || { };
    // initialize the variable while ensuring it is not redefined

gEngine.eLayer = Object.freeze({
    eBackground: 0,
    eShadowReceiver: 1,
    eActors: 2,
    eFront: 3,
    eHUD: 4,
    ePowerupLayer: 5
});

gEngine.LayerManager = (function () {
    // instance variables
    var kNumLayers = 6;
    
    var mAllLayers = [];
    
    var initialize = function() {
        mAllLayers[gEngine.eLayer.eBackground] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eShadowReceiver] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eActors] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eFront] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eHUD] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.ePowerupLayer] = new GameObjectSet();
    };
    
    var cleanUp = function() {
        initialize();
    };
    
    var drawAllLayers = function(aCamera) {
        var i;
        for (i=0; i<kNumLayers; i++) {
            mAllLayers[i].draw(aCamera);
        }
    };
    
    var updateAllLayers = function(aCamera) {
        var i;
        for (i=0; i<kNumLayers; i++) {
            mAllLayers[i].update(aCamera);
        }
    };
    
    // operations on the layers
    var drawLayer = function(layerEnum, aCamera) {
        mAllLayers[layerEnum].draw(aCamera);
    };
    var updateLayer = function(layerEnum) {
        mAllLayers[layerEnum].update();
    };
    var addToLayer = function(layerEnum, obj) {
        mAllLayers[layerEnum].addToSet(obj);
    };
    var addAsShadowCaster = function(obj) {
        var i;
        for (i = 0; i<mAllLayers[gEngine.eLayer.eShadowReceiver].size(); i++) {
            mAllLayers[gEngine.eLayer.eShadowReceiver].getObjectAt(i).addShadowCaster(obj);
        }
    };
    var removeShadowCaster = function(obj) {
        var i;
        for (i = 0; i<mAllLayers[gEngine.eLayer.eShadowReceiver].size(); i++) {
            mAllLayers[gEngine.eLayer.eShadowReceiver].getObjectAt(i).removeShadowCaster(obj);
        }
    };
    var removeFromLayer = function(layerEnum, obj) {
        mAllLayers[layerEnum].removeFromSet(obj);
    };
    var moveToLayerFront = function(layerEnum, obj) {
        mAllLayers[layerEnum].moveToLast(obj);
    };
    var layerSize = function(layerEnum) {
        return mAllLayers[layerEnum].size();
    };
    
    var addLightToLayer = function(layerEnum, lgt) {
        mAllLayers[layerEnum].addLight(lgt);
    };
    
    var addLightToAllLayers = function (lgt) {
        // only add lights to the layers that are drawn with lights
        mAllLayers[gEngine.eLayer.eBackground].addLight(lgt);
        mAllLayers[gEngine.eLayer.eActors].addLight(lgt);
        mAllLayers[gEngine.eLayer.eShadowReceiver].addLight(lgt);
    };

    var removeLightFromLayer = function(layerEnum, lgt) {
        mAllLayers[layerEnum].removeLight(lgt);
        // remove the light from the global light set after all the objects are
        // instructed to not respond to this light
        globalLightSet.removeFromSet(lgt);
    };
    
    var removeLightFromAllLayers = function (lgt) {
        // only remove lights from the layers that are drawn with lights
        mAllLayers[gEngine.eLayer.eBackground].removeLight(lgt);
        mAllLayers[gEngine.eLayer.eActors].removeLight(lgt);
        mAllLayers[gEngine.eLayer.eShadowReceiver].removeLight(lgt);
        // remove the light from the global light set after all the objects are
        // instructed to not respond to this light
        globalLightSet.removeFromSet(lgt);
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
      removeShadowCaster: removeShadowCaster,
      removeFromLayer: removeFromLayer,
      moveToLayerFront: moveToLayerFront,
      layerSize: layerSize,
      addLightToLayer: addLightToLayer,
      addLightToAllLayers: addLightToAllLayers,
      removeLightFromLayer: removeLightFromLayer,
      removeLightFromAllLayers: removeLightFromAllLayers
    };

    return mPublic;
}());
