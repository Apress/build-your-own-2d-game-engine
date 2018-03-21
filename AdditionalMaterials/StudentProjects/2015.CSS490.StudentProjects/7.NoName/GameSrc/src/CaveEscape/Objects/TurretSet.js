/* File: TurretSet.js 
 *
 * Creates and initializes a TurretSet
 */

 /*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

TurretSet.eSpawnRate = Object.freeze({
    eLowSpawn:    0,
    eMediumSpawn: 1,
    eHighSpawn:   2,
    eInsaneSpawn: 3
});

function TurretSet(camera, projSet, lgtSet, expSet, target, terrainTop, terrainBot, audioCue) {
    
    this.mSoundCue = audioCue;
    this.mCamera = camera;
    this.mProjectileSet = projSet;
    this.mLightSet = lgtSet;
    this.mTarget = target;
    this.mTerrainSetTop = terrainTop;
    this.mTerrainSetBot = terrainBot;
    this.mExplosionSet = expSet;
    
    // Variables that govern turret generation frequency
    this.mBaseMaxCyclesBetweenProc = 180;
    this.mBaseMinCyclesBetweenProc = 40;
    this.mCurrentMaxCyclesBetweenProc = null;
    this.mCurrentMinCyclesBetweenProc = null;
    this.mSpawnRate = null;    
    this._setSpawnRate(TurretSet.eSpawnRate.eLowSpawn);
    this.mCyclesUntilNextProc = 120;    
    
    this.mDistanceSinceLastStateChange = 0;
    this.mLastDistance = 0;
    
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(TurretSet, GameObjectSet);

TurretSet.prototype.update = function(stage, distance, endDistance) {
    
    this.mCyclesUntilNextProc--;
    
    // remove the expired ones from this set AND from the layermanager
    var i, obj;
    for (i = this.size() - 1; i >= 0; i--) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired()) {
            this.removeFromSet(obj); 
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, obj);
            gEngine.LayerManager.removeLightFromAllLayers(obj.getLight()); 
        }
    }
    
    // Generate new powerups
    if(this.mCyclesUntilNextProc <= 0) {

        // Generate the new powerup
        this.generateTurret(stage);

        // Determine when the next powerup will be generated (this is based on the current spawn rate)
        this._updateSpawn(stage, distance, endDistance);
    }    
};

TurretSet.prototype.getSpawnRate = function() { return this.mSpawnRate; };

TurretSet.prototype._setSpawnRate = function(rate) {

    switch(rate) {
        
        case TurretSet.eSpawnRate.eMediumSpawn:
            this.mCurrentMaxCyclesBetweenProc = this.mBaseMaxCyclesBetweenProc * 0.9;
            this.mCurrentMinCyclesBetweenProc = this.mBaseMinCyclesBetweenProc * 0.9;
            break;

        case TurretSet.eSpawnRate.eHighSpawn:
            this.mCurrentMaxCyclesBetweenProc = this.mBaseMaxCyclesBetweenProc * 0.7;
            this.mCurrentMinCyclesBetweenProc = this.mBaseMinCyclesBetweenProc * 0.7;
            break;

        case TurretSet.eSpawnRate.eInsaneSpawn:
            this.mCurrentMaxCyclesBetweenProc = this.mBaseMaxCyclesBetweenProc * 0.5;
            this.mCurrentMinCyclesBetweenProc = this.mBaseMinCyclesBetweenProc * 0.5;
            break;

        default:
            this.mCurrentMaxCyclesBetweenProc = this.mBaseMaxCyclesBetweenProc;
            this.mCurrentMinCyclesBetweenProc = this.mBaseMinCyclesBetweenProc;
            break;
    }
    
    this.mSpawnRate = rate;
};

TurretSet.prototype._updateSpawn = function(difficulty, distance, endDistance) {

    var unit = endDistance * 0.0625;  // How often do we change states?
    
    this.mDistanceSinceLastStateChange += distance - this.mLastDistance;
    this.mLastDistance = distance;
    
    // Do we need to change states?
    if(this.mDistanceSinceLastStateChange >= unit) { 

        if(this.mSpawnRate === TurretSet.eSpawnRate.eLowSpawn) {
            
            // At the endgame always jump to eHighSpawn state
            if(difficulty === GameLevel.eState.eEndStage) {
                this._setSpawnRate(TurretSet.eSpawnRate.eHighSpawn);
            }

            // Otherwise we always go to medium
            else {
                this._setSpawnRate(TurretSet.eSpawnRate.eMediumSpawn);
            }
        }
        
        else if (this.mSpawnRate === TurretSet.eSpawnRate.eMediumSpawn) {
            this._setSpawnRate(TurretSet.eSpawnRate.eHighSpawn);
        }
        
        else if(this.mSpawnRate === TurretSet.eSpawnRate.eHighSpawn) {
            
            // At the endgame always jump to eInsaneSpawn state
            if(difficulty === GameLevel.eState.eEndStage) {
                this._setSpawnRate(TurretSet.eSpawnRate.eInsaneSpawn);
            }

            // Otherwise we always go to low
            else {
                this._setSpawnRate(TurretSet.eSpawnRate.eLowSpawn);
            }
        }

        // Reset the counter that tracks how long since our last state change
        this.mDistanceSinceLastStateChange = 0;
    }
    
    // Update the cycle counter
    this.mCyclesUntilNextProc = (Math.random() * this.mCurrentMaxCyclesBetweenProc) + this.mCurrentMinCyclesBetweenProc;
};

TurretSet.prototype.newAt = function(x, y, type, initialDirection, projSet, target, lgtSet) {

    var t = new Turret(x, y, type, initialDirection, projSet, lgtSet, this.mSoundCue);
    t.setTarget(target);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, t);
    this.addToSet(t);
};

TurretSet.prototype.generateTurret = function (stage) {

    // Testing: capping the number of turrets to 6 for now
    if(this.size() > 6) { return; }

    var type;
    
    // Difficulty changes as the player approaches the end of the cave, which causes
    // more difficult turrets to spawn.
    var rand = Math.random();
    switch(stage) {
        
        case GameLevel.eState.eStage2:
            if(rand < 0.5) { type = Turret.eType.eStrong; }
            else if(rand < 0.8) { type = Turret.eType.eVeryStrong; }
            else { type = Turret.eType.eElite; }
            break;
        
        case GameLevel.eState.eStage3:
            if(rand < 0.6) { type = Turret.eType.eElite; }
            else if(rand < 0.8) { type = Turret.eType.eSuperElite; }
            else { type = Turret.eType.eEliteMissile; }
            break;

        case GameLevel.eState.eEndStage:
            if(rand < 0.4) { type = Turret.eType.eElite; }
            else if(rand < 0.75) { type = Turret.eType.eSuperElite; }
            else if(rand < 0.9) { type = Turret.eType.eEliteMissile; }
            else { type = Turret.eType.eSuperEliteMissile; }
            break;

        default: // Low difficulty
            if(rand < 0.7) { type = Turret.eType.eWeak; }
            else { type = Turret.eType.eNormal; }
            break;
    }

    // Pick which terrain set the new turret will be added to
    var terrainSet;
    var rand = (Math.random() * 2);
    if (Math.floor(rand) === 0) { terrainSet = this.mTerrainSetBot; }
    else { terrainSet = this.mTerrainSetTop; }

    var terrain = terrainSet.findNearest(this.mCamera.getWCCenter()[0] + (this.mCamera.getWCWidth() / 2) + 1);
    
    var x = terrain.getXform().getXPos();
    
    var y = terrain.getXform().getYPos();
    var displacement = terrain.getXform().getHeight() / 2 + 0.5;
    var initialDirection;
    
    if (terrainSet.getOrientation() === 0) {
        y -= displacement;
        initialDirection = vec2.fromValues(0, -1);
    } else if (terrainSet.getOrientation() === 1) {
        y += displacement;
        initialDirection = vec2.fromValues(0, 1);
    }
    
    this.newAt(x, y, type, initialDirection, this.mProjectileSet, this.mTarget, this.mLightSet);
};

TurretSet.prototype.checkShipCollision = function(ship) {
    var i;  
    
    var curPos = ship.getXform().getPosition();
    var newX = curPos[0];
    var newY = curPos[1];
    
    for (i = 0; i < this.size(); i++) {
        
        var turret = this.getObjectAt(i); 
        var turretXPos = turret.getXform().getXPos();

        // Skip this boundbox collision detection if the turret is to the left of the ship
        if(turretXPos < (curPos[0] - 1)) { 
            continue; }  

        // Skip all remaining boundbox testing if the turret is to the right of the ship
        else if(turretXPos > (curPos[0] + 1)) { 
            return; }  
        
        // Otherwise we need to do the bounding box collision check
        var turretBbox = turret.getBBox();
        var shipBbox = ship.getBBox();
        
        var bboxStatus = turret.getBBox().boundCollideStatus(ship.getBBox());
        
        if (bboxStatus !== 0) {  
            
            // If the ship hit top of the turret then push the ship up
            if( (bboxStatus & BoundingBox.eboundCollideStatus.eCollideTop) === BoundingBox.eboundCollideStatus.eCollideTop) {
                newY = turretBbox.maxY() + (shipBbox.height() / 2);
            }
            
            // If the ship hit bottom of the turret then push the ship down
            else if( (bboxStatus & BoundingBox.eboundCollideStatus.eCollideBottom) === BoundingBox.eboundCollideStatus.eCollideBottom) {
                newY = turretBbox.minY() - (shipBbox.height() / 2);
            }

            // Update the ship's position
            //ship.getXform().setPosition(newX, newY);
            
            // Have the ship take damage
            ship.processDamage(2);
            
            // Have the turret take damage
            turret.shipHit(ship, this.mExplosionSet);
            
            return;
        }
    }
};
