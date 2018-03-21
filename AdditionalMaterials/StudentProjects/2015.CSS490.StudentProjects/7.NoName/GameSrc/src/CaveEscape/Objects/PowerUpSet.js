/* File: PowerUpSet.js 
 *
 * Creates and initializes a PowerUpSet
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PowerUpSet(lgtSet, audioCueArray) {
    
    this.mAudioCueArray = audioCueArray;
    this.mLightSet = lgtSet;
    
    this.kMaxCyclesBetweenProc = 300;
    this.kMinCyclesBetweenProc = 45;
    this.mCyclesUntilNextProc = 120;
    
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(PowerUpSet, GameObjectSet);

PowerUpSet.prototype.update = function(camera, terrainTop, terrainBot) {
    
    this.mCyclesUntilNextProc--;
    
    // remove the expired ones from this set AND from the layermanager
    var i, obj;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired()) {
            this.removeFromSet(obj); 
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.ePowerupLayer, obj);  
        }
    }
    
    // Generate new powerups
    if(this.mCyclesUntilNextProc <= 0) {

        // Generate the new powerup
        this.generatePowerUp(camera, terrainTop, terrainBot);

        // Determine when the next powerup will be generated
        this.mCyclesUntilNextProc = (Math.random() * this.kMaxCyclesBetweenProc) + this.kMinCyclesBetweenProc;
    }
};

PowerUpSet.prototype.newAt = function(x, y, type, points, audioCue) {
    
    var p = new PowerUp(x, y, type, points, this.mLightSet, audioCue);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.ePowerupLayer, p);
    this.addToSet(p);
};

PowerUpSet.prototype.checkShipCollision = function(ship) {

    var bbox = ship.getBBox();
            
    var i, obj;
    for (i = 0; i < this.size(); i++) {

        obj = this.getObjectAt(i);

        // Did we collide?
        if(bbox.boundCollideStatus(obj.getBBox()) !== 0) {
            obj.collect(ship);
        }
    }    
};

PowerUpSet.prototype.generatePowerUp = function (camera, terrainSetTop, terrainSetBottom) {

    // Determine the rartity of the new powerup
    var rarity, type, points, audioCue;
    var roll = Math.random();
    if(roll < 0.50) { rarity = PowerUp.ePowerUpRarity.VeryCommon; points = 10; }
    else if(roll < 0.75) { rarity = PowerUp.ePowerUpRarity.Common; points = 50; }
    else if(roll < 0.90) { rarity = PowerUp.ePowerUpRarity.UnCommon; points = 100; }
    else { rarity = PowerUp.ePowerUpRarity.Rare; points = 500; }
    
    // Detemine exactly which powerup will be generated
    switch(rarity) {
        
        case PowerUp.ePowerUpRarity.Common:
            roll = Math.round((Math.random() * 6));
            switch(roll) {
                    
                case 1:
                    type = PowerUp.ePowerUpType.ShieldBoost2;
                    audioCue = this.mAudioCueArray[0];
                    break;
                    
                case 2:
                    type = PowerUp.ePowerUpType.HullBoost2;
                    audioCue = this.mAudioCueArray[0];
                    break;                    
                    
                case 3:
                    type = PowerUp.ePowerUpType.DamageBoost2;
                    audioCue = this.mAudioCueArray[0];
                    break;

                case 4:
                    type = PowerUp.ePowerUpType.DamageDecrease;
                    points *= -1;
                    audioCue = this.mAudioCueArray[3];
                    break;
                
                case 5:
                    type = PowerUp.ePowerUpType.FireRateSpeedDecrease;
                    points *= -1;
                    audioCue = this.mAudioCueArray[3];
                    break;
                    
                default:
                    type = PowerUp.ePowerUpType.MultiBoostX;
                    points *= -1;
                    audioCue = this.mAudioCueArray[4];
                    break;
                    
            }
            break;
        
        case PowerUp.ePowerUpRarity.UnCommon:
            roll = Math.round((Math.random() * 6));
            switch(roll) {
                case 1:
                    type = PowerUp.ePowerUpType.MultiShot;
                    audioCue = this.mAudioCueArray[1];
                    break;
                    
                case 2:
                    type = PowerUp.ePowerUpType.DoubleShot;
                    audioCue = this.mAudioCueArray[1];
                    break;
                    
                case 3:
                    type = PowerUp.ePowerUpType.SplitShot;
                    audioCue = this.mAudioCueArray[1];
                    break;

                case 4:
                    type = PowerUp.ePowerUpType.ShieldBoost3;
                    audioCue = this.mAudioCueArray[1];
                    break;
                    
                case 5:
                    type = PowerUp.ePowerUpType.HullBoost3;
                    audioCue = this.mAudioCueArray[1];
                    break;
                
                default:
                    type = PowerUp.ePowerUpType.FireRateSpeedBoost2;
                    audioCue = this.mAudioCueArray[1];
                    break;
            }
            break;
        
        case PowerUp.ePowerUpRarity.Rare:
            roll = Math.round((Math.random() * 3));
            switch(roll) {
                case 1:
                    type = PowerUp.ePowerUpType.MultiBoostA;
                    audioCue = this.mAudioCueArray[2];
                    break;
                    
                case 2:
                    type = PowerUp.ePowerUpType.MultiBoostB;
                    audioCue = this.mAudioCueArray[2];
                    break;
                    
                default:
                    type = PowerUp.ePowerUpType.MultiBoostC;
                    audioCue = this.mAudioCueArray[2];
                    break;
            }
            break;
            
        default:  // Very Common
            roll = Math.round((Math.random() * 4));
            switch(roll) {
                case 1:
                    type = PowerUp.ePowerUpType.ShieldBoost;
                    audioCue = this.mAudioCueArray[0];
                    break;
                    
                case 2:
                    type = PowerUp.ePowerUpType.FireRateSpeedBoost;
                    audioCue = this.mAudioCueArray[0];
                    break;
                    
                case 3:
                    type = PowerUp.ePowerUpType.DamageBoost;
                    audioCue = this.mAudioCueArray[0];
                    break;
                    
                default:
                    type = PowerUp.ePowerUpType.HullBoost;
                    audioCue = this.mAudioCueArray[0];
                    break;
            }
            break;
    }
    
    var terrainTop = terrainSetTop.findNearest(camera.getWCCenter()[0] + (camera.getWCWidth() / 2) + 1);
    
    var x = terrainTop.getXform().getXPos();
    
    var yTop = terrainTop.getXform().getYPos();
    yTop += (terrainTop.getXform().getHeight() / 2);
    
    var terrainBot = terrainSetBottom.findNearest(camera.getWCCenter()[0] + (camera.getWCWidth() / 2) + 1);
    var yBot = terrainBot.getXform().getYPos();
    yBot -= (terrainBot.getXform().getHeight() / 2);
  
    var rand = (Math.random() * (yTop - yBot));
    
    this.newAt(
            x, 
            yBot + rand, 
            type, 
            points,
            audioCue);     
};
