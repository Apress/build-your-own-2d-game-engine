//File: ParticleSystem.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {String} texture The particle texture
 * @param {float} xPos The x position for the ParticleSystem
 * @param {float} yPos The y position for the ParticleSystem
 * @param {float} width The maximum horizontal offset for the particles
 * @param {float} yAcceleration The vertical acceleration for the paritcles
 * @param {float} life The life for the particles
 * @param {float} xVelocity The initial horizontal boost for the particles
 * @param {float} yVelocity The initial vertical boost for the particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The number of ParticleSystem particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the paritcles
 * @param {float} size The size for the paritcles
 * @param {float} yOffset The maximum vertical offset for the paritcles
 * @param {Array[]} startColor The beginning color for the particles
 * @param {Array[]} finalColor The final color for the particles
 * @param {float} yMultiplier The number y variables will be multiplied by
 * @returns {ParticleSystem} New instance of object
 * @type ParticleSystem
 * @class ParticleSystem
 */
function ParticleSystem(texture, xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, startColor, finalColor, yMultiplier){
    this.mAllParticles = new ParticleGameObjectSet();
    this.texture=texture;
    this.xPos=xPos;
    this.yPos=yPos;
    this.width=width;
    this.yAcceleration=yAcceleration;
    this.life=life;
    this.xVelocity=xVelocity;
    this.yVelocity=yVelocity;
    this.flicker=flicker;
    this.intensity=intensity;
    this.xAcceleration=xAcceleration;
    this.size=size;
    this.yOffset=yOffset;
    this.startColor=startColor;
    this.finalColor=finalColor;
    this.yMultiplier=yMultiplier;
    this.sizeBase=3.5;
}

