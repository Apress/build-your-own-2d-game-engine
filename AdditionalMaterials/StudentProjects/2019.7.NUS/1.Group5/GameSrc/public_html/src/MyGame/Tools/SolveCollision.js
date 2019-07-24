function SolveCollision(Camera, Hero, MirrorHero, Boss, Platforms, Brokens, StabSets) {
    this.mCamera = Camera;
    this.mHero = Hero;
    this.mBulletSet = Hero.mBulletSet;
    this.mMirrorHero = MirrorHero;
    if (this.mMirrorHero !== null) {
        this.mMirrorBullet = MirrorHero.mBulletSet;
    }
    this.mBoss = Boss;
    if (this.mBoss !== null) {
        this.mBossBullet = this.mBoss.mBSet;
        this.mBossStab = this.mBoss.mBStabSetSet;
    }
    this.mPlatforms = Platforms;
    this.mBrokens = Brokens;
    this.mStabSets = StabSets;
}

SolveCollision.prototype.update = function () {
    if (this.mHero !== null) {
        this.solveHero(this.mHero, this.mHero.kMirror < 0);
        this.SolveBullets(this.mBulletSet, this.mHero.kMirror < 0);
        this.checkDeath(this.mHero);
        this.checkSceneChange(this.mHero);
    }
    if (this.mMirrorHero !== null) {
        this.solveHero(this.mMirrorHero, this.mMirrorHero.kMirror < 0);
        this.SolveBullets(this.mMirrorBullet, this.mMirrorHero.kMirror < 0);
        this.checkDeath(this.mMirrorHero);
        this.checkSceneChange(this.mMirrorHero);
    }
    if (this.mBoss !== null) {
        if (this.mBoss.isVisible()) {
            this.solveBoss();
        }
    }
};

SolveCollision.prototype.checkSceneChange = function (aHero) {
    var hBottom = aHero.getBBox().minY();
    var hLeft = aHero.getBBox().minX();
    var hRight = aHero.getBBox().maxX();
    var cUp = this.mCamera.getWCCenter()[1] + this.mCamera.getWCHeight() / 2;
    var cLeft = this.mCamera.getWCCenter()[0] - this.mCamera.getWCWidth() / 2;
    var cRight = this.mCamera.getWCCenter()[0] + this.mCamera.getWCWidth() / 2;

    if (hBottom > cUp)
        aHero.mIsGoingUp = true;
    if (hLeft > cRight)
        aHero.mIsGoingRight = true;
    if (hRight < cLeft)
        aHero.mIsGoingLeft = true;
}

SolveCollision.prototype.checkDeath = function (aHero) {
    //fall out
    var hUp = aHero.getBBox().maxY();
    var hBottom = aHero.getBBox().minY();
    var cBottom = this.mCamera.getWCCenter()[1] - this.mCamera.getWCHeight() / 2;
    var cTop = this.mCamera.getWCCenter()[1] + this.mCamera.getWCHeight() / 2;
    if (hUp < cBottom && aHero.kMirror > 0) {
        aHero.youDied();
        return;
    }
    if (hBottom > cTop && aHero.kMirror < 0) {
        aHero.youDied();
        return;
    }

    //hit a stab
    for (var i = 0; i < this.mStabSets.length; i++) {
        for (var j = 0; j < this.mStabSets[i].size(); j++) {
            if (!this.mStabSets[i].getObjectAt(j).isVisible())
                continue;

            if (aHero.pixelTouches(this.mStabSets[i].getObjectAt(j), [])) {
                if (this.mStabSets[i].getObjectAt(j).mCanTouch) {
                    this.mStabSets[i].getObjectAt(j).setVisibility(false);
                } else {
                    aHero.youDied();
                    return;
                }
            }
        }
    }
}

