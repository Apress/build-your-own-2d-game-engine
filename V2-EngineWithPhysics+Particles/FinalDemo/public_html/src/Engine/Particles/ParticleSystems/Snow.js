//File: Snow.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {float} xPos The x position for the snow
 * @param {float} yPos The y position for the snow
 * @param {float} width The maximum horizontal offset for the snow particles
 * @param {float} yAcceleration The vertical acceleration for the snow paritcles
 * @param {float} life The life for the snow particles
 * @param {float} xVelocity The initial horizontal boost for the snow particles
 * @param {float} yVelocity The initial vertical boost for the snow particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The # of snow particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the snow paritcles
 * @param {float} size The size for the snow paritcles
 * @param {float} yOffset The maximum vertical offset for the snow paritcles
 * @returns {Snow} New instance of Snow object
 * @type Snow
 * @class Snow
 */
function Snow(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    ParticleSystem.call(this, "assets/ParticleSystem/snowparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [.6,.6,.6,1], [.6,.6,.6,1], -1);
    this.setSizeBase(1);
}

gEngine.Core.inheritPrototype(Snow,ParticleSystem);

Snow.SnowParams = function(){
    //this.mAllParticles = new ParticleGameObjectSet();
    //this.texture="assets/ParticleSystem/flameparticle.png";
    this.xPos=50;
    this.yPos=50;
    this.width=5;
    this.yAcceleration=1;
    this.life=140;
    this.xVelocity=0;
    this.yVelocity=0;
    this.flicker=0;
    this.intensity=1;
    this.xAcceleration=0;
    this.size=1;
    this.yOffset=0;
    //this.startColor=[1,0,0,1];
    //this.finalColor=[0,0,0,1];
    //this.yMultiplier=1;
    //this.sizeBase=1;
}


