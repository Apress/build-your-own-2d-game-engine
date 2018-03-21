/* 
 * Author: Tyler Green, Steven Roberts
 * File: HealDrone.js
 * Purpose: This file contains the Healing Drone object and update logic.
 */

/*
 * A Healing Drone
 *  This object spawns on the far right and can be touched to cause it to follow
 *      the hero object, healing them.
 */
function HealDrone(sprite, atX, atY, target, normalMap, light) {
    if (normalMap === null) {
        this.mDrone = new LightRenderable(sprite);
    } else {
        this.mDrone = new IllumRenderable(sprite, normalMap);
    }
    
    this.mDrone.setAnimationSpeed(10);
    this.mDrone.setSpriteSequence(25, 0, 13, 25, 2, 1);//top, left, width, height, count, padding
    
    this.mDrone.setColor([0, 1, 0, 0]);
    this.mDrone.getXform().setSize(3, 5);
    this.mDrone.getXform().setPosition(atX, atY);
    
    GameObject.call(this, this.mDrone); 
    
    this.mSpeed = 0;
    this.mTurnSpeed = 0.3;
    this.mLifeTime = 5*60;     //stick around for 10 seconds (60 fps)
    this.mFollow = false;
    this.mTarget = target;
    this.kHealing = 1;      //heals for 1 point
    this.mDroneLight = light;
}
gEngine.Core.inheritPrototype(HealDrone, GameObject);

//Retrieves Green Drone Light
HealDrone.prototype.getLight = function() { return this.mDroneLight;};

HealDrone.prototype.removeAllLights = function () {
    GameObject.prototype.removeAllLights.call(this);
    };
/*
 * The Drone sits at its position until the target touches it.
 * Then it follows the target, but stops moving if it touches the target bounds.
 */
HealDrone.prototype.update = function() {
    this.mDrone.updateAnimation();
    
    //If the hero touched the drone, the drone heals the hero and begins following
    if(this.mFollow === false && this.mTarget !== null){ //limit number of times this needs to be called
        if(this.getBBox().boundCollideStatus(this.mTarget.getBBox()) > 0){
            this.mFollow = true;
            this.mTarget.heal(1);
            //LIGHT CODE
            if (this.mDroneLight !== null) {
                this.mDroneLight.setLightTo(true);
            }
            //
            this.mDrone.setSpriteSequence(25, 28, 13, 25, 3, 1);
        }
    }
    
    //If it's supposed to follow, then do so.
    if(this.mFollow === true){
        this.mLifeTime--;   //begin to decay
        if(this.mTarget !== null){
            //Don't go inside the hero.
            if(this.getBBox().boundCollideStatus(this.mTarget.getBBox()) === 0){
                this.rotateObjPointTo(this.mTarget.getXform().getPosition(), 
                    this.mTurnSpeed);   
                    this.mSpeed = 1.0;
            } else 
                this.mSpeed = 0;
        }

        //Actually moving towards the target
        var pos = this.getXform().getPosition();
        
        //simple chase
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.mSpeed);
        
        if (this.mDroneLight !== null) {
            this.mDroneLight.setXPos(this.getXform().getXPos());
            this.mDroneLight.setYPos(this.getXform().getYPos());
        }
        //
    }
    if(this.mLifeTime <= 0){
        //this.setVisibility(false);
        this.mFollow = false;
        if (this.mDroneLight !== null) {
                this.mDroneLight.setLightTo(false);
            }
        //this.mSpeed = 0;
    }
};