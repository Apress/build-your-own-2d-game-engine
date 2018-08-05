/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global GameObject, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

GameObject.prototype.setBoundRadius = function (r) {
    this.mBoundRadius = r;
};

GameObject.prototype.getBoundRadius = function() {
    return this.mBoundRadius;
};

GameObject.prototype.incBoundRadius = function (r) {
    this.mBoundRadius += r;
};

GameObject.prototype.boundTest = function (otherShape) {
    var vFrom1to2 = [0, 0];
    vec2.subtract(vFrom1to2, otherShape.getXform().getPosition(), this.getXform().getPosition());
    var rSum = this.mBoundRadius + otherShape.mBoundRadius - 10;
    var dist = vec2.length(vFrom1to2);
    //console.log(rSum);
    //console.log(dist);
    if (dist > rSum) {
        //not overlapping
        return false;
    }
    return true;
};

GameObject.prototype.drawBox = function(aCamera) {
   
    var len = this.mBoundRadius * 0.5;
    //calculation for the X at the center of the shape
    var x = this.getXform().getXPos();
    var y = this.getXform().getYPos();
    
    this.mLine = new LineRenderable();
    
    this.mLine.setColor([1, 1, 1, 1]);
    this.mLine.setFirstVertex(x - len, y);  //Horizontal
    this.mLine.setSecondVertex(x + len, y); //
    this.mLine.draw(aCamera);
    
    this.mLine.setFirstVertex(x, y + len);  //Vertical
    this.mLine.setSecondVertex(x, y - len); //
    this.mLine.draw(aCamera);
};