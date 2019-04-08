/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine, GameObject*/
"use strict";
function GameTimer(startTime) {
    this.totalTime = startTime;
    this.mCurrentTime = startTime;
    this.mCurrentRealTime = Date.now();
    var sec = Math.floor(this.mCurrentTime/1000-Math.floor(this.mCurrentTime/60000)*60);
    var min = Math.floor(sec/60);
    var string = min+":"+sec;
    this.mUIText = new UIText(string,[700,400],1.5,0,0,[1,1,1,1]);
    
    
}

GameTimer.prototype.update = function() {
    var elapsedTime =  Date.now() - this.mCurrentRealTime;
    this.mCurrentRealTime = Date.now();
    this.mCurrentTime -= elapsedTime;
    var sec = Math.floor(this.mCurrentTime/1000-Math.floor(this.mCurrentTime/60000)*60);
    var min = Math.floor(this.mCurrentTime/60000);
    if(sec > 9) {
        var string = min+":"+sec;
    } else {
        var string = min+":0"+sec;
    }
    this.mUIText.setText(string);
    return string;
    
};
GameTimer.prototype.draw = function(aCamera) {
    this.mUIText.draw(aCamera);
};
GameTimer.prototype.getTime = function() {
    return this.totalTime - this.mCurrentTime;
};
