/* File: Hero.js 
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var state = {
    WALKING: 0,
    STANDING: 1,
    EXTENDING: 2
};

var direction = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2
};

function Hero(spriteTexture, size, x, y) {

    this.size = size;

    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.setSpriteSequence(size, 0, size, size, 2, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.getXform().setSize(size*0.75, size*0.85);
    this.mSprite.setElementPixelPositions(0, size, 0, size);
    GameObject.call(this, this.mSprite);

    this.mState = state.STANDING;
    this.mDirection = direction.RIGHT;
    this.justStartedWalking = false;

    this.kDelta = 250;
    this.jumpVelocity = 500;
    this.health = 3;
    this.friction = 0.3;

    this.name = "Hero";

    var xform = this.getXform();
    
    //-5 so its a little less than the block size and the snowman will fall off the edge.
    this.rigidBody = new RigidRectangle(xform,(size / 2 )-5, size-20); 
//    console.log(this);

    this.rigidBody.setMass(0.05);
    this.rigidBody.setRestitution(0);
    this.rigidBody.setColor([0, 1, 0, 1]);
    this.rigidBody.setFriction(this.friction);
    this.rigidBody.setDrawBounds(false);
    this.setPhysicsComponent(this.rigidBody);
    
    //this.toggleDrawRenderable();
    // this.toggleDrawRigidShape();

}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.getSprite = function(){
  return this.mSprite;  
};

Hero.prototype.update = function () {
    
    var xPos = this.getXform().getPosition()[0];
    var yPos = this.getXform().getPosition()[1];
    if(xPos > 936){
        this.getXform().setPosition(32, yPos);
    }else if(xPos < 20){
        this.getXform().setPosition(920, yPos);
    }

    var v = this.getPhysicsComponent().getVelocity();
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.A) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)){
        this.justStartedWalking = true;
        this.mDirection = direction.LEFT;
    }else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.D) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)){
        this.justStartedWalking = true;
        this.mDirection = direction.RIGHT;
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))
            v[0] = -this.kDelta;
        if (this.mState !== state.EXTENDING) {
            this.mState = state.WALKING;
        }

    } else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))
            v[0] = this.kDelta;
        if (this.mState !== state.EXTENDING) {
            this.mState = state.WALKING;
        }

    } else {
        this.mState = state.STANDING;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)
            || gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        
        gEngine.AudioClips.playACue("assets/sounds/jump.wav");
        
        if (v[1] < 1 && v[1] > -1) {
            v[1] = this.jumpVelocity; // Jump velocity
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {

        this.rigidBody.setFriction(1);
        this.setPhysicsComponent(this.rigidBody);
        this.walking = false;
        this.mState = state.EXTENDING;

    }else{
        
        this.rigidBody.setFriction(this.friction);
        this.setPhysicsComponent(this.rigidBody);
    }

    //enable this line to see informative printout
//    this._providePrintout();

    this._updateAnimation();
    this.mSprite.updateAnimation();

    GameObject.prototype.update.call(this);
};

Hero.prototype.handleCollision = function (otherObjectType) {

    if (otherObjectType === "Fire") {
        this.health--;
    }

};

Hero.prototype.getType = function () {

    return "Hero";

};

Hero.prototype.isAlive = function () {

    return (this.isVisible() && this.getXform().getYPos() > -1000 && this.health > 0);

};

Hero.prototype.isFalling = function () {

    return (this.isVisible() && this.getXform().getYPos() < 0);

};

Hero.prototype.getHealth = function () {

    return this.health;

};

Hero.prototype.getDirection = function () {

    return this.mDirection;

};

Hero.prototype.getX = function () {

    return this.getXform().getPosition()[0];

};

Hero.prototype._providePrintout = function () {

    var statePrintout;
    switch (this.mState) {
        case state.WALKING:
            statePrintout = "WALKING";
            break;
        case state.STANDING:
            statePrintout = "STANDING";
            break;
        case state.EXTENDING:
            statePrintout = "EXTENDING";
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

    var pos = this.getXform().getPosition();

    console.log("position: ", pos[0], pos[1], "state: ", statePrintout,
            " direction: ", directionPrintout, " atLeftEdge: ", this.atLeftEdge,
            " atRightEdge: ", this.atRightEdge, " canWalk: ", this._canWalk());
};

Hero.prototype._updateAnimation = function () {

    switch (this.mDirection) {
        case direction.LEFT:
            switch (this.mState) {
                case state.STANDING:
                    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 0, 0);
                    break;
                case state.WALKING:

                    if (this.justStartedWalking) {
                        this.mSprite.setSpriteSequence(this.size, this.size * 1, this.size, this.size, 2, 0);
                        this.justStartedWalking = !this.justStartedWalking;
                    }
                    break;
                case state.EXTENDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 4, this.size, this.size, 0, 0);
                    break;
            }
            break;
        case direction.RIGHT:
            switch (this.mState) {
                case state.STANDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 3, this.size, this.size, 0, 0);
                    break;
                case state.WALKING:
                    if (this.justStartedWalking) {
                        this.mSprite.setSpriteSequence(this.size, this.size * 1, this.size, this.size, 2, 0);
                        this.justStartedWalking = !this.justStartedWalking;
                    }
                    break;
                case state.EXTENDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 5, this.size, this.size, 0, 0);
                    break;
            }
            break;
        case direction.UP:
            switch (this.mState) {
                case state.STANDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 1, this.size, this.size, 0, 0);
                    break;
                case state.WALKING:
                    if (this.justStartedWalking) {
                        this.mSprite.setSpriteSequence(this.size, this.size * 1, this.size, this.size, 2, 0);
                        this.justStartedWalking = !this.justStartedWalking;
                    }
                    break;
                case state.EXTENDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 6, this.size, this.size, 0, 0);
                    break;
            }
            break;
    }


};