/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, BaseUI, gManager */

function UIScore(renderable,showpos,hidepos){
    
    this.mRenderableObject = renderable;
    this.mRenderableObject.setColor([0.95,0.95,0.95,1]);
    this.mRenderableObject.setTextHeight(10);
    
    BaseUI.call(this,renderable,showpos,hidepos);
    
    UIScore.prototype.setState = BaseUI.prototype.setState;
    UIScore.prototype.draw = BaseUI.prototype.draw;
};

gEngine.Core.inheritPrototype(UIScore,BaseUI);

UIScore.prototype.update = function(){
    BaseUI.prototype.update.call(this);
    this.mRenderableObject.setText(Math.floor(gManager.DefaultOptions.score) + "");
};