
/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
//+128 px
function PushButtonPhysics(spriteTexture,normalTexture, x, y, w, h,door) {
    
    this.mBase = new IllumRenderable(spriteTexture, normalTexture);
    this.mSpring = new IllumRenderable(spriteTexture, normalTexture);
    this.mHead = new IllumRenderable(spriteTexture, normalTexture);
    this.mBase.setColor([1, 1, 1, 0]);
    this.mBase.getXform().setPosition(x, y);
    this.mBase.getXform().setSize(w, h);
    this.mBase.setElementPixelPositions(0, 513, 1535, 2048);  
    this.mSpring.setColor([1, 1, 1, 0]);
    this.mSpring.getXform().setPosition(x, y);
    this.mSpring.getXform().setSize(w, h);
    this.mSpring.setElementPixelPositions(513, 1027, 1535, 2048); 
    this.mHead.setColor([1, 1, 1, 0]);
    this.mHead.getXform().setPosition(x, y);
    this.mHead.getXform().setSize(w, h);
    this.mHead.setElementPixelPositions(1027, 1541, 1021, 1535);
    this.mOrigPos = [x,y];
    this.mGoalPos = [x,y-1];
    this.mRot = 0;
    GameObject.call(this, this.mHead);
    this.mPhys = new RigidRectangle(this.getXform(), 0.5, 0.5);
    this.setRigidBody(this.mPhys);
    this.toggleDrawRigidShape();
    this.mPhys.setMass(4);
    this.mDoor = door;
    this.mState = 0;
    
    
    
}
gEngine.Core.inheritPrototype(PushButtonPhysics, GameObject);

//mimick pushing button
PushButtonPhysics.prototype.set = function(aCamera,sprite) {
    this.mState = 1;
    this.mOrigPos = this.mGoalPos;
    this.mPhys.setMass(-1);
    this.mHead.setElementPixelPositions(1027,1541,1535,2048);
    if(this.mDoor.set() <= 0) {
        aCamera.shake(-5, -5, 5, 50);
        sprite.shake();
    }
    
};

//mimick button not pushed 
PushButtonPhysics.prototype.reset = function() {
    this.mButton.setElementPixelPositions(0, 128, 384, 512);  
    this.mState = 0;
};

//test pushing button when clicking 2 or 3 
PushButtonPhysics.prototype.update = function(aCamera,sprite) {
    this.mPhys.setAngularVelocity(0);
    //Check if fully pressed
    //Adjust Spring depression
    //var newLength = 
    //Calculate Escape Velocity
    var HPos = this.mHead.getXform().getPosition();
    var dX = HPos[0]-this.mOrigPos[0];
    var dY = HPos[1]-this.mOrigPos[1];
    if(this.mPhys.getInvMass()!==0) {
        switch(this.mRot){
            case 0:
                //Check if putton is pushed.
                var tarDY = HPos[1]-this.mGoalPos[1];
                if(tarDY < 0.1) {
                    this.set(aCamera,sprite);
                }
                //Check if wrong direction
                if(dX < -0.1) {
                    this.mHead.getXform().setXPos(this.mOrigPos[0]);
                } else if(dX > 0.1) {
                    this.mHead.getXform().setXPos(this.mOrigPos[0]);
                }
                //Check if right direction
                if(dY < -1) {
                    this.mHead.getXform().setYPos(this.mOrigPos[1]-1);
                }
                break;
            case 90:
                //Check if putton is pushed.
                var tarDX = HPos[0]-this.mGoalPos[0];
                if(tarDX > -0.1) {
                    this.set(aCamera,sprite);
                }
                //Check if wrong direction
                if(dY < -0.1) {
                    this.mHead.getXform().setYPos(this.mOrigPos[1]);
                } else if(dY > 0.1) {
                    this.mHead.getXform().setYPos(this.mOrigPos[1]);
                }
                //Check if right direction
                if(dX > 1) {
                    this.mHead.getXform().setXPos(this.mOrigPos[0]+1);
                }
                break;
            case 180:
                //Check if putton is pushed.
                var tarDY = HPos[1]-this.mGoalPos[1];
                if(tarDY > -0.1) {
                    this.set(aCamera,sprite);
                }
                //Check if wrong direction
                if(dX < -0.1) {
                    this.mHead.getXform().setXPos(this.mOrigPos[0]);
                } else if(dX > 0.1) {
                    this.mHead.getXform().setXPos(this.mOrigPos[0]);
                }
                //Check if right direction
                if(dY > 1) {
                    this.mHead.getXform().setXPos(this.mOrigPos[1]+1);
                }
                break;
            case 270:
                //Check if putton is pushed.
                var tarDX = HPos[0]-this.mGoalPos[0];
                if(tarDX < 0.1) {
                    this.set(aCamera,sprite);
                }
                //Check if wrong direction
                if(dY < -0.1) {
                    this.mHead.getXform().setYPos(this.mOrigPos[1]);
                } else if(dY > 0.1) {
                    this.mHead.getXform().setYPos(this.mOrigPos[1]);
                }
                //Check if right direction
                if(dX < -1) {
                    this.mHead.getXform().setXPos(this.mOrigPos[0]-1);
                }
                break;
        }
    }

    var xVel = (this.mOrigPos[0]-HPos[0])*2;
    var yVel = (this.mOrigPos[1]-HPos[1])*2;
    this.mPhys.setVelocity(xVel,yVel);
    this.mPhys.update();
};

PushButtonPhysics.prototype.draw = function(aCamera) {
    this.mSpring.draw(aCamera);
    this.mBase.draw(aCamera);
    this.mHead.draw(aCamera);
};

//set lever to rotate 0 degrees 
PushButtonPhysics.prototype.setRot = function(rot) {
    //this.mButton.getXform().incRotationByDegree(rot);
    switch(rot) {
        case 0:
            //Do nothing
            break;
        case 90:
            this.mRot = 90;
            this.mBase.getXform().setRotationInDegree(90);
            this.mSpring.getXform().setRotationInDegree(90);
            this.mHead.getXform().setRotationInDegree(90);
            this.mGoalPos = [this.mOrigPos[0]+1,this.mOrigPos[1]];
            break;
        case 180:
            this.mRot = 180;
            this.mBase.getXform().setRotationInDegree(180);
            this.mSpring.getXform().setRotationInDegree(180);
            this.mHead.getXform().setRotationInDegree(180);
            this.mGoalPos = [this.mOrigPos[0],this.mOrigPos[1]+1];
            break;
        case 270:
            this.mRot = 270;
            this.mBase.getXform().setRotationInDegree(270);
            this.mSpring.getXform().setRotationInDegree(270);
            this.mHead.getXform().setRotationInDegree(270);
            this.mGoalPos = [this.mOrigPos[0]-1,this.mOrigPos[1]];
            break;
        case 360:
            //Do nothing
            break;
        default:
            //You dun messed up
            break;
    }
};
PushButtonPhysics.prototype.getDoorIndex = function() { return this.mDoor;};
PushButtonPhysics.prototype.getState = function() {return this.mState;};
PushButtonPhysics.prototype.getHead = function() {return this.mHead;};

PushButtonPhysics.prototype.getRigidBody = function(){ return this.mPhys;};
PushButtonPhysics.prototype.addLight = function(light) {
    this.mBase.addLight(light);
    this.mSpring.addLight(light);
    this.mHead.addLight(light);
};