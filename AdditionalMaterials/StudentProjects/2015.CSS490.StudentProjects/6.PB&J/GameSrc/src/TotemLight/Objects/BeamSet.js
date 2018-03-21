/* File: GameObjectSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function BeamSet(hero) {
    GameObjectSet.call(this);
    this.mWaitDuration = 100;
    this.mHealthPoints = 76;
    this.mBeamRepeat = 0;
    this.mStateTimeClick = 0;
    this.mCurrentState = BeamSet.eBeamSetState.eWait;
    this.isOn = false;

    this.mSet.push(new Beam(215.7, 2.8, 244.3, 2.8, 0, hero));
    this.mSet.push(new Beam(215.7, 8, 244.3, 8, 0, hero));
    this.mSet.push(new Beam(215.7, 13.8, 244.3, 13.8, 0, hero));
    this.mSet.push(new Beam(218, 15.2, 218, .55, 1, hero));
    this.mSet.push(new Beam(226, 15.2, 226, .55, 1, hero));
    this.mSet.push(new Beam(234, 15.2, 234, .55, 1, hero));
    this.mSet.push(new Beam(242, 15.2, 242, .55, 1, hero));

    this.mAntiBug = 0;
}
gEngine.Core.inheritPrototype(BeamSet, GameObjectSet);

BeamSet.eBeamSetState = Object.freeze({
    eWait: 0,
    eEnableBeam: 1
});

BeamSet.prototype.update = function () {
    switch (this.mCurrentState) {
        case BeamSet.eBeamSetState.eWait:
            this._wait();
            break;
        case BeamSet.eBeamSetState.eEnableBeams:
            this._enableBeam();
            break;
    }
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
};

BeamSet.prototype.activateBeams = function (numBeams) {
    var i;
    var random;
    for (i = 0; i < numBeams; i++) {
        random = Math.floor(Math.random() * 7);
        this.mSet[random].activate();
    }
};

BeamSet.prototype.setWaitDur = function (dur) {
    this.mWaitDuration = dur;
};

BeamSet.prototype._enableBeam = function () {
    this.mCurrentState = BeamSet.eBeamSetState.eWait;
            this.mStateTimeClick = 0;
            this.isOn = false;
            
    if (this.mStateTimeClick === this.mWaitDuration * 4) {
        if (this.mAntiBug === 5.8 / this.mWaitDuration) {
            var i;
            for (i = 0; i < this.mSet.length; i++) {
                this.mSet[i].setWaitDur(this.mWaitDuration);
            }
        }
        this.mAntiBug += 1;
    }
    else {
        if (this.mStateTimeClick % this.mWaitDuration === 0) {
            if (this.mHealthPoints <= 100 && this.mHealthPoints > 75) {
                this.activateBeams(1);
            }
            else if (this.mHealthPoints <= 75 && this.mHealthPoints > 50) {
                this.activateBeams(1);
            }
            else if (this.mHealthPoints <= 50 && this.mHealthPoints > 25) {
                this.activateBeams(2);
            }
            else if (this.mHealthPoints <= 25 && this.mHealthPoints > 0) {
                this.activateBeams(2);
            }
        }
        this.mStateTimeClick += 1;
    }
};

BeamSet.prototype._wait = function () {
    if (this.isOn) {
        this.mCurrentState = BeamSet.eBeamSetState.eEnableBeams;
    }
};

BeamSet.prototype.initActivateBeams = function () {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].activate();
    }
};

BeamSet.prototype.activate = function () {
    this.isOn = true;
};

BeamSet.prototype.setHitPoints = function (hp) {
    this.mHealthPoints = hp;
};