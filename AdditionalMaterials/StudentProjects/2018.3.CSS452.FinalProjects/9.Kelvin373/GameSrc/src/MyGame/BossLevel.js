/**
 * BossLevel
 *
 * This defines the (somewhat placeholder) boss level for the playtest demo
 */

"use strict";

function BossLevel()
{
    Level.call(this);

    // tile sprites
    this.kTile128 = "assets/tile128x128.png";
    this.kTile256 = "assets/tile256x256.png";
    this.kTile256x128 = "assets/tile256x128.png";
    this.kBackground = "assets/background_circuits.png";
    this.kBackgroundNormal = "assets/background_circuits_normal.png";

    // set the camera center
    this.setCameraCenterXY(150, 105);
    this.setWorldBounds(vec2.fromValues(150, 105), 300, 210);

    // set the background to use a normal map
    this.setBackgroundNormalMap(this.kBackground, this.kBackgroundNormal);
    this.mBackgroundFixedToCamera = true;

    // create a red light in the pits
    this.mTrackedLight = new Light();
    this.mTrackedLight.setColor([1, 0, 0, 1]);
    this.mTrackedLight.set2DPosition([45, 5]);
    this.mTrackedLight.setZPos(5);
    this.mTrackedLight.setDirection(vec3.fromValues(0, 1, -0.5));
    this.mTrackedLight.setLightType(Light.eLightType.ePointLight);
    this.mTrackedLight.setNear(1);
    this.mTrackedLight.setFar(20);
    this.mTrackedLight.setDropOff(1);
    this.mTrackedLight.setIntensity(10);
    
    this.mSpotLight = new Light();
    this.mSpotLight.setColor([1,1,1,1]);
    this.mSpotLight.set2DPosition([0,210]);
    this.mSpotLight.setZPos(1);
    this.mSpotLight.setDirection([0,-100,0]);
    this.mSpotLight.setLightType(Light.eLightType.eSpotLight);
    this.mSpotLight.setNear(1);
    this.mSpotLight.setFar(200);
    this.mSpotLight.setDropOff(1);
    this.mSpotLight.setIntensity(10);
    
    this.mSpotLight2 = new Light();
    this.mSpotLight2.setColor([1,1,1,1]);
    this.mSpotLight2.set2DPosition([300,210]);
    this.mSpotLight2.setZPos(1);
    this.mSpotLight2.setDirection([0,-100,0]);
    this.mSpotLight2.setLightType(Light.eLightType.eSpotLight);
    this.mSpotLight2.setNear(1);
    this.mSpotLight2.setFar(200);
    this.mSpotLight2.setDropOff(1);
    this.mSpotLight2.setIntensity(10);
    
    //Create a directional light
    this.mDirectionalLight = new Light();
    this.mDirectionalLight.setColor([1,1,1,1]);
    this.mDirectionalLight.set2DPosition([100,105]);
    this.mDirectionalLight.setZPos(50);
    this.mDirectionalLight.setDirection([0,-10,-1]);
    this.mDirectionalLight.setLightType(Light.eLightType.eDirectionalLight);
    this.mDirectionalLight.setInner(.2);
    this.mDirectionalLight.setOuter(.4);
    this.mDirectionalLight.setNear(1);
    this.mDirectionalLight.setFar(4);
    this.mDirectionalLight.setDropOff(1);
    this.mDirectionalLight.setIntensity(0.5);
    this.mDirectionalLight.isLightCastShadow(true);

    this.addLight(
        this.mTrackedLight
    );
    this.addLight(this.mDirectionalLight);
    this.addLight(this.mSpotLight);
    this.addLight(this.mSpotLight2);

    // set the spawnpoint
    this.setPlayerSpawnXY(175, 90);

    // add the borders

    this.addPlatform(new Platform(
        this.kTile256x128, 150, 207.5, 288, 5, 0
    ));

    this.addPlatform(new Platform(
        this.kTile256, 2.5, 135, 5, 150, 0
    ));
    this.addPlatform(new Platform(
        this.kTile256, 297.5, 135, 5, 150, 0
    ));

    this.addPlatform(new Platform(
        this.kTile256x128, 45, 55, 10, 5, 0
    ));
    this.addPlatform(new Platform(
        this.kTile256x128, 105, 55, 10, 5, 0
    ));
    this.addPlatform(new Platform(
        this.kTile256x128, 195, 55, 10, 5, 0
    ));
    this.addPlatform(new Platform(
        this.kTile256x128, 255, 55, 10, 5, 0
    ));

    // add the side platforms
    this.addPlatform(new Platform(
        this.kTile256x128, 22.5, 87.5, 7.5, 5, 0
    ));
    this.addPlatform(new Platform(
        this.kTile256x128, 22.5, 60 + 87.5, 7.5, 5, 0
    ));

    this.addPlatform(new Platform(
        this.kTile256x128, 285, 87.5, 7.5, 5, 0
    ));
    this.addPlatform(new Platform(
        this.kTile256x128, 285, 60 + 87.5, 7.5, 5, 0
    ));

    // add some center platforms
    this.addPlatform(new Platform(
        this.kTile256x128, 90, 120, 60, 5, 0
    ));
    this.addPlatform(new Platform(
        this.kTile256x128, 210, 120, 60, 5, 0
    ));

    // top platforms
    this.addPlatform(new Platform(
        this.kTile256x128, 45, 180, 30, 5, 0
    ));

    this.addPlatform(new Platform(
        this.kTile256x128, 300 - 45, 180, 30, 5, 0
    ));

    // floor bottom most layer
    this.addPlatform(
        new Platform(
        this.kTile256,
        15, 15, // x y
        30, 30, // width, height
        0 // rot
        )
    );
    this.addPlatform(
        new Platform(
        this.kTile256,
        75, 15, // x y
        30, 30, // width, height
        0 // rot
        )
    );
    this.addPlatform(
        new Platform(
        this.kTile256,
        135, 15, // x y
        30, 30, // width, height
        0 // rot
        )
    );
    this.addPlatform(
        new Platform(
        this.kTile256,
        165, 15, // x y
        30, 30, // width, height
        0 // rot
        )
    );
    this.addPlatform(
        new Platform(
        this.kTile256,
        225, 15, // x y
        30, 30, // width, height
        0 // rot
        )
    );
    this.addPlatform(
        new Platform(
        this.kTile256,
        285, 15, // x y
        30, 30, // width, height
        0 // rot
        )
    );

    // floor next layer
    // this is why I can not wait to get the level parsing implemented
    this.addPlatform(
        new Platform(
        this.kTile256,
        15, 45, // x y
        30, 30, // width, height
        0 // rot
        )
    );
    this.addPlatform(
        new Platform(
        this.kTile256,
        75, 45, // x y
        30, 30, // width, height
        0 // rot
        )
    );
    this.addPlatform(
        new Platform(
        this.kTile256,
        135, 45, // x y
        30, 30, // width, height
        0 // rot
        )
    );
    this.addPlatform(
        new Platform(
        this.kTile256,
        165, 45, // x y
        30, 30, // width, height
        0 // rot
        )
    );
    this.addPlatform(
        new Platform(
        this.kTile256,
        225, 45, // x y
        30, 30, // width, height
        0 // rot
        )
    );
    this.addPlatform(
        new Platform(
        this.kTile256,
        285, 45, // x y
        30, 30, // width, height
        0 // rot
        )
    );

};

