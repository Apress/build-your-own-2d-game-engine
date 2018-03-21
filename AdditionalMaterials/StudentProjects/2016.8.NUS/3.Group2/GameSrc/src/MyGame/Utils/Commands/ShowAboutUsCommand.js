/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gManager, Command, gEngine */

function ShowAboutUsCommand(){
    this.mCurrentState = false;
};

gEngine.Core.inheritPrototype(ShowAboutUsCommand,Command);

ShowAboutUsCommand.prototype.excute = function(){
    if(this.mCurrentState){
        this.mCurrentState = !this.mCurrentState;
        var ui = gManager.UIManager.getElementbyNum(3);
        ui.setState(this.mCurrentState);
        ui = gManager.UIManager.getElementbyNum(1);
        ui.setState(!this.mCurrentState);
        ui = gManager.UIManager.getElementbyNum(2);
        ui.setState(!this.mCurrentState);
        ui = gManager.UIManager.getElementbyNum(4);
        ui.setState(!this.mCurrentState);
        
    }else{
        this.mCurrentState = !this.mCurrentState;
        var ui = gManager.UIManager.getElementbyNum(3);
        ui.setState(this.mCurrentState);
        ui = gManager.UIManager.getElementbyNum(1);
        ui.setState(!this.mCurrentState);
        ui = gManager.UIManager.getElementbyNum(2);
        ui.setState(!this.mCurrentState);
        ui = gManager.UIManager.getElementbyNum(4);
        ui.setState(!this.mCurrentState);
    }
};
