//File: Fire.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {float} xPos The x position for the fire
 * @param {float} yPos The y position for the fire
 * @param {float} width The maximum horizontal offset for the fire particles
 * @param {float} yAcceleration The vertical acceleration for the fire paritcles
 * @param {float} life The life for the fire particles
 * @param {float} xVelocity The initial horizontal boost for the fire particles
 * @param {float} yVelocity The initial vertical boost for the fire particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The # of fire particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the fire paritcles
 * @param {float} size The size for the fire paritcles
 * @param {float} yOffset The maximum vertical offset for the fire paritcles
 * @returns {Fire} New instance of Fire object
 * @type Fire
 * @class Fire
 */
function Fire(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    this.mAllParticles = new ParticleGameObjectSet();
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
}

/**
 * Increase the width of the flames
 * @param {float} inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incWidth = function(inc){
    this.width+=inc;
};

/**
 * Increase the yOffset of the flame particles
 * @param {float} inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incyOffset = function(inc){
    this.yOffset+=inc;
};

/**
 * Increase the yAcceleration of the flame particles
 * @param {float} inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incyAcceleration = function(inc){
    this.yAcceleration+=inc;
};

/**
 * Increase the lifespan of the flame particles
 * @param {float} inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incLife = function(inc){
    this.life+=inc;
};

/**
 * Increase the x velocity of the flame particles
 * @param {float} inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incxVelocity = function(inc){
    this.xVelocity+=inc;
};

/**
 * Increase the size of the flame particles
 * @param {float} inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incParticleSize = function(inc){
    this.size+=inc;
};

/**
 * Increase the y velocity  of the flame particles
 * @param {float} inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incyVelocity = function(inc){
    this.yVelocity+=inc;
};

/**
 * Increases the rate of the flame particles fading
 * @param {float} inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incFlicker = function(inc){
    this.flicker+=inc;
};

/**
 * Increase the intensity (number of particles created per update cycle) of the flames
 * necessary to increase as you increase the width or height of the flames
 * @param {float} inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incIntensity = function(inc){
    this.intensity+=inc;
};

/**
 * Increase the xAcceleration of the flame particles
 * @param {float} inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incxAcceleration = function(inc){
    this.xAcceleration+=inc;
};

/**
 * Get the width of the flames
 * @returns {float} this.width
 * @memberOf Fire
 */
Fire.prototype.getWidth = function(){
    return this.width;
};

/**
 * Get the yOffset of the flame particles
 * @returns {float} this.yOffset
 * @memberOf Fire
 */
Fire.prototype.getyOffset = function(){
    return this.yOffset;
};

/**
 * Get the yAcceleration of the flame particles
 * @returns {float} this.yAcceleration
 * @memberOf Fire
 */
Fire.prototype.getyAcceleration = function(){
    return this.yAcceleration;
};

/**
 * Increase the life of the flame particles
 * @returns {float} this.life
 * @memberOf Fire
 */
Fire.prototype.getLife = function(){
    return this.life;
};

/**
 * Get the x velocity of the flame particles
 * @returns {float} this.xVelocity
 * @memberOf Fire
 */
Fire.prototype.getxVelocity = function(){
    return this.xVelocity;
};

/**
 * Get the size of the flame particles
 * @returns {float} this.size
 * @memberOf Fire
 */
Fire.prototype.getParticleSize = function(){
    return this.size;
};

/**
 * Get the y velocity of the flame particles
 * @returns {float} this.yVelocity
 * @memberOf Fire
 */
Fire.prototype.getyVelocity = function(){
    return this.yVelocity;
};

/**
 * Get the rate that the flame particles are fading
 * @returns {float} this.flicker
 * @memberOf Fire
 */
Fire.prototype.getFlicker = function(){
    return this.flicker;
};

/**
 * Get the number of particles created per update cycle
 * @returns {float} this.intensity
 * @memberOf Fire
 */
Fire.prototype.getIntensity = function(){
    return this.intensity;
};

/**
 * Get the xAcceleration of the flame particles
 * @returns {float} this.xAcceleration
 * @memberOf Fire
 */
Fire.prototype.getxAcceleration = function(){
    return this.xAcceleration;
};

/**
 * A function to return the the location of the base of the fire
 * @returns {Float[]} The x and y position of the fire
 * @memberOf Fire
 */
