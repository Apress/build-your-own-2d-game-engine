/**
 * Another Level
 *
 * This is another boss level
 *
 * where all of the platforms are defined
 */

"use strict";

function AnotherLevel()
{
    Level.call(this);


    // level assets
    this.kPlatform = "assets/bluegridplat_512x128.png";

    // background
    this.kBackground = "assets/background_purple.png";
    this.kBackgroundNormal = "assets/background_purple_normal.png";

    this.setCameraCenterXY(150, 105);

    this.setWorldBounds(vec2.fromValues(150, 105), 300, 210);

    // set the background to use a normal map
    this.setBackgroundNormalMap(this.kBackground, this.kBackgroundNormal);
    this.mBackgroundFixedToCamera = true;

    this.setPlayerSpawnXY(150, 90);

    // create a red light in the pits
    this.mTrackedLight = new Light();
    this.mTrackedLight.setColor([0.5, 0.5, 0.5, 1]);
    this.mTrackedLight.set2DPosition([150, 105]);
    this.mTrackedLight.setZPos(150);
    this.mTrackedLight.setDirection(vec3.fromValues(0, 1, -0.5));
    this.mTrackedLight.setLightType(Light.eLightType.ePointLight);
    this.mTrackedLight.setNear(10);
    this.mTrackedLight.setFar(200);
    this.mTrackedLight.setDropOff(100);
    this.mTrackedLight.setIntensity(3);

    this.addLight(
        this.mTrackedLight
    );

    this.addPlatform(new Platform(
        this.kPlatform, 150, 30, 200, 50, 0
    ));

    // for(var i = 0; i < this.mPlatforms.size(); i++)
    // {
    //     for(var l = 0; l < this.mLightSet.numLights(); l++)
    //     {
    //         this.mPlatforms.getObjectAt(i).addLight(
    //             this.mLightSet.getLightAt(l)
    //         );
    //     }
    // }
};

gEngine.Core.inheritPrototype(AnotherLevel, Level);

AnotherLevel.prototype.update = function()
{
    Level.prototype.update.call(this);
};