/**
 * Increase the width of the ParticleSystem object
 * @param {float} inc how much to increment by
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.incWidth = function(inc){
    this.width+=inc;
};

/**
 * Increase the yOffset of the particles
 * @param {float} inc how much to increment by
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.incyOffset = function(inc){
    this.yOffset+=inc;
};

/**
 * Increase the yAcceleration of the particles
 * @param {float} inc how much to increment by
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.incyAcceleration = function(inc){
    this.yAcceleration+=inc;
};

/**
 * Increase the lifespan of the particles
 * @param {float} inc how much to increment by
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.incLife = function(inc){
    this.life+=inc;
};

/**
 * Increase the x velocity of the particles
 * @param {float} inc how much to increment by
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.incxVelocity = function(inc){
    this.xVelocity+=inc;
};

/**
 * Increase the size of the particles
 * @param {float} inc how much to increment by
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.incParticleSize = function(inc){
    this.size+=inc;
};

/**
 * Increase the y velocity  of the particles
 * @param {float} inc how much to increment by
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.incyVelocity = function(inc){
    this.yVelocity+=inc;
};

/**
 * Increases the rate of the particles fading
 * @param {float} inc how much to increment by
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.incFlicker = function(inc){
    this.flicker+=inc;
};

/**
 * Increase the intensity (number of particles created per update cycle) of the ParticleSystem object
 * necessary to increase as you increase the width or height of the ParticleSystem object
 * @param {float} inc how much to increment by
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.incIntensity = function(inc){
    this.intensity+=inc;
};

/**
 * Increase the xAcceleration of the particles
 * @param {float} inc how much to increment by
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.incxAcceleration = function(inc){
    this.xAcceleration+=inc;
};

/**
 * Get the width of the ParticleSystem object
 * @returns {float} this.width
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getWidth = function(){
    return this.width;
};

/**
 * Get the yOffset of the particles
 * @returns {float} this.yOffset
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getyOffset = function(){
    return this.yOffset;
};

/**
 * Get the yAcceleration of the particles
 * @returns {float} this.yAcceleration
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getyAcceleration = function(){
    return this.yAcceleration;
};

/**
 * Increase the life of the particles
 * @returns {float} this.life
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getLife = function(){
    return this.life;
};

/**
 * Get the x velocity of the particles
 * @returns {float} this.xVelocity
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getxVelocity = function(){
    return this.xVelocity;
};

/**
 * Get the size of the particles
 * @returns {float} this.size
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getParticleSize = function(){
    return this.size;
};

/**
 * Get the y velocity of the particles
 * @returns {float} this.yVelocity
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getyVelocity = function(){
    return this.yVelocity;
};

/**
 * Get the rate that the particles are fading
 * @returns {float} this.flicker
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getFlicker = function(){
    return this.flicker;
};

/**
 * Get the number of particles created per update cycle
 * @returns {float} this.intensity
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getIntensity = function(){
    return this.intensity;
};

/**
 * Get the xAcceleration of the particles
 * @returns {float} this.xAcceleration
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getxAcceleration = function(){
    return this.xAcceleration;
};

/**
 * Return the initial color of the particles
 * @returns {Array[]} this.startColor
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getStartColor = function(){
    return this.startColor;
};

/**
 * Returns the final color of the particles
 * @returns {Array[]} this.finalColor
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getFinalColor = function(){
    return this.finalColor;
};

/**
 * Return the yMultiplier of the ParticleSystem Object
 * @returns {float} this.yMultiplier
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getyMultiplier = function(){
    return this.yMultiplier;
};

/**
 * Returns the base number for caluclating size
 * @returns {float} this.sizeBase
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getSizeBase = function(){
    return this.sizeBase;
};

/**
 * A function to return the the location of the base of the ParticleSystem
 * @returns {Float[]} The x and y position of the ParticleSystem
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.getPos = function(){
    return [this.xPos,this.yPos];
};

/**
 * Sets the width to the passed number
 * @param {float} width The number to set the width to
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setWidth = function(width){
    this.width=width;
};

/**
 * Sets the yAcceleration to the passed number
 * @param {float} yAcceleration The number to set the yAcceleration to
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setyAcceleration = function(yAcceleration){
    this.yAcceleration=yAcceleration;
};

/**
 * Sets the life to the passed number
 * @param {float} life The number to set the life to
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setLife = function(life){
    this.life=life;
};

/**
 * Sets the xVelocity to the passed number
 * @param {float} xVelocity The number to set the xVelocity to
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setxVelocity = function(xVelocity){
    this.xVelocity=xVelocity;
};

/**
 * Sets the yVelocity to the passed number
 * @param {float} yVelocity The number to set the yVelocity to
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setyVelocity = function(yVelocity){
    this.yVelocity=yVelocity;
};

/**
 * Sets the flicker to the passed number
 * @param {float} flicker The number to set the shrinking rate to
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setFlicker = function(flicker){
    this.flicker=flicker;
};

/**
 * Sets the intensity to the passed number
 * @param {float} intensity The number to set the intensity to
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setIntensity = function(intensity){
    this.intensity=intensity;
};

/**
 * Sets the xAcceleration to the passed number
 * @param {float} xAcceleration The number to set the xAcceleration to
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setxAcceleration = function(xAcceleration){
    this.xAcceleration=xAcceleration;
};

/**
 * Sets the size to the passed number
 * @param {float} size The number to set the size to
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setSize = function(size){
    this.size=size;
};

/**
 * Sets the yOffset to the passed number
 * @param {float} yOffset The number to set the yOffset to
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setyOffset = function(yOffset){
    this.yOffset=yOffset;
};

/**
 * Set the position of the ParticleSystem Object
 * @param {float} xPos The x position
 * @param {float} yPos They y position
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setPos = function(xPos,yPos){
    this.xPos=xPos;
    this.yPos=yPos;
};

/**
 * Set the start color of the particles
 * @param {Array[]} color The new start color
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setStartColor = function(color){
    this.startColor=color;
};

/**
 * Set the final color of the particles
 * @param {Array[]} color The new final color
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setFinalColor = function(color){
    this.finalColor=color;
};

/**
 * Set the yMultiplier for the ParticleSystem object
 * @param {float} num The new yMultiplier
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setyMultiplier = function(num){
    this.yMultiplier=num;
};

/**
 * Set the base size number
 * @param {float} num The new size base
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.setSizeBase = function(num){
    this.sizeBase=num;
};

/**
 * Creates new particles and updates them
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.update = function(){
    for(var i=0; i<this.intensity; i++){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mAllParticles);
};

/**
 * Draws the particles on the camera passed in the argument
 * @param {Camera} aCamera the camera to be viewed on
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.draw = function(aCamera){
    this.mAllParticles.draw(aCamera);
};

/**
 * Handles collsision for all particles in regards the all objects in the passed set
 * @param {ObjSet} objSet the GameObjectSet to check for collision 
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.processCollision = function(objSet){
    gEngine.ParticleSystem.collideWithRigidSet(objSet, this.mAllParticles);
};

/**
 * The function for creating particles (needs to be overrided to be used)
 * @param {int} atX the base xPos for the particle
 * @param {int} atY the base yPos for the particle
 * @returns {Paritcle} p the particle created
 * @memberOf ParticleSystem
 */
ParticleSystem.prototype.createParticle = function(atX,atY) {
    var life = this.life + Math.random() * (this.life*10);
    var width = -this.width + 
                  this.width*2 *
                  Math.random();
    var yOffset = this.yMultiplier *
                  this.yOffset *
                  Math.random();
    
    var p = new ParticleGameObject(this.texture, atX+width, atY+yOffset, life);
    var sTemp = Array.from(this.startColor);
    p.getRenderable().setColor(sTemp);
    
    // size of the particle
    var r = this.sizeBase + Math.random() * this.size;
    p.getXform().setSize(r, r);
    
    // final color
    var fTemp = Array.from(this.finalColor);
    p.setFinalColor(fTemp);
    
    // velocity on the particle
    var fx;
    if (width > 0) {
        fx = 5 +
             ((-this.xVelocity+10) * -1) *
             Math.random();
    }
    else {
        fx = (5 * -1) +
             (-this.xVelocity+10) *
             Math.random();
    }
    var fy = 0 +
             this.yMultiplier*
             this.yVelocity *
             Math.random();
    p.getParticle().setVelocity([fx, fy]);
    // size delta
    p.setSizeDelta(1-(this.flicker*.005));
    p.getParticle().setAcceleration([this.xAcceleration*5, this.yMultiplier*this.yAcceleration*5]);
    return p;
};