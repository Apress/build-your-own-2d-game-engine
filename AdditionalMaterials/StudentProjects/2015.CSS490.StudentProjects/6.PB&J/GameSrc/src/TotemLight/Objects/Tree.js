/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Tree(cx, cy, type, lightSet) {
    this.kWidth = 20;
    this.kHeight = 20;
    this.mLightSet = lightSet;
    
    switch(type) {
        case 0:
            this.kTree = "assets/TreeGreen.png";
            break;
        case 1:
            this.kTree = "assets/TreeYellow.png";
            break;
        case 2:
            this.kTree = "assets/TreeBlue.png";
            break;
        case 3:
            this.kTree = "assets/TreeSmallGreen.png";
            break;
        case 4:
            this.kTree = "assets/TreeSmallYellow.png";
            break;
        case 5:
            this.kTree = "assets/TreeSmallBlue.png";
            break;
    }
 
    this.mTree = new LightRenderable(this.kTree);
    this.mTree.getXform().setPosition(cx, cy);
    this.mTree.getXform().setSize(this.kWidth, this.kHeight);
    this.mTree.getXform().setZPos(2);
    
    var i;
    for (i = 2; i < lightSet.numLights(); i++) {
        this.mTree.addLight(lightSet.getLightAt(i));
    }
    
    GameObject.call(this, this.mTree);

}

gEngine.Core.inheritPrototype(Tree, GameObject);