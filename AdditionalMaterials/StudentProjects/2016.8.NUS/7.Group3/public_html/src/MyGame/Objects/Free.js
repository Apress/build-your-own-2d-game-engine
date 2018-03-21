/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global GameObject, gEngine, vec2 */

function Free(spriteTexture, normalMap, atX, atY) {
    
    this.kDeltaDegree = 1;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = 0.01;
    this.rate = 0.1;    /// graduate rate
    
    if(normalMap !== null) {
        this.mDye = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mDye = new LightRenderable(spriteTexture);
    }
    
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(6, 6);
    //this.mDye.setElementPixelPositions(0, 64, 0, 32);
    
    GameObject.call(this, this.mDye);

    this.setCurrentFrontDir([-1, 0]);
    this.setSpeed(0.05);
    this.count = 0;
}
gEngine.Core.inheritPrototype(Free, GameObject);

Free.prototype.update = function () {
    
    GameObject.prototype.update.call(this);  
    
    var xf = this.getXform();
    var fdir = this.getCurrentFrontDir();
    this.count +=1;
    if(this.count % 120 ===0){
        
        var a = 360 * Math.random();
       
        xf.incRotationByDegree(a*this.kDeltaDegree);
        vec2.rotate(fdir, fdir, a*this.kDeltaRad);

    }
   
};
