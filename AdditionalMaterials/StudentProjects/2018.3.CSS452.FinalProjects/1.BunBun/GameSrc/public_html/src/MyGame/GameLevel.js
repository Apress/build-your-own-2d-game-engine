/**
 * GameLevel.js 
 * 
 * This is the logic of all game levels. Detailed logic is abstracted to 
 * controller objects and the game objects themselves. Use the JSON file to 
 * define which levels are spawned initially. 
 * 
 * @author  Erik W. Greif
 * @since   2018-02-22
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/*Find out more about jslint: http://www.jslint.com/help.html */

"use strict";


/**
 * Constructs a game level (scene) that parses and controls a JSON level.
 * 
 * @param levelAsset  The asset path for a JSON level file.
 */
function GameLevel(levelAsset) {
    
    this.LEVEL_FILE  = levelAsset;
    this.LEVEL = null;
    
    this.physicsObjectList = null;
    this.objectList = null;
    this.collisionInfoList = [];
    
    //The camera to view the scene
    this.cameraList = [];
    
    this.lightSet = new LightSet();
    
    this.finishLine = null;
}
gEngine.Core.inheritPrototype(GameLevel, Scene);


/**
 * Load the level file so we can determine assets to load.
 */
GameLevel.prototype.preLoadScene = function () {
    
    //Load the level file
    gEngine.TextFileLoader.loadTextFile(
            this.LEVEL_FILE, 
            gEngine.TextFileLoader.eTextFileType.eJSONFile);
};


/**
 * Load all assets used by all levels.
 */
GameLevel.prototype.loadScene = function () {
    
    //Parse and save the level configuration
    gEngine.Global.set("current-level", this.LEVEL_FILE);
    this.LEVEL = JSON.parse(gEngine.ResourceMap.retrieveAsset(this.LEVEL_FILE));

    //Load up the assets
    for (var assetId in this.LEVEL["assetList"])
        this.loadAsset(this.LEVEL["assetList"][assetId]);
};


/**
 * Clean up asset memory.
 */
GameLevel.prototype.unloadScene = function () {
    
    //Call delete() on all game objects. This allows for destructor-like calls
    //    to execute, stopping audio and other resources.
    var objList = this.objectList.getObjectList();
    for (var obj in objList) {
        objList[obj].delete();
    }
    
    //Remove the level file asset
    gEngine.TextFileLoader.unloadTextFile(this.LEVEL_FILE);
    
    //Unload the dynamic assets
    for (var assetId in this.LEVEL["assetList"])
        this.unloadAsset(this.LEVEL["assetList"][assetId]);
};


/**
 * Loads an asset from its definition object.
 * 
 * @param asset  The asset properties object defining type and name/path
 * @param callback
 */
GameLevel.prototype.loadAsset = function (asset, callback) {
    
    //Load a texture
    if (asset.type === "texture")
        gEngine.Textures.load(asset.name, callback);
    //Load a text file
    else if (asset.type === "text")
        gEngine.TextFileLoader.load(asset.name, callback);
    //Load a sound file
    else if (asset.type === "sound")
        gEngine.AudioClips.load(asset.name, callback);
    //Load a font
    else if (asset.type === "font")
        gEngine.Fonts.load(asset.name, callback);
    //Toss a warning
    else
        console.log("Asset \"" + asset.name + "\" had unknown type: " + asset.type);
};


/**
 * Unloads an asset from its definition object.
 * 
 * @param asset  The asset properties object used to load this asset.
 */
GameLevel.prototype.unloadAsset = function (asset) {
    
    //Unload a texture
    if (asset.type === "texture")
        gEngine.Textures.unloadTexture(asset.name);
    //Unload a text file
    else if (asset.type === "text")
        gEngine.TextFileLoader.unloadTextFile(asset.name);
    //Unload a sound file
    else if (asset.type === "sound")
        gEngine.AudioClips.unloadAudio(asset.name);
    //Unload a font
    else if (asset.type === "font")
        gEngine.Fonts.unloadFont(asset.name);
};


/**
 * Initialize the level, including cameras. This parses the JSON level
 * and invokes object constructors by name. 
 */
