/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function FirstTrap(TrapArea, Hero, Platforms, Stabs, noCols) {
    this.kGetSound = "assets/Sound/get.mp3";
    this.kPaperSound = "assets/Sound/paper.mp3";
    
    this.mTrap = TrapArea;
    this.mHero = Hero;
    this.mPlatforms = Platforms;
    this.mStabs = Stabs;
    this.mNoCols = noCols;
    this.mWhere = -1;
    this.mTime = false;
    this.mTimer = 0;
    this.mHasShownPaper = false;
}

FirstTrap.prototype.isTrigger = function () {
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

FirstTrap.prototype.trapProcess = function (num) {
    var rate = gEngine.Mine.saveStatus.tribleJump ? 0.6 : 1;
    switch (num)
    {
        case 0:
            this.mPlatforms.getObjectAt(8).moveUp(90 * rate);
            this.mStabs.getObjectAt(8).setVisibility(true);
            break;
        case 1:
            this.mPlatforms.getObjectAt(5).disappear();
            this.mNoCols[0].push();
            break;
        case 2:
            this.mStabs.getObjectAt(2).setVisibility(true);
            break;
        case 3:
            this.mStabs.getObjectAt(1).setVisibility(true);
            break;
        case 4:
            this.mStabs.getObjectAt(3).getObjectAt(4).moveDown(300 * rate);
            break;
        case 5:
            this.mStabs.getObjectAt(7).moveLeft(240 * rate, 470);
            break;
        case 6:
            if (this.mNoCols[1] && !this.mHasShownPaper) {
                this.mNoCols[1].setVisibility(true);
                this.mPlatforms.getObjectAt(12).setVisibility(false);
                gEngine.AudioClips.playACue(this.kPaperSound, 30);
            }
            this.mHasShownPaper = true;
            break;
        default:
            return;
    }
};

FirstTrap.prototype.update = function () {
    this.mWhere = -1;
    this.isTrigger();
    //console.log(this.mWhere);

    if (this.mWhere !== -1) {
        this.trapProcess(this.mWhere);
    }
    if (this.mWhere === 1) {
        this.mTime = true;
    }
    if (this.mTime === true) {
        this.mTimer += 1;
    }
    var rate = gEngine.Mine.saveStatus.tribleJump ? 0.8 : 1;
    if (this.mTimer === Math.floor(80 / rate)) {
        this.mStabs.getObjectAt(4).setVisibility(true);
    }
    if (this.mNoCols[1] && gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        this.mNoCols[1].setVisibility(false);
    }
    
    if (this.mNoCols[2].isVisible()) {
        if (this.mHero.pixelTouches(this.mNoCols[2], [])) {
            gEngine.AudioClips.playACue(this.kGetSound, 27);
            
            this.mNoCols[2].setVisibility(false);
            this.mStabs.getObjectAt(9).setTouchable();
        }
    }
};
