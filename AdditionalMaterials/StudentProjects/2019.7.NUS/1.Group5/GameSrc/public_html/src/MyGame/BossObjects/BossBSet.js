/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

function BossBSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(BossBSet, GameObjectSet);

BossBSet.prototype.deleteBullet = function (index) {
    this.mSet.splice(index, 1);
};

BossBSet.prototype.update = function (aCamera) {
    for (var i = 0; i < this.size(); i++) {
        this.getObjectAt(i).update(aCamera);
    }
    for (var i = 0; i < this.size(); i++) {
        if (this.getObjectAt(i).mIsDead) {
            this.deleteBullet(i);
            i--;
        }
    }
};