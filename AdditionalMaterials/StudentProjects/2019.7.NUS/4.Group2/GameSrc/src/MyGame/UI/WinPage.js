/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function WinPage(spriteTexture, World, currentLevel){
    this.BG = new SpriteRenderable(spriteTexture);
    this.BG.getXform().setPosition(100, 75);
    this.BG.getXform().setSize(80, 140);
//    this.BG.setElementPixelPositions(0, 512, 41, 461);
    this.BG.setColor([1,1,1,0]);
    if (currentLevel ===7) {
        this.NextButton = new UIButton(this.BackSelect, this, [400, 150], [110, 40], "Back", 6);
    }
    else
    {
        this.NextButton = new UIButton(this.NextSelect, this, [400, 150], [180, 40], "Next Level", 6);
    }
    this.RestartButton = new UIButton(this.RestartSelect, this, [400, 90], [130, 40], "Restart", 6);
    this.NextButton.setBGColor([0.8,0.8,0.8,1]);
    this.NextButton.setBGHoverColor([0.9,0.9,0.9,1]);
    this.RestartButton.setBGColor([0.8,0.8,0.8,1]);
    this.RestartButton.setBGHoverColor([0.9,0.9,0.9,1]);
    this.mStatus = null;
    this.mWorld = World;

    this.mTimeMsg = new FontRenderable("Time");
    this.mTimeMsg.setColor([0, 0, 0, 1]);
    this.mTimeMsg.setTextHeight(5);
    this.mTimeMsg.getXform().setPosition(83,98);

    this.mArrowMsg = new FontRenderable("Shot Arrows:");
    this.mArrowMsg.setColor([0, 0, 0, 1]);
    this.mArrowMsg.setTextHeight(5);
    this.mArrowMsg.getXform().setPosition(84,84);

    this.mNormalArrowMsg = new FontRenderable("Normal");
    this.mNormalArrowMsg.setColor([0, 0, 0, 1]);
    this.mNormalArrowMsg.setTextHeight(5);
    this.mNormalArrowMsg.getXform().setPosition(84,75);

    this.mFireArrowMsg = new FontRenderable("Fire");
    this.mFireArrowMsg.setColor([0, 0, 0, 1]);
    this.mFireArrowMsg.setTextHeight(5);
    this.mFireArrowMsg.getXform().setPosition(84,67);

    this.mBounceArrowMsg = new FontRenderable("Bounce");
    this.mBounceArrowMsg.setColor([0, 0, 0, 1]);
    this.mBounceArrowMsg.setTextHeight(5);
    this.mBounceArrowMsg.getXform().setPosition(84,59);
}

WinPage.prototype.draw = function(Camera){
    this.BG.draw(Camera);
    this.NextButton.draw(Camera);
    this.RestartButton.draw(Camera);
    this.mTimeMsg.draw(Camera);
    this.mArrowMsg.draw(Camera);
    this.mNormalArrowMsg.draw(Camera);
    this.mFireArrowMsg.draw(Camera);
    this.mBounceArrowMsg.draw(Camera);
};

WinPage.prototype.update = function(){
    this.NextButton.update();
    this.RestartButton.update();
};

WinPage.prototype.NextSelect = function(){
    this.mStatus = "Next";
};

WinPage.prototype.BackSelect = function(){
    this.mStatus = "Back";
};

WinPage.prototype.RestartSelect = function(){
    this.mStatus = "Restart";
};

WinPage.prototype.setGrade = function (grade) {
    switch(grade){
        case 0:
            this.BG.setElementPixelPositions(0, 249, 0, 438);
            break;
        case 1:
            this.BG.setElementPixelPositions(250, 499, 0, 438);
            break;
        case 2:
            this.BG.setElementPixelPositions(500, 749, 0, 438);
            break;
        case 3:
            this.BG.setElementPixelPositions(750, 999, 0, 438);
    }
    this.mTimeMsg.setText("Time    " + (this.mWorld.mMinutes>9?"":"0") + this.mWorld.mMinutes + ":" + (this.mWorld.mSeconds>9?"":"0") + this.mWorld.mSeconds);
    this.mNormalArrowMsg.setText("Normal     " + this.mWorld.mNormalArrowSum);
    this.mFireArrowMsg.setText("Fire       " + this.mWorld.mFireArrowSum);
    this.mBounceArrowMsg.setText("Bounce     " + this.mWorld.mBounceArrowSum);
}