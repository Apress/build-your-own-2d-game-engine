"use strict";

function Branch() {
    //this.mParentTree = parentTree;
    
    this.mRenderable = new Renderable();
    //this.mRenderable.setColor([1, 1, 1, 1]);
    this.mRenderable.getXform().setSize(10, 10);
    this.mRenderable.setColor([0.7, 0.3, 0, 1]);
    //this.mSideOfTree = sideOfTree;
    
    GameObject.call(this, this.mRenderable);
    var r = new RigidRectangle(this.getXform(), 10, 10);
    r.setMass(0.0);
    this.setRigidBody(r);
}
gEngine.Core.inheritPrototype(Branch, GameObject);

//Branch.side = Object.freeze({
//    LEFT: 0,
//    RIGHT: 1
//});

Branch.prototype.setSize = function (w, h) {
    this.mRenderable.getXform().setSize(w, h);
    this.getRigidBody().setSize(w, h);
};

Branch.prototype.setPosition = function (x, y) {
    this.mRenderable.getXform().setPosition(x, y);
};

//Branch.prototype.autoSetPosition = function () {
//    var x, y;
//    console.log('Side of Tree ' + this.mSideOfTree);
//    if(this.mSideOfTree === Branch.side.RIGHT){
//        x = this.mParentTree.getXPos() + (this.mParentTree.getWidth());
//        y = Math.floor(Math.random() * 10) + 1;//Math.floor(Math.random() * ((this.mParentTree.getHeight()/2) + this.mParentTree.getYPos())) + ((this.mParentTree.getHeight()/2) - this.mParentTree.getYPos());
//    }
//    else{
//        x = this.mParentTree.getXPos() - (this.mParentTree.getWidth());
//        y = Math.floor(Math.random() * 10) + 1;//Math.floor(Math.random() * ((this.mParentTree.getHeight()/2) + this.mParentTree.getYPos())) + ((this.mParentTree.getHeight()/2) - this.mParentTree.getYPos());
//    }
//    
//    this.mRenderable.getXform().setPosition(x, y);
//    console.log(this.mRenderable.getXform().getPosition());
//};

Branch.prototype.setColor = function (colArray) {
    this.mRenderable.setColor([colArray[0], colArray[1], colArray[2], colArray[3]]);
};

//Branch.prototype.setSide = function(side){
//    if(side === Branch.side.LEFT){
//        this.mSideOfTree = Branch.side.LEFT;
//    }
//    else {
//        this.mSideOfTree = Branch.side.RIGHT;
//    }
//};