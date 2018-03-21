/* File: BananaSpawner.js 
 * Date: 12/15/2015
 * Author(s): Dexter Hu and Terry Rogers
 * 
 * Handles banana spawning (they spawn in sets).
 */

/*jslint node: true, vars: true */
/*global gEngine, BananaSet, Banana, Player, MyGame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BananaSpawner(camera, player, playerLight, globalLightSet, sprite, normal, sound, hud, laneSet) {
    this.kSprite = sprite;
    this.kNormal = normal;
    this.kSound = sound;
    
    // The first spawn
    this.kFirstSpawn = 90;
    
    // How long it takes before the game spawns a new banana set
    this.mNextSpawn = this.kFirstSpawn;

    // How long it has been since the game spawned a banana
    this.mTimer = 0;
    
    // Required information to make bananas
    this.mCamera = camera;
    this.mPlayer = player;
    this.mLaneSet = laneSet;
    this.mPlayerLight = playerLight;
    this.mGlobalLightSet = globalLightSet;
    this.mHUD = hud;
}

BananaSpawner.prototype.update = function () {
    if (this.mTimer === this.mNextSpawn) {
        // Prepare for a new spawn
        this.mTimer = 0;
        // 1.5 to 3 second spawns
        this.mNextSpawn = Math.ceil(Math.random() * this.kFirstSpawn + this.kFirstSpawn);
        
        var distance = this.mPlayer.getXform().getXPos() + 100;
        var randomLane = this.mLaneSet.getRandomLane();
        var laneXForm = randomLane.getXform();
        var lanePosition = laneXForm.getPosition();
    
        var bananaSet = new BananaSet({
            texture: this.kSprite,
            normalMap: this.kNormal,
            position: {
                x: distance,
                y: lanePosition[1]
            },
            direction: BananaSet.constants.directions.horizontal,
            pivot: BananaSet.constants.pivots.left,
            player: this.mPlayer,
            camera: this.mCamera,
            hud: this.mHUD,
            bananaSound: this.kSound
        });
    
        bananaSet.clearLights();
        bananaSet.addLight(this.mPlayerLight);
        bananaSet.addLight(this.mGlobalLightSet.getLightAt(2));
        bananaSet.addLight(this.mGlobalLightSet.getLightAt(3));
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eBananas, bananaSet);
    } else {
        this.mTimer++;
    }
};