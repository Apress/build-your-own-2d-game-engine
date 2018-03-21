/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, vec2, RigidShape, RigidRectangle, Arrow
 *       Platform, Config, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";


var IceArrow = function(position,power,degree) {
    Arrow.call(this,position,power,degree);
        // Create the sprite
    this.mArrow = new TextureRenderable("assets/projectiles/icearrow.png");
    this.mArrow.setColor([1, 1, 1, 0]);
    this.mArrow.getXform().setPosition(position[0], position[1]);
    this.mArrow.getXform().setSize(2/1.5, 12/1.5);
    this.power=power;
    this.degree=degree;
    this.mArrow.getXform().incRotationByDegree(degree+270);
    GameObject.call(this, this.mArrow);
    
    this.kBasePower = 180;
    this.mTimeSinceSpawn = 0;
    this.mParticleLifeLimit = 180;
    this.mExpired=false;
    this.mCollided = false;
    
    // Physics
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getWidth()*.8,
        this.getXform().getHeight()
    );
    r.setMass(2);
    r.setRestitution(.3);
    r.setFriction(1);  
    this.setRigidBody(r);
    var x=this.degree*(Math.PI/180);
    var y=this.degree*(Math.PI/180);
    x=Math.cos(x);
    y=Math.sin(y);
    this.getRigidBody().setVelocity(x*this.power* this.kBasePower, y*this.power* this.kBasePower);
    
    this.mParticles = new ParticleGameObjectSet();
    
    // Specific collision ignoring.
    //this.toggleDrawRigidShape();
};

gEngine.Core.inheritPrototype(IceArrow, Arrow);

IceArrow.prototype.draw = function (camera) {
    if (this.mParticles !== null) {
        this.mParticles.draw(camera);
    }
    Arrow.prototype.draw.call(this, camera);
};

IceArrow.prototype.update = function() {
    Arrow.prototype.update.call(this);
    if (this.mDrawRenderable === true) {  
        var length=this.mArrow.getXform().getPosition();
        var test=[length[0],length[1]];
        var curRadx=Math.cos(this.mArrow.getXform().getRotationInRad()+(Math.PI/2));
        var curRady=Math.sin(this.mArrow.getXform().getRotationInRad()+(Math.PI/2));
        test[0]=test[0]+((this.mArrow.getXform().getHeight()/2)*curRadx);
        test[1]=test[1]+((this.mArrow.getXform().getHeight()/2)*curRady);
        if (this.mLight instanceof Light) {
            this.mLight.setXPos(test[0]);
            this.mLight.setYPos(test[1]);
        }
        if (this.mTimeSinceSpawn%10 == 8 && Math.random() < .8) {
            if ((this.mTimeLimit - this.mTimeSinceSpawn) > this.mParticleLifeLimit) {
                this.mParticles.addEmitterAt(
                    test,
                    1,
                    this.createParticle,
                    this.type
                    );  
            }
        }
    }
    this.mParticles.update();

};

IceArrow.prototype.createParticle = function (x, y) {
    var life;
    if (this.mTimeLimit - this.mTimeSinceSpawn < 180) {
        life = this.mTimeLimit - this.mTimeSinceSpawn;
    }
    else {
        life = 180;
    }
    var p = new ParticleGameObject(
        Config.BossBattle.Textures.SnowParticleTexture, 
        x, 
        y, 
        life
    );
    p.getRenderable().setColor([.4, .5, 1, .3]);
    
    // size of the particle
    var r = .5 + Math.random()*2;
    p.getXform().setSize(r, r);

    p.setFinalColor([1, 1, 1, 1]);
    
    var vx = 1 - 2*Math.random();

    p.getParticle().setVelocity([vx, 0]);
    p.setSizeDelta(1);
    p.getParticle().setDrag(.98);
    
    return p;
};

IceArrow.prototype.getEffectDuration = function () {
    return Config.Arrows.Ice.EffectDuration;
};