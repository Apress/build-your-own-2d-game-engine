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

function Hero2(spritetexture, x, y) {
    this.mHeros = new SpriteRenderable(spritetexture);
    this.mHeros.setColor([0, 0, 0, 0]);
    this.mHeros.getXform().setPosition(x, y);
    this.mHeros.getXform().setSize(4, 8);
    this.mHeros.setElementPixelPositions(0, 95, 0, 179);
    
    this.mCanJump = false;
    
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
    r.setColor([0, 1, 1, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Hero2, GameObject);

Hero2.eHeroState = Object.freeze({
    eStand: 0,
    eRunLeft: 1,
    eRunRight: 2,
    eJumpLeft: 3,
    eJumpRight: 4,
});

Hero2.prototype.update = function(){
    GameObject.prototype.update.call(this);
    this.mJumpBox.setPosition(this.mHeros.getXform().getXPos(), this.mHeros.getXform().getYPos() - 4);
    var mXform = this.mHeros.getXform();
    //var mPos = this.mHeros.getXform().getPosition();
    var v = this.getPhysicsComponent().getVelocity(); 
        
    if(this.mCanJump === false){
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
            mXform.incXPosBy(-0.5);
            this.mHeroState = Hero2.eHeroState.eJumpLeft;
        }
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
            mXform.incXPosBy(0.5);
            this.mHeroState = Hero2.eHeroState.eJumpRight;
        }
        if(!(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) && !(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))){
            this.mHeroState = Hero2.eHeroState.eStand;
        }
    }
    
    else {
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
            v[1] = 40;
        }
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
            mXform.incXPosBy(-0.5);
            this.mHeroState = Hero2.eHeroState.eRunLeft;
        }
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
            mXform.incXPosBy(0.5);
            this.mHeroState = Hero2.eHeroState.eRunRight;
        }
        if(!(gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) && !(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) && !(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))){
            this.mHeroState = Hero2.eHeroState.eStand;
        }
    }
    
    
    switch(this.mHeroState){
        case Hero2.eHeroState.eStand:this.mHeros.setElementPixelPositions(0, 95, 0, 179);break;
        case Hero2.eHeroState.eRunLeft:this.mHeros.setElementPixelPositions(110, 204, 0, 179);break;
        case Hero2.eHeroState.eRunRight:this.mHeros.setElementPixelPositions(212, 306, 0, 179);break;
        case Hero2.eHeroState.eJumpRight:this.mHeros.setElementPixelPositions(177, 271, 184, 383);break;
        case Hero2.eHeroState.eJumpLeft:this.mHeros.setElementPixelPositions(0, 95, 184, 383);break;
    }
    
    this.mCanJump = false;
};

Hero2.prototype.SetCanJump = function (b) {
    this.mCanJump = b;
};

Hero2.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mJumpBox.draw(aCamera);
};

Hero2.prototype.getJumpBox = function () {
    return this.mJumpBox;
};

