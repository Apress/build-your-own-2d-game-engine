/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function SecondTrap(TrapArea, Hero, MirrorHero, Platforms, Stabs, BrokenPlat, noCols) {
    this.kGetSound = "assets/Sound/get.mp3";
    this.kPaperSound = "assets/Sound/paper.mp3";

    this.mTrap = TrapArea;
    this.mHero = Hero;
    this.mMirrorHero = MirrorHero;
    this.mPlatforms = Platforms;
    this.mStabs = Stabs;
    this.mNoCols = noCols;
    this.mBrokenPlat = BrokenPlat;
    this.mBp = 0;
    this.mCollect1 = false;
    this.mCollect2 = false;
    this.mTime = false;
    this.mTimer = 0;
    this.mHasShownPaper = false;

    this.mTriggerOn = [];
}

SecondTrap.prototype.isTrigger = function () {
    var num = this.mTrap.size();
    var i;

    for (i = 0; i < num; i++) {
        this.mTriggerOn[i] = false;

        var tt = this.mTrap.getObjectAt(i);
        var hBox = this.mHero.getBBox();
        var mhBox = this.mMirrorHero.getBBox();
        var tBox = tt.getBBox();
        var status1 = hBox.boundCollideStatus(tBox);
        var status2 = mhBox.boundCollideStatus(tBox);
        var status = status1 | status2;
        if (status) {
            this.mTriggerOn[i] = true;
        }
    }
};

SecondTrap.prototype.trapProcess = function () {
    var rate = gEngine.Mine.saveStatus.tribleJump ? 0.6 : 1;

    for (var num = 0; num < this.mTrap.size(); num++) {
        if (this.mTriggerOn[num]) {
            switch (num)
            {
                case 0:
                    if (this.mNoCols[1] && !this.mHasShownPaper) {
                        this.mNoCols[1].setVisibility(true);
                        this.mPlatforms.getObjectAt(22).setVisibility(false);
                        gEngine.AudioClips.playACue(this.kPaperSound, 30);
                    }
                    this.mHasShownPaper = true;

                    if (this.mBp === 0) {
                        this.mBrokenPlat.getObjectAt(3).setVisibility(true);
                        this.mBp += 1;
                    }

                    break;
                case 1:
                    this.mNoCols[0].push();
                    this.mHero.setMirror(-1);
                    this.mMirrorHero.setMirror(1);
                    break;
                case 2:
                    this.mStabs.getObjectAt(4).moveRight(300 * rate);
                    break;
                case 3:
                    if (!this.mCollect1) {
                        this.mPlatforms.getObjectAt(19).setVisibility(false);
                        this.mCollect1 = true;
                        gEngine.AudioClips.playACue(this.kGetSound, 27);
                    }
                    break;
                case 4:
                    if (!this.mCollect2) {
                        this.mPlatforms.getObjectAt(20).setVisibility(false);
                        this.mCollect2 = true;
                        gEngine.AudioClips.playACue(this.kGetSound, 27);
                    }
                    break;
                case 5:
                    this.mStabs.getObjectAt(7).moveUp(330 * rate);
                    break;
                case 6:
                    this.mStabs.getObjectAt(0).setVisibility(true);
                    break;
                default:
                    return;
            }
        }
    }
};

SecondTrap.prototype.update = function () {
    this.isTrigger();
    this.trapProcess();
    if (this.mTriggerOn[1]) {
        this.mTime = true;
    }
    if (this.mTime === true) {
        this.mTimer += 1;
    }
    //console.log("mTimer: " + this.mTimer);
    var rate = gEngine.Mine.saveStatus.tribleJump ? 0.8 : 1;
    if (this.mTimer === Math.floor(80 / rate)) {
        this.mPlatforms.getObjectAt(18).setVisibility(true);
        var mhx = this.mMirrorHero.getXform().getPosition()[0];
        if (this.mMirrorHero.pixelTouches(this.mPlatforms.getObjectAt(18), [])) {
            if (mhx >= -405 && mhx <= -379.4)
                this.mMirrorHero.getXform().setXPos(-379.4);
            if (mhx <= -405 && mhx >= -430.6)
                this.mMirrorHero.getXform().setXPos(-430.6);
        }
    }

    if (this.mNoCols[1] && gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        this.mNoCols[1].setVisibility(false);
    }

    if (this.mCollect1 && this.mCollect2) {
        //console.log(this.mButtonCount);
        this.mPlatforms.getObjectAt(12).setVisibility(false);
        this.mPlatforms.getObjectAt(13).setVisibility(false);
        this.mHero.setVisibility(false);
    }
};
