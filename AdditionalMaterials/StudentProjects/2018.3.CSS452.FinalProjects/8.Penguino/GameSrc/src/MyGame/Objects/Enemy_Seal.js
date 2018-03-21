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
/*global gEngine, GameObject, vec2, SpriteRenderable, WASDObj, SpriteAnimateRenderable, Penguin, Enemy*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Enemy_Seal(scene, spriteTexture, atX, atY, w, h) {
    this.mScene = scene;
    this.kSpeed = 0.08;
    this.kWeight = null;
    this.terminate = false; //This is used to tell if an object to stop updating
    this.kMoveRange = 5;
    this.kIsOnSurface = false;
    this.kOrigin = null;
    

    //Step A: Define the Object (Enemy)
    this.mEnemy_Seal = new LightRenderable(spriteTexture);
    this.mEnemy_Seal.setColor([1, 1, 1, 0]);
    this.mEnemy_Seal.getXform().setPosition(atX, atY);
    this.mEnemy_Seal.getXform().setSize(w, h);
    
    this.mEnemy_Seal.setSpriteSequence(32, -64,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    31, 32,   // widthxheight in pixels
                                    2,          // number of elements in this sequence
                                    1);         // horizontal padding in between
    this.mEnemy_Seal.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mEnemy_Seal.setAnimationSpeed(10);
                                // show each element for mAnimSpeed updates

    GameObject.call(this, this.mEnemy_Seal);
    this.kOrigin = vec2.fromValues(this.getXform().getXPos(), this.getXform().getYPos());
    
    //StepB: Define the GameObjects RigidBody
    var r = new RigidRectangle(this.getXform(), w, h);
    r.setVelocity(this.kSpeed, this.kSpeed);
    
    this.setRigidBody(r);
    //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Enemy_Seal, Enemy);


//Defualt enemy update
//Enemy.prototype.update = function () {
//   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Six))
//       this.terminate = true;
//   
//   if (!this.terminate) {
//        GameObject.prototype.update.call(this);    
//        
//        //if (this.kIsOnSurface === true)
//            this.movement();
//    }   
//};


//This is defualt Enemy Movement
Enemy.prototype.movement = function () {
    if (this.getXform().getXPos() < this.kOrigin[0] + this.kMoveRange && Math.sign(this.kMoveRange) !== -1)
        this.getXform().incXPosBy(this.kSpeed);
    else if (this.getXform().getXPos() > this.kOrigin[0] + this.kMoveRange && Math.sign(this.kMoveRange) === -1)
        this.getXform().incXPosBy(this.kSpeed * -1);
    
    if (this.getXform().getXPos() >= this.kOrigin[0] + 5 || this.getXform().getXPos() <= this.kOrigin[0] - 5) {
        this.kMoveRange *= -1;
    }    
};


