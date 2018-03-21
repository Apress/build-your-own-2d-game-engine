/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj, Penguin, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Wall(spriteTexture, w, h, x=50, y=37.5, b=false) {

    this.mWall = new LightRenderable(spriteTexture);
    this.mWall.setColor([0, 0, .8, .4]);
    
        if(b){
         this.mWall.setColor([0, .6, .2, .4]);   
        }
        
    this.mWall.getXform().setPosition(x, y);
    this.mWall.getXform().setSize(w, h);
    this.mWall.setSpriteSequence(64, 64,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    64, 64,   // widthxheight in pixels
                                    1,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    this.mWall.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mWall.setAnimationSpeed(30);
    //this.mWall.setElementPixelPositions(0, 120, 0, 180);
    
    GameObject.call(this, this.mWall);
    
    var r = new RigidRectangle(this.getXform(), w, h);
    r.setMass(0);
    this.setRigidBody(r);
    
    //this.toggleDrawRenderable();
    //this.toggleDrawRigidShape();
    
    this.Breakable=b;
    this.Ice=false;
    this.Hit=false;
    this.mParticles = null;
    this.mSolid=true;
    this.terminate = false;
    
    //removing sounds from wall object to reduce lag?
    //this.pengslide = "assets/sounds/pengslide.mp3";
    //gEngine.AudioClips.loadAudio(this.pengslide);
    
}
gEngine.Core.inheritPrototype(Wall, GameObject);

Wall.prototype.update = function () {
    GameObject.prototype.update.call(this);
    
    //removing debug hit key
    //if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
    //    this.hitEvent();
   // }
    
    
    if(this.Hit){
        if (this.mParticles !== null) {
            this.mParticles.update();  // this will remove expired particles
            if (this.mParticles.size() === 0) // all gone
                this.mParticles = null;
        }
    }
    
    
};

Wall.prototype.hitEvent = function (obj) {
    this.Hit=true;
       
    var pengpos = vec2.fromValues(obj.getXform().getXPos(), obj.getXform().getYPos());
    pengpos[1]-=obj.getXform().getHeight()/2;
    
    if (this.mParticles === null) {
        //gEngine.AudioClips.playACue(this.pengslide);
        this.mParticles = new ParticleGameObjectSet();
        this.mParticles.addEmitterAt(
                //reducing number of particles
        pengpos, 100, 
        this.createParticle);
        this.mParticles.update(); // start emit immediately
    }
};

Wall.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 1, 1, 1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 0.2 + 0.1 * Math.random();
    var fg = 0.2 + 0.1 * Math.random();
    var fb = 3.5 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getParticle().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};

// must override draw to draw the particles when there are there
Wall.prototype.draw = function(aCamera) {
    // draw the projectile only if it has some interesting speed
    if (this.mParticles !== null) {
            this.mParticles.draw(aCamera);
    }    
    GameObject.prototype.draw.call(this, aCamera);
};

Wall.prototype.collision = function (otherObj, collisionInfo) {

    if (otherObj instanceof Penguin) {
        this.hitEvent(otherObj);
       if (otherObj.getRigidBody().getVelocity()[1] < -20 && this.mSolid && this.Breakable)
       {
           this.setVisibility(false);
           otherObj.mScene.shakeCamera();
           this.terminate = true;
       }
    }
    if (otherObj instanceof Penguin) {
        if (Math.abs(otherObj.getRigidBody().getVelocity()[0]) > 40 && this.mSolid && this.Breakable)
       {
           this.setVisibility(false);
           otherObj.mScene.shakeCamera();
           this.terminate = true;
       }
    }
};