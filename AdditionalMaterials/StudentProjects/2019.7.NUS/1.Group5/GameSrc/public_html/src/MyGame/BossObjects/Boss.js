/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine */

function Boss(texture, bulletTex, stabTex, atX, atY, w, h, heroPos) {
    this.kHitSound = "assets/Sound/hit.mp3";
    //this.kEndBGM = "assets/Sound/endBGM.mp3";
    
    this.kBTex = bulletTex;
    this.kSTex = stabTex;
    this.kHPos = heroPos;
    
    this.mBoss = new SpriteRenderable(texture);
    this.mBoss.setColor([1, 1, 1, 0]);
    this.mBoss.getXform().setPosition(atX, atY);
    this.mBoss.getXform().setSize(w, h);
    this.mBoss.setElementPixelPositions(0, 844, 0, 512);
    GameObject.call(this, this.mBoss);
    
    this.mBlood = 82;
    this.mBlink = 0;
    this.mDeath = false;
    
    var dustParams = new DustParams(false, 0, 280, 600, -20, 500, 0, 0, 1, 2, 0, 10, 100);
    this.mDust = new Dust(dustParams);
    this.mParticleNum = -1;
    
    this.mUIbar = new UIBar([600, 615], [1100, 25]);
    this.mUIbar.setMaxValue(this.mBlood);
    this.mUIbar.setVisible(false);
    this.setVisibility(false);
    
    this.mBSet = new BossBSet();
    this.mBStabSetSet = new BossStabSetSet();
    
    this.mCenter = this.getXform().getPosition();
    this.mDelta = 0;
    this.mHasShot = false;
    this.mShootTime = 0;
    this.mMoveStatus = -1;
    this.mNextStatus = 1;
    this.mMoveTimer = 0;
    this.mNextTimer = 170;
    this.mMoveTo = new InterpolateVec2(this.getXform().getPosition(), 300, 0.08);
}
gEngine.Core.inheritPrototype(Boss, GameObject);

Boss.prototype.decBlood = function () {
    if (this.mBlink > 0) return;
    
    if (this.mBlood <= 5) {
        this.mDeath = true;
        return;
    }//to check the death
    this.mBlood = this.mBlood - 5;
    this.mBlink = 40;
    gEngine.AudioClips.playACue(this.kHitSound, 15);
};

Boss.prototype.changeStatus = function () {
    var next = Math.floor(Math.random() * 4 + 1);
    while (next === this.mMoveStatus) next = Math.floor(Math.random() * 4 + 1);
    this.mNextStatus = next;
    
    if (this.mShootTime > 0) {
        this.mShootTime--;
        if (this.mShootTime >= 1) this.mNextStatus = 4;
    }
    
    //console.log(next);
    switch (this.mNextStatus) {
        case 1:
            this.mMoveStatus = 0;
            this.setMoveTo(Math.random() * 350 + 50, Math.random() * 230 - 50);
            this.setMoveAround();
            break;
        case 2:
            this.mMoveStatus = 0;
            this.setMoveTo(Math.random() * 350 + 50, 220);
            this.setMoveLR(5);
            break;
        case 3:
            this.mMoveStatus = 0;
            this.setMoveTo(420, 0);
            this.setMoveUD();
            break;
        case 4:
            this.mMoveStatus = 0;
            this.setMoveTo(Math.random() * 350 + 50, Math.random() * 230 - 50);
            this.setShootCircle();
            break;
        default:
            break;
    }
}

