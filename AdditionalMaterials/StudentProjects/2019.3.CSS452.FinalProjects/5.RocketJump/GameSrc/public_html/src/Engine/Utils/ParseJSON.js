/* 
 * File: ParseJSON.js
 * Generates level info from JSON file
 */
"use strict";

function ParseJSON(sceneInfo, art) {
    this.mCamera = null;
    this.mArena = null;
    
    // Create Camera
    var camCenter = sceneInfo.Camera.Center;
    var camWidth = sceneInfo.Camera.Width;
    var viewport = sceneInfo.Camera.Viewport;
    var bgColor = sceneInfo.Camera.BgColor;
    // make sure center are numbers
    for (var j = 0; j < 2; j++) {
        camCenter[j] = Number(camCenter[j]);
    }
    // make sure viewport and color are numbers
    for (var j = 0; j < 4; j++) {
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }
    this.mCamera = new Camera(
        vec2.fromValues(camCenter[0], camCenter[1]),  // position of the camera
        camWidth,                        // width of camera
        viewport                  // viewport (orgX, orgY, width, height)
        );
    this.mCamera.setBackgroundColor(bgColor);
    
    // Create Arena
    var x = sceneInfo.Arena.x;
    var y = sceneInfo.Arena.y;
    var w = sceneInfo.Arena.w;
    var h = sceneInfo.Arena.h;
    var res = sceneInfo.Arena.res;
    var frct = sceneInfo.Arena.frct;
    var s1 = sceneInfo.Arena.s1;
    var s2 = sceneInfo.Arena.s2;
    var p = sceneInfo.Arena.p;
    var speed = sceneInfo.Arena.speed;
    this.mArena = new Arena(x,y,w,h,res,frct,s1,s2, art, p, speed);
    
    // Create Objective and Light
    var objX = sceneInfo.Objective.x;
    var objY = sceneInfo.Objective.y;
    this.mArena.flagAt(objX, objY);
    
    // Create rest of objects and Light
    this.mArena.createObj(x+10,y+15,s1,s2);
    this.mArena.createBgLight();
    
    // Move Hero
    var heroX = sceneInfo.Hero.x;
    var heroY = sceneInfo.Hero.y;
    this.mArena.moveHero(heroX, heroY);
    this.mArena.setRespawn(heroX, heroY);
    
    // Create Platforms
    for (var i = 0; i < sceneInfo.Platform.length; i++) {
        var pfX = sceneInfo.Platform[i].x;
        var pfY = sceneInfo.Platform[i].y;
        var pfW = sceneInfo.Platform[i].w;
        var pfRot = sceneInfo.Platform[i].rot;
        var pfRes = sceneInfo.Platform[i].res;
        var pfFrct = sceneInfo.Platform[i].frct;
        this.mArena.platformAt(pfX, pfY, pfW, pfRot, pfRes, pfFrct, art);
    }
    
    // Create Spikes
    for (var i = 0; i < sceneInfo.Spike.length; i++) {
        var spikeX = sceneInfo.Spike[i].x;
        var spikeY = sceneInfo.Spike[i].y;
        var spikeRot = sceneInfo.Spike[i].rot;
        this.mArena.spikeAt(spikeX, spikeY, spikeRot);
    }
}

ParseJSON.prototype.camera = function () { return this.mCamera; };

ParseJSON.prototype.arena = function () { return this.mArena; };
