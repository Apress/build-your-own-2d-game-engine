/*
 * File: MyGame_Lights: support the creation of light for MyGame
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Level0.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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

Level0.prototype._initializeLights = function () {
    this.mGlobalLightSet = new LightSet();

    var l = this._createALight(Light.eLightType.ePointLight,
            [57, 35.6, 5],         // position
            [0, 0, -1],          // Direction 
            [0.9, 0.2, 0.0, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            5,                   // intensity
            1.0                  // drop off
            );
    this.mGlobalLightSet.addToSet(l);

    l = this._createALight(Light.eLightType.eDirectionalLight,
            [10, 5, 4],           // position (not used by directional)
            [-0.2, -0.2, -1],      // Pointing direction upwards
            [0, 0.7, 0.8, 1],    // color
            500, 500,              // near anf far distances: essentially switch this off
            0.1, 0.2,              // inner and outer cones
            2,                     // intensity
            1.0                    // drop off
            );
    this.mGlobalLightSet.addToSet(l);

    l = this._createALight(Light.eLightType.eSpotLight,
            [57, 50, 10],            // Right minion position
            [0,  1, -0.3],     // direction
            [0.1, 0.1, 0.1, 1],     // color
            100, 100,                  // near and far distances
            1.65, 1.7,               // inner outter angles (in radius)
            5,                     // intensity
            1.2                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);

    l = this._createALight(Light.eLightType.eSpotLight,
            [10, 15, 10],            // Center of camera 
            [0.0, 0.03, -1],
            [0.8, 0.8, 0.2, 1],      //  color
            100, 100,                   // near and far distances
            1.9, 2.0,                // inner and outer cones
            2,                       // intensity
            1                      // drop off
            );
    this.mGlobalLightSet.addToSet(l);
};