Fire.prototype.getPos = function(){
    return [this.xPos,this.yPos];
};

/**
 * Sets the width to the passed number
 * @param {float} width The number to set the width to
 * @memberOf Fire
 */
Fire.prototype.setWidth = function(width){
    this.width=width;
};

/**
 * Sets the yAcceleration to the passed number
 * @param {float} yAcceleration The number to set the yAcceleration to
 * @memberOf Fire
 */
Fire.prototype.setyAcceleration = function(yAcceleration){
    this.yAcceleration=yAcceleration;
};

/**
 * Sets the life to the passed number
 * @param {float} life The number to set the life to
 * @memberOf Fire
 */
Fire.prototype.setLife = function(life){
    this.life=life;
};

/**
 * Sets the xVelocity to the passed number
 * @param {float} xVelocity The number to set the xVelocity to
 * @memberOf Fire
 */
Fire.prototype.setxVelocity = function(xVelocity){
    this.xVelocity=xVelocity;
};

/**
 * Sets the yVelocity to the passed number
 * @param {float} yVelocity The number to set the yVelocity to
 * @memberOf Fire
 */
Fire.prototype.setyVelocity = function(yVelocity){
    this.yVelocity=yVelocity;
};

/**
 * Sets the flicker to the passed number
 * @param {float} flicker The number to set the shrinking rate to
 * @memberOf Fire
 */
Fire.prototype.setFlicker = function(flicker){
    this.flicker=flicker;
};

/**
 * Sets the intensity to the passed number
 * @param {float} intensity The number to set the intensity to
 * @memberOf Fire
 */
Fire.prototype.setIntensity = function(intensity){
    this.intensity=intensity;
};

/**
 * Sets the xAcceleration to the passed number
 * @param {float} xAcceleration The number to set the xAcceleration to
 * @memberOf Fire
 */
Fire.prototype.setxAcceleration = function(xAcceleration){
    this.xAcceleration=xAcceleration;
};

/**
 * Sets the size to the passed number
 * @param {float} size The number to set the size to
 * @memberOf Fire
 */
Fire.prototype.setSize = function(size){
    this.size=size;
};

/**
 * Sets the yOffset to the passed number
 * @param {float} yOffset The number to set the yOffset to
 * @memberOf Fire
 */
Fire.prototype.setyOffset = function(yOffset){
    this.yOffset=yOffset;
};

/**
 * Creates new flame particles and updates them
 * @memberOf Fire
 */
Fire.prototype.update = function(){
    for(var i=0; i<this.intensity; i++){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    }
    this.mAllParticles.update();
};

/**
 * Draws the fire on the camera passed in the argument
 * @param {Camera} aCamera the camera to be viewed on
 * @memberOf Fire
 */
Fire.prototype.draw = function(aCamera){
    this.mAllParticles.draw(aCamera);
};

/**
 * Handles collsision for all particles in regards the all objects in the passed set
 * @param {ObjSet} objSet the GameObjectSet to check for collision 
 * @memberOf Fire
 */
Fire.prototype.processCollision = function(objSet){
    gEngine.ParticleSystem.collideWithRigidSet(objSet, this.mAllParticles);
};

/**
 * The function for creating the fire particles
 * this takes all the parameters and uses them to create and set all necessary aspects of the fire particle
 * @param {int} atX the base xPos for the particle
 * @param {int} atY the base yPos for the particle
 * @returns {Paritcle} p the fire particle created
 * @memberOf Fire
 */
Fire.prototype.createParticle = function(atX,atY) {
    var life = this.life + Math.random() * (this.life*10);
    var xOffset = -this.width + 
                  this.width*2 *
                  Math.random();
    var yOffset = 0 +
                   this.yOffset *
                  Math.random();
    
    var p = new ParticleGameObject("assets/ParticleSystem/flameparticle.png", atX+xOffset, atY+yOffset, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * this.size;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx;
    if (xOffset > 0) {
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
             this.yVelocity *
             Math.random();
    p.getParticle().setVelocity([fx, fy]);
    // size delta
    p.setSizeDelta(1-(this.flicker*.005));
    if(true){
    p.getParticle().setAcceleration([this.xAcceleration*5, this.yAcceleration*5]);
    }
    
    return p;
};