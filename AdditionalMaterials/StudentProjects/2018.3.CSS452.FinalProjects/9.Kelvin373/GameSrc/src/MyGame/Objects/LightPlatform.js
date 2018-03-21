"use strict";

function LightPlatform(spriteTexture, x,y,w,h,rot)
{
    Platform.call(this, spriteTexture, x,y,w,h,rot);

    this.pf = new LightRenderable(spriteTexture);
    var xf = this.pf.getXform();
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);

    GameObject.call(this, this.pf);
    var r = new RigidRectangle(xf, w, h);
    r.setMass(0);
    this.addRigidBody(r);
}

gEngine.Core.inheritPrototype(LightPlatform, Platform);