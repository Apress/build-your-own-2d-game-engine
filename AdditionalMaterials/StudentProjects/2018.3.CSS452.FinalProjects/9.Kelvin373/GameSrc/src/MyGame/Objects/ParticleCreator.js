/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var color;
/*
 * Called when minions are destroyed or when water balloons collide
 * with an object.
 * *spawnObject: Object to spawn particles from
 * *numParticles: Number of particles to spawn
 * *color: color of the particles to be created
 */
function ParticleCreator(spawnObject, numParticles, theColor) {  
    color = theColor;
    
    //Simulate Water Particles
    this.mParticles = new ParticleGameObjectSet();
    this.mParticles.addEmitterAt(
            spawnObject.getXform().getPosition(), numParticles, 
    this.createParticle);
    this.mParticles.update();
};
gEngine.Core.inheritPrototype(ParticleCreator, GameObject);

ParticleCreator.prototype.draw = function(aCamera) {
   this.mParticles.draw(aCamera); 
};

ParticleCreator.prototype.update = function(aCamera) {
    this.mParticles.update(aCamera);
};

ParticleCreator.prototype.createParticle = function(atX, atY) {
    var life = 50;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([0,0,1,1]);
    
    // size of the particle
    var r = 5;
    p.getXform().setSize(r, r);

    p.setFinalColor([0,0,1,1]);
    
    // velocity on the particle
    var rrrrr = Math.round(Math.random()) * 2 - 1;
    var rrrr= Math.round(Math.random()) * 2 - 1; // -1-1
    var rr = Math.random() *100 * rrrr;
    var rrr = Math.random() *100 * rrrrr;
    p.getParticle().setVelocity([rr, rrr]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};

