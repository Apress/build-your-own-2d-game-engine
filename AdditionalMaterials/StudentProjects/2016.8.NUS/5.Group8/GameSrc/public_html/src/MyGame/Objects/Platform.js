/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Platform(spriteTexture, x, y ,width, height) {
    this.mPosition = vec2.fromValues(x, y);
    
    this.mPlatform = new SpriteRenderable(spriteTexture);
    this.mPlatform.setElementUVCoordinate(0, 1, 0, 1);
    this.mPlatform.getXform().setPosition(x, y);   //将platform置于(x, y)处
    this.mPlatform.setColor([1, 1, 1, 0]);
    
    this.mPlatformWidth = this.mPlatform.getXform().getWidth();  //platform贴图自身宽度
    this.mPlatformHeight = this.mPlatform.getXform().getWidth();  //platform贴图自身高度
    this.mPlatform.getXform().setSize(width / this.mPlatformWidth, height / this.mPlatformHeight);   //将platform的宽度设置为width，高度设置为height
    this.mPlatformWidth = width;
    this.mPlatformHeight = height;
    GameObject.call(this, this.mPlatform);
    
     var rigidShape = new RigidRectangle(this.getXform(), width, height);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 0.2, 0.2, 1]);
    this.setPhysicsComponent(rigidShape);
    
}
gEngine.Core.inheritPrototype(Platform, GameObject);

Platform.prototype.Draw = function(aCamera) {
     this.mPlatform.draw(aCamera);
};

Platform.prototype.getPosition = function() {
     return this.mPosition;
};

Platform.prototype.getWidth = function() {
     return this.mPlatformWidth;
};

Platform.prototype.getHeight = function() {
     return this.mPlatformHeight;
};



