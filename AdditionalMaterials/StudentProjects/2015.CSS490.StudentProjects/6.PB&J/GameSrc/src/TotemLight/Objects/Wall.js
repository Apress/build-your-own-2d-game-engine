/* File: Wall.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Wall.eWallType = Object.freeze({
    eOuterWall: 0,
    eInnerWall: 1
});

function Wall(cx, cy, texture, normal, lightSet, type) {
    this.mType = type;
    
    switch(this.mType)
    {
        case Wall.eWallType.eOuterWall:
            this.kWallWidth = 4;
            this.kWallHeight = 6;
            break;
        case Wall.eWallType.eInnerWall:
            this.kWallWidth = 1;
            this.kWallHeight = 6;
            break;
    };

    var renderableObj = new IllumRenderable(texture, normal);
    var i;
    for (i=0; i<lightSet.numLights(); i++) {
        renderableObj.addLight(lightSet.getLightAt(i));
    }
    GameObject.call(this, renderableObj);
    this.getXform().setSize(this.kWallWidth, this.kWallHeight);
    this.getXform().setPosition(cx, cy);
    
    var rigidShape = new RigidRectangle(this.getXform(), this.kWallWidth, this.kWallHeight);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Wall, GameObject);

