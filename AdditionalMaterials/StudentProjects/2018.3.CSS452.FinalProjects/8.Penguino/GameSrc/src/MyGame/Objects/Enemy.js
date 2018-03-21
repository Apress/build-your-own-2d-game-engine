/* File: Enemy.js 
 *
 *-This is the Enemy class (All enemies are derived from this class)
 *-Behavior
 *  +Movement (a function that defines the objects movement behavior, called by update)
 *  +Hit Event (a function that defines the objects behavior when it hits an obstacle) 
 *  
 *   Variables:
 *     -Life (How many hits (damage) the enemey can withstand
 *     -Damage (How much damage the enemy causes to hero (Penguin)
 *     -Speed (How fast the enemy is)
 *     -Weight (How heavy the enemy is) 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj, SpriteAnimateRenderable, Penguin*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Enemy(scene, spriteTexture, atX, atY, w, h) {
    this.mScene = scene;
    this.kSpeed = 0.08;
    this.kWeight = null;
    this.terminate = false; //This is used to tell if an object to stop updating
    this.kMoveRange = 5;
    this.kIsOnSurface = false;
    this.kOrigin = null;

    GameObject.call(this, this.mEnemy);
    this.kOrigin = vec2.fromValues(this.getXform().getXPos(), this.getXform().getYPos());
    
    //StepB: Define the GameObjects RigidBody
    var r = new RigidRectangle(this.getXform(), w, h);
    r.setVelocity(this.kSpeed, this.kSpeed);
    
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Enemy, GameObject);


//Defualt enemy update
Enemy.prototype.update = function () {
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Six))
       this.terminate = true;
   
   if (!this.terminate) {
        GameObject.prototype.update.call(this);    
        
        //if (this.kIsOnSurface === true)
            this.movement();
    }   
};


////This is defualt Enemy Movement
//Enemy.prototype.movement = function () {
//    if (this.getXform().getXPos() < this.kOrigin[0] + this.kMoveRange && Math.sign(this.kMoveRange) !== -1)
//        this.getXform().incXPosBy(this.kSpeed);
//    else if (this.getXform().getXPos() > this.kOrigin[0] + this.kMoveRange && Math.sign(this.kMoveRange) === -1)
//        this.getXform().incXPosBy(this.kSpeed * -1);
//    
//    if (this.getXform().getXPos() >= this.kOrigin[0] + 5 || this.getXform().getXPos() <= this.kOrigin[0] - 5) {
//        this.kMoveRange *= -1;
//    }    
//};

//Defualt enemy Hit event
Enemy.prototype.hitEvent = function (multiplier = 1) {
    //NOTE: Here we want it to do a Color Shake (The objects alpha channel to flash to show that you hit it)
    
    //PlaceHolderCode: For now enemy alpha channel will only increase
    var color = this.getRenderable().getColor();
    color[3] += 0.5 * multiplier;
    if(!this.terminate)
    {
      if (color[3] >= 1)
      {
        this.setVisibility(false);
        this.terminate = true;
        this.mScene.addScore(10);
      }
      else
        this.getRenderable().setColor(color);  
    }
    
};


Enemy.prototype.collision = function (otherObj, collisionInfo) {
    if (otherObj instanceof Penguin) {


        if (otherObj.getRigidBody().getVelocity()[1] < -30 || Math.abs(otherObj.getRigidBody().getVelocity()[0]) > 85)
            this.hitEvent(2); 
        else if (otherObj.getRigidBody().getVelocity()[1] <= -15 || Math.abs(otherObj.getRigidBody().getVelocity()[0]) > 50)
        {
            this.hitEvent();
        }
        else{
            otherObj.die();   
        }
    }
};