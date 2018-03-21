/* 
 * File:RigidCircle.js
 *      define a circle
 *     
 */
/*jslint node: true, vars: true, evil: true, bitwise: true */
"use strict";
/* global RigidShape, gEngine, vec2 */

var RigidCircle = function (xf, radius) {
    RigidShape.call(this, xf);
    this.mType = "RigidCircle";
    this.mRadius = radius;
    this.mBoundRadius = radius;
    
    this.updateInertia();
};
gEngine.Core.inheritPrototype(RigidCircle, RigidShape);

RigidCircle.prototype.updateInertia = function () {
    if (this.mInvMass === 0) {
        this.mInertia = 0;
    } else {
        // this.mInvMass is inverted!!
        // Inertia=mass * radius^2
        // 12 is a constant value that can be changed
        this.mInertia = (1 / this.mInvMass) * (this.mRadius * this.mRadius) / 12;
    }
};

RigidCircle.prototype.incShapeSizeBy= function (dt) {
    this.mRadius += dt;
    this.mBoundRadius += dt;
    this.updateInertia();
};

RigidCircle.prototype.setShapeSize = function (radius) {
    
    this.mRadius = radius;
    this.mBoundRadius = radius;
    this.updateInertia();
};

RigidCircle.prototype.draw = function (aCamera) {
    RigidShape.prototype.draw.call(this, aCamera);
    
    // kNumSides forms the circle.
    this.mLine.setColor([0, 0, 0, 1]);
    this.drawCircle(aCamera, this.mRadius);
    
    var p = this.mXform.getPosition();
    var u = [p[0], p[1]+this.mBoundRadius];
    // angular motion
    vec2.rotateWRT(u, u, this.mXform.getRotationInRad(), p);
    this.mLine.setColor([1, 1, 1, 1]);
    this.mLine.setFirstVertex(p[0], p[1]);
    this.mLine.setSecondVertex(u[0], u[1]);
    this.mLine.draw(aCamera);
    
    if (this.mDrawBounds)
        this.drawCircle(aCamera, this.mBoundRadius);
};

RigidCircle.prototype.update = function () {
    RigidShape.prototype.update.call(this);
};

RigidCircle.prototype.getVertices = function () {
    
    var pos = this.mXform.getPosition();    
    var prevPoint = vec2.clone(pos);
    var deltaTheta = (Math.PI * 2.0) / RigidShape.kNumCircleSides;
    var theta = deltaTheta;
    var vertices = [];
    prevPoint[0] += this.mRadius;
    var i, x, y;
    for (i = 1; i <= RigidShape.kNumCircleSides; i++) {
        x = pos[0] + this.mRadius * Math.cos(theta);
        y = pos[1] + this.mRadius * Math.sin(theta);
        
        vertices.push([prevPoint[0], prevPoint[1]]);
        
        theta = theta + deltaTheta;
        prevPoint[0] = x;
        prevPoint[1] = y;
    }
    return vertices;
};