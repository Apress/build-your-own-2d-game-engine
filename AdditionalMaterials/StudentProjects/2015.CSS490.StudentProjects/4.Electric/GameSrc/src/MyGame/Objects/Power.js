/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Power(pos,dir) {
    this.mCycleLeft = 500;
    this.spriteSheet = 'assets/spritesheet_hud.png';
    this.powerUp = new LightRenderable(this.spriteSheet);

    this.powerUp.setColor([1, 1, 1, 0]);
    this.powerUp.getXform().setPosition(pos[0],pos[1]);
    this.powerUp.getXform().setSize(10, 10);
    
    this.powerUp.setElementPixelPosArray([256,384,896,1024]);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.powerUp);
    this.setSpeed(0.60);
    this.setCurrentFrontDir([dir,0]);
    
    this.interval = 10;
    this.current = 0;
    this.currentY = -0.5;
    this.up = true;
    this.down = false;
    
    this.dir = dir;
    
    this.mParticleSet = new ParticleGameObjectSet();
    
    this.mexplode = false;

//    var rigidShape = new RigidCircle(this.getXform(), 4);
//    rigidShape.setMass(0.1);
//    rigidShape.setAcceleration([2, 1]);
//    rigidShape.setDrawBounds(true);
//    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Power, GameObject);

Power.prototype.explode = function () {
    
    this.powerUp.setElementPixelPosArray([-1,-1,-1,-1]);
    var i;
    //for(i=0; i<5; i++){
        this._createParticle(this.getXform().getPosition());
    //}
    this.mexplode = true;
    
};

Power.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this,aCamera);
    
    this.mParticleSet.draw(aCamera);
};

Power.prototype.update = function () {
    GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation
    this.mCycleLeft--;
    
    this.mParticleSet.update();

    if(this.up){
        this.currentY += 0.1;
        this.setCurrentFrontDir([this.dir, this.currentY ]);
        this.current++;
        
        if(this.current > this.interval){
                this.down = true;
                this.up = false;
        }

    }
    else if(this.down){
        this.currentY -= 0.1;
        this.setCurrentFrontDir([this.dir, this.currentY ]);
        this.current--;
        if(this.current < 0){
                this.down = false;
                this.up = true;
        }
        
    }     

};

Power.prototype.hasExpired = function() { 
    
    return this.mCycleLeft <= 0 || this.mexplode && this.mParticleSet.size() <= 0;

};

Power.prototype._createParticle = function(pos) {
    var life = 30 + Math.random() * 50;
    var p = new ParticleGameObject(this.spriteSheet, pos[0], pos[1], life);
    p.getRenderable().setColor([0, 0, 0.7, 1]);
   // p.getRenderable().setElementPixelPosArray([256,384,896,1024]);
    
    // size of the particle
    var r = 5 + Math.random() * 0.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.5);
    
    this.mParticleSet.addToSet(p);
};

Power.prototype.addLight = function(l) {
    this.powerUp.addLight(l);
};