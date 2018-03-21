/*jslint node: true, vars: true */
/*global gEngine, GameObject,CameraManager, LightRenderable, IllumRenderable, HelperFunctions, SpriteAnimateRenderable, LightManager */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Fire(spriteTexture, bg, igloo) {
    this.shouldMove = false;
    this.kDelta = 15;
    this.size = 64;
    this.downSize = 1.5;

    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(HelperFunctions.Core.generateRandomFloat(this.size, 960 - this.size), 1000);
    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 3, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mSprite.getXform().setSize(this.size, this.size);
    this.mSprite.setElementPixelPositions(0, this.size, 0, this.size);
   
    var checkout = LightManager.Core.checkoutLight();
    this.mLight = checkout.light;
    this.mLightID = checkout.ID;
    this.mSprite.addLight(this.mLight);
    bg.addLight(this.mLight);
    igloo.addLight(this.mLight);
    GameObject.call(this, this.mSprite);

    this.shouldScore = false;
    this.scoreAmount = 0;
    this.dangerHeight = 240;

    this.focusCamera = null;

    this.mParticles = null;
    var r = new RigidRectangle(this.getXform(), this.size, this.size);
    r.setMass(0);  // ensures no movements!
    this.setPhysicsComponent(r);
    
    this.setVisibility(false);
    this.mLight.setLightTo(false);
                
}
gEngine.Core.inheritPrototype(Fire, GameObject);

Fire.prototype.getType = function () {

    return "Fire";

};

Fire.prototype.shouldDie = function () {
   
    return false;
};

Fire.prototype.getScore = function () {
    return 200;
};

Fire.prototype.getSprite = function()
{
    return this.mSprite;
};

Fire.prototype.handleCollision = function (otherObjectType) {

    var pos = this.getXform().getPosition();
  
    if(otherObjectType === "Block" || otherObjectType === "Water" || otherObjectType === "Hero"){
        
        if(this.isVisible()){
             console.log("particle");
            this.mParticles = new ParticleGameObjectSet();
            this.mParticles.addEmitterAt(
            [pos[0], pos[1] - this.size / this.downSize / 2], 200,
            this.createParticle);
            this.mParticles.update(); // start emit immediately
            
            
            
            var r = new RigidRectangle(this.getXform(), this.size, this.size);
            r.setMass(0);  // ensures no movements!
            this.setPhysicsComponent(r);
            this.setVisibility(false);
            this.shouldMoveFunction(false);

            this.mLight.setLightTo(false);
            this.getPhysicsComponent().setPosition(HelperFunctions.Core.generateRandomFloat(64, 960 - 64), 1000);
      
            
        }
    }
  
    if (otherObjectType === "Block" ) {
        gEngine.AudioClips.playACue("assets/sounds/explosion.wav");

    }

    if (otherObjectType === "Water") {
        gEngine.AudioClips.playACue("assets/sounds/fizz.wav");
        this.shouldScore = true;
        this.scoreAmount = pos[1];
    }
    
    if(otherObjectType === "Hero"){
        gEngine.AudioClips.playACue("assets/sounds/sizzle.wav");
        gEngine.AudioClips.playACue("assets/sounds/ouch.wav");
    }
    
  

};

Fire.prototype.relocate = function (x, y) {

    this.mSprite.getXform().setPosition(x, y);
};

Fire.prototype.update = function () {

    var pos = this.getXform().getPosition();
    //call parent update
    GameObject.prototype.update.call(this);

    if (this.isVisible()) {

        if (pos[1] < 0) {
            var r = new RigidRectangle(this.getXform(), this.size, this.size);
         r.setMass(0);  // ensures no movements!


    this.setPhysicsComponent(r);
    this.shouldMoveFunction(false);
                this.setVisibility(false);
                this.mLight.setLightTo(false);
        this.getPhysicsComponent().setPosition(HelperFunctions.Core.generateRandomFloat(64, 960 - 64), 1000);
       
        }

        if (pos[1] < this.dangerHeight) {
            if (this.focusCamera === null) {
                this.focusCamera = CameraManager.Core.checkoutCamera();
            }
        }

        if (this.focusCamera !== null) {
            this.focusCamera.setWCCenter(pos[0], pos[1]);
        }
        
        if(this.shouldMove){
            
            this.mLight.setYPos(this.mSprite.getXform().getYPos());
            this.mLight.setXPos(this.mSprite.getXform().getXPos());
        
        }

        //update the sprite's animation    
        this.mSprite.updateAnimation();

    } else {
        if (this.focusCamera !== null) {

            CameraManager.Core.returnCamera();
            this.focusCamera = null;
        }
        if (this.mParticles !== null) {
            this.mParticles.update();  // this will remove expired particles
            if (this.mParticles.size() === 0) // all gone
                this.mParticles = null;
        }
        return;
    }
};

Fire.prototype.shouldMoveFunction = function (a) {
    this.shouldMove = a;
};

Fire.prototype.draw = function (camera) {

    // draw the projectile only if it has some interesting speed
    if (this.mParticles !== null) {
        this.mParticles.draw(camera);
    }

    GameObject.prototype.draw.call(this, camera);

};

Fire.prototype.createParticle = function (atX, atY) {

    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0.2, 0, 1]);

    // size of the particle
    var r = 20 + Math.random() * 2.5;
    p.getXform().setSize(r, r);

    // final color
    var fr = 0.2;
    var fg = 0.2;
    var fb = 0.2;
    p.setFinalColor([fr, fg, fb, 0.6]);

    // velocity on the particle
//    var fx = 10 * Math.random() - 20 * Math.random();
//    var fy = 20 * Math.random();
//    p.getParticle().setVelocity([fx, fy]);

    // size delta
    p.setSizeDelta(0.7);

    return p;
};



