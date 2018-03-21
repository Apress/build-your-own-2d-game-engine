/*
 * File: HelpViewManager.js 
 * This object is in charge of displaying score, and game tips.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */


function HelpViewManager(collectibleSet, sprite, spriteHolder, player) {
    
    this.mDebugMode = false;
    this.mSliding = false;
    this.mPlayer = player;
    //Starting Time
    this.mTimeLimit = 90; //Measured in seconds
    this.mTimeLeft = this.mTimeLimit * 60;
    
    this.collectibles = collectibleSet;
    this.mItemsToCollect = [];
    this.mItemsCollected = [];
    this.mCollectibleSprite = sprite;
    this.mCollectibleHolder = spriteHolder;
    
    //For collectible display
    this.mCollectibleSize = 4;
    this.mCollectibleOffset = 2;
    this.mInitCollectibleX;
    
    this.mItemsNeededToWin = this.collectibles.size();
    this.mNumItemsCollected = this.collectibles.getItemsRemoved();
    
    
    this.mCamera = new Camera(
        vec2.fromValues(25, 25), // position of the camera
        50,                       // width of camera
        [1200, 300, 400, 500]           // viewport (orgX, orgY, width, height)
    );
    
    this.mCamera.setBackgroundColor([.4, 0, 1, 1]);
    
    //This variable will contain all the text items below.
    this.mText = [];
    this.mGameTips = ["Use WASD to move!",
                      "H toggles the light!",
                      "Use Chimneys to escape",
                      "Collect all the Zs!",
                      "Beware the clouds!",
                      "Use ice to slip away!",
                      "Clouds turn slowly",
                      "Passages teleport you!",
                      "Quick! Collect the Zs!",
                      "Take the Zs to the bed!",
                      "Time is running out!",
                      "All dreams must end"
                      ];
    this.mTipChanged = false;
    this.mGameTipIndex = 0;
    
    this.mTimeRemainingTxt = new FontRenderable("TIME REMAINING:");
    this.mTimeRemainingTxt.setColor([0, 0, 0, 1]);
    this.mTimeRemainingTxt.getXform().setPosition(5, this.mCamera.getWCHeight() - 10);
    this.mTimeRemainingTxt.setTextHeight(5);
    this.mText.push(this.mTimeRemainingTxt);
    
    this.mTimerMsg = new FontRenderable("[time left here]");
    this.mTimerMsg.setColor([0, 0, 0, 1]);
    this.mTimerMsg.getXform().setPosition(15, this.mCamera.getWCHeight() - 15);
    this.mTimerMsg.setTextHeight(4);
    this.mText.push(this.mTimerMsg);
    
    this.mKelvinModeText = new FontRenderable("(press 'k' to toggle Kelvin Mode)");
    this.mKelvinModeText.setColor([0, 0, 0, 1]);
    this.mKelvinModeText.getXform().setPosition(5, this.mCamera.getWCHeight() - 32);
    this.mKelvinModeText.setTextHeight(2);
    this.mText.push(this.mKelvinModeText);
    
    this.mTipMsg = new FontRenderable("   Tip: Use WASD to move!");
    this.mTipMsg.setColor([0, 0, 0, 1]);
    this.mTipMsg.getXform().setPosition(0.5, this.mCamera.getWCHeight() / 1.8);
    this.mTipMsg.setTextHeight(3);
    this.mText.push(this.mTipMsg);
    
    this.mScoreMsg = new FontRenderable("        Zs Collected");
    this.mScoreMsg.setColor([0, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(1, this.mCamera.getWCHeight() * .04);
    this.mScoreMsg.setTextHeight(3);
    this.mText.push(this.mScoreMsg);
    
    this.mDebugText = [];
    
//    this.mEndMessage = new FontRenderable("QUICK! BACK TO BED!");
//    this.mEndMessage.setColor([1, 0, 0, 1]);
//    this.mEndMessage.getXform().setPosition(2, this.mCamera.getWCHeight() * .03);
//    this.mEndMessage.setTextHeight(4);
//    this.mText.push(this.mEndMessage);
    
    this.mInitCollectibleX = ((this.mCamera.getWCWidth() / (this.collectibles.size() + (this.mCollectibleSize * 2) + this.mCollectibleOffset)) - this.mCollectibleOffset);
    this.generateItemsToCollect();
    this.generateDebugMenu();
    
}

HelpViewManager.prototype.addCollectedItem = function() {
    
    if (this.mItemsCollected.length === this.mItemsNeededToWin) {
        return;
    }
    
    var nItem = new SpriteRenderable(this.mCollectibleSprite);
    var nItemSize = this.mCollectibleSize;
    var offset = 2;
    this.mInitCollectibleX += nItemSize + offset;
    var nItemXPos = this.mInitCollectibleX;
    // We set the position so that it's always below our score text, and always
    // spaced according to how many items we have.
    nItem.getXform().setPosition(nItemXPos, 
                                this.mScoreMsg.getXform().getYPos() - 5);
    nItem.getXform().setSize(nItemSize, nItemSize);
    this.mItemsCollected.push(nItem);
    
};

HelpViewManager.prototype.generateItemsToCollect = function() {
    var nZSize = this.mCollectibleSize;
    var offset = this.mCollectibleOffset;
    var initXPos = ((this.mCamera.getWCWidth() / (this.collectibles.size() + (nZSize * 2) + offset)) - offset);
    
    var i;
    for (i = 0; i < this.collectibles.size(); i++) {
        var nZ = new SpriteRenderable(this.mCollectibleHolder);
        
        initXPos += nZSize + offset;
        nZ.getXform().setPosition(initXPos,this.mScoreMsg.getXform().getYPos() - 5);
        
        nZ.getXform().setSize(nZSize, nZSize);
        this.mItemsToCollect.push(nZ);
    }
    
};

HelpViewManager.prototype.generateNextTip = function () {
    if ((Math.round(this.mTimeLeft / 60) % 10) === 0 && !this.mTipChanged) {
        
        this.mTipMsg.setText("TIP: " + this.mGameTips[this.mGameTipIndex]);
        this.mTipMsg.getXform().setXPos((this.mCamera.getWCWidth() / 2) - (this.mTipMsg.getXform().getWidth() / 2));
        
        this.mGameTipIndex++;
        if (this.mGameTipIndex === this.mGameTips.length) {
            this.mGameTipsIndex = 0;
        }
        
        this.mTipChanged = true;
    } else if ((Math.round(this.mTimeLeft / 60) % 10) !== 0) {
        
        this.mTipChanged = false;
        
    }
};

HelpViewManager.prototype.generateDebugMenu = function() {
    
    var textSize = 4;
    var textOffset = 5.5;
    var nMenuItems = 4;
    var i;
    
    if (this.mDebugText.length === 0) {
        for (i = 1; i <= nMenuItems; i++) {

            var nText = new FontRenderable("[" + i + "]");
            nText.setColor([0, 0, 0, 1]);
            nText.getXform().setPosition(5,
                            (this.mCamera.getWCHeight() * .5) - (i * textOffset));

            nText.setTextHeight(textSize);

            this.mDebugText.push(nText);
        }
    }
    
    
    if (this.mDebugMode) {
        
        this.mDebugText[0].setText("Press a # Key:");
        this.mDebugText[1].setText("1) Ice Mode");
        this.mDebugText[2].setText("2) Get Free Z");
        this.mDebugText[3].setText("3) End Game (lose)");
        
    } else {
        this.mDebugText[0].setText("Remember");
        this.mDebugText[1].setText("1. Collect All Zs");
        this.mDebugText[2].setText("2. Avoid Clouds");
        this.mDebugText[3].setText("3. Return to Bed");
    }  
};

HelpViewManager.prototype.update = function () {
    var timerMsg;
    this.mTimeLeft -= 1;
    
    if (this.mTimeLeft >= 0) {
        timerMsg = (Math.round(this.mTimeLeft / 60) + " seconds");
        //this.mTimerMsg.setTextHeight(5 * (this.mTimeLeft / (this.mTimeLimit * 60)) + 0.5);
        this.mTimerMsg.getXform().setPosition((this.mCamera.getWCWidth() / 2) - (this.mTimerMsg.getXform().getWidth() / 2),this.mCamera.getWCHeight() - 18);
        this.mTimeRemainingTxt.setColor([1 - (this.mTimeLeft / (this.mTimeLimit * 60)),0,0,1]);
        this.mTimerMsg.setColor([1 - (this.mTimeLeft / (this.mTimeLimit * 60)),0,0,1]);
    } else {
        timerMsg = "None";
    }
    
    if (this.mNumItemsCollected < this.collectibles.getItemsRemoved()) {
        this.mNumItemsCollected++;
        this.addCollectedItem();
    }
    
    this.generateNextTip();
    
    
    this.mTimerMsg.setText(timerMsg);
    
    if (this.allItemsCollected()) {
        this.mScoreMsg.setText(" Zs Collected! BACK TO BED!");
        this.mScoreMsg.setColor([1, 0, 0, 1]);
    }
    
    if (this.mDebugMode) {
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.One))
        {
            this.mSliding = !this.mSliding;
            this.mPlayer.setDebugSlideMode(this.mSliding);
        }
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Two))
        {
            this.addCollectedItem();
        }
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Three))
        {
            this.mTimeLeft = 0;
        }
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.K))
    {
        this.mDebugMode = !this.mDebugMode;
        this.mPlayer.setDebugSlideMode(false);
        this.mSliding = false;
        this.generateDebugMenu();
    }
};

HelpViewManager.prototype.draw = function () {
    this.mCamera.setupViewProjection();
//    this.mTimerMsg.draw(this.mCamera);
//    this.mTipMsg.draw(this.mCamera);
//    this.mScoreMsg.draw(this.mCamera);
    
    var k;
    for(k = 0; k < this.mItemsToCollect.length; k++) {
        this.mItemsToCollect[k].draw(this.mCamera);
    }
    
    var i;
    for(i = 0; i < this.mItemsCollected.length; i++) {
        this.mItemsCollected[i].draw(this.mCamera);
    }
    
    var j;
    for(j = 0; j < this.mText.length; j++) {
        this.mText[j].draw(this.mCamera);
    }
    
    var l;
    for(l = 0; l < this.mDebugText.length; l++) {
        this.mDebugText[l].draw(this.mCamera);
    }
};



HelpViewManager.prototype.allItemsCollected = function () {
    if (this.mItemsCollected.length === this.mItemsNeededToWin) {
        return true;
    } else {
        return false;
    }
};

HelpViewManager.prototype.isTimeLeft = function () {
    if (this.mTimeLeft > 0) {
        return true;
    } else {
        return false;
    }
};