GameLevel.prototype.initialize = function () {
    
    this.physicsObjectList = new GameObjectSet();
    this.objectList = new GameObjectSet();
    
    var levelConfig = this.LEVEL;
    
    //World lighting setup
    if (typeof levelConfig["ambientColor"] === 'undefined')
        levelConfig["ambientColor"] = [1, 1, 1, 1];
    gEngine.DefaultResources.setGlobalAmbientColor(levelConfig["ambientColor"]);
    
    if (typeof levelConfig["ambientIntensity"] === 'undefined')
        levelConfig["ambientIntensity"] = 1.0;
    gEngine.DefaultResources.setGlobalAmbientIntensity(levelConfig["ambientIntensity"]);
    
    //Load cameras
    if (levelConfig["cameraList"].length <= 0)
        console.log("ERROR: No cameras were defined in the level!");
    
    this.cameraList = [];
    for (var camera in levelConfig["cameraList"]) {
        
        var newCamera = Camera.fromProperties(levelConfig["cameraList"][camera]);
        this.cameraList.push(newCamera);
    }
    
    //Load level objects
    for (var objectName in levelConfig["objectList"]) {
        for (var instance in levelConfig["objectList"][objectName]) {
            
            var properties = levelConfig["objectList"][objectName][instance];
            var newObject = window[objectName].fromProperties(properties);
            
            this.enrollObject(newObject, !!properties["__hasPhysics"]);
            
            if (typeof properties["__depth"] !== 'undefined')
                newObject.setDrawDepth(properties["__depth"]);
        }
    }
};  


/**
 * Initiate level drawing. Clear canvas and call draws as needed.
 */
GameLevel.prototype.draw = function () {
    
    //Clear off the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    //Draw each object on each camera
    for (var camera in this.cameraList) {
        
        this.cameraList[camera].setupViewProjection();
        this.objectList.draw(this.cameraList[camera]);
    }
};


/**
 * Processes updates and collisions.
 */
GameLevel.prototype.update = function () {
    
    // For testing: press 3 to show win screen
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {  

        gEngine.AudioClips.stopNonLoopedAudio();
        gEngine.AudioClips.stopLoopedAudio();
        gEngine.Global.set("next-level", "assets/levels/intro.json");
        gEngine.Core.setNextScene(new GameLevel("assets/levels/winScreen.json"));
        gEngine.GameLoop.stop();
    }
    
    // For testing: press 2 to show game over screen
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {  

        gEngine.AudioClips.stopNonLoopedAudio();
        gEngine.AudioClips.stopLoopedAudio();
        gEngine.Global.set("next-level", "assets/levels/intro.json");
        gEngine.Core.setNextScene(new GameLevel("assets/levels/loseScreen.json"));
        gEngine.GameLoop.stop();
    }
    
    this.objectList.update(this.cameraList[0]);
    
    this.physicsObjectList.clean();
    gEngine.Physics.processCollision(
            this.physicsObjectList, 
            this.collisionInfoList);
    
    //Update each camera movement information
    for (var camera in this.cameraList) 
        this.cameraList[camera].update();           
};


/**
 * Gets the set of game objects for external manipulation. Be very careful!
 * Use case: Terrain editor
 * 
 * @returns The GameObjectSet for all enqueued objects. 
 */
GameLevel.prototype.getObjects = function () {
    
    var objects = this.objectList.getObjectList();
    var reduced = [];
    for (var objectId in objects) {
        
        if (!objects[objectId].getIsDeleted())
            reduced.push(objects[objectId]);
    }
    return reduced;
};


/**
 * Gets a list of all objects matching a given class.
 * 
 * @param  className The class name that all fetched entities should match.
 * @returns  The list of current objects of the given class.
 */
GameLevel.prototype.getObjectsByClass = function (className) {
    
    var fullList = this.getObjects();
    var filteredList = [];
    for (var obj in fullList) {
        
        if (window[className].prototype.isPrototypeOf(fullList[obj])) {
            filteredList.push(fullList[obj]);
        }
    }
    return filteredList;
};


/**
 * Gets the set of physics objects for external manipulation. Be very careful!
 * 
 * @returns The list of for all enqueued physics objects. 
 */
GameLevel.prototype.getPhysicsObjects = function () {
    
    var objects = this.physicsObjectList.getObjectList();
    var reduced = [];
    for (var objectId in objects) {
        
        if (!objects[objectId].getIsDeleted())
            reduced.push(objects[objectId]);
    }
    return reduced;
};


/**
 * Enrolls a new object into the update list. DO NOT add duplicates! 
 * The result is fairly predictable: double updates, double draws.
 * 
 * @param object  The object to enroll.
 * @param physicsEnabled  Whether to run it through the physics engine.
 */
GameLevel.prototype.enrollObject = function (object, physicsEnabled) {
    
    this.objectList.addToSet(object);
    
    if (!!physicsEnabled)
        this.physicsObjectList.addToSet(object);
};


/**
 * Allows a game object to add a game camera by 
 * 
 * @param name
 */
GameLevel.prototype.getCamera = function (name) {
    
    for (var camera in this.cameraList)
        if (this.cameraList[camera].getName() === name)
            return this.cameraList[camera];
    return null;
};


GameLevel.prototype.getGlobalLights = function () {
  
    return this.lightSet;
};
