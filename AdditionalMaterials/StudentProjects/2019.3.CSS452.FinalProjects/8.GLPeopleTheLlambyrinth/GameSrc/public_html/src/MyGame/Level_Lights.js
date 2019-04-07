
/*
 * File: Level_Lights: support the creation of light for MyGame
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet, Level */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Level.prototype.createLights = function(posHero, posExit)
{  
    this.mGlobalLightSet = new LightSet();
    //overall background light 
    var  light = this.createLight(Light.eLightType.eDirectionalLight,
            [60, 40, 4],           // position (not used by directional)
            [-0.2, -0.2, -1],      // Pointing direction upwards
            [0.3, 0.3, 0, 1],    // color
            500, 500,              // near anf far distances: essentially switch this off
            0.1, 0.2,              // inner and outer cones
            -1,                     // intensity
            1.0                    // drop off
            );
    this.mGlobalLightSet.addToSet(light);
    //direction light 
    light = this.createLight(Light.eLightType.eSpotLight,
            [posHero[0], posHero[1], 5],            // Center of camera 
            [0.13,0.0, -1.0],
            [0.3, 0.3, 0.3, 1],      //  color
            30, 50,                   // near and far distances
            1.40, 1.70,                // inner and outer cones
            3,                       // intensity
            0.5                      // drop off
            );
    this.mGlobalLightSet.addToSet(light);
    //hero light
    light = this.createLight(Light.eLightType.ePointLight,
            [posHero[0], posHero[1], 5],         // position
            [0, 0, -1],          // Direction 
            [0.3, 0.3, 0.3, 1],  // some color
            8, 14,               // near and far distances
            0.1, -0.05,            // inner and outer cones
            3,                   // intensity
            1.0                  // drop off
            );
    this.mGlobalLightSet.addToSet(light);
    //exit light 
    light = this.createLight(Light.eLightType.ePointLight,
            [posExit[0], posExit[1], 5],         // position
            [0, 0, -1],          // Direction 
            [0.0, 1.0, 0.0, 1],  // some color
            5, 7,               // near and far distances
            0.1, 0.5,            // inner and outer cones
            1,                   // intensity
            1                  // drop off
            );
    this.mGlobalLightSet.addToSet(light);
    //add lights to objects 
    for (var i = 0; i < 4; i++) {
        this.mFloorTile.addLight(this.mGlobalLightSet.getLightAt(i));   //floor
        this.mHero.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));    //hero
        this.mExit.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));    //exit 
    }
    //lever
    if(this.mLeverSet !== null) {
        for (var i = 0; i< this.mLeverSet.size(); i++){
            this.mLeverSet.getObjectAt(i).getRenderable().addLight(this.mGlobalLightSet.getLightAt(0));
            this.mLeverSet.getObjectAt(i).getRenderable().addLight(this.mGlobalLightSet.getLightAt(1));
            this.mLeverSet.getObjectAt(i).getRenderable().addLight(this.mGlobalLightSet.getLightAt(2));
        }
    }
    
    //Door
    if(this.mDoorSet !== null) {
        for (var i = 0; i< this.mDoorSet.size(); i++){
            var door = this.mDoorSet.getObjectAt(i);
            door.getRenderable().addLight(this.mGlobalLightSet.getLightAt(0));
            door.getRenderable().addLight(this.mGlobalLightSet.getLightAt(1));
            door.getRenderable().addLight(this.mGlobalLightSet.getLightAt(2));
        }
    }
    //Button
    if(this.mButtonSet !== null) {
        for (var i = 0; i< this.mButtonSet.size(); i++){
            var button = this.mButtonSet.getObjectAt(i);
            button.addLight(this.mGlobalLightSet.getLightAt(0));
            button.addLight(this.mGlobalLightSet.getLightAt(1));
            button.addLight(this.mGlobalLightSet.getLightAt(2));
        }
    }
    //walls
    if(this.mWallSet !== null) {
        for (var i = 0; i< this.mWallSet.size(); i++){
            if(this.mWallSet.getObjectAt(i) !== null) {
                var wall = this.mWallSet.getObjectAt(i);
                wall.getRenderable().addLight(this.mGlobalLightSet.getLightAt(0));
                wall.getRenderable().addLight(this.mGlobalLightSet.getLightAt(1));
                wall.getRenderable().addLight(this.mGlobalLightSet.getLightAt(2));
            }
        }
    }
};
//used method from example 8.6
Level.prototype.createLight= function(type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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
    light.setLightTo(false);
    return light;
};
