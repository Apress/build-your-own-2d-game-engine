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

    return light;
}

MyGame.prototype._initializeBasketLights = function () {   
    
    
    // the big light?
    var l = this._createALight(Light.eLightType.eDirectionalLight,
            [500, 500, 4],           // position (not used by directional)
            [.5, 1, -1],      // Pointing direction upwards
            [0.7, 0.7, .7, 1],    // color
            500, 500,              // near anf far distances: essentially switch this off
            0.1, 0.2,              // inner and outer cones
            .3,                     // intensity
            1.0                    // drop off
            );
    this.lightSet.addToSet(l);
    
    
    for(var i = 0; i < this.basketSet.length; i++){
        var l = this._createALight(Light.eLightType.ePointLight,
                [this.basketSet[i].getXform().getXPos(), this.basketSet[i].getXform().getYPos(), 5],         // position
                [0, 0, -1],          // Direction 
                [.2, .2, .2, 1],  // some color
                8, 10,               // near and far distances
                .1, .2,            // inner and outer cones
                1.5,                   // intensity
                1.0                  // drop off
                );
        this.lightSet.addToSet(l);
    }
    
    
    
    
}

MyGame.prototype._initializeCatBallLights = function () {
    
    //console.log(this.Player1CatBall)
    var l = this._createALight(Light.eLightType.ePointLight,
                
                [this.mPlayer1CatBall.getXform().getXPos(), this.mPlayer1CatBall.getXform().getYPos(), 8],         // position
                [0, 0, -1],          // Direction 
                [1, .1, .1, 1],  // some color
                8, 10,               // near and far distances
                .1, .2,            // inner and outer cones
                2.5,                   // intensity
                1.0                  // drop off
                );
    this.lightSet.addToSet(l);
    
    
    var l = this._createALight(Light.eLightType.ePointLight,
                
                [this.mPlayer2CatBall.getXform().getXPos(), this.mPlayer2CatBall.getXform().getYPos(), 8],         // position
                [0, 0, -1],          // Direction 
                [.1, .1, 1, 1],  // some color
                8, 10,               // near and far distances
                .1, .2,            // inner and outer cones
                2.5,                   // intensity
                1.0                  // drop off
                );
    this.lightSet.addToSet(l);
}

MyGame.prototype._initializePlayerLights = function (){
    //console.log(this.Player1CatBall)
    var l = this._createALight(Light.eLightType.eSpotLight,
                
                [this.mPlayer1ThrowIndicator.getXform().getXPos(), this.mPlayer1ThrowIndicator.getXform().getYPos(), 1],         // position
                [0, 1, -1],          // Direction 
                [1, .1, .1, 1],  // some color
                25, 25,               // near and far distances
                .1, .4,            // inner and outer cones
                2.5,                   // intensity
                1.0                  // drop off
                );
    this.lightSet.addToSet(l);
    
    var l = this._createALight(Light.eLightType.eSpotLight,
                
                [this.mPlayer2ThrowIndicator.getXform().getXPos(), this.mPlayer2ThrowIndicator.getXform().getYPos(), 1],         // position
                [0, 1, -1],          // Direction 
                [.1, .1, 1, 1],  // some color
                25, 25,               // near and far distances
                .1, .4,            // inner and outer cones
                2.5,                   // intensity
                1.0                  // drop off
                );
    this.lightSet.addToSet(l);
}