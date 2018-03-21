/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: GameLights.js 
 * 
 * This is the main logic of our game. 
 * 
 */


gGameLights = (function() {
    var mGlobalLightSet = null;
    var mLightStatus = true;
    var mNextPointLight = 3;
    
    
    var getNextPointLight = function () {
        var theNextValue = mNextPointLight;
        mNextPointLight++;
        if (mNextPointLight > 5)
            mNextPointLight = 3;
        
        return mGlobalLightSet.getLightAt(theNextValue);
    }
    
    var getHeadLight = function () {
        return mGlobalLightSet.getLightAt(1);
    };
    
    var getDirectionalLight = function () {
        return mGlobalLightSet.getLightAt(0);;
    };
    
    var getLightSet = function () {
        return mGlobalLightSet;
    };
    
    var lightAtIndex = function (atIndex) {
        return mGlobalLightSet.getLightAt(atIndex);
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
        light.setLightCastShadowTo(true);

        return light;
    };
    
    var initializeLights = function () {
        if (mGlobalLightSet)
            return;
        
        mGlobalLightSet = new LightSet();

        // The overall directional light at index 0
        l = _createALight(Light.eLightType.eDirectionalLight,
                [15, 50, 10], // position (not used by directional)
                [0, 0, -1], // Pointing direction 
                [1.0, 1.0, 1.0, 1], // color
                500, 500, // near anf far distances: essentially switch this off
                0.1, 0.2, // inner and outer cones
                1, // intensity
                1.0                     // drop off
                );
        mGlobalLightSet.addToSet(l);

        // The headlight for the ship at index 1
        l = _createALight(Light.eLightType.eSpotLight,
                [50, 10, 12], // Center of camera 
                [0.0, 0.16, -1], // Direction
                [0.8, 0.8, 0.8, 1], //  color
                20, 40, // near and far distances
                1.65, 1.7, // inner and outer cones
                5, // intensity
                1.5                      // drop off
                );
        mGlobalLightSet.addToSet(l);
        
        // The light for the power up status display at index 2
        var l = _createALight(Light.eLightType.ePointLight,
                [55, 61, -1], // position
                [0, 0, -1], // Direction 
                [1.0, 1.0, 0.0, 1], // some color
                22, 30, // near and far distances
                0.1, 0.2, // inner and outer cones
                2, // intensity
                1.0                  // drop off
                );
        mGlobalLightSet.addToSet(l);

        var l = _createALight(Light.eLightType.ePointLight,
                [50, 50, -21], // position
                [0, 0, -1], // Direction 
                [1.0, 1.0, 1.0, 1], // some color
                8, 20, // near and far distances
                0.1, 0.2, // inner and outer cones
                100, // intensity
                1.0                  // drop off
                );
        mGlobalLightSet.addToSet(l);

        var l = _createALight(Light.eLightType.ePointLight,
                [50, 50, -21], // position
                [0, 0, -1], // Direction 
                [1.0, 1.0, 1.0, 1], // some color
                8, 20, // near and far distances
                0.1, 0.2, // inner and outer cones
                100, // intensity
                1.0                  // drop off
                );
        mGlobalLightSet.addToSet(l);

        var l = _createALight(Light.eLightType.ePointLight,
                [50, 50, -21], // position
                [0, 0, -1], // Direction 
                [1.0, 1.0, 1.0, 1], // some color
                8, 20, // near and far distances
                0.1, 0.2, // inner and outer cones
                100, // intensity
                1.0                  // drop off
                );
        mGlobalLightSet.addToSet(l);
    };
    
    var toggleAllLights = function () {
        mLightStatus = !mLightStatus;

        for (var i = 0; i < 5; i++) {
            setLightAtIndex(i,mLightStatus);
        }
    };
    
    var setLightAtIndex = function (atIndex, inSetting) {
        mGlobalLightSet.getLightAt(atIndex).setLightTo(inSetting);
    }
    
    var mPublic = {
        initialize: initializeLights,
        lightAtIndex: lightAtIndex,
        getLightSet: getLightSet,
        getDirectionalLight: getDirectionalLight,
        getHeadLight: getHeadLight,
        getNextPointLight: getNextPointLight,
        setLightAtIndex: setLightAtIndex,
        toggleAllLights: toggleAllLights
    };
    return mPublic;
} ());
