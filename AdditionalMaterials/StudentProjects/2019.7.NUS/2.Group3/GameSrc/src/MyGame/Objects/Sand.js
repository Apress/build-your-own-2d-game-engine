/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Sand(spriteTexture,Xindex,Yindex) {
    this.kXindex = Xindex;
    this.kYindex = Yindex;
    this.kTag = "Sand";
    
    this.kXpos = this.kXindex * 7 - 47;
    this.kYpos = this.kYindex * 7 - 47;
    this.kXsize = 7;
    this.kYsize = 7;
    
    this.mSand = new SpriteRenderable(spriteTexture);
    this.mSand.setColor([1, 0.91, 0.65, 0.1]);
    this.mSand.getXform().setPosition(this.kXpos,this.kYpos);
    this.mSand.getXform().setSize(this.kXsize, this.kYsize);
    this.mSand.setElementPixelPositions(2046, 2047, 0, 1);

    GameObject.call(this, this.mSand);
}
gEngine.Core.inheritPrototype(Sand, GameObject);


