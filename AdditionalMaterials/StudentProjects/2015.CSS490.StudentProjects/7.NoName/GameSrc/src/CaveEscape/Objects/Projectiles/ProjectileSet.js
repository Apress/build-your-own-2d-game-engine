/* File: ProjectileSet.js 
 *
 * Creates and initializes a ProjectileSet
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ProjectileSet(expSet, isEnemy) {
    this.mExplosionSet = expSet;
    this.mIsEnemy = isEnemy;
    this.mShadowCaster = null;
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(ProjectileSet, GameObjectSet);

ProjectileSet.prototype.update = function() {
    
    // remove the expired ones from this set AND from the layermanager
    var i, obj;
    for (i = this.size() - 1; i >= 0; i--) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired()) {
            this.removeFromSet(obj); 
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, obj);  
            //gEngine.LayerManager.removeShadowCaster(obj);  
        }
    }
};

ProjectileSet.prototype.newAt = function(x, y, dir, damage, lgtSet, projectileSpeed, bulletType, target, homingRate) {
    
    var p;
    if (bulletType === Weapon.eBulletType.eMissile) // homing missile
        p = new Missile(x, y, dir, damage, lgtSet, projectileSpeed, target, homingRate);
    else if(this.mIsEnemy === true)
        p = new EnemyBeam(x, y, dir, damage, lgtSet, projectileSpeed);
    else                                       // default bullet
        p = new Beam(x, y, dir, damage, lgtSet, projectileSpeed);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, p);
    //gEngine.LayerManager.addAsShadowCaster(p);    
    this.addToSet(p);
};

ProjectileSet.prototype.checkTurretCollision = function(ship, turretSet) {

    var i, n, turret, projectile;
    
    // Check each turret
    for (i = turretSet.size() - 1; i >= 0; i--) {
        
        turret = turretSet.getObjectAt(i);
        var bbox = turret.getBBox();
        
        // Check each projectile
        for (n = this.size() - 1; n >= 0; n--) {
            
            projectile = this.getObjectAt(n);
            
            // Did they collide?
            if(bbox.boundCollideStatus(projectile.getBBox()) !== 0) {
                turret.projectileHit(ship, projectile, this.mExplosionSet);
                projectile.setExpired();  // expire the projectile
            }
        }
    }
};

ProjectileSet.prototype.checkPowerUpCollision = function(powerUpSet) {

    var i, n, powerup, projectile;
    
    // Check each powerup
    for (i = 0; i < powerUpSet.size(); i++) {
        
        powerup = powerUpSet.getObjectAt(i);
        var bbox = powerup.getBBox();
        var hit = false;
        
        // Check each projectile
        for (n = 0; n < this.size() && !hit; n++) {
            
            projectile = this.getObjectAt(n);
            
            // Did they collide?
            if(bbox.boundCollideStatus(projectile.getBBox()) !== 0) {
		powerup.projectileHit(projectile, this.mExplosionSet);
                projectile.setExpired();  // expire the projectile
                hit = true;
            }
        }
    }
};

ProjectileSet.prototype.checkShipCollision = function(ship) {

    var bbox = ship.getBBox();
            
    var i, obj;
    for (i = 0; i < this.size(); i++) {

        obj = this.getObjectAt(i);

        // Did we collide?
        if(bbox.boundCollideStatus(obj.getBBox()) !== 0) {
            var h = [];
            if (obj.pixelTouches(ship, h)) { // per-pixel accurate collision
                // Allow the ship to calculate the damage
                ship.projectileHit(obj);

                // Expire the projectile
                obj.setExpired();
            }
        }
    }    
};

ProjectileSet.prototype.checkTerrainCollision = function(terrainSet) {

    var i, n, projectile, dir, projectileXPos, finishedTerrainCheck;
    var orientation = terrainSet.getOrientation();
    
    // Check all of the projectiles
    for (i = this.size() - 1; i >= 0; i--) {
        
        projectile = this.getObjectAt(i);
        dir = projectile.getCurrentFrontDir();
        
        if(dir[1] > 0 && orientation === 1) { continue; }       // If the projectile is moving upwards and the terrainSet is orientated DOWN then no checking is needed
        else if (dir[1] < 0 && orientation === 0) { continue; } // If the projectile is moving downwards and the terrainSet is orientated UP then no checking is needed

        projectileXPos = projectile.getXform().getXPos();
        finishedTerrainCheck = false;

        // Check all of the terrain
        for (n = 0; n < terrainSet.size() && !finishedTerrainCheck; n++) {
            
            var terrain = terrainSet.getObjectAt(n);
            var terrainXPos = terrain.getXform().getXPos();
            
            // Skip this boundbox collision detection if the terrain is to the left of the projectile
            if(terrainXPos < (projectileXPos - 1)) { continue; }  
            
            // Skip all remaining boundbox testing if the terrain is to the right of the projectile
            else if(terrainXPos > (projectileXPos + 1)) { finishedTerrainCheck = true; }  

            // Get the bounding box for the terrain
            var terrainBbox = terrain.getBBox();
            
            // Did we collide?
            if (projectile.getBBox().boundCollideStatus(terrainBbox) !== 0) {
                
                // Generate a very small explosion when a projectile hits the terrain
                var curPos = projectile.getXform().getPosition();
                this.mExplosionSet.newExplosion(curPos[0], curPos[1], ExplosionSet.eExplosionType.eVerySmall);
                projectile.setExpired();
            }
        }
    }
};