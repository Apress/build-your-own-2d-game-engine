/*
 * @auth: Herbert Traut
 * @file: Cloud.js
 * @date: 11-27-15
 * @brief: Clouds for the sky
 * @TODO: needs particle effects and texture
 */

/* global GameObject, gEngine */

'use strict';

function Cloud(texture, rainTexture, world) {
    this.kDelta = 0.02;
    
    this.mRainTex = rainTexture;
    this.mCloud = new LightRenderable(texture);
    this.mCloud.setColor([1,1,1,0]);
    this.mCloud.setElementPixelPositions(0, 512, 0, 256);
    this.mRainParticles = new ParticleGameObjectSet();
    this.mWorld = world;
    GameObject.call(this, this.mCloud);
};
gEngine.Core.inheritPrototype(Cloud, GameObject);

Cloud.prototype._restartLeft = function(){
    var cloudXform = this.getXform();
    var worldXform = this.mWorld.getXform();
    var minHeight = worldXform.getYPos() + 5;
    var maxHeight = worldXform.getYPos() + 10;
    var tail = cloudXform.getXPos() - (cloudXform.getWidth()/2);
    var worldRight = worldXform.getXPos() + (worldXform.getWidth()/2);
    if(tail > worldRight){
        var spawnX = worldXform.getXPos() - worldXform.getWidth()/2;
        spawnX -= cloudXform.getWidth()/2;
        var delta = (Math.floor((Math.random()*2) + 1)) + (-(Math.floor((Math.random()*2) + 1)));
        var height = cloudXform.getYPos() + delta;
        if(height < minHeight || height > maxHeight) height = cloudXform.getYPos();
        cloudXform.setPosition(spawnX, height);
    }
};

Cloud.prototype._restartRight = function(){
    var cloudXform = this.getXform();
    var worldXform = this.mWorld.getXform();
    var minHeight = worldXform.getYPos() + 5;
    var maxHeight = worldXform.getYPos() + 10;
    var tail = cloudXform.getXPos() + (cloudXform.getWidth()/2);
    var worldLeft = worldXform.getXPos() - (worldXform.getWidth()/2);
    if(tail > worldLeft){
        var spawnX = worldXform.getXPos() + worldXform.getWidth()/2;
        spawnX += cloudXform.getWidth()/2;
        var delta = (Math.floor((Math.random()*2) + 1)) + (-(Math.floor((Math.random()*2) + 1)));
        var height = cloudXform.getYPos() + delta;
        if(height < minHeight || height > maxHeight) height = cloudXform.getYPos();
        cloudXform.setPosition(spawnX, height);
    }
};

Cloud.prototype.update = function(){
    this._restartLeft();
    while(this.mRainParticles.size() < 100){
        this.mRainParticles.addToSet(this._createParticle());
    }
    this.mRainParticles.update();
    this.getXform().incXPosBy(this.kDelta);
};

Cloud.prototype.draw = function (camera){
    this.mRainParticles.draw(camera);
    GameObject.prototype.draw.call(this, camera);
};

Cloud.prototype._createParticle = function() {
    var xR = this.getXform().getXPos() + (this.getXform().getWidth()/5);
    //account for falling
    var xL = this.getXform().getXPos() - (this.getXform().getWidth()/10);
    var atX = (Math.random() * (xR-xL) + xL);
    var atY = this.getXform().getYPos() + (this.getXform().getHeight()/15) - 2.4;
    
    var life = 1 + Math.random() * this.getXform().getYPos() * 4 + 20;
    var p = new ParticleGameObject(this.mRainTex, atX, atY, life);
    p.getRenderable().setColor([0.1, 0.1, 0.9, 0.0]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 1.0;
    var fg = 1.0;
    var fb = 4.0;
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.945);
    
    return p;
};
