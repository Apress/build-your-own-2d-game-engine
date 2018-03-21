/* File: Hero.js
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(atX, atY,atW,atH) {
    this.rRun = "assets/rRun.png";//
    this.lRun = "assets/lRun.png";//

    this.rStand = "assets/rStand.png";//
    this.lStand = "assets/lStand.png";//

    this.rDrop = "assets/rDrop.png";
    this.lDrop = "assets/lDrop.png";//

    this.rClimb = "assets/rClimb.png";//
    this.lClimb = "assets/lClimb.png";//

    this.rDash = "assets/rDash.png";
    this.lDash = "assets/lDash.png";

    this.rJump = "assets/rJump.png";//
    this.lJump = "assets/lJump.png";//

    this.kmp = "assets/bgm/Music_Portal.wav";
    this.ksf = "assets/bgm/sfx_fail.wav";
    this.ksg = "assets/bgm/sfx_goal.wav";
    // if (normalMap !== null) {
    //     this.mDye = new IllumRenderable(spriteTexture, normalMap);
    // } else {
    //     this.mDye = new LightRenderable(spriteTexture);
    // }
    this.mDye = new SpriteRenderable(this.rStand);
    this.mDye.setColor([1, 1, 1, 0]);  // tints red
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(atW, atH);
    this.mDye.setElementPixelPositions(0,128,17,120);

    this.mlStanding = new SpriteRenderable(this.lStand);
    this.mlStanding.setColor([0, 0, 0, 0]);  // tints red
    this.mlStanding.getXform().setPosition(atX, atY);
    this.mlStanding.getXform().setSize(atW,atH);
    this.mlStanding.setElementPixelPositions(0,128,17,120);

    this.mRRunning = new SpriteAnimateRenderable(this.rRun);
    this.mRRunning.setColor([0, 0, 0, 0]);
    this.mRRunning.getXform().setPosition(atX, atY);
    this.mRRunning.getXform().setZPos(5);
    this.mRRunning.getXform().setSize(atW,atH);
    this.mRRunning.setSpriteSequence(120,0,
                                   128,100,
                                   6,
                                   0);
    this.mRRunning.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mRRunning.setAnimationSpeed(6);

    this.mLRunning = new SpriteAnimateRenderable(this.lRun);
    this.mLRunning.setColor([0, 0, 0, 0]);
    this.mLRunning.getXform().setPosition(atX, atY);
    this.mLRunning.getXform().setZPos(5);
    this.mLRunning.getXform().setSize(atW,atH);
    this.mLRunning.setSpriteSequence(120,256,
                                   128,100,
                                   6,
                                   0);
    this.mLRunning.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mLRunning.setAnimationSpeed(6);

    this.mRDropping = new SpriteRenderable(this.rDrop);
    this.mRDropping.setColor([0, 0, 0, 0]);  // tints red
    this.mRDropping.getXform().setPosition(atX, atY);
    this.mRDropping.getXform().setSize(atW,atH);
    this.mRDropping.setElementPixelPositions(0,128,17,120);

    this.mLDropping = new SpriteRenderable(this.lDrop);
    this.mLDropping.setColor([0, 0, 0, 0]);  // tints red
    this.mLDropping.getXform().setPosition(atX, atY);
    this.mLDropping.getXform().setSize(atW,atH);
    this.mLDropping.setElementPixelPositions(0,128,17,120);

    this.mRClimbing = new SpriteRenderable(this.rClimb);
    this.mRClimbing.setColor([0, 0, 0, 0]);  // tints red
    this.mRClimbing.getXform().setPosition(atX, atY);
    this.mRClimbing.getXform().setSize(atW-1,atH-1);
    this.mRClimbing.setElementPixelPositions(0,54,0,64);

    this.mLClimbing = new SpriteRenderable(this.lClimb);
    this.mLClimbing.setColor([0, 0, 0, 0]);  // tints red
    this.mLClimbing.getXform().setPosition(atX, atY);
    this.mLClimbing.getXform().setSize(atW-1,atH-1);
    this.mLClimbing.setElementPixelPositions(10,64,0,64);

    this.mRDashing = new SpriteRenderable(this.rDash);
    this.mRDashing.setColor([0, 0, 0, 1]);  // tints red
    this.mRDashing.getXform().setPosition(atX, atY);
    this.mRDashing.getXform().setSize(atW,atH);
    this.mRDashing.setElementPixelPositions(0,128,0,128);

    this.mLDashing = new SpriteRenderable(this.lDash);
    this.mLDashing.setColor([0, 0, 0, 1]);  // tints red
    this.mLDashing.getXform().setPosition(atX, atY);
    this.mLDashing.getXform().setSize(atW,atH);
    this.mLDashing.setElementPixelPositions(0,128,0,128);

    this.mRJumping = new SpriteAnimateRenderable(this.rJump);
    this.mRJumping.setColor([0, 0, 0, 1]);
    this.mRJumping.getXform().setPosition(atX, atY);
    this.mRJumping.getXform().setZPos(5);
    this.mRJumping.getXform().setSize(atW,atH);
    this.mRJumping.setSpriteSequence(120,0,
                                   128,100,
                                   4,
                                   0);
    this.mRJumping.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mRJumping.setAnimationSpeed(30);

    this.mLJumping = new SpriteAnimateRenderable(this.lJump);
    this.mLJumping.setColor([0, 0, 0, 1]);
    this.mLJumping.getXform().setPosition(atX, atY);
    this.mLJumping.getXform().setZPos(5);
    this.mLJumping.getXform().setSize(atW,atH);
    this.mLJumping.setSpriteSequence(120,128,
                                   128,100,
                                   4,
                                   0);
    this.mLJumping.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mLJumping.setAnimationSpeed(30);


    GameObject.call(this, this.mDye);
    this.mJumpFlag = 0;
    this.mtimeout = 60;
    this.mdown = false;
    this.mHeroState = 0;
    this.isClimb = false;
    this.mLR = true;
    this.matX = atX;
    this.matY = atY;
    this.matW = atW;
    this.matH = atH;
    var r = new RigidRectangle(this.getXform(), atW*0.5,atH);
    r.setMass(0.7);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 0, 0, 0]);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function (BarriarSet) {
    // control by WASD
    this.mRRunning.updateAnimation();
    this.mLRunning.updateAnimation();
    this.mRJumping.updateAnimation();
    this.mLJumping.updateAnimation();
    GameObject.prototype.update.call(this);
    var v = this.getPhysicsComponent().getVelocity();


    this.check(BarriarSet);
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) && this.mJumpFlag === 1) {
        v[1] = 30;
        this.mJumpFlag = -1;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) && this.mJumpFlag === 0) {
        v[1] = 30;
        this.mJumpFlag = 1;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down) && !this.isClimb) {
        var tempv = v;
        this.mDye.getXform().setSize(this.matW,this.matH/2);
        var r = new RigidRectangle(this.getXform(), this.matW, this.matH/2);
        r.setMass(0.7);  // less dense than Minions
        r.setRestitution(0.3);
        r.setColor([0, 1, 0, 1]);
        r.setDrawBounds(true);
        this.setPhysicsComponent(r);
        this.mdown = true;
        v = tempv;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        v[0] = -13;
        this.mLR = false;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        v[0] = 13;
        this.mLR = true;
    }
    if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.Left) && v[0] < 0) {
        v[0] = 0;
    }
    if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.Right) && v[0] > 0 ) {
        v[0] = 0
    }
    if (this.mdown){
      this.mtimeout --;
      if (this.mtimeout === 0)
        this.mdown = false;
    }
    if (this.mtimeout === 0){
      var tempv = v[0];
      this.mDye.getXform().setSize(this.matW,this.matH);
      var r = new RigidRectangle(this.getXform(),this.matW*0.5,this.matH);
      r.setMass(0.7);  // less dense than Minions
      r.setRestitution(0.3);
      r.setColor([0, 1, 0, 0]);
      r.setDrawBounds(true);
      this.setPhysicsComponent(r);
      this.mtimeout = 60;
      this.mdown = false;
      v[0] = tempv;
    }
    if(Math.abs(v[0]) < 10 & Math.abs(v[1]) < 10){
      if(this.mLR){
        this.mHeroState = 0;
      } else {
        this.mHeroState = 1;
      }
    }
    if (Math.abs(v[0]) >= 10 & Math.abs(v[1]) < 10){
      if (this.mLR){
        this.mHeroState = 2;
      } else {
        this.mHeroState = 3;
      }
    }
    if (v[1] <= -2){
      if(this.mLR){
        this.mHeroState = 4;
      } else {
        this.mHeroState = 5;
      }
    }
    if(this.isClimb){
      if (this.mLR){
        this.mHeroState = 6;
      } else {
        this.mHeroState = 7;
      }
    }
    if(this.mdown && !this.isClimb){
      if(this.mLR){
        this.mHeroState = 8;
      } else {
        this.mHeroState = 9;
      }
    }
    if(Math.abs(v[0]) >= 10 & v[1] > 10){
      if(this.mLR){
        this.mHeroState = 10;
      } else {
        this.mHeroState = 11;
      }
    }
    this.mlStanding.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//1
    this.mRRunning.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//2
    this.mLRunning.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//3
    this.mRDropping.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//4
    this.mLDropping.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//5
    this.mRClimbing.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//6
    this.mLClimbing.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//7
    this.mRDashing.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//8
    this.mLDashing.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//9
    this.mRJumping.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//10
    this.mLJumping.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//11
};

Hero.prototype.draw = function( aCamera ){
    if (this.mHeroState === 0){
      this.mDye.draw(aCamera);
    }
    if (this.mHeroState === 1){
      this.mlStanding.draw(aCamera);
    }
    if (this.mHeroState === 2){
      this.mRRunning.draw(aCamera);
    }
    if (this.mHeroState === 3){
      this.mLRunning.draw(aCamera);
    }
    if (this.mHeroState === 4){
      this.mRDropping.draw(aCamera);
    }
    if (this.mHeroState === 5){
      this.mLDropping.draw(aCamera);
    }
    if (this.mHeroState === 6){
      this.mRClimbing.draw(aCamera);
    }
    if (this.mHeroState === 7){
      this.mLClimbing.draw(aCamera);
    }
    if (this.mHeroState === 8){
      this.mRDashing.draw(aCamera);
    }
    if (this.mHeroState === 9){
      this.mLDashing.draw(aCamera);
    }
    if (this.mHeroState === 10){
      this.mRJumping.draw(aCamera);
    }
    if (this.mHeroState === 11){
      this.mLJumping.draw(aCamera);
    }

};

Hero.prototype.check = function ( BarriarSet ){
  var v = this.getPhysicsComponent().getVelocity();
  var tBarriarSet = BarriarSet;
  var i;
  var xf = this.mDye.getXform();
  for (i = 0;i < tBarriarSet.size();i++){
    var Bxf = tBarriarSet.getObjectAt(i).getXform();
    if(tBarriarSet.getObjectAt(i).getFlag() === 0 ){
      if (Math.abs((xf.getXPos() - Bxf.getXPos())) <= ((xf.getWidth() + Bxf.getWidth())/2) &&
          Math.abs((xf.getXPos() - Bxf.getXPos())) >= (Bxf.getWidth())/2){
          if (xf.getYPos() > ((Bxf.getYPos() - Bxf.getHeight()/2)+0.1) &&
            xf.getYPos() < (Bxf.getYPos() + Bxf.getHeight()/2 + xf.getHeight()/2 -0.05)){
              this.isClimb = false;
              continue;
          }
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 1){
      if (Math.abs((xf.getXPos() - Bxf.getXPos())) <= ((xf.getWidth() + Bxf.getWidth())/2) &&
          Math.abs((xf.getXPos() - Bxf.getXPos())) >= (Bxf.getWidth())/2){
          if (xf.getYPos() > ((Bxf.getYPos() - Bxf.getHeight()/2)+0.1) &&
            xf.getYPos() < (Bxf.getYPos() + Bxf.getHeight()/2 + xf.getHeight()/2 -0.05)){
                this.isClimb = true;
                v[1] = 0;
              if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)){
                v[1] = 10;
                this.mJumpFlag = 0;
              }
              if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)){
                v[1] = -10;
                this.mJumpFlag = 0;
              }
          } else {
           this.isClimb = false;
           }
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 2 ){
      if ((xf.getYPos() - Bxf.getYPos() ) < ((xf.getHeight() + Bxf.getHeight())/2) && (xf.getYPos() - Bxf.getYPos() ) > xf.getHeight() &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth() + Bxf.getWidth())/2)) {
          xf.incYPosBy(tBarriarSet.getObjectAt(i).getSpeed());
          this.mHeroState = 0;
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 3 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth() + Bxf.getWidth())/2)) {
          xf.incXPosBy(tBarriarSet.getObjectAt(i).getSpeed());
          this.mHeroState = 0;
      }
    }

    if(tBarriarSet.getObjectAt(i).getFlag() === 4 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth()/2 + Bxf.getWidth())/2)) {
        v[0] = 0;v[1] = 0;
          this.mHeroState = 0;
        xf.setPosition(this.matX,this.matY);
        gEngine.AudioClips.playACue(this.ksf);
        gHp --;
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 5 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth()/2 + Bxf.getWidth())/2)) {
        v[0] = 0;v[1] = 0;
          this.mHeroState = 0;
        xf.setPosition(this.matX,this.matY);
        gEngine.AudioClips.playACue(this.ksf);
        gHp --;
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 6 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth()/2 + Bxf.getWidth())/2)) {
        v[0] = 0;v[1] = 0;
          this.mHeroState = 0;
        xf.setPosition(this.matX,this.matY);
        gEngine.AudioClips.playACue(this.ksf);
        gHp --;
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 7 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth() + Bxf.getWidth())/2)) {
        gHp ++;
        tBarriarSet.removeFromSet(tBarriarSet.getObjectAt(i));
        continue;
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 8 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth() + Bxf.getWidth())/2)) {
        v[1] = 105;
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 9 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth() + Bxf.getWidth())/2)) {
        gEngine.AudioClips.playACue(this.ksg);
        gState ++;
        break;
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 10 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth() + Bxf.getWidth())/2)) {
        var pst = tBarriarSet.getObjectAt(i).getEnd();
        gEngine.AudioClips.playACue(this.kmp);
        this.mDye.getXform().setPosition(pst[0],pst[1]);
        break;
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 11 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth() + Bxf.getWidth())/2)) {
        v[0] = 0;v[1] = 0;
          this.mHeroState = 0;
        xf.setPosition(this.matX,this.matY);
        gHp --;
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 12 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth() + Bxf.getWidth())/2)) {
        v[0] = 0;v[1] = 0;
          this.mHeroState = 0;
        xf.setPosition(this.matX,this.matY);
        gHp = 0;
      }
    }

    if (this.mJumpFlag === -1 ){
      if (xf.getXPos() > (Bxf.getXPos() - Bxf.getWidth()/2) &&
          xf.getXPos() < (Bxf.getXPos() + Bxf.getWidth()/2)){
        if (xf.getYPos() > Bxf.getYPos()){
          if ((xf.getYPos() - Bxf.getYPos()) <= ((xf.getHeight() + Bxf.getHeight())/2)){
                this.mJumpFlag = 0;
          }
        }
      }
    }

  }
};
