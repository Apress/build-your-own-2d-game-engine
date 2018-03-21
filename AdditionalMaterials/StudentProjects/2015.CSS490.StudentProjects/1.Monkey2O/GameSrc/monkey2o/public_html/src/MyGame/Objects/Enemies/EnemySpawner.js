/* File: EnemySpawner.js 
 * Date: 12/13/2015
 * Author(s): Dexter Hu
 * 
 * Handles enemy spawning.  Enemies should spawn in more "difficult" ways
 * as the player gets further into the game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Enemy, Squid, Shark, Eel, Anglerfish, Player, MyGame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EnemySpawner(camera, player, angler, playerLight, globalLightSet, sheet1, sheet2, radarSprite) {
    this.kSheet1 = sheet1;
    this.kSheet2 = sheet2;
    this.kRadarSprite = radarSprite;
    
    // The first spawn (the fastest spawn will be about half of this)
    this.kFirstSpawn = 600;
    
    // The depth bearing the highest difficulty level
    this.kMaxDepth = 250;
        
    // How long it takes before the game spawns an enemy
    this.mNextSpawn = this.kFirstSpawn;
    // How long it has been since the game spawned an enemy
    this.mTimer = 0;
    
    // Required information to make enemies
    this.mCamera = camera;
    this.mPlayer = player;
    this.mAngler = angler;
    this.mPlayerLight = playerLight;
    this.mGlobalLightSet = globalLightSet;
}

EnemySpawner.prototype.update = function () {
    if (this.mTimer === this.mNextSpawn) {
        // Prepare for a new spawn
        var depth = this.mPlayer.getDistanceInMeters();
        var depthProgress = Math.min(1, depth / this.kMaxDepth);
        this.mTimer = 0;
        // Increases the spawn rate by up to double based on depth (with 20% randomness)
        this.mNextSpawn = Math.ceil((((1 - depthProgress) / 2) + 0.5) * this.kFirstSpawn /* * (Math.random() * 0.4 + 0.8)*/);
        var r = Math.random();
        var enemy = null;
        var xform = this.mPlayer.getXform();
        var madeAngler = false;
        
        // Note that anglerfish has a lower chance of spawning (the others are the same)
        if (r < 0.28) {
            enemy = new Squid(this.kSheet1, null, xform.getXPos() + 180, Math.random() * 50 - 40, this.mCamera, this.mPlayer, depthProgress, this.kRadarSprite);
        } else if (r < 0.56) {
            enemy = new Shark(this.kSheet1, null, xform.getXPos() - 30, Math.random() * 40 - 20, this.mCamera, this.mPlayer, depthProgress, this.kRadarSprite);
        } else if (r < 0.84) {
            enemy = new Eel(this.kSheet2, null, xform.getXPos() + (Math.random() * 20 + 70), -20, this.mCamera, this.mPlayer, depthProgress, this.kRadarSprite);
        } else {
            var anglerXform = this.mAngler.mObj.getXform();
            if (anglerXform.getXPos() === -1000 || anglerXform.getYPos() === -1000) {
                // Anglerfish is available to spawn
                anglerXform.setXPos(xform.getXPos() - 30);
                anglerXform.setYPos(Math.random() * 30 - 15);
                this.mAngler.mDepthProgress = depthProgress;
                madeAngler = true;
            } else {
                // Re-roll, anglerfish wasn't available
                r = Math.random();
                if (r < 0.33) {
                    enemy = new Squid(this.kSheet1, null, xform.getXPos() + 180, Math.random() * 50 - 40, this.mCamera, this.mPlayer, depthProgress, this.kRadarSprite);
                } else if (r < 0.66) {
                    enemy = new Shark(this.kSheet1, null, xform.getXPos() - 30, Math.random() * 40 - 20, this.mCamera, this.mPlayer, depthProgress, this.kRadarSprite);
                } else {
                    enemy = new Eel(this.kSheet2, null, xform.getXPos() + (Math.random() * 20 + 70), -20, this.mCamera, this.mPlayer, depthProgress, this.kRadarSprite);
                }
            }
        }
        
        // Add to layer if not an anglerfish (since that's already in it)
        if (!madeAngler) {
            gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, enemy);
            enemy.clearLights();
            enemy.addLight(this.mPlayerLight);
            enemy.addLight(this.mGlobalLightSet.getLightAt(2));
            enemy.addLight(this.mGlobalLightSet.getLightAt(3));
        }
    } else {
        this.mTimer++;
    }
};
