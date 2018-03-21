/* File: Heros.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/*Heros.Jumpstate = Object.freeze({
    OntheGround: 0,
    JumpUp: 1,
    GoingDown: 2
});*/

function Hero1(spritetexture, x, y) {
    this.mHeros = new SpriteRenderable(spritetexture);
    this.mHeros.setColor([0, 0, 0, 0]);
    this.mHeros.getXform().setPosition(x, y);
    this.mHeros.getXform().setSize(4, 8);
    this.mHeros.setElementPixelPositions(0, 65, 0, 150);
    
    this.mCanJump = false;
    
    this.IsJump = 0;
    
    this.mHeroState = Hero1.eHeroState.eStand;
    
    var transform = new Transform();
    transform.setPosition(this.mHeros.getXform().getXPos(), this.mHeros.getXform().getYPos() - 4);
    this.mJumpBox = new RigidRectangle(transform, 2, 0.1);
    this.mJumpBox.setColor([0, 0, 1, 1]);
    this.mJumpBox.setDrawBounds(false);
    
    GameObject.call(this, this.mHeros);
    
    var r = new RigidRectangle(this.getXform(), 4, 8);
    r.setMass(0.7);
    r.setRestitution(0);
    r.setFriction(5);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Hero1, GameObject);

Hero1.eHeroState = Object.freeze({
    eStand: 0,
    eRunLeft: 1,
    eRunRight: 2,
    eJumpLeft: 3,
    eJumpRight: 4,
});

Hero1.prototype.update = function(){
    GameObject.prototype.update.call(this);
    this.mJumpBox.setPosition(this.mHeros.getXform().getXPos(), this.mHeros.getXform().getYPos() - 4);
    var mXform = this.mHeros.getXform();
    //var mPos = this.mHeros.getXform().getPosition();
    var v = this.getPhysicsComponent().getVelocity(); 
    
    if(this.mCanJump === false){
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
            mXform.incXPosBy(-0.5);
            this.mHeroState = Hero1.eHeroState.eJumpLeft;
        }
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
            mXform.incXPosBy(0.5);
            this.mHeroState = Hero1.eHeroState.eJumpRight;
        }
        if(!(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) && !(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))){
            this.mHeroState = Hero1.eHeroState.eStand;
        }
    }
    
    else {
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
            v[1] = 40;
        }
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
            mXform.incXPosBy(-0.5);
            this.mHeroState = Hero1.eHeroState.eRunLeft;
        }
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
            mXform.incXPosBy(0.5);
            this.mHeroState = Hero1.eHeroState.eRunRight;
        }
        if(!(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) && !(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) && !(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))){
            this.mHeroState = Hero1.eHeroState.eStand;
        }
    }
    
    
    switch(this.mHeroState){
        case Hero1.eHeroState.eStand:this.mHeros.setElementPixelPositions(0, 60, 0, 150);break;
        case Hero1.eHeroState.eRunLeft:this.mHeros.setElementPixelPositions(155, 223, 0, 150);break;
        case Hero1.eHeroState.eRunRight:this.mHeros.setElementPixelPositions(73, 142, 0, 150);break;
        case Hero1.eHeroState.eJumpRight:this.mHeros.setElementPixelPositions(0, 66, 157, 325);break;
        case Hero1.eHeroState.eJumpLeft:this.mHeros.setElementPixelPositions(76, 151, 157, 325);break;
    }
    
    this.mCanJump = false;
};

Hero1.prototype.SetCanJump = function (b) {
    this.mCanJump = b;
};

Hero1.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mJumpBox.draw(aCamera);
};

Hero1.prototype.getJumpBox = function () {
    return this.mJumpBox;
};

