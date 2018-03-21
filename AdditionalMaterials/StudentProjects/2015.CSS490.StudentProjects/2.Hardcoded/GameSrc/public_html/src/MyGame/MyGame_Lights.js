/*
 * File: MyGame_Lights: support the creation of light for MyGame
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

MainGameScene.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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

/*InitializeLights
 *  Initializes all the lights in the game. 
 *  Lights are not yet completed. (will list "DONE" next to comment).
 */
MainGameScene.prototype._initializeLights = function () {
    //Sensor light (because it should be bright) - DONE
    //LIGHT 0
    l = this._createALight(Light.eLightType.ePointLight,
            [-140, 300, 12],           // position
            [0, 0, -1],             // direction
            [0.8, 0.8, 1, 1],       // color (tinted blue because screen?)
            60, 60,                 // near and far distances
            1.9, 2.0,               // inner outter angles (in radius)
             1.5,                     // intensity
            1.2                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);
    this.mLightCount++; //Counts towards our total lights. Helps the engine remember when spawning lights for Drones and Fires
    //this.mBg.addLight(l);
    
    //Hero point light - DONE!
    //LIGHT 1
    var l = this._createALight(Light.eLightType.ePointLight,
            [15, 50, 10],       // position
            [0, 0, -1],         // Direction (facing "down" toward the bg)
            [1, 1, 1, 1],       // color
            8, 20,              // near and far distances
            0.1, 0.2,           // inner and outer cones
            1,                  // intensity
            1.0                 // drop off
            );
    this.mGlobalLightSet.addToSet(l);    
    this.mLightCount++; //Counts towards our total lights. Helps the engine remember when spawning lights for Drones and Fires
    //this.mBg.addLight(l);

    //Hero Spot light - DONE!
    //LIGHT 2
    l = this._createALight(Light.eLightType.eSpotLight,
            [15, 50, 10],           // position (not used by directional)
            [1, 0, 1],         // Pointing direction 
            [1, 1, 1, 1],     // color
            50, 90,               // near anf far distances: essentially switch this off
            Math.PI/4, Math.PI/3,               // inner and outer cones
            2,                      // intensity
            1.0                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);
    this.mLightCount++; //Counts towards our total lights. Helps the engine remember when spawning lights for Drones and Fires
    //this.mBg.addLight(l);

    //Atmospheric lava light
    //LIGHT 3
    l = this._createALight(Light.eLightType.eDirectionalLight,
            [60, 50, 12],            // Center of camera 
            [0, 1, 0],              //faces upward
            [1, 0.0, 0.0, 1],      //  color
            500, 500,                   // near and far distances           
            1.2, 1.3,                // inner and outer cones
            0.35,                       // intensity
            1.5                      // drop off
           );
           //l.setLightTo(false);
    this.mGlobalLightSet.addToSet(l);
    
    //this.mDroneLight.setYPos(this.getXform().getYPos());
    
    //Add the lights to all the objects, skip over sensor light
    var light, i;
    
    // Allocate Healing Drone Designated Lights
    //LIGHTS 4-8
    for (i = 0; i < 5; i++) {
        l = this._makeHealDroneLight();
        this.mGlobalLightSet.addToSet(l);
    }
    this.mDroneLights = 4;
    
    // Allocate Fire Column Designated Lights
    //LIGHTS 9-15
    for (i = 0; i < 7; i++) {
        l = this._makeFireColumnLight();
        this.mGlobalLightSet.addToSet(l);
    }
    this.mFireLights = 9;
    
    
    //Assign lights
    //Sensor Light is Light 0. These objects don't need it.
    for(i = 1; i < this.mGlobalLightSet.numLights(); i++){
        light = this.mGlobalLightSet.getLightAt(i);
        this.mHero.addLight(light);
        
        //not a Light Renderable. How do we add lights to bg?
        this.mBg.addLight(light); 
    }
    
    //Add the light specifically for the sensor
    light = this.mGlobalLightSet.getLightAt(0); //The sensor light
    this.mBg.addLight(light);
    this.mBat.addLight(light);
    this.mRock.addLight(light);
    this.mDrone.addLight(light);
    this.mFire.addLight(light); //wtf?
    
    //Fire Column Light for fire in Sensor
    l = this._makeFireColumnLight();
    l.setLightTo(true);
    this.mBg.addLight(l);
    this.mFire.addLight(l);
    
    
    /*
    //create 5 drone lights for use
    this.mDroneLights = new RespawnObjectLightSet(5);
    for (i = 0; i < this.mDroneLights.numLights(); i++)
    {
        var dLight = this._makeHealDroneLight();
        //this.mHero.addLight(dLight);
        //this.mBg.addLight(dLight);
        this.mDroneLights.addToSet(dLight);
    };
    */
    
};

MainGameScene.prototype.updateLights = function() {
    //Hero lights (0: point light; 1: directional light)
    //make the lights follow hero position
    var heroXform = this.mHero.getXform();
    var heroPoint = this.mGlobalLightSet.getLightAt(1);
    var heroDir = this.mGlobalLightSet.getLightAt(2);
    var lavaLight = this.mGlobalLightSet.getLightAt(3);
    
    heroPoint.setPos(heroXform.getXPos(), heroXform.getYPos());
    heroDir.setPos(heroXform.getXPos() - 15, heroXform.getYPos());
    lavaLight.setPos(heroXform.getXPos(), heroXform.getYPos());
};

//makes all of the Drone Lights for populating the Drone Light Set
MainGameScene.prototype._makeHealDroneLight = function() {
    var l = this._createALight(Light.eLightType.ePointLight,
            [this.mDrone.getXform().getXPos(), this.mDrone.getXform().getYPos(), 10],       // position
            [0, 0, -1],         // Direction (facing "down" toward the bg)
            [0, 1, 0, 1],       // color
            10, 15,              // near and far distances
            0.1, 0.2,           // inner and outer cones
            3,                  // intensity
            1.0                 // drop off
            );
    l.setLightTo(false);   
    return l;
};

MainGameScene.prototype._makeFireColumnLight = function() {
    var l = this._createALight(Light.eLightType.ePointLight,
            [this.mFire.getXform().getXPos(), this.mFire.getXform().getYPos(), 10],       // position
            [0, 0, -1],         // Direction (facing "down" toward the bg)
            [1, 0, 0, 1],       // color
            10, 15,              // near and far distances
            0.1, 0.2,           // inner and outer cones
            5,                  // intensity
            1.0                 // drop off
            );    
    l.setLightTo(false);   
    return l;
};