/* 
 * Modified by: Herbert Traut
 * Date: 11-20-15
 * File: GameObjectSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global  , gEngine, mat4, vec2, GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function GameObjectSet() {
    this.kDelta = 0.5;
    
    this.mSet = [];
    this.mXform = new Transform();
    this.mXform.setPosition(0, 0);
    this.mXform.setSize(1, 1);
    this.mBB = null;
    this.posDif = [];
    this.sizeDif = [];
    this.mCollided = 0;
}
gEngine.Core.inheritPrototype(GameObjectSet, GameObject);

GameObjectSet.prototype.size = function () { return this.mSet.length; };
GameObjectSet.prototype.getXform = function () { return this.mXform; };
GameObjectSet.prototype.setCollided = function(status) { this.mCollided = status; };

GameObjectSet.prototype.getObjectAt = function (index) {
    return this.mSet[index];
};

GameObjectSet.prototype.showBBox = function (debug){
    this.mBB.setVisibility(debug);
    var i = 0;
    for(i; i < this.mSet.length; i++){
        this.mSet[i].getBBox().setVisibility(debug);
    }
};

GameObjectSet.prototype.getBBox = function () {
    var i = 0;
    for(i; i < this.mSet.length; i++){
        this.mSet[i].getBBox();
    }
    return GameObject.prototype.getBBox.call(this);
};

GameObjectSet.prototype._findMinPoint = function(){
    var minx = this.mSet[0].getXform().getPosition()[0] - (this.mSet[0].getXform().getWidth()/2);
    var miny = this.mSet[0].getXform().getPosition()[1] - (this.mSet[0].getXform().getHeight()/2);
    var min = vec2.fromValues(minx, miny);
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        var objXform = this.mSet[i].getXform();
        var size = objXform.getSize();
        var pos = objXform.getPosition();
        minx = pos[0]-(size[0]/2);
        miny = pos[1]-(size[1]/2);
        if(minx < min[0]){
            min[0] = minx;
        }
        if(miny < min[1]){
            min[1] = miny;
        }
    }
    return min;
};

GameObjectSet.prototype._findMaxPoint = function(){
    var maxx = this.mSet[0].getXform().getPosition()[0] + (this.mSet[0].getXform().getWidth()/2);
    var maxy = this.mSet[0].getXform().getPosition()[1] + (this.mSet[0].getXform().getHeight()/2);
    var max = vec2.fromValues(maxx, maxy);
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        var objXform = this.mSet[i].getXform();
        var size = objXform.getSize();
        var pos = objXform.getPosition();
        maxx = pos[0]+(size[0]/2);
        maxy = pos[1]+(size[1]/2);
        if(maxx > max[0]){
            max[0] = maxx;
        }
        if(maxy > max[1]){
            max[1] = maxy;
        }
    }
    return max;
};

GameObjectSet.prototype.addToSet = function (obj) {
    this.mSet.push(obj);
    this._updateMoveSet();
};

GameObjectSet.prototype.removeFromSet = function (obj) {
    var index = this.mSet.indexOf(obj);
    if (index > -1)
        this.mSet.splice(index, 1);
};

GameObjectSet.prototype.update = function () {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
};

GameObjectSet.prototype._updateMoveSet = function (){
    var min = 0, max = 0, w = 0, h = 0;
    min = this._findMinPoint();
    max = this._findMaxPoint();
    w = max[0]-min[0];
    h = max[1]-min[1];
    this.mXform.setPosition(min[0]+(w/2), min[1]+(h/2));
    this.mXform.setSize(w,h);
    var gc = this.mXform.getPosition();
    this.posDif = [];
    this.sizeDif = [];
    for(var i = 0; i < this.mSet.length; i++){
        var objXform = this.mSet[i].getXform();
        var pos = objXform.getPosition();
        var xdif = gc[0] - pos[0];
        var ydif = gc[1] - pos[1];
        xdif = xdif/this.mXform.getWidth();
        ydif = ydif/this.mXform.getHeight();
        var pd = vec2.fromValues(xdif, ydif);
        this.posDif.push(pd);
        var wDif = objXform.getWidth()/this.mXform.getWidth();
        var hDif = objXform.getHeight()/this.mXform.getHeight();
        var sDif = vec2.fromValues(wDif, hDif);
        this.sizeDif.push(sDif);
    }
};

GameObjectSet.prototype.moveSet = function (){
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        var objXform = this.mSet[i].getXform();
        var objPos = this.posDif[i];
        var objSize = this.sizeDif[i];
        objXform.setXPos(this.mXform.getXPos() - this.mXform.getWidth() * objPos[0]);
        objXform.setYPos(this.mXform.getYPos() - this.mXform.getHeight() * objPos[1]);
        objXform.setWidth(this.mXform.getWidth() * objSize[0]);
        objXform.setHeight(this.mXform.getHeight() * objSize[1]);
    }
};

GameObjectSet.prototype.draw = function (aCamera) {
    
    if(this.mBB !== null && this.mBB.isVisible()){
        this.getBBox();
        this.mBB.draw(aCamera);
    }
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera);
    }
};

GameObjectSet.prototype.getMember = function(index){
    return this.mSet[index];
};