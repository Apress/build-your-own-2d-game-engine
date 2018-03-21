/* File: GameObjectSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function BoulderSet(hero) {
    GameObjectSet.call(this);
    this.mWaitDuration = 100;
    this.mHealthPoints = 100;
    this.mCurrentState = BoulderSet.eBoulderSetState.eWait;
    this.mStateTimeClick = 0;

    this.mSet.push(new Boulder(216.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(218.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(220.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(222.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(224.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(226.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(228.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(230.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(232.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(234.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(236.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(238.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(240.5, 17, .2, .2, hero));
    this.mSet.push(new Boulder(242.5, 17, .2, .2, hero));
}
gEngine.Core.inheritPrototype(BoulderSet, GameObjectSet);

BoulderSet.eBoulderSetState = Object.freeze({
    eWait: 0,
    eEnableBoulders: 1
});

BoulderSet.prototype.update = function () {
    switch (this.mCurrentState) {
        case BoulderSet.eBoulderSetState.eWait:
            this._wait();
            break;
        case BoulderSet.eBoulderSetState.eEnableBoulders:
            this._activateBoulders();
            break;
    }

    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
};

BoulderSet.prototype._activateBoulders = function () {

    if (this.mStateTimeClick === this.mWaitDuration) {
        this.mStateTimeClick = 0;
        this.mCurrentState = BoulderSet.eBoulderSetState.eWait;
        this.isOn = false;
    }
    else {
        if (this.mHealthPoints <= 100 && this.mHealthPoints > 75) {
            if (this.mStateTimeClick % (this.mWaitDuration / 5) === 0) {
                this.activateBoulder(1);
            }
        }
        else if (this.mHealthPoints <= 75 && this.mHealthPoints > 50) {
            if (this.mStateTimeClick % (this.mWaitDuration / 5) === 0) {
                this.activateBoulder(1);
            }
        }
        else if (this.mHealthPoints <= 50 && this.mHealthPoints > 25) {
            if (this.mStateTimeClick % (this.mWaitDuration / 5) === 0) {
                this.activateBoulder(2);
            }
        }
        else if (this.mHealthPoints <= 25 && this.mHealthPoints > 0) {
            if (this.mStateTimeClick % (this.mWaitDuration / 5) === 0) {
                this.activateBoulder(3);
            }
        }
    }
    this.mStateTimeClick += 1;
};

BoulderSet.prototype.setWaitDur = function (dur) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].setWaitDur(dur);
    }
};

BoulderSet.prototype.initActivateBeams = function () {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].activate();
    }
};

BoulderSet.prototype._wait = function () {
    if (this.isOn) {
        this.mCurrentState = BoulderSet.eBoulderSetState.eEnableBoulders;
    }
};

BoulderSet.prototype.activate = function () {
    this.isOn = true;
};

BoulderSet.prototype.activateBoulder = function (num) {
    var i;
    var random;
    for (i = 0; i < num; i++) {
        random = Math.floor(Math.random() * this.mSet.length);
        this.mSet[random].activate();
    }
};

BoulderSet.prototype.setHitPoints = function(hp) {
    this.mHealthPoints = hp;
};