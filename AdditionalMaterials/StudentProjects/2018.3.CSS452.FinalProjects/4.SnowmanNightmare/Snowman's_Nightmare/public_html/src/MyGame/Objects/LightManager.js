/* File: LightManager.js 
 *
 */

/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false, HelperFunctions, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var LightManager = LightManager || { };

LightManager.Core = (function () {

    var numOfLights = null;
    var lights = null;
    var lightsCheckedOut = null;
    var iglooLight = null;
    var directionalLight = null;

    var initLightManager = function (numLights) {

        numOfLights = numLights;

        lights = _createLights();
        lightsCheckedOut = new Array(numOfLights);
        lightsCheckedOut.fill(false);
        
        _createIglooLight();
        
        _createDirectionalLight();
        
    };

    var checkoutLight = function () {
        
        for(var i = 0; i < numOfLights; i++){
            if(!lightsCheckedOut[i]){
                lightsCheckedOut[i] = true;
                lights.getLightAt(i).setLightTo(true);
                return { light: lights.getLightAt(i), ID: i};
            }
        }
        
        return null;
    };
    
    var returnLight = function (ID) {
        
        if(lightsCheckedOut[ID]){
            _resetToDefault(lights.getLightAt(ID));
            lights.getLightAt(ID).setLightTo(false);
            lightsCheckedOut[ID] = false;
        }
        
    };
    
    var getIglooLight = function () {
        
        return iglooLight;
        
    };
    
    var getDirectionalLight = function () {
        
        return directionalLight;
        
    };
    
    var _createLights = function () {

        var temp = new LightSet();

        for(var i = 0; i < numOfLights; i++) {
            
            temp.addToSet(_createPointLight());
        }

        return temp;

    };
    
    var _resetToDefault = function ( light ) {
        
        var red = HelperFunctions.Core.generateRandomFloat(0.3, 1);
        var green = HelperFunctions.Core.generateRandomFloat(0, 1);
        var blue = HelperFunctions.Core.generateRandomFloat(0.2, 1);
        
        light.set2DPosition([-100, -100]);
        light.setDirection([0, 0, -1]);
        light.setColor([red, green, blue, 1]);
        light.setNear(25);
        light.setFar(40);
        light.setInner(0.1);
        light.setOuter(0.2);
        light.setIntensity(3);
        light.setDropOff(2);
        
    };
    
    var _createPointLight = function () {
        var red = HelperFunctions.Core.generateRandomFloat(0.3, 1);
        var green = HelperFunctions.Core.generateRandomFloat(0, 1);
        var blue = HelperFunctions.Core.generateRandomFloat(0.2, 1);
        var l = _createALight(Light.eLightType.ePointLight,
                [-100, -100, 5], // position
                [0, 0, -1], // Direction 
                [red, green, blue, 1], // some color
                25, 40, // near and far distances
                0.1, 0.2, // inner and outer cones
                3, // intensity
                2                     // drop off
                );
        return l;
    };
    
    var _createDirectionalLight = function () {
        directionalLight = _createALight(Light.eLightType.eDirectionalLight,
                [-100, -100, 4], // position (not used by directional)
                [1, 0, 2], // Pointing direction upwards
                [0, 0.7, 0.5, 1], // color
                50, 100, // near anf far distances: essentially switch this off
                0.3, 1.2, // inner and outer cones
                2, // intensity
                1                    // drop off
                );
    };

    var _createIglooLight = function () {
        
        iglooLight = _createALight(Light.eLightType.eSpotLight,
                [730, 80, 10], // random position - reset in obj.
                [-1, 0, -2], // direction
                [0.7, 0.7, 0, 1], // color
                200, 400, // near and far distances
                1.5, 2.5, // inner outter angles (in radius)
                10, // intensity
                2                     // drop off
                );
    };
    
    var _createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
        
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
    
    var mPublic = {
        initLightManager: initLightManager,
        checkoutLight: checkoutLight,
        returnLight: returnLight,
        getIglooLight: getIglooLight,
        getDirectionalLight: getDirectionalLight
    };

    return mPublic;
}());
