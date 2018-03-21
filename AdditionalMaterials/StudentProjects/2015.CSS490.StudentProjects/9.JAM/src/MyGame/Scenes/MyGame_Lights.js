/*
 * File: MyGame_Lights: support the creation of light for MyGame
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// Light1: Star
// light2: projectile
// light3: Astroid normalmap
// light4: barrier
// Light5: direction

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
    this.mGlobalLightSet = new LightSet();
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.6);

    var l = this._createALight(Light.eLightType.ePointLight,
            [10, 10, 5],         // position
            [0, 0, -1],          // Direction
            [0.6, 1.0, 0.0, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            5,                   // intensity
            1.0                  // drop off
            );
    //l.setLightTo(false);
    this.mGlobalLightSet.addToSet(l);

    var l = this._createALight(Light.eLightType.ePointLight,
            [10, 10, 5],         // position
            [0, 0, -1],          // Direction
            [1.0, 1.0, 1.0, 1],  // some color
            3, 7,               // near and far distances
            0.1, 0.2,             // inner and outer cones
            10,                   // intensity
            1.0                  // drop off
            );
    l.setLightTo(false);
    this.mGlobalLightSet.addToSet(l);

    l = this._createALight(Light.eLightType.ePointLight,
            [50, 85, 8],           // position (not used by directional)
            [0, -50, -1],      // Pointing direction upwards
            [1.0, 1.0, 1.0, 1],    // color
            25, 50,              // near anf far distances: essentially switch this off
            0.1, 0.2,              // inner and outer cones
            5,                     // intensity
            1.0                    // drop off
            );
    //l.setLightTo(false);
    this.mGlobalLightSet.addToSet(l);
    
    // use for the barrier
    l = this._createALight(Light.eLightType.eSpotLight,
            [10, 10, 10],            // Right minion position
            [-0.07,  0, -1],     // direction
            [0.5, 0.5, 0.5, 1],     // color
            8, 20,                  // near and far distances
            1.65, 1.7,               // inner outter angles (in radius)
            5,                     // intensity
            1.2                     // drop off
            );
    //l.setLightTo(false);
    this.mGlobalLightSet.addToSet(l);

     l = this._createALight(Light.eLightType.eDirectionalLight,
            [64, 43, 10],            // Center of camera 
            [0.0, 0.03, -1],
            [0.3, 0.3, 0.3, 1],      //  color
            1000, 1000,                   // near and far distances
            1.9, 2.0,                // inner and outer cones
            3,                       // intensity
            1                      // drop off
            );
    l.setLightTo(true);
    this.mGlobalLightSet.addToSet(l);
};