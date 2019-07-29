/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
 
 /* global gEngine */

function BossTrap(TrapArea, Hero, Platforms, Stabs, Sentence, Boss, Seed, noCols) {
    this.kPaperSound = "assets/Sound/paper.mp3";
    
    this.mTrap = TrapArea;
    this.mHero = Hero;
    this.mPlatforms = Platforms;
    this.mNoCols = noCols;
    this.mStabs = Stabs;
    this.mWhere = -1;
    this.mWalk = false;
    this.mHasWalked = false;
    this.mHasShownPaper = false;

    this.mEnterCount = 0;
    this.mSenSet = Sentence; //台词集合
    this.mSenStart = false;
    this.mSenEnd = false;

    this.mBoss = Boss;
    this.mSeed = Seed;
}

BossTrap.prototype.isTrigger = function () {
    var num = this.mTrap.size();
    var i;

    for (i = 0; i < num; i++) {
        var tt = this.mTrap.getObjectAt(i);
        var hBox = this.mHero.getBBox();
        var tBox = tt.getBBox();
        var status = hBox.boundCollideStatus(tBox);
        if (status) {
            this.mWhere = i;
        }
    }
};

BossTrap.prototype.trapProcess = function (num) {
    switch (num)
    {
        case 0:
            if (this.mNoCols[0] && !this.mHasShownPaper) {
                this.mNoCols[0].setVisibility(true);
                this.mNoCols[1].setVisibility(false);
                gEngine.AudioClips.playACue(this.kPaperSound, 30);

                this.mHero.mVP.setXV(0);
                this.mHero.setControl(false);
            }
            this.mHasShownPaper = true;
            break;
        default:
            return;
    }
};

BossTrap.prototype.sentenceProcess = function () {
    var num = this.mSenSet.size();
    var i;
    for (i = 0; i < num; i++) {
        this.mSenSet.getObjectAt(i).setVisibility(false);
    }

    if (this.mEnterCount >= 0 && this.mEnterCount < num) {
        this.mSenSet.getObjectAt(this.mEnterCount).setVisibility(true);
    } else {
        this.mSenStart = false;
    }
};

BossTrap.prototype.update = function () {
    this.mWhere = -1;
    this.isTrigger();
    //console.log(this.mWhere);
    if (this.mWhere !== -1) {
        this.trapProcess(this.mWhere);
    }

    if (this.mNoCols[0] !== null) {
        if (this.mHasShownPaper && !this.mHasWalked && gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
            this.mNoCols[0].setVisibility(false);
            this.mWalk = true;
            this.mHasWalked = true;
            this.mHero.mVP.setXV(200);
            this.mHero.mFacing = 1;
        }
        if (this.mWalk && this.mHero.getXform().getXPos() > 190) {
            this.mHero.mVP.setXV(0);
            this.mSenStart = true;
            this.mWalk = false;
        }
        if (this.mSenStart && gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
            this.mEnterCount += 1;
        }

        if (this.mEnterCount === 3) {
            this.mBoss.setVisibility(true);
            this.mSeed.setVisibility(false);
        }//当主角台词说完后boss出现，种子消失
        if (this.mEnterCount === 11 && !this.mSenEnd) {
            this.mBoss.mUIbar.setVisible(true);
            this.mBoss.setMoveTo(350, 80);
            this.mBoss.mMoveStatus = 0;
            this.mHero.setControl(true);
            this.mSenEnd = true;
        }//当boss台词说完后，开始移动

        if (this.mSenStart) {
            this.sentenceProcess();
        }
    }
};
