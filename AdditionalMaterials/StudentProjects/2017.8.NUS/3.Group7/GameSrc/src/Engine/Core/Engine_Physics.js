/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*jslint node: true, vars: true, white: true */
/*global vec2, CollisionInfo */
/* find out more about jslint: http://www.jslint.com/help.html */

'use strict'  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { }
// initialize the variable while ensuring it is not redefined

/**
 * Default Constructor<p>
 * Physics engine supporting projection and impulse collision resolution. <p>
 * @class gEngine.Physics
 * @type gEngine.Physics
 */
gEngine.Physics = (function () {

    var mSystemtAcceleration = [0, -20]        // system-wide default acceleration
    var mPosCorrectionRate = 0.8               // percentage of separation to project objects
    var mRelaxationCount = 15                  // number of relaxation iteration
    
    var mCorrectPosition  = true
    var mHasMotion = true
    
    var getSystemtAcceleration = function() { return mSystemtAcceleration }
    
    var togglePositionalCorrection = function() {
        mCorrectPosition = !mCorrectPosition
    }
    var getPositionalCorrection = function() {
        return mCorrectPosition
    }
    var toggleHasMotion= function() {
        mHasMotion = !mHasMotion
    }
    var getHasMotion = function() {
        return mHasMotion
    }
    var incRelaxationCount = function(dc) {
        mRelaxationCount += dc
    }
    var getRelaxationCount = function() {
        return mRelaxationCount
    }
    
    var positionalCorrection = function (s1, s2, collisionInfo) {
        if (!mCorrectPosition)
            return
        
        var s1InvMass = s1.getInvMass()
        var s2InvMass = s2.getInvMass()

        var num = collisionInfo.getDepth() / (s1InvMass + s2InvMass) * mPosCorrectionRate
        var correctionAmount = [0, 0]
        vec2.scale(correctionAmount, collisionInfo.getNormal(), num)

        s1.adjustPositionBy(correctionAmount, -s1InvMass)
        s2.adjustPositionBy(correctionAmount, s2InvMass)
    }
    
    var resolveCollision = function (s1, s2, collisionInfo) {
        var n = collisionInfo.getNormal()

        //the direction of collisionInfo is always from s1 to s2
        //but the Mass is inversed, so start scale with s2 and end scale with s1
        var invSum = 1 / (s1.getInvMass() + s2.getInvMass())
        var start = [0, 0], end = [0, 0], p = [0, 0]
        vec2.scale(start, collisionInfo.getStart(), s2.getInvMass() * invSum)
        vec2.scale(end, collisionInfo.getEnd(), s1.getInvMass() * invSum)
        vec2.add(p, start, end)
        
        //r is vector from center of object to collision point
        var r1 = [0, 0], r2 = [0, 0]
        vec2.subtract(r1, p, s1.getCenter())
        vec2.subtract(r2, p, s2.getCenter())
        
        //newV = V + mAngularVelocity cross R
        var v1 = [-1 * s1.getAngularVelocity() * r1[1],
            s1.getAngularVelocity() * r1[0]]
        vec2.add(v1, v1, s1.getVelocity())
        
        var v2 = [-1 * s2.getAngularVelocity() * r2[1], 
            s2.getAngularVelocity() * r2[0]]
        vec2.add(v2, v2, s2.getVelocity())

        var relativeVelocity = [0, 0]
        vec2.subtract(relativeVelocity, v2, v1)

        // Relative velocity in normal direction
        var rVelocityInNormal = vec2.dot(relativeVelocity, n)

        //if objects moving apart ignore
        if (rVelocityInNormal > 0) {
            return
        }

        // compute and apply response impulses for each object    
        var newRestituion = Math.min(s1.getRestitution(), s2.getRestitution())
        var newFriction = Math.min(s1.getFriction(), s2.getFriction())

        //R cross N
        var R1crossN = r1[0] * n[1] - r1[1] * n[0] // r1 cross n
        var R2crossN = r2[0] * n[1] - r2[1] * n[0] // r2 cross n

        // Calc impulse scalar
        // the formula of jN can be found in http://www.myphysicslab.com/collision.html
        var jN = -(1 + newRestituion) * rVelocityInNormal
        jN = jN / (s1.getInvMass() + s2.getInvMass() +
                R1crossN * R1crossN * s1.getInertia() +
                R2crossN * R2crossN * s2.getInertia())

        //impulse is in direction of normal ( from s1 to s2)
        var impulse = [0, 0]
        vec2.scale(impulse, n, jN)
        // impulse = F dt = m * ?v
        // ?v = impulse / m
        vec2.scaleAndAdd(s1.getVelocity(), s1.getVelocity(), impulse, -s1.getInvMass())
        vec2.scaleAndAdd(s2.getVelocity(), s2.getVelocity(), impulse, s2.getInvMass())
        
        s1.setAngularVelocityDelta(-R1crossN * jN * s1.getInertia())
        s2.setAngularVelocityDelta(R2crossN * jN * s2.getInertia())

        var tangent = [0, 0]
        vec2.scale(tangent, n, rVelocityInNormal)
        vec2.subtract(tangent, tangent, relativeVelocity)
        vec2.normalize(tangent, tangent)

        var R1crossT = r1[0] * tangent[1] - r1[1] * tangent[0] // r1.cross(tangent);
        var R2crossT = r2[0] * tangent[1] - r2[1] * tangent[0] // r2.cross(tangent);
        var rVelocityInTangent = vec2.dot(relativeVelocity, tangent)

        var jT = -(1 + newRestituion) * rVelocityInTangent * newFriction
        jT = jT / (s1.getInvMass() + s2.getInvMass() + 
                    R1crossT * R1crossT * s1.getInertia() + 
                    R2crossT * R2crossT * s2.getInertia())

        //friction should less than force in normal direction
        if (jT > jN) {
            jT = jN
        }

        //impulse is from s1 to s2 (in opposite direction of velocity)
        vec2.scale(impulse, tangent, jT)
        vec2.scaleAndAdd(s1.getVelocity(), s1.getVelocity(), impulse, -s1.getInvMass())
        vec2.scaleAndAdd(s2.getVelocity(), s2.getVelocity(), impulse, s2.getInvMass())

        s1.setAngularVelocityDelta(-R1crossT * jT * s1.getInertia())
        s2.setAngularVelocityDelta(R2crossT * jT * s2.getInertia())
    }
    
    var processCollision = function(set, infoSet) {
        var i = 0, j = 0, r = 0
        var iToj = [0, 0]
        var info = new CollisionInfo()
        for (r= 0; r<mRelaxationCount; r++) {
            for (i = 0; i<set.size(); i++) {
                var objI = set.getObjectAt(i).getRigidBody()
                for (j = i+1; j<set.size(); j++) {
                    var objJ = set.getObjectAt(j).getRigidBody()
                    if ( (objI.getInvMass() !== 0) || (objJ.getInvMass() !== 0) ) {
                        if (objI.boundTest(objJ)) {
                            if (objI.collisionTest(objJ, info)) {
                                // make sure info is always from i towards j
                                vec2.subtract(iToj, objJ.getCenter(), objI.getCenter())
                                if (vec2.dot(iToj, info.getNormal()) < 0)
                                    info.changeDir()
                                // infoSet.push(info);
                                positionalCorrection(objI, objJ, info)
                                resolveCollision(objI, objJ, info)
                                // info = new CollisionInfo();
                            }
                        }
                    }
                }
            }
        }
    }
    
    var mPublic = {
        getSystemAcceleration: getSystemtAcceleration,
        processCollision: processCollision,
        togglePositionalCorrection: togglePositionalCorrection,
        getPositionalCorrection: getPositionalCorrection,
        incRelaxationCount: incRelaxationCount,
        getRelaxationCount: getRelaxationCount,
        getHasMotion: getHasMotion,
        toggleHasMotion: toggleHasMotion
    }
    return mPublic
}())