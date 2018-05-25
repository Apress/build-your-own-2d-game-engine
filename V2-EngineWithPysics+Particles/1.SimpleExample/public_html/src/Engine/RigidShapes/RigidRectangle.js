/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true, evil: true, bitwise: true */
"use strict";
/* global RigidShape, vec2, gEngine */

var RigidRectangle = function (xf, width, height) {
    RigidShape.call(this, xf);
    this.mType = "RigidRectangle";
    this.mWidth = width;
    this.mHeight = height;
    this.mBoundRadius = Math.sqrt(width * width + height * height) / 2;
    this.mVertex = [];
    this.mFaceNormal = [];
    
    this.setVertices();
    this.computeFaceNormals();
    
    this.updateInertia();
};
gEngine.Core.inheritPrototype(RigidRectangle, RigidShape);

RigidRectangle.prototype.updateInertia = function () {
    // Expect this.mInvMass to be already inverted!
    if (this.mInvMass === 0) {
        this.mInertia = 0;
    } else {
        //inertia=mass*width^2+height^2
        this.mInertia = (1 / this.mInvMass) * (this.mWidth * this.mWidth + this.mHeight * this.mHeight) / 12;
        this.mInertia = 1 / this.mInertia;
    }
};

RigidRectangle.prototype.incShapeSizeBy= function (dt) {
    this.mHeight += dt;
    this.mWidth += dt;
};

RigidRectangle.prototype.adjustPositionBy = function(v, delta) {
    RigidShape.prototype.adjustPositionBy.call(this, v, delta);
    this.setVertices();
    this.rotateVertices();
};

RigidRectangle.prototype.setVertices = function () {
    var center = this.mXform.getPosition();
    var hw = this.mWidth / 2;
    var hh = this.mHeight / 2;
    //0--TopLeft;1--TopRight;2--BottomRight;3--BottomLeft
    this.mVertex[0] = vec2.fromValues(center[0] - hw, center[1] - hh);
    this.mVertex[1] = vec2.fromValues(center[0] + hw, center[1] - hh);
    this.mVertex[2] = vec2.fromValues(center[0] + hw, center[1] + hh);
    this.mVertex[3] = vec2.fromValues(center[0] - hw, center[1] + hh);    
};

RigidRectangle.prototype.computeFaceNormals = function () {
    //0--Top;1--Right;2--Bottom;3--Left
    //mFaceNormal is normal of face toward outside of rectangle    
    for (var i = 0; i<4; i++) {
        var v = (i+1) % 4;
        var nv = (i+2) % 4;
        this.mFaceNormal[i] = vec2.clone(this.mVertex[v]);
        vec2.subtract(this.mFaceNormal[i], this.mFaceNormal[i], this.mVertex[nv]);
        vec2.normalize(this.mFaceNormal[i], this.mFaceNormal[i]);
    }
};

RigidRectangle.prototype.rotateVertices = function () {
    var center = this.mXform.getPosition();
    var r = this.mXform.getRotationInRad();
    for (var i = 0; i<4; i++) {
        vec2.rotateWRT(this.mVertex[i], this.mVertex[i], r, center);
    }
    this.computeFaceNormals();
};

RigidRectangle.prototype.drawAnEdge = function (i1, i2, aCamera) {
    this.mLine.setFirstVertex(this.mVertex[i1][0], this.mVertex[i1][1]);  
    this.mLine.setSecondVertex(this.mVertex[i2][0], this.mVertex[i2][1]); 
    this.mLine.draw(aCamera);
};

RigidRectangle.prototype.draw = function (aCamera) {
    RigidShape.prototype.draw.call(this, aCamera);
    this.mLine.setColor([0, 0, 0, 1]);
    var i = 0;
    for (i=0; i<4; i++) {
        this.drawAnEdge(i, (i+1)%4, aCamera);
    }
    
    if (this.mDrawBounds) {
        this.mLine.setColor([1, 1, 1, 1]);
        this.drawCircle(aCamera, this.mBoundRadius);
    }
};

RigidRectangle.prototype.update = function () {
    RigidShape.prototype.update.call(this);
    this.setVertices();
    this.rotateVertices();
};