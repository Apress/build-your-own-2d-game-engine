/* File: Owl.js 
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var state = {
    WALKING: 0,
    STANDING: 1
};

var direction = {
    LEFT: 0,
    RIGHT: 1
};

function Owl(spriteTexture, size, x, y, heroPos) {

    this.heroPos = heroPos;

    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x - size * 2, y);
    this.mSprite.setSpriteSequence(size, 0, size, size, 3, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.getXform().setSize(size, size);
    this.mSprite.setElementPixelPositions(0, size, 0, size);

    this.size = size;

    this.actionLength = 5;
    this.mState = state.STANDING;
    this.mDirection = direction.LEFT;
    GameObject.call(this, this.mSprite);
    var rigidShape = new RigidRectangle(this.getXform(), size-20, size);
    rigidShape.setMass(0.5);  // ensures no movements!
    rigidShape.setFriction(0);
  
   // rigidShape.setDrawBounds(true);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Owl, GameObject);

Owl.prototype.shouldDie = function () {

    if (!this.isVisible())
        return true;

    return false;

};


Owl.prototype.handleCollision = function (otherObjectType) {

    this.shake(7, 7, 20, 60);

};

Owl.prototype.update = function () {

    var xPos = this.getXform().getPosition()[0];
    var yPos = this.getXform().getPosition()[1];
    if(xPos > 936){
        this.getXform().setPosition(32, yPos);
    }else if(xPos < 20){
        this.getXform().setPosition(920, yPos);
    }
    
    if(yPos<0)
        this.setVisibility(false);
    
    var pos = this.getXform().getPosition();
    
    if(pos[0] - this.heroPos[0] >= 2 && Math.abs(pos[0] - this.heroPos[0]) < 140 && pos[0] > 200){

        if(this.mState === state.STANDING || this.mDirection === direction.RIGHT){
            
            this.mState = state.WALKING;
            this.mDirection = direction.LEFT;
            this._updateAnimation();
            this.notWalking = false;
            
        }
        
        this.panTo(this.heroPos[0], this.heroPos[1] -22);
        
    }else if(this.heroPos[0] - pos[0] >= 2 &&  Math.abs(pos[0] - this.heroPos[0]) < 140 && pos[0] < 700){
        
        
        if(this.mState === state.STANDING || this.mDirection === direction.LEFT){
            
            this.mState = state.WALKING;
            this.mDirection = direction.RIGHT;
            this._updateAnimation();
            this.notWalking = false;
            
        }
        
        this.panTo(this.heroPos[0], this.heroPos[1] -22);
        
    }else if(Math.abs(this.heroPos[0] - pos[0]) < 2 ||  Math.abs(pos[0] - this.heroPos[0]) > 140 ){
        
        if(this.mState === state.WALKING){
            
            this.mState = state.STANDING;
            this._updateAnimation();
            this.notWalking = true;
            
        }
    }
    
    this.mSprite.updateAnimation();

    GameObject.prototype.update.call(this);
};

Owl.prototype._updateAnimation = function () {

    switch (this.mState) {

        case state.WALKING:
            switch (this.mDirection) {
                case direction.RIGHT:
                    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 3, 0);
                    break;
                case direction.LEFT:
                    this.mSprite.setSpriteSequence(this.size, this.size * 3, this.size, this.size, 3, 0);
                    break;
            }
            break;
        case state.STANDING:
            this.mSprite.setSpriteSequence(this.size, this.size * 6, this.size, this.size, 9, 0);
            break;

    }
};

Owl.prototype._providePrintout = function () {

    var statePrintout;
    switch (this.mState) {
        case state.WALKING:
            statePrintout = "WALKING";
            break;
        case state.STANDING:
            statePrintout = "STANDING";
            break;
    }

    var directionPrintout;
    switch (this.mDirection) {
        case direction.LEFT:
            directionPrintout = "LEFT";
            break
        case direction.RIGHT:
            directionPrintout = "RIGHT";
            break
    }

    console.log("actionLength: ", this.actionLength, "state: ", statePrintout,
            " direction: ", directionPrintout);
};