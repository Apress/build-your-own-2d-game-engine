/*
 * File: MyGame_Shadow: Initializes and sets up shadow
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, ShadowReceiver */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

MyGame.prototype._setupShadow = function () {
    this.mBgShadow1 = new ShadowReceiver(this.mBgL1);
    this.mBgShadow1.addShadowCaster(this.mIllumHero);
    this.mBgShadow1.addShadowCaster(this.mLgtHero);
    this.mBgShadow1.addShadowCaster(this.mLgtMinion);
    this.mBgShadow1.addShadowCaster(this.mIllumMinion);
};
