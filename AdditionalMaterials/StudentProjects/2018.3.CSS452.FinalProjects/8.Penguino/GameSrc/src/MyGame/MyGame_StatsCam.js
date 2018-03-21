/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


MyGame.prototype.updateStatsCamera = function () {
    
    this.mScoreMsg0 = new FontRenderable("Level " + this.Level);
    this.mScoreMsg0.setColor([0, 0, 0, 1]);
    this.mScoreMsg0.getXform().setPosition(-95, 80);
    this.mScoreMsg0.setTextHeight(8);
    
    this.mScoreMsg = new FontRenderable("Lives: " + this.Lives);
    this.mScoreMsg.setColor([.8, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(-95, 60);
    this.mScoreMsg.setTextHeight(10);
    
    this.mScoreMsg2 = new FontRenderable("Time: " + this.TimeLeft.toPrecision(5));
    this.mScoreMsg2.setColor([0, 0, .8, 1]);
    this.mScoreMsg2.getXform().setPosition(-95, 40);
    this.mScoreMsg2.setTextHeight(10);
    
    this.mScoreMsg3 = new FontRenderable("Score: " + Math.floor(this.Score));
    this.mScoreMsg3.setColor([0, .8, 0, 1]);
    this.mScoreMsg3.getXform().setPosition(-95, 20);
    this.mScoreMsg3.setTextHeight(10);
    
    this.mScoreMsg4 = new FontRenderable("Music: " + this.musicOn);
    this.mScoreMsg4.setColor([0, .5, .2, 1]);
    this.mScoreMsg4.getXform().setPosition(-95, 0);
    this.mScoreMsg4.setTextHeight(6);
    
    this.mScoreMsg5 = new FontRenderable("x to restart level");
    this.mScoreMsg5.setColor([.8, .1, .1, 1]);
    this.mScoreMsg5.getXform().setPosition(-95, -10);
    this.mScoreMsg5.setTextHeight(4);
};

MyGame.prototype.drawStats= function(cam){
  if(this.mScoreMsg0!=null){
    this.mScoreMsg0.draw(cam);
  
  this.mScoreMsg.draw(cam); 
  this.mScoreMsg2.draw(cam); 
  this.mScoreMsg3.draw(cam);
  this.mScoreMsg4.draw(cam);
  this.mScoreMsg5.draw(cam);
  }
};