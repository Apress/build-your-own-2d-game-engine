/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Beam(x1, y1, x2, y2, direction, hero) {
    this.isOn = false;
    this.mHero = hero;
    this.PosLeft = [x1, y1];
    this.PosRight = [x2, y2];
    this.mDir = direction;
    this.mWaitDuration = 500;
    this.kLaserSound = "assets/Sounds/Laser_Shoot.wav";

    this.mCurrentState = Beam.eBeamState.eWait;
    this.mStateTimeClick = 0;

    this.mBeam = new LightRenderable("assets/HealthBar.png");
    this.mLeft = new LightRenderable("assets/HealthBar.png");
    this.mRight = new LightRenderable("assets/HealthBar.png");
    this.mTimeBeamLeft = new LightRenderable("assets/HealthBar.png");
    this.mTimeBeamRight = new LightRenderable("assets/HealthBar.png");
    this.prevBeamAlpha = 0;

    this.mBeam.setColor([1, 0, 0, 1]);
    this.mTimeBeamLeft.setColor([1, 0, 0, 1]);
    this.mTimeBeamRight.setColor([1, 0, 0, 1]);
    this.mLeft.setColor([1, 0, 0, 0]);
    this.mRight.setColor([1, 0, 0, 0]);

    this.mBeam.getXform().setPosition(0, 100);
    this.mTimeBeamLeft.getXform().setPosition(x1, y1);
    this.mTimeBeamRight.getXform().setPosition(x2, y2);
    this.mLeft.getXform().setPosition(x1, y1);
    this.mRight.getXform().setPosition(x2, y2);

    if (direction === 0) {
        this.mBeam.getXform().setSize(28.8, 5.8);
        this.mTimeBeamLeft.getXform().setSize(0.3, 0);
        this.mTimeBeamRight.getXform().setSize(0.3, 0);
        this.mLeft.getXform().setSize(0.3, 5.8);
        this.mRight.getXform().setSize(0.3, 5.8);
    }
    else {
        this.mBeam.getXform().setSize(5.8, 28.8);
        this.mTimeBeamLeft.getXform().setSize(0, 0.3);
        this.mTimeBeamRight.getXform().setSize(0, 0.3);
        this.mLeft.getXform().setSize(5.8, 0.3);
        this.mRight.getXform().setSize(5.8, 0.3);
    }
}
gEngine.Core.inheritPrototype(Beam, GameObject);

Beam.eBeamState = Object.freeze({
    eStartBeam: 0,
    eShootBeam: 1,
    eWait: 2
});

Beam.prototype.update = function () {
    switch (this.mCurrentState) {
        case Beam.eBeamState.eStartBeam:
            this._startBeam();
            break;
        case Beam.eBeamState.eShootBeam:
            this._shootBeam();
            break;
        case Beam.eBeamState.eWait:
            this._wait();
            break;
    }
};

Beam.prototype.draw = function (aCamera) {
    //GameObject.prototype.draw.call(this, aCamera);
    if (this.isOn) {
        this.mBeam.draw(aCamera);
        this.mLeft.draw(aCamera);
        this.mRight.draw(aCamera);
        this.mTimeBeamLeft.draw(aCamera);
        this.mTimeBeamRight.draw(aCamera);
    }
    //gEngine.AudioClips.playBackgroundAudio(this.kLaserMusic);
};

Beam.prototype._wait = function () {
    if (this.isOn) {
        this.mCurrentState = Beam.eBeamState.eStartBeam;
    }
};

Beam.prototype._startBeam = function () {
    if (this.mStateTimeClick === this.mWaitDuration) {
        this.mStateTimeClick = 0;
        this.mCurrentState = Beam.eBeamState.eShootBeam;

        var x = (this.PosRight[0] + this.PosLeft[0]) / 2;
        var y = (this.PosRight[1] + this.PosLeft[1]) / 2;

        this.mBeam.getXform().setPosition(x, y);
    }
    else {
        this.mStateTimeClick += 1;
        var incAlpha = 1 / this.mWaitDuration;
        this.mLeft.incColor(0, 0, 0, incAlpha);
        this.mRight.incColor(0, 0, 0, incAlpha);
        this.mPrevBeamAlpha += incAlpha;

        var timeSize = 5.8 / this.mWaitDuration;
        if (this.mDir === 1) {
            if(!(this.mTimeBeamLeft.getXform().getWidth() > 5.8)) {
            this.mTimeBeamLeft.getXform().incWidthBy(timeSize);
            this.mTimeBeamRight.getXform().incWidthBy(timeSize);
        }
        }
        else {
            if(!(this.mTimeBeamLeft.getXform().getHeight() > 5.8)) {
            this.mTimeBeamLeft.getXform().incHeightBy(timeSize);
            this.mTimeBeamRight.getXform().incHeightBy(timeSize);
        }
        }

        if (this.mStateTimeClick % 2) {
            this.mLeft.setColor([1, 1, 1, this.mPrevBeamAlpha]);
            this.mRight.setColor([1, 1, 1, this.mPrevBeamAlpha]);
        }
        else {
            this.mLeft.setColor([1, 0, 0, this.mPrevBeamAlpha]);
            this.mRight.setColor([1, 0, 0, this.mPrevBeamAlpha]);
        }

    }
};

Beam.prototype._shootBeam = function () {
    gEngine.AudioClips.playACue(this.kLaserSound);
    if (this.mStateTimeClick === 10) {
        //gEngine.AudioClips.stopBackgroundAudio(this.kLaserSound);
        this.mStateTimeClick = 0;
        this.mCurrentState = Beam.eBeamState.eWait;
        this.heroHit();
        this.mLeft.setColor([1, 0, 0, 0]);
        this.mRight.setColor([1, 0, 0, 0]);
        this.isOn = false;
        this.mBeam.getXform().setPosition(0, 100);
        if (this.mDir === 1) {
            this.mTimeBeamLeft.getXform().setWidth(0);
            this.mTimeBeamRight.getXform().setWidth(0);
        }
        else {
            this.mTimeBeamLeft.getXform().setHeight(0);
            this.mTimeBeamRight.getXform().setHeight(0);
        }

        this.mPrevBeamAlpha = 0;
    }
    else {
        this.mStateTimeClick += 1;
    }
};

Beam.prototype.activate = function () {
    this.isOn = true;
};

Beam.prototype.heroHit = function () {
    var heroX = this.mHero.getXform().getXPos();
    var heroY = this.mHero.getXform().getYPos();
 
    if (this.mDir === 0) {
        if (heroX > this.PosLeft[0] && heroX < this.PosRight[0] &&
                heroY > this.PosLeft[1] - 2.9 && heroY < this.PosRight[1] + 2.9) {
            this.mHero.hitTaken(0);
        }
    } else {
        if (heroX > this.PosLeft[0] - 2.9 && heroX < this.PosRight[0] + 2.9 &&
                heroY > this.PosRight[1] && heroY < this.PosLeft[1]) {
            this.mHero.hitTaken(0);
        }
    }

};

Beam.prototype.setWaitDur = function (waitDur) {
    this.mWaitDuration = waitDur;
};