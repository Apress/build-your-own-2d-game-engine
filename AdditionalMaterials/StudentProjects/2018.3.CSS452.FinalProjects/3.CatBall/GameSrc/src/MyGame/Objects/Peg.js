/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Peg(texture, x, y, r) {
    
    this.aPeg = new TextureRenderable(texture)
    
    //this.aPeg.setColor([1, 1, 1, 0]);
    this.aPeg.setColor([1, 1, 1, 1]);
    this.aPeg.getXform().setPosition(x, y);
    this.aPeg.getXform().setSize(r * 2.2, r * 2.2);
    
    // need to adjust this when the drawing is made
    //this.aPeg.setElementPixelPositions(0, 256, 0, 128);
    //this.mGameObject = new GameObject(this.mDye);
    GameObject.call(this, this.aPeg);
    
    // 0 = neutral, 1 = red, 2 = blue
    this.color = 0;
    
    
    /*
    //this.initializePhysicsObjects();
    this.physicsObjects = [
        this.leftBar = new Bar(this, true),
        this.rightBar = new Bar(this, false)
    ]
    */
   
    var r = new RigidCircle(this.getXform(), r);
    r.setMass(0);
    //r.setRestitution(0.9);
    //r.setInertia(0.9);
    //r.setFriction(0.5);a
    this.setRigidBody(r);
    
    //this.toggleDrawRigidShape();
    
}
gEngine.Core.inheritPrototype(Peg, GameObject);

Peg.prototype.reset = function(){
    this.color = 0;
    this.processHit();
}

Peg.prototype.update = function (ball1, ball2) {
    
    //console.log(this);
    //console.log(this.getBBox());
    var bound = this.getBBox();
    if(this.color != 1){
        if (bound.intersectsBound(ball1.getBBox()) != 0) {
            if (this.pixelTouches(ball1, vec2.fromValues(0, 0))) {
                //console.log("true");
                this.color = 1;
                this.processHit();
            }
        }
    }
    
    
    if(this.color != 2){
        if (bound.intersectsBound(ball2.getBBox()) != 0) {
            if (this.pixelTouches(ball2, vec2.fromValues(0, 0))) {
                this.color = 2;
                this.processHit();
            }
        }
    }
    
    
};

Peg.prototype.processHit = function(){
    //console.log("yes");
    /*
    // assuming that all three basket colors will be on the same image and spaced apart
    if (this.color == 0) {
        this.aPeg.setElementPixelPositions(0, 256, 0, 64);
        //this.aPeg.setColor([1, 1, 1, 0]);
    } else 
    */
    
    if (this.color == 1) {
        //this.aPeg.setElementPixelPositions(256, 256 * 2, 0, 128);
        this.aPeg.setColor([1, 0, 0, 1]);
    } else if (this.color == 2) {
        //this.aPeg.setElementPixelPositions(256 * 2, 256 * 3, 0, 128);
        this.aPeg.setColor([0, 0, 1, 1]);
    } else if(this.color == 0){
        //console.log("yes");
        this.aPeg.setColor([1, 1, 1, 1]);
    }
}

Peg.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this, aCamera);
}
