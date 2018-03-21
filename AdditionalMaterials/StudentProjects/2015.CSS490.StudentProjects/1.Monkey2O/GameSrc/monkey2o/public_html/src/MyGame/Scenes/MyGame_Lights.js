/*
 * File: MyGame_Lights: support the creation of light for MyGame
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

MyGame.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);
    light.setLightCastShadowTo(true);

    return light;
};

MyGame.prototype._initializeLights = function () {
    this.mGlobalLightSet = new LightSet();
    
    var l = null;

    // Light 0
    l = this._createALight(Light.eLightType.eDirectionalLight,
            [15, 50, 10],           // position (not used by directional)
            [0, 0, -1],         // Pointing direction 
            [1, 1, 1, 1],     // color
            500, 500,               // near and far distances: essentially switch this off
            0.1, 0.2,               // inner and outer cones
            1,                      // intensity
            1.0                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);
    
    // Light 1, the player light
    l = this._createALight(Light.eLightType.eSpotLight,
            [0, 0, 5],            // Center of camera 
            [1, 0, -1],
            [1, 0.7, 0.7, 1],         // color
            20, 30,               // near and far distances
            1, 2,                 // inner and outer cones
            0.9,                  // intensity
            2                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);
};

MyGame.prototype._initializeAnglerLight = function () {
    // Light 2, the anglerfish's light
    var xform = this.mAngler.mObj.getXform();
    var l = this._createALight(Light.eLightType.ePointLight,
            [xform.getXPos(), xform.getYPos(), 5],            // Center of camera 
            [1, 0, -1],
            [0.5, 0.5, 0.8, 1],     // color
            10, 25,               // near and far distances
            1, 2,                 // inner and outer cones
            0.8,                  // intensity
            2                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);
    this.mBackgroundScroller.addLight(l);
};

MyGame.prototype._initializeBGLight = function () {
    // Light 3, bg light
    var l = this._createALight(Light.eLightType.eDirectionalLight,
            [0, 0, 0],           // position (not used by directional)
            [0, 0, -1],         // Pointing direction 
            [1, 1, 1, 1],     // color
            0, 0,               // near and far distances: essentially switch this off
            1, 3,               // inner and outer cones
            0,                      // intensity
            1.0                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);
    this.mBackgroundScroller.addLight(l);
};

MyGame.prototype._initializePlayerLight = function () {
    // Light 4, a copy of light 1.  It's not used to illuminate, but rather, to reset values.
    var l = this._createALight(Light.eLightType.eSpotLight,
            [0, 0, 5],            // Center of camera 
            [1, 0, -1],
            [1, 0.7, 0.7, 1],         // color
            20, 30,               // near and far distances
            1, 2,                 // inner and outer cones
            0.9,                  // intensity
            2                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);
};