Boss.prototype.doAction = function() {
    var rate = gEngine.Mine.saveStatus.tribleJump ? 1.5 : 1;
    
    switch (this.mMoveStatus) {
        case 100:
            this.mMoveTimer--;
            if (this.mMoveTimer === 0) {
                this.changeStatus();
            }
            break;
        case 0:
            this.mMoveTo.updateInterpolation();
            this.mMoveTimer--;
            if (this.mMoveTimer === 0) {
                this.mMoveStatus = this.mNextStatus;
                this.mMoveTimer = this.mNextTimer;
            }
            break;
        case 1:
            var R = 5;
            var rad = this.mMoveTimer / 40 * 2 * Math.PI;
            var nx = this.mCenter[0] + R * Math.cos(rad);
            var ny = this.mCenter[1] + R * Math.sin(rad);
            if (this.mMoveTimer >= 30) {
                this.getXform().setPosition(nx, ny);
                
                if (this.mMoveTimer % Math.floor(3 / rate) === 0) {
                    var aBullet = new BossBullet(this.kBTex, this.mCenter[0] + 100 * Math.cos(rad), this.mCenter[1] + 100 * Math.sin(rad), this.mBSet);
                    aBullet.moveTowards(this.kHPos[0], this.kHPos[1]);
                    aBullet.setWait(30);
                    this.mBSet.addToSet(aBullet);
                }
            }
            
            this.mMoveTimer--;
            if (this.mMoveTimer === 0) {
                this.changeStatus();
            }
            break;
        case 2:
            if (this.getXform().getXPos() >= 430) this.mDelta = -Math.abs(this.mDelta);
            if (this.getXform().getXPos() <= -430) this.mDelta = Math.abs(this.mDelta);
            this.getXform().incXPosBy(this.mDelta);
            if (this.mMoveTimer % Math.floor(28 / rate) === 0) {
                var pos = this.getXform().getPosition();
                var aStabSet = new StabSet(this.kSTex, 1, pos[0] - 23, pos[1], false, true);
                aStabSet.moveDown(280);
                this.mBStabSetSet.addToSet(aStabSet);
            }
            
            this.mMoveTimer--;
            if (this.mMoveTimer === 0) {
                this.changeStatus();
            }
            break;
        case 3:
            ny = 120 * Math.sin(this.mMoveTimer / 45 * 2 * Math.PI);
            this.getXform().setYPos(ny);
            if (this.mMoveTimer % Math.floor(15 / rate) === 0) {
                var aBullet = new BossBullet(this.kBTex, 580, Math.random() * 600 - 300, this.mBSet);
                aBullet.moveLeft();
                aBullet.setAdd(30);
                this.mBSet.addToSet(aBullet);
            }
            
            this.mMoveTimer--;
            if (this.mMoveTimer === 0) {
                this.changeStatus();
            }
            break;
        case 4:
            if (!this.mHasShot) {
                var aBullet = new BossBullet(this.kBTex, this.getXform().getXPos(), this.getXform().getYPos(), this.mBSet);
                aBullet.moveTowards(this.kHPos[0], this.kHPos[1]);
                aBullet.setCircle(30);
                this.mBSet.addToSet(aBullet);
                this.mHasShot = true;
            }
            
            this.mMoveTimer--;
            if (this.mMoveTimer === 0) {
                this.changeStatus();
            }
            break;
        default:
            break;
    }
}

Boss.prototype.setMoveTo = function(tx, ty) {
    this.mMoveTo.setFinalValue(vec2.fromValues(tx, ty));
    this.mMoveTimer = 50;
}

Boss.prototype.setMoveAround = function() {
    this.mNextTimer = 180;
}

Boss.prototype.setMoveLR = function(det) {
    this.mDelta = det;
    this.mNextTimer = 420;
}

Boss.prototype.setMoveUD = function() {
    this.mNextTimer = 315;
}

Boss.prototype.setShootCircle = function() {
    if (this.mShootTime === 0) this.mShootTime = 3;
    this.mHasShot = false;
    this.mNextTimer = 30;
}

Boss.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mDust.draw(aCamera);
    this.mUIbar.draw(aCamera);
    this.mBSet.draw(aCamera);
    this.mBStabSetSet.draw(aCamera);
};

Boss.prototype.update = function (aCamera) {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N) && gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        this.mDeath = true;
    }
    
    if (this.mParticleNum > 1000) {
        this.mDust.endLife();
        gEngine.GameLoop.stop();
    }
    if (this.mParticleNum >= 0 && this.mParticleNum <= 1500)
        this.mParticleNum += 1;

    if (this.mDeath && this.mParticleNum < 0) {
        this.setVisibility(false);
        this.mUIbar.setVisible(false);
        this.mDust.startLife();
        this.mParticleNum = 0;
        //gEngine.AudioClips.playBackgroundAudio(this.kEndBGM);
        //gEngine.AudioClips.incBackgroundVolume(-1.5);
        gEngine.AudioClips.stopBackgroundAudio();
    }

    this.mUIbar.setCurrentValue(this.mBlood);
    this.mUIbar.update();
    
    gEngine.ParticleSystem.update(this.mDust);
    
    if (this.mBlink > 0) {
        if (this.mBlink % 6 === 0) this.setVisibility(!this.isVisible());
        this.mBlink--;
        if (this.mBlink === 0) this.setVisibility(true);
    }
    
    if (!this.mDeath) {
        this.doAction();
    }
    this.mBSet.update(aCamera);
    this.mBStabSetSet.update(aCamera);
};



