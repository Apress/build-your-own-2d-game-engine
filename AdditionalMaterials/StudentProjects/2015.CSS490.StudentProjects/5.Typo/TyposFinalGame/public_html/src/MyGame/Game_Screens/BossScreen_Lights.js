/* File: 		BossScreen_Lights.js
 * Author:      	Michael Voght
 * Last Date Modified: 	12/15/2015
 * Description:		Logic for Lights in the Boss Screen*/
"use strict";

BossScreen.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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

BossScreen.prototype._initializeLights = function () {
    this.mLights = new LightSet();
    var l = this._createALight(Light.eLightType.eDirectionalLight,
            [15, 50, 4],           // position (not used by directional)
            [-0.0, -0.0, -1],      // Pointing direction upwards
            [1.0, 1.0, 1.0, 1],    // color
            500, 500,              // near anf far distances: essentially switch this off
            0.1, 0.2,              // inner and outer cones
            0.2,                   // intensity
            1.0);                  // drop off
    this.mLights.addToSet(l);

    l = this._createALight(Light.eLightType.eSpotLight,
            [3600, 1000, 200],     // Right minion position
            [-150, 400, -1],       // direction
            [1.0, 1.0, 1.0, 1],    // color
            500, 2000,             // near and far distances
            1.25, 1.5,             // inner outter angles (in radius)
            2,                     // intensity
            1.2);                  // drop off
    this.mLights.addToSet(l);

    l = this._createALight(Light.eLightType.eSpotLight,
            [64, 43, 10],          // Center of camera 
            [0, -400, -1],         // direction
            [0.8, 0.8, 0.2, 1],    // color
            500, 700,              // near and far distances
            0.6, 0.65,             // inner and outer cones
            1,                     // intensity
            1);                    // drop off
    this.mLights.addToSet(l);

    l = this._createALight(Light.eLightType.eSpotLight,
            [64, 43, 10],          // Center of camera 
            [0, -400, -1],         // direction
            [0.8, 0.8, 0.2, 1],    //  color
            500, 700,              // near and far distances
            0.6, 0.65,             // inner and outer cones
            1,                     // intensity
            1);                    // drop off
    this.mLights.addToSet(l);    
};