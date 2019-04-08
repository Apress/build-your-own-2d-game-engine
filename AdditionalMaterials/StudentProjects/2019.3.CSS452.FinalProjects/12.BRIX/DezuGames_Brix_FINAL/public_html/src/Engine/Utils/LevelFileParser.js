/*
 * File: SceneFile_Parse.js 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, console: false, Camera: false, vec2: false, Renderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LevelFileParser(sceneFilePath) {
   this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

LevelFileParser.prototype._getElm = function (tagElm) {
    var theElm = this.mSceneXml.getElementsByTagName(tagElm);
    if (theElm.length === 0) {
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    }
    return theElm;
};

LevelFileParser.prototype.parseLevel = function (levelPlatform,spikes,pickupArr,spikeTexture, platformTexture) {
    // Step A: read platform objects from scene file
    var elm = this._getElm("Block");
    var type, i, j, x, y, w, h, r, c, levelObject;
    for (i = 0; i < elm.length; i++) {
        type = Number(elm.item(i).attributes.getNamedItem("Type").value);
        x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
        w = Number(elm.item(i).attributes.getNamedItem("Width").value);
        h = Number(elm.item(i).attributes.getNamedItem("Height").value);
        r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
        c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
        
        var texture = null;
        switch(type) {
            case 2: // spike
                texture = spikeTexture; 
                break;
            case 1: // platform
            default:
                texture = platformTexture;   
        }
        
        levelObject = new LevelRenderable(texture);
        // make sure color array contains numbers
        // this isn't needed but kept for testing purposes
        for (j = 0; j < 4; j++) {
            c[j] = Number(c[j]);
        }
        c[3] = 0; 
        levelObject.setType(type);
        levelObject.setColor(c);
        levelObject.getXform().setPosition(x, y);
        levelObject.getXform().setRotationInDegree(r); // In Degree
        levelObject.getXform().setSize(w, h);
        
        if(type===2){
            spikes.push(levelObject);
        }else if(type===1){
            var gObj = new GameObject(levelObject);//add renderable to gameObject
            var rObj = new RigidRectangle(levelObject.getXform(),w,h);
            rObj.setMass(0);//prevents the platform form moving
            gObj.setRigidBody(rObj);
            //add it to the platform set
            levelPlatform.addToSet(gObj);
        }else if(type===3){
            var pick = new PlatformPickup(x,y);
            pickupArr.push(pick);
        }
    }
    
    // Step B: read end of world from scene file
    var worldEnd = this._getElm("EndOfWorld");
    levelPlatform.setWorldEnd(Number(worldEnd[0].attributes.getNamedItem("value").value));
    
    // Step C: read position of light end marker from scene file
    var endMarker = this._getElm("EndMarker");
    levelPlatform.setEndMarkerPosition([Number(endMarker[0].attributes.getNamedItem("PosX").value),
            Number(endMarker[0].attributes.getNamedItem("PosY").value)]);
    
    // Step D: read player start position from scene file
    var startPos = this._getElm("Start");
    levelPlatform.setPlayerStart([Number(startPos[0].attributes.getNamedItem("PosX").value),
            Number(startPos[0].attributes.getNamedItem("PosY").value)]);
    
    // Step E: read feature list from scene file
    var featuresElm = this._getElm("Features");
    var featuresArray = featuresElm.item(0).attributes.getNamedItem("value").value.split(" ");
    var count = 0;
    for(count; count < featuresArray.length; count++) {
        
        if(featuresArray[count].localeCompare("Light") === 0) {
           levelPlatform.setLightEnabled(true);
        }
        else if(featuresArray[count].localeCompare("Ghost") === 0) {
           levelPlatform.setGhostEnabled(true);
        }
    }
};
