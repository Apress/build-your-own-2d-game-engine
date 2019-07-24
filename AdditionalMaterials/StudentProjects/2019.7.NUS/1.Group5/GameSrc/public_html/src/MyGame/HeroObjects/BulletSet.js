/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

function BulletSet(spriteTexture, pos) {
    this.kGunSound = "assets/Sound/gun.mp3";
    this.kTex = spriteTexture;
    this.kPos = pos;

    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(BulletSet, GameObjectSet);

BulletSet.prototype.addABullet = function (dir) {
    this.addToSet(new Bullet(this.kTex, this.kPos[0] + dir * 17, this.kPos[1], dir));
};

BulletSet.prototype.deleteBullet = function (index) {
    this.mSet.splice(index, 1);
};

BulletSet.prototype.clean = function () {
    this.mSet = [];
}

BulletSet.prototype.update = function (dir, canCtrl, mirror) {
    GameObjectSet.prototype.update.call(this);
    for (var i = 0; i < this.size(); i++) {
        if (this.getObjectAt(i).mIsDead) {
            this.deleteBullet(i);
            i--;
        }
    }
    if (canCtrl) {
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
            if (this.size() < 5) {
                if (mirror > 0) gEngine.AudioClips.playACue(this.kGunSound, 26);
                this.addABullet(dir);
            }
        }
    }
};