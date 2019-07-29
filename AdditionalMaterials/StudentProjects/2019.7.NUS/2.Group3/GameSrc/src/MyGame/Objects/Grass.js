/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Grass(spriteTexture,Xindex,Yindex,camera) {
    this.kXindex = Xindex;
    this.kYindex = Yindex;
    this.kTag = "Grass";
    this.kCamera = camera;
    
    this.kXpos = this.kXindex * 7 - 47;
    this.kYpos = this.kYindex * 7 - 47;
    
    this.kLeft = this.kXpos - 3.5;
    this.kRight = this.kXpos + 3.5;
    this.kTop = this.kYpos + 3.5;
    this.kBottom = this.kYpos -3.5;
    this.kLeftLine = null;
    this.kRightLine = null;
    this.kTopLine = null;
    this.kBottomLine = null;
    
    
    this.kXsize = 7;
    this.kYsize = 7;
    
    this.mGrass = new SpriteRenderable(spriteTexture);
    this.mGrass.setColor([0, 0.4, 0, 0.1]);
    this.mGrass.getXform().setPosition(this.kXpos,this.kYpos);
    this.mGrass.getXform().setSize(this.kXsize, this.kYsize);
    var randomN=Math.random();
    if(randomN<0.25){
        this.mGrass.setElementPixelPositions(0, 255, 0, 252);
    }else if(randomN<0.5){
        this.mGrass.setElementPixelPositions(0, 255, 256, 505);
    }else if(randomN<0.75){
        this.mGrass.setElementPixelPositions(257, 505, 0, 252);
    }else{
        this.mGrass.setElementPixelPositions(257, 505, 256, 505);
    }
    this.mHasIceCream = false;
   GameObject.call(this, this.mGrass);
}
gEngine.Core.inheritPrototype(Grass, GameObject);

Grass.prototype.initialize = function(){
    this.kLeftLine = new LineRenderable();
    this.kLeftLine.setFirstVertex(this.kLeft, this.kBottom);
    this.kLeftLine.setSecondVertex(this.kLeft, this.kTop);
    
    this.kRightLine = new LineRenderable();
    this.kRightLine.setFirstVertex(this.kRight, this.kBottom);
    this.kRightLine.setSecondVertex(this.kRight, this.kTop);
    
    this.kTopLine = new LineRenderable();
    this.kTopLine.setFirstVertex(this.kLeft, this.kTop);
    this.kTopLine.setSecondVertex(this.kRight, this.kTop);
    
    this.kBottomLine = new LineRenderable();
    this.kBottomLine.setFirstVertex(this.kLeft, this.kBottom);
    this.kBottomLine.setSecondVertex(this.kRight, this.kBottom);
    
    
};

Grass.prototype.drawLine = function(){
    this.kRightLine.draw(this.kCamera);
    this.kLeftLine.draw(this.kCamera);
    this.kBottomLine.draw(this.kCamera);
    this.kTopLine.draw(this.kCamera);
};
