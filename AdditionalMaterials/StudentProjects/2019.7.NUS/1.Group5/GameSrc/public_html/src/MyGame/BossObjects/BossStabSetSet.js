/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

function BossStabSetSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(BossStabSetSet, GameObjectSet);

BossStabSetSet.prototype.deleteBullet = function (index) {
    this.mSet.splice(index, 1);
};

BossStabSetSet.prototype.update = function (aCamera) {
    for (var i = 0; i < this.size(); i++) {
        this.getObjectAt(i).update();
    }
    
    for (var i = 0; i < this.size(); i++) {
        var status = aCamera.collideWCBound(this.getObjectAt(i).getObjectAt(0).getXform(), 1);
        if (status === 0) {
            this.deleteBullet(i);
            i--;
        }
    }
    
};