gEngine.Core.inheritPrototype(BossLevel, Level);

BossLevel.prototype.update = function(hero)
{
    Level.prototype.update.call(this);
    var light1vec = [0,0,0];
    var temp1vec = this.mSpotLight.getPosition();
    light1vec[0] = hero.getXform().getXPos() - temp1vec[0];
    light1vec[1] = hero.getXform().getYPos() - temp1vec[1];
    
    this.mSpotLight.setDirection(light1vec);
    
    var light2vec = [0,0,0];
    var temp2vec = this.mSpotLight2.getPosition();
    light2vec[0] = hero.getXform().getXPos() - temp2vec[0];
    light2vec[1] = hero.getXform().getYPos() - temp2vec[1];
    
    this.mSpotLight2.setDirection(light2vec);
    this.updateSpotLightDist(hero);
};

/*
 * @param point1: vector with x,y coordinates
 * @param point2: vector with x,y coordinates
 * @return: value of the distance between the 2 provided points
 */
BossLevel.prototype.distanceBetweenPoints = function(point1, point2){
    var dist = Math.pow(Math.abs(point1[0]-point2[0]),2);
    dist += Math.pow(Math.abs(point1[1]-point2[1]),2);
    dist = Math.sqrt(dist);
    return dist;
};

BossLevel.prototype.updateSpotLightDist = function(hero){
    var light1Loc = this.mSpotLight.getPosition();
    var light2Loc = this.mSpotLight2.getPosition();
    
    this.mSpotLight.setFar(
            this.distanceBetweenPoints(hero.getXform().getPosition(), light1Loc)
            );
    this.mSpotLight2.setFar(
            this.distanceBetweenPoints(hero.getXform().getPosition(), light2Loc)
            );
};