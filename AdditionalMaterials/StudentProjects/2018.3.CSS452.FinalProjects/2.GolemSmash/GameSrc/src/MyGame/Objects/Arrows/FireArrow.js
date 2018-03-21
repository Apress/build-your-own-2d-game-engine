/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, vec2, RigidShape, RigidRectangle, Arrow, Light, Config
 *       Platform */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";


var FireArrow = function(position,power,degree) {
    Arrow.call(this,position,power,degree);
        // Create the sprite
    this.mArrow = new TextureRenderable("assets/projectiles/firearrow.png");
    this.mArrow.setColor([1, 1, 1, 0]);
    this.mArrow.getXform().setPosition(position[0], position[1]);
    this.mArrow.getXform().setSize(2/1.5, 12/1.5);
    this.power=power;
    this.degree=degree;
    this.mArrow.getXform().incRotationByDegree(degree+270);
    GameObject.call(this, this.mArrow);
    
    this.kBasePower = 180;
    this.mTimeSinceSpawn = 0;
    this.kParticleLifeLimit = 180;
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
    // Specific collision ignoring.
    //this.toggleDrawRigidShape();
    
    this.mParticles = new ParticleGameObjectSet();
};

gEngine.Core.inheritPrototype(FireArrow, Arrow);

FireArrow.prototype.draw = function (camera) {
    if (this.mParticles !== null) {
        this.mParticles.draw(camera);
    }
    Arrow.prototype.draw.call(this, camera);
};

FireArrow.prototype.update = function() {
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
        if (Math.random() < .3) {
            if (this.mTimeSinceSpawn + this.kParticleLifeLimit < this.mTimeLimit) {
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

FireArrow.prototype.createParticle = function (x, y) {
    var life;
    if (this.mTimeLimit - this.mTimeSinceSpawn > 180) {
        life = this.mTimeLimit - this.mTimeSinceSpawn;
    }
    else {
        life = 30 + 60*Math.random();
    }
    var p = new ParticleGameObject(
        Config.BossBattle.Textures.FlameParticleTexture, 
        x, 
        y, 
        life
    );
    p.getRenderable().setColor([1, .5, .4, .3]);
    
    // size of the particle
    var r = .5 + Math.random()*2;
    p.getXform().setSize(r, r);

    p.setFinalColor([1, 1, 1, 1]);
    
    var vx = 5 - 10*Math.random();
    var vy = 20 - 40*Math.random();

    p.getParticle().setVelocity([vx, vy]);
    p.setSizeDelta(1);
    p.getParticle().setDrag(.98);

    //p.getParticle().setAcceleration([0, -80]);
    
    return p;
};