/*
 * File: MyGame_Lights: support the creation of light for MyGame
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Level.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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

Level.prototype._initializeLights = function () {
    this.mGlobalLightSet = new LightSet();

    var l = this._createALight(Light.eLightType.ePointLight,
            [50, 40, 5],         // PlayerPointLight
            [0, 0, -1],          // Direction 
            [0.1, 0.1, 0.1, 1],  // some color
            15, 40,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            5,                   // intensity
            1.0                  // drop off
            );
    this.mGlobalLightSet.addToSet(l);

    l = this._createALight(Light.eLightType.eDirectionalLight,
            [15, 50, 4],           // World Dark Light
            [-0.2, -0.2, -1],      // Pointing direction upwards
            [-.5, -.5, -.5, 1],    // color
            500, 500,              // near anf far distances: essentially switch this off
            0.1, 0.2,              // inner and outer cones
            2,                     // intensity
            1.0                    // drop off
            );
    this.mGlobalLightSet.addToSet(l);

    l = this._createALight(Light.eLightType.eSpotLight,
            [15, 6, 1],            // End of Level Right
            [0,  .08, -1],     // direction
            [0.5, 0.5, 0.5, 1],     // color
            20, 30,                  // near and far distances
            1.65, 1.7,               // inner outter angles (in radius)
            1,                     // intensity
            1.2                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);

    l = this._createALight(Light.eLightType.eSpotLight,
            [64, 50, 10],            // Center of camera 
            [0.03, 0.03, -1],
            [0.8, 0.8, 0.2, 1],      //  color
            100, 100,                   // near and far distances
            1.9, 2.0,                // inner and outer cones
            2,                       // intensity
            1                      // drop off
            );
    this.mGlobalLightSet.addToSet(l);
};