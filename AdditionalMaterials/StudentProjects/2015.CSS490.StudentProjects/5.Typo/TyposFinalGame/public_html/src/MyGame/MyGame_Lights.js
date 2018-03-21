/* File: 		MyGame_Lights.js
 * Author:      	Chad Dugie
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the Lights for use in myGame */
"use strict";

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
    return light;
};

MyGame.prototype._initializeLights = function () {
    this.mLights = new LightSet();
    var l = this._createALight(Light.eLightType.eDirectionalLight,
            [15, 50, 4],           // position (not used by directional)
            [-0.0, -0.0, -1],      // Pointing direction upwards
            [1.0, 1.0, 1.0, 1],    // color
            500, 500,              // near anf far distances: essentially switch this off
            0.1, 0.2,              // inner and outer cones
            2,                     // intensity
            1.0);                  // drop off
    this.mLights.addToSet(l);

    l = this._createALight(Light.eLightType.eSpotLight,
            [3600, 1000, 200],     // Space station position
            [-600, 0, -1],         // direction
            [1.0, 1.0, 1.0, 1],    // color
            1000, 5000,            // near and far distances
            1.65, 1.7,             // inner outter angles (in radius)
            5,                     // intensity
            1.2);                  // drop off    
    this.mLights.addToSet(l);
};