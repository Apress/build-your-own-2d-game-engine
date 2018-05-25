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
 * @type gEngine.ParticleSystem
 * @class gEngine.ParticleSystem
 */
gEngine.ParticleSystem = (function () {
    var mSystemtAcceleration = [0, -50.0];
    
    // the follows are scratch workspace for vec2
    var mFrom1to2 = [0, 0];
    var mCircleCollider = null; 
    
    /**
     * Resolve collision between a particle and a RigidCircle
     * @memberOf gEngine.ParticleSystem
     * @param {type} circShape
     * @param {type} particle
     * @returns {Boolean}
     */
    var resolveCirclePos = function (circShape, particle) {
        var collided = false;
        var pos = particle.getPosition();
        var cPos = circShape.getCenter();
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
     * Resolve collision between a particle and a RigidRectangle
     * @memberOf gEngine.ParticleSystem
     * @param {type} rectShape
     * @param {type} xf
     * @returns {Boolean}
     */
    var resolveRectPos = function (rectShape, xf) {
        if (mCircleCollider === null)
            mCircleCollider = new RigidCircle(null, 0.0);  // radius of 0.0 
        mCircleCollider.setTransform(xf);
        if (mCircleCollider.boundTest(rectShape)) {
            var rPInfo = new CollisionInfo();
            if (rectShape.collisionTest(mCircleCollider, rPInfo)) {
                // make sure info is always from rect towards particle
                vec2.subtract(mFrom1to2, mCircleCollider.getCenter(), rectShape.getCenter());
                if (vec2.dot(mFrom1to2, rPInfo.getNormal()) < 0)
                    mCircleCollider.adjustPositionBy(rPInfo.getNormal(), -rPInfo.getDepth());
                else
                    mCircleCollider.adjustPositionBy(rPInfo.getNormal(), rPInfo.getDepth());
            }
        }
    };
    
    /**
     * Rigid Shape interactions: a game object and a set of particle game objects
     * @memberOf gEngine.ParticleSystem
     * @param {GameObject} obj
     * @param {ParticleObjectSet} pSet
     * @returns {undefined}
     */
    var processObjSet = function(obj, pSet) {
        var s1 = obj.getRigidBody();  // a RigidShape
        var i, p;
        for (i=0; i<pSet.size(); i++) {
            var x = pSet.getObjectAt(i).getX();
            p = pSet.getObjectAt(i).getParticle();  // a Particle
            s1.resolveParticleCollision(p,x);
        }
    };
    
    /**
     * Rigid Shape interactions: game object set and a set of particle game objects
     * @memberOf gEngine.ParticleSystem
     * @param {GameObjectSet} objSet
     * @param {ParticleObjectSet} pSet
     * @returns {void}
     */
    var collideWithRigidSet = function(objSet, pSet) {
        var i;
        for (i=0; i<objSet.size(); i++) {
            processObjSet(objSet.getObjectAt(i), pSet);
        }
    };
    
    /**
     * Return Acceleration
     * @memberOf gEngine.ParticleSystem
     * @returns {Float[]} current Acceleration [X, Y]
     */
    var getSystemtAcceleration = function() { return mSystemtAcceleration; };
    
    /**
     * Set Acceleration
     * @memberOf gEngine.ParticleSystem
     * @param {Float[]} g new Acceleration [X, Y]
     * @returns {void}
     */
    var setSystemtAcceleration = function(g) { mSystemtAcceleration = g; };
    
    /**
     * Update Particles
     * @memberOf gEngine.ParticleSystem
     * @param {ParticleGameObjectSet} pSet the particleSet you want to update
     * @returns {void}
     */
    var update = function(pSet){
        pSet.update();
    };
    
    var mPublic = {
        getSystemtAcceleration: getSystemtAcceleration,
        setSystemtAcceleration: setSystemtAcceleration,
        resolveCirclePos: resolveCirclePos,
        resolveRectPos: resolveRectPos,
        processObjSet: processObjSet,
        collideWithRigidSet: collideWithRigidSet,
        update: update
    };

    return mPublic;
}());
