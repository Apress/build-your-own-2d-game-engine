/*
 * File: Engine_Particle.js 
 * Particle System support
 */
/*jslint node: true, vars: true, white: true */
/*global vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };
    // initialize the variable while ensuring it is not redefined

/**
 * Default Constructor
 * Particle System support
 * @type gEngine.Particle
 * @class gEngine.Particle
 */
gEngine.Particle = (function () {
    var mSystemtAcceleration = [0, -50.0];
    
    // the follows are scratch workspace for vec2
    var mFrom1to2 = [0, 0];  
    var mVec = [0, 0];
    var mNormal = [0, 0];
    
    /**
     * 
     * @memberOf gEngine.Particle
     * @param {type} circShape
     * @param {type} particle
     * @returns {Boolean}
     */
    var resolveCirclePos = function (circShape, particle) {
        var collided = false;
        var pos = particle.getPosition();
        var cPos = circShape.getPosition();
        vec2.subtract(mFrom1to2, pos, cPos);
        var dist = vec2.length(mFrom1to2);
        if (dist < circShape.getRadius()) {
            vec2.scale(mFrom1to2, mFrom1to2, 1/dist);
            vec2.scaleAndAdd(pos, cPos, mFrom1to2, circShape.getRadius());
            collided = true;
        }
        return collided;
    };

    /**
     * 
     * @memberOf gEngine.Particle
     * @param {type} rectShape
     * @param {type} particle
     * @returns {Boolean}
     */
    var resolveRectPos = function (rectShape, particle) {
        var collided = false;
        var alongX = rectShape.getWidth() / 2;
        var alongY = rectShape.getHeight() / 2;

        var pos = particle.getPosition();
        var rPos = rectShape.getPosition();
        
        var rMinX = rPos[0] - alongX;
        var rMaxX = rPos[0] + alongX;
        var rMinY = rPos[1] - alongY;
        var rMaxY = rPos[1] + alongY;
        
        collided = ((rMinX<pos[0]) && (rMinY<pos[1]) &&
                    (rMaxX>pos[0]) && (rMaxY>pos[1]));
        
        if (collided) {
            vec2.subtract(mFrom1to2, pos, rPos);
            mVec[0] = mFrom1to2[0];
            mVec[1] = mFrom1to2[1];

            // Find closest axis
            if (Math.abs(mFrom1to2[0] - alongX) < Math.abs(mFrom1to2[1] - alongY))  {
                // Clamp to closest side
                mNormal[0] = 0;
                mNormal[1] = 1;
                if (mVec[0] > 0) {
                    mVec[0] = alongX;
                } else {
                    mVec[0] = -alongX;
                }
            } else { // y axis is shorter
                mNormal[0] = 1;
                mNormal[1] = 0;
                // Clamp to closest side
                if (mVec[1] > 0) {
                    mVec[1] = alongY;
                } else {
                    mVec[1] = -alongY;
                }
            }

            vec2.subtract(mVec, mVec, mFrom1to2);
            vec2.add(pos, pos, mVec);  // remember pos is particle position
        }
        return collided;
    };
    
    /**
     * Rigid Shape interactions: a game object and a set of particle game objects
     * @memberOf gEngine.Particle
     * @param {GameObject} obj
     * @param {ParticleObjectSet} pSet
     * @returns {undefined}
     */
    var processObjSet = function(obj, pSet) {
        var s1 = obj.getPhysicsComponent();  // a RigidShape
        var i, p;
        for (i=0; i<pSet.size(); i++) {
            p = pSet.getObjectAt(i).getPhysicsComponent();  // a Particle
            s1.resolveParticleCollision(p);
        }
    };
    
    /**
     * Rigid Shape interactions: game object set and a set of particle game objects
     * @memberOf gEngine.Particle
     * @param {GameObjectSet} objSet
     * @param {ParticleObjectSet} pSet
     * @returns {void}
     */
    var processSetSet = function(objSet, pSet) {
        var i;
        for (i=0; i<objSet.size(); i++) {
            processObjSet(objSet.getObjectAt(i), pSet);
        }
    };
    
    /**
     * Return Acceleration
     * @memberOf gEngine.Particle
     * @returns {Float[]} current Acceleration [X, Y]
     */
    var getSystemtAcceleration = function() { return mSystemtAcceleration; };
    
    /**
     * Set Acceleration
     * @memberOf gEngine.Particle
     * @param {Float[]} g new Acceleration [X, Y]
     * @returns {void}
     */
    var setSystemtAcceleration = function(g) { mSystemtAcceleration = g; };
    
    var mPublic = {
        getSystemtAcceleration: getSystemtAcceleration,
        setSystemtAcceleration: setSystemtAcceleration,
        resolveCirclePos: resolveCirclePos,
        resolveRectPos: resolveRectPos,
        processObjSet: processObjSet,
        processSetSet: processSetSet
    };

    return mPublic;
}());
