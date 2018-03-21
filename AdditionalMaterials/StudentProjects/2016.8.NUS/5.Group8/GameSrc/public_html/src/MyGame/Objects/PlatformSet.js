/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PlatformSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(PlatformSet, GameObjectSet);

//在平台集中新建平台
PlatformSet.prototype.newAt = function(spriteTexture, x, y ,width, height) {
    var p = new Platform(spriteTexture, x, y ,width, height);
    this.addToSet(p);
};

PlatformSet.prototype.draw=function(aCamera){
    var i,obj;
     for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        obj.Draw(aCamera);
    }
};
