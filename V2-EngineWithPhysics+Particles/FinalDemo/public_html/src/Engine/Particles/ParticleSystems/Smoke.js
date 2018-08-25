//File: Smoke.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {float} xPos The x position for the smoke
 * @param {float} yPos The y position for the smoke
 * @param {float} width The maximum horizontal offset for the smoke particles
 * @param {float} yAcceleration The vertical acceleration for the smoke paritcles
 * @param {float} life The life for the smoke particles
 * @param {float} xVelocity The initial horizontal boost for the smoke particles
 * @param {float} yVelocity The initial vertical boost for the smoke particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The # of smoke particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the smoke paritcles
 * @param {float} size The size for the smoke paritcles
 * @param {float} yOffset The maximum vertical offset for the smoke paritcles
 * @returns {Smoke} New instance of Smoke object
 * @type Smoke
 * @class Smoke
 */
function Smoke(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    ParticleSystem.call(this, "assets/ParticleSystem/smokeparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [.1,.1,.1,1], [.1,.1,.1,1], 1);
}

gEngine.Core.inheritPrototype(Smoke,ParticleSystem)



