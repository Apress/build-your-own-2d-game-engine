/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

function LightSprite(texture, aX, aY)
{
    this.mTexture = texture;
    this.mLightSprite = new LightRenderable(this.mTexture);
    this.mIsActivated = false;
    
    var xform = this.mLightSprite.getXform();
    
    xform.setPosition(aX, aY);
    xform.setSize(1.5,1.5);
    var lgt = new Light();
    lgt.setLightType(0);
    lgt.setColor([1, 1, 1, 1]);
    lgt.setXPos(xform.getXPos());
    lgt.setYPos(xform.getYPos());
    lgt.setZPos(1);
    lgt.setNear(1);
    lgt.setFar(2);
    lgt.setIntensity(1);
    lgt.setDropOff(20);
    lgt.setLightCastShadowTo(true);
    this.mLightSprite.addLight(lgt);
    
    GameObject.call(this, this.mLightSprite);
    
    var rigidShape = new RigidRectangle(xform, xform.getWidth(), xform.getHeight());
    rigidShape.setMass(1);  // ensures no movements!
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([0, 0, 1, 1]);
    rigidShape.setAcceleration([0, 0]);
    this.setPhysicsComponent(rigidShape);
};

gEngine.Core.inheritPrototype(LightSprite, GameObject);

