/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


MyGame.prototype.update = function () {

    if(this.mStatus == 0){
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
            this.mStatus = 1;
    }
    if(this.mStatus != 0){
        
    this.mFoodSet.update();
    this.mBalloon.update();
    this.mFreeSet.update();
        //Main Camera move
    var w = this.mCamera.getWCWidth();
    var h = this.mCamera.getWCHeight();
    var wc = this.mCamera.getWCCenter();
    wc[0] += this.aSpeedCam;
    if (wc[0] + w/2 >= this.mBg.getXform().getSize()[0])
        this.aSpeedCam = 0;
    //Interactive bound
    this.mInteractiveBound.getXform().setPosition(wc[0], wc[1]);
    //front Position
    this.mMsg0.getXform().setPosition(wc[0] - this.aViewWidth/2 + 5, wc[1] + this.aViewHeight/2 - 5);
    this.mMsg1.getXform().setPosition(wc[0] + 5, wc[1] + this.aViewHeight/2 - 5);
    this.mMsg2.getXform().setPosition(wc[0] + 5, wc[1] + this.aViewHeight/2 -10);
    // Message
    var msg1 = "Energy: " + Math.ceil(this.mBalloon.mEnergy) + "/100";
    this.mMsg1.setText(msg1);
    var msg2 = "Score: " + this.mScore;
    this.mMsg2.setText(msg2);
    
    var bx = this.mBalloon.getXform().getXPos();
    var by = this.mBalloon.getXform().getYPos();
    
    // Change Need
    // if(this.mChangeTime <= 0) {
    //     this.mNeedType = Math.floor(Math.random()*4);
    //     this.mChangeTime = 2+Math.random()*3;
    // } else{
    //     this.mChangeTime -= 1/60;
    // }
    //Sign
    this.mCircle.getXform().setPosition(bx, by+1);
    for(var i=0; i<this.mSignSet.size(); i++){
        if(i == this.mNeedType){
            this.mSignSet.getObjectAt(i).setVisibility(true);
            this.mSignSet.getObjectAt(i).getXform().setPosition(bx, by+1);
        } else{
            this.mSignSet.getObjectAt(i).setVisibility(false);
        }
    }
    for(var i=0; i<this.mChaseSet.size(); i++){
        this.mChaseSet.getObjectAt(i).update(this.mBalloon);
    }
    
    //Scene Bound Collision
    if(this.mBalloon.getBBox().boundCollideStatus(this.mInteractiveBound.getBBox()) === BoundingBox.eboundCollideStatus.eOutside)
    {
        this.gameOver();
    }
    
    // Eat Food
    var h = [];
    for(var i=0; i<this.mFoodSet.size(); i++){
        var f = this.mFoodSet.getObjectAt(i);
        if(f.pixelTouches(this.mBalloon, h)){
       
            if(f.getType() === this.mNeedType){
                gEngine.AudioClips.playACue(this.kEatClip);
                this.mBalloon.mEnergy += this.kIncEnergy;
                if(this.mBalloon.mEnergy > this.maxEnergy)
                    this.mScore += 100;
                else this.mScore += 50;
            }
            else{
                this.mBalloon.mEnergy -= this.kDecEnergy;
                this.mScore -= 20;
            }
            if(this.mBalloon.mEnergy > this.maxEnergy)
                this.mBalloon.mEnergy = this.maxEnergy;
            this.mFoodSet.removeFromSet(f);
            if(this.mScore < 0)
                this.mScore = 0;
            this.mNeedType = Math.floor(Math.random()*4);
        }
    }
    // this.mBalloon.mEnergy -= this.kDeltaEnergy;
    // if(this.mBalloon.mEnergy <= 0){
    //     this.mBalloon.mEnergy = 0;
    //     this.mBalloon.mHasEnergy = false;
    // }else{
    //     this.mBalloon.mHasEnergy = true;
    // }
    
    // hit static obstacles
    for(var i = 0; i < this.mStaticObjSet.size(); i++){
        var f = this.mStaticObjSet.getObjectAt(i);
        if(this.mBalloon.pixelTouches(f, h)){
            this.mBalloon.mHit = true;
        }
    }
    // hit Chase 
    for(var i = 0; i < this.mChaseSet.size(); i++){
        var f = this.mChaseSet.getObjectAt(i);
        if(f.pixelTouches(this.mBalloon, h)){
            this.mBalloon.mHit = true;
        }
    }
    // hit Free
    for(var i = 0; i < this.mFreeSet.size(); i++){
        var f = this.mFreeSet.getObjectAt(i);
        if(f.pixelTouches(this.mBalloon, h)){
            this.mBalloon.mHit = true;
        }
    }
    if(this.mBalloon.mHit === true){
        if(this.mHit === false){
            gEngine.AudioClips.playACue(this.kHitClip);
            this.mHit = true;
        }
    }
        
        
    // End
    if(this.mEnd.pixelTouches(this.mBalloon, h)){
        this.LevelWin();
    }
    
    }
    //Show Map camera
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.M)){
        this.ShowMapCam = !this.ShowMapCam;
    }
    

    GameStart.prototype.testScene.call(this);
    
};

