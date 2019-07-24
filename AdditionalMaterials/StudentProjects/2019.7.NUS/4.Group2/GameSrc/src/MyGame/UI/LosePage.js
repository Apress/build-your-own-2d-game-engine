/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function LosePage(spriteTexture){
    this.BG = new SpriteRenderable(spriteTexture);
    this.BG.getXform().setPosition(100, 75);
    this.BG.getXform().setSize(80, 80);
    this.BG.setElementPixelPositions(0, 512, 0, 512);
    this.BG.setColor([1,1,1,0]);
    this.LevelButton = new UIButton(this.LevelSelect, this, [400, 300], [200, 40], "Select Level", 6);
    this.RestartButton = new UIButton(this.RestartSelect, this, [400, 240], [130, 40], "Restart", 6);
//    this.LevelButton.setBGColor([1,0.75,0.8,1]);
    this.RestartButton.setBGColor([0.8,0.8,0.8,1]);
    this.RestartButton.setBGHoverColor([0.9,0.9,0.9,1]);
    this.LevelButton.setBGColor([0.8,0.8,0.8,1]);
    this.LevelButton.setBGHoverColor([0.9,0.9,0.9,1]);
    this.mStatus = null;
}

LosePage.prototype.draw = function(Camera){
    this.BG.draw(Camera);
    this.LevelButton.draw(Camera);
    this.RestartButton.draw(Camera);
};

LosePage.prototype.update = function(){
    this.LevelButton.update();
    this.RestartButton.update();
};

LosePage.prototype.LevelSelect = function(){
    this.mStatus = "Level";
};

LosePage.prototype.RestartSelect = function(){
    this.mStatus = "Restart";
};