"use strict";

function Tree() {
    // Sprite Stuff
    this.mTrunk = new Renderable();
    this.mTrunk.setColor([0.5, 0.2, 0, 1]);
    this.mTrunk.getXform().setPosition(0, 40);
    this.mTrunk.getXform().setSize(5, 25);
    GameObject.call(this, this.mTrunk);
    
    this.mBranches = [];
}
gEngine.Core.inheritPrototype(Tree, GameObject);

Tree.prototype.setPosition = function (x, y) {
    this.mTrunk.getXform().setPosition(x, y);
};

Tree.prototype.setTrunkSize = function (w, h) {
    this.mTrunk.getXform().setSize(w, h);
};

Tree.prototype.setBranchSize = function (w, h) {
    
};

//Tree.prototype.generateBranches = function(){
//    var numBranches = Math.floor(Math.random() * 4) + 1;
//    var side = 0;
//    console.log('NumBranches ' + numBranches);
//    for(var i = 0; i < numBranches; i++){
//        side = Math.floor(Math.random() * 2);
//        var newBranch = new Branch(this, side);
//        newBranch.setSize(25, 4);
//        newBranch.autoSetPosition();
//        this.mBranches.push(newBranch);
//    }
//};

Tree.prototype.getBranches = function() {
    return this.mBranches;
};

Tree.prototype.addBranch = function(branch) {
    this.mBranches.push(branch);
};

Tree.prototype.getWidth = function() {
    return this.mTrunk.getXform().getWidth();
};

Tree.prototype.getHeight = function() {
    return this.mTrunk.getXform().getHeight();
};

Tree.prototype.getXPos = function() {
    return this.mTrunk.getXform().getXPos();
};

Tree.prototype.getYPos = function() {
    return this.mTrunk.getXform().getYPos();
};

Tree.prototype.getNumBranches = function() {
    return this.mBranches.length;
};

