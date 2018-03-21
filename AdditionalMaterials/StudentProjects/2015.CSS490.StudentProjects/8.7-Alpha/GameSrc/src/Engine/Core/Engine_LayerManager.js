/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: Engine_LayerManager.js 
 * 
 * This is the file that encapsulates layer management
 */

var gEngine = gEngine || {};

gEngine.eLayer = Object.freeze({
    eBackground: 0,
    eShadowReceiver: 1,
    eActors: 2,
    eFront: 3,
    eHUD: 4
});

// initialize the variable while ensuring it is not redefined
gEngine.LayerManager = (function () {
    var kNumLayers = 5;
    var mAllLayers = [];

    var initialize = function () {
        mAllLayers[gEngine.eLayer.eBackground] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eShadowReceiver] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eActors] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eFront] = new GameObjectSet();
        mAllLayers[gEngine.eLayer.eHUD] = new GameObjectSet();
    };

    var cleanUp = function () {
        initialize();
    };

    var addToLayer = function (layerEnum, obj) {
        mAllLayers[layerEnum].addToSet(obj);
    };

    var removeFromLayer = function (layerEnum, obj) {
        mAllLayers[layerEnum].removeFromSet(obj);
    };

    var layerSize = function (layerEnum) {
        return mAllLayers[layerEnum].size();
    };

    var addAsShadowCaster = function (obj) {
        var i;
        for (i = 0; i < mAllLayers[gEngine.eLayer.eShadowReceiver].size(); i++)
            mAllLayers[gEngine.eLayer.eShadowReceiver].getObjectAt(i).
                    addShadowCaster(obj);
    };

    var drawLayer = function (layerEnum, aCamera) {
        mAllLayers[layerEnum].draw(aCamera);
    };

    var drawAllLayers = function (aCamera) {
        var i;
        for (i = 0; i < kNumLayers; i++)
            mAllLayers[i].draw(aCamera);
    };

    var moveToLayerFront = function (layerEnum, obj) {
        mAllLayers[layerEnum].moveToLast(obj);
    };

    var updateLayer = function (layerEnum) {
        mAllLayers[layerEnum].update();
    };

    var updateAllLayers = function () {
        var i;
        for (i = 0; i < kNumLayers; i++)
            mAllLayers[i].update();
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

    return mPublic;
}());


