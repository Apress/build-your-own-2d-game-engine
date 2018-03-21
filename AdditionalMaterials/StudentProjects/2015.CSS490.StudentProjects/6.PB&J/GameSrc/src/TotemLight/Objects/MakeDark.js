"use strict";

function MakeDark() {
    this.mWaitDuration = 200;
    this.mNewDur = 200;
    this.mStateTimeClick = 0;
    this.isOn = false;
}
gEngine.Core.inheritPrototype(MakeDark, Minion);

MakeDark.prototype.update = function () {
    if (this.isOn) {
        gEngine.DefaultResources.setGlobalAmbientIntensity(0);
        if (this.mStateTimeClick === this.mWaitDuration) {
            gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
            this.isOn = false;
            this.mStateTimeClick = 0;
            this.mWaitDuration = this.mNewDur;
        }
        else {
            this.mStateTimeClick += 1;
        }
    }
};

MakeDark.prototype.activate = function () {
    this.isOn = true;
};

MakeDark.prototype.setDur = function (dur) {
    this.mNewDur = dur;
};


