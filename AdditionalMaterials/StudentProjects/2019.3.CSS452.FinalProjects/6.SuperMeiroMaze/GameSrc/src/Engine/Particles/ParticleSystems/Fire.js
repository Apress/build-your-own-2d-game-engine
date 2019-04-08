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
    ParticleSystem.call(this, "assets/ParticleSystem/flameparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [1,0,0,1], [3.5,.4,.3,.6], 1);
}

gEngine.Core.inheritPrototype(Fire,ParticleSystem);

