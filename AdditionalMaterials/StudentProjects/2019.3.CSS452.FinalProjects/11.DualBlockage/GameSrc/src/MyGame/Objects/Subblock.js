/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */

function Subblock(pX, pY, c, sizeOfEachBlock) {
    this.visualBlock = new Renderable();
    this.visualBlock.getXform().setPosition(pX, pY);
    this.visualBlock.setColor(c);
    this.visualBlock.getXform().setSize(sizeOfEachBlock, sizeOfEachBlock);
    this.collBlock = new Renderable();
    this.collBlock.getXform().setPosition(pX, pY);
    this.collBlock.setColor([0, 0, 0, 0.0]);
    this.collBlock.getXform().setSize(sizeOfEachBlock, sizeOfEachBlock);
    this.lerpUtil = new InterpolateVec2([pX, pY],120,0.1);
};
gEngine.Core.inheritPrototype(Subblock, GameObject);

Subblock.prototype.incPositionBy = function (pX, pY) {
    this.incXPosBy(pX);
    this.incYPosBy(pY);
};

Subblock.prototype.incXPosBy = function (pX) {
    this.collBlock.getXform().incXPosBy(pX);
};

Subblock.prototype.incYPosBy = function (pY) {
    this.collBlock.getXform().incYPosBy(pY);
};

Subblock.prototype.draw = function (cameraInput) {
    this.visualBlock.draw(cameraInput);
};

Subblock.prototype.getXform = function () { return this.collBlock.getXform(); };

Subblock.prototype.getVisualPos = function () { return this.visualBlock.getXform().getPosition(); };

Subblock.prototype.update = function () {
    this.lerpUtil.setFinalValue([this.collBlock.getXform().getXPos(),this.collBlock.getXform().getYPos()]);// final value of interpolation
    this.lerpUtil.updateInterpolation();
    this.visualBlock.getXform().setPosition(this.lerpUtil.getValue()[0], this.lerpUtil.getValue()[1]);
};

Subblock.prototype.updateLerp = function(cycle, rate) {
    this.lerpUtil = new InterpolateVec2([this.collBlock.getXform().getXPos(),this.collBlock.getXform().getYPos()],cycle,rate);
};

Subblock.prototype.update = function (shakeX, shakeY) {
    this.lerpUtil.setFinalValue([this.collBlock.getXform().getXPos(),this.collBlock.getXform().getYPos()]);// final value of interpolation
    this.lerpUtil.updateInterpolation();
    this.visualBlock.getXform().setPosition(this.lerpUtil.getValue()[0] + shakeX, this.lerpUtil.getValue()[1] + shakeY);
};