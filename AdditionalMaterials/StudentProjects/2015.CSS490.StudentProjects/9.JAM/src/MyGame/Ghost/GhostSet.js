/* File: DyePack.js
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function WaitNode(numTicks, enemy) {
    this.mNumTicks = numTicks;
    this.mEnemy = enemy;
}

function GhostSet(liveSprite, deadSprite) {
    GameObjectSet.call(this);

    this.kSpriteSheet = liveSprite;
    this.kDeadSprite = deadSprite;  // Use sprite sheet later

    this.mWaitQueue = [];
    this.mCurrentTick = 0;
}
gEngine.Core.inheritPrototype(GhostSet, GameObjectSet);


GhostSet.prototype.update = function(hero, aCamera) {
    var x, y, d;
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        x = aCamera.mouseWCX();
        y = aCamera.mouseWCY();
        d = new Ghost(this.kSpriteSheet, this.kDeadSprite, x, y);
        this.addToSet(d);
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        var c = aCamera.getWCCenter();
        var h = aCamera.getWCHeight();
        var y = c[1];
        if (Math.random() > 0.5) {
            y += h/2 * Math.random();
        } else {
            y -= h/2 * Math.random();
        }
        this.spawnGhosts(5, 0, y); // x is currently unused
    }

    // remove the expired ones
    var i, obj;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired())
            this.removeFromSet(obj);
    }

    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        obj.update(hero, aCamera);
    }
    this.updateWait(aCamera);
    this.mCurrentTick++;
    if (this.mCurrentTick > 720) {
        //alert("inside if");
        this.mCurrentTick = 0;
        var c = aCamera.getWCCenter();
        var h = aCamera.getWCHeight();
        var rand = Math.random();
        var y = c[1] + (h - 7*2) * (0.5 - rand);
        this.spawnGhosts(5, 0, y); // x is currently unused
    }
};

GhostSet.prototype.spawnGhosts = function (numGhosts, atX, atY) {
    /* spawn numGhosts width + padding apart,
      at position x y
       */
    var i;
    for (i = 0; i < numGhosts; i++) {
        var ghost = new Ghost(this.kSpriteSheet, this.kDeadSprite, atX, atY);
        this.addToWait(60 * i, ghost);
    }
};

GhostSet.prototype.addToWait = function (numTicks, enemy) {
    this.mWaitQueue.push(new WaitNode(numTicks, enemy))
};

GhostSet.prototype.updateWait = function (aCamera) {
    // do nothing if empty queue
    var i;
    for (i = this.mWaitQueue.length - 1; i >= 0; i--) {
        // decrement counter
        this.mWaitQueue[i].mNumTicks--;
        // if timer up move to update queue
        if (this.mWaitQueue[i].mNumTicks < 0) {
            var c = aCamera.getWCCenter();
            var w = aCamera.getWCWidth();
            var enemy = this.mWaitQueue[i].mEnemy;
            enemy.getXform().setXPos(c[0] + w/2);
            this.addToSet(enemy);
            this.mWaitQueue.splice(i, 1);
        }
    }
};