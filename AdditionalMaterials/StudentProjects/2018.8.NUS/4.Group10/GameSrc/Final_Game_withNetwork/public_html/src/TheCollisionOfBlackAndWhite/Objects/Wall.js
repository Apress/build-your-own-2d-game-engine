/* File: Wall.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Wall(cx, cy,w,h,r,c) {

    var renderableObj = new Renderable();
    renderableObj.setColor(c);
    GameObject.call(this, renderableObj);
    this.getXform().setSize(w, h);
    this.getXform().setPosition(cx, cy);
    this.getXform().setRotationInDegree(r);

    var rigidShape = new RigidRectangle(this.getXform(), w, h);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor(c);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Wall, GameObject);