SolveCollision.prototype.solveHero = function (aHero, isMirror) {
    var ldw = aHero.kWidth / 2 - aHero.kBWidthDec / 2 - aHero.kBOffset * aHero.mFacing;
    var rdw = aHero.kWidth / 2 - aHero.kBWidthDec / 2 + aHero.kBOffset * aHero.mFacing;
    var dh = aHero.kHeight / 2;
    var dv = aHero.mVP.mLastFrameV;

    if (aHero.mAirFrames < 3)
        aHero.mAirFrames++;
    aHero.mInAir = true;
    var plats = this.mPlatforms.concat(this.mBrokens);
    for (var repeat = 0; repeat < 2; repeat++) {
        for (var i = 0; i < plats.length; i++) {
            if (!plats[i].isVisible())
                continue;

            var hBox = aHero.getBBox();
            var hPos = aHero.getXform().getPosition();
            var pBox = plats[i].getBBox();
            var pv = plats[i].mVP.mLastFrameV;

            var status = hBox.boundCollideStatus(pBox);
            var hasLRCol = false;
            var hasTBCol = false;

            if ((status & 1) && !(status & 2)) {
                if (hBox.minX() - dv[0] * 2 >= pBox.maxX() - pv[0] - 0.1) {
                    hasLRCol = true;
                }
            }
            if ((status & 2) && !(status & 1)) {
                if (hBox.maxX() - dv[0] * 2 <= pBox.minX() - pv[0] + 0.1) {
                    hasLRCol = true;
                }
            }
            if ((status & 4) && !(status & 8)) {
                if (hBox.maxY() - dv[1] * 2 <= pBox.minY() - pv[1] + 0.1) {
                    hasTBCol = true;
                }
            }
            if ((status & 8) && !(status & 4)) {
                if (hBox.minY() - dv[1] * 2 >= pBox.maxY() - pv[1] - 0.1) {
                    hasTBCol = true;
                }
            }

            if ((status & 1) && !(status & 2) && !hasTBCol) {
                if (hBox.minX() - dv[0] * 2 >= pBox.maxX() - pv[0] - 0.1) {
                    hPos[0] = pBox.maxX() + ldw;
                    aHero.mVP.cleanXV();
                }
            }
            if ((status & 2) && !(status & 1) && !hasTBCol) {
                if (hBox.maxX() - dv[0] * 2 <= pBox.minX() - pv[0] + 0.1) {
                    hPos[0] = pBox.minX() - rdw;
                    aHero.mVP.cleanXV();
                }
            }
            if ((status & 4) && !(status & 8) /*&& !hasLRCol*/) {
                if (/*hBox.maxY() - dv[1] * 2 <= pBox.minY() - pv[1] + 0.1*/ !hasLRCol) {
                    hPos[1] = pBox.minY() - dh;
                    aHero.mVP.cleanYV();
                    if (isMirror) {
                        aHero.mAirFrames = 0;
                        aHero.mInAir = false;
                        aHero.mJumpTime = 0;

                        aHero.mVP.setAddV(plats[i].mVP.mV[0], plats[i].mVP.mV[1]);
                    } else {
                        if (aHero.mHoldSpace > 1 && aHero.mHoldSpace < 10)
                            aHero.mHoldSpace = 1;
                    }
                }
            }
            if ((status & 8) && !(status & 4) /*&& !hasLRCol*/) {
                if (/*hBox.minY() - dv[1] * 2 >= pBox.maxY() - pv[1] - 0.1*/ !hasLRCol) {
                    hPos[1] = pBox.maxY() + dh;
                    aHero.mVP.cleanYV();
                    if (!isMirror) {
                        aHero.mAirFrames = 0;
                        aHero.mInAir = false;
                        aHero.mJumpTime = 0;

                        aHero.mVP.setAddV(plats[i].mVP.mV[0], plats[i].mVP.mV[1]);
                    } else {
                        if (aHero.mHoldSpace > 1 && aHero.mHoldSpace < 10)
                            aHero.mHoldSpace = 1;
                    }
                }
            }
        }
    }
};

SolveCollision.prototype.SolveBullets = function (aBulletSet, isMirror) {
    for (var i = 0; i < aBulletSet.size(); i++) {
        var tb = aBulletSet.getObjectAt(i);
        if (tb.mIsDead)
            continue;

        if (this.mCamera.collideWCBound(tb.getXform(), 1) !== 16) {
            tb.mIsDead = true;
        }
    }

    for (var i = 0; i < aBulletSet.size(); i++) {
        var tb = aBulletSet.getObjectAt(i);
        if (tb.mIsDead)
            continue;

        for (var j = 0; j < this.mPlatforms.length; j++) {
            if (!this.mPlatforms[j].isVisible())
                continue;

            if (tb.pixelTouches(this.mPlatforms[j], [])) {
                tb.mIsDead = true;
            }
        }
    }

    for (var i = 0; i < aBulletSet.size(); i++) {
        var tb = aBulletSet.getObjectAt(i);
        if (tb.mIsDead)
            continue;

        for (var j = 0; j < this.mBrokens.length; j++) {
            if (!this.mBrokens[j].isVisible())
                continue;

            if (tb.pixelTouches(this.mBrokens[j], [])) {
                tb.mIsDead = true;
                this.mBrokens[j].beingHit();
            }
        }
    }

    for (var i = 0; i < aBulletSet.size(); i++) {
        var tb = aBulletSet.getObjectAt(i);
        if (tb.mIsDead)
            continue;

        for (var j = 0; j < this.mStabSets.length; j++) {
            for (var k = 0; k < this.mStabSets[j].size(); k++) {
                if (!this.mStabSets[j].getObjectAt(k).isVisible())
                    continue;

                if (tb.pixelTouches(this.mStabSets[j].getObjectAt(k), [])) {
                    tb.mIsDead = true;
                }
            }
        }
    }
};

SolveCollision.prototype.solveBoss = function () {
    for (var i = 0; i < this.mBulletSet.size(); i++) {
        var tb = this.mBulletSet.getObjectAt(i);
        if (tb.mIsDead)
            continue;

        if (tb.pixelTouches(this.mBoss, [])) {
            tb.mIsDead = true;
            this.mBoss.decBlood();
        }
    }

    if (this.mHero.pixelTouches(this.mBoss, [])) {
        this.mHero.youDied();
        return;
    }
    
    for (var i = 0; i < this.mBossBullet.size(); i++) {
        var tb = this.mBossBullet.getObjectAt(i);
        if (tb.mIsDead)
            continue;

        if (tb.pixelTouches(this.mHero, [])) {
            this.mHero.youDied();
            return;
        }
    }

    for (var i = 0; i < this.mBossStab.size(); i++) {
        var tb = this.mBossStab.getObjectAt(i);

        for (var j = 0; j < tb.size(); j++) {
            if (this.mHero.pixelTouches(tb.getObjectAt(j), [])) {
                this.mHero.youDied();
                return;
            }
        }
    }
}