/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine, GameObect */

function BaseUI(renderable,showpos,hidepos){
    
    GameObject.call(this,renderable);
    
    var trans = GameObject.prototype.getXform.call(this);
    trans.setPosition(hidepos[0],hidepos[1]);
    
    this.mShowPosition = showpos;
    
    this.mHidePosition = hidepos;
    
    /*
     * 当前状态
     */
    this.mState = false;
    
    this.mLinarRate = 8;
    
    this.mLinarState = false;
    
};

gEngine.Core.inheritPrototype(BaseUI,GameObject);
 
BaseUI.prototype.setState = function(show){
    if(show) this.setVisibility(true); 
    this.mState = show;
    this.mLinarState = false;
    
    
};

BaseUI.prototype.update = function(){
    
    var trans = this.getXform();
    var currentPos = trans.getPosition();
    if(!this.mLinarState)
        if(this.mState){
            var deltaX = this.mShowPosition[0] - currentPos[0];
            var deltaY = this.mShowPosition[1] - currentPos[1];
            
            if(Math.abs(deltaX) < 0.01 && Math.abs(deltaY) < 0.01 ) {
                this.mLinarState = true;
            }

            currentPos[0] += deltaX / this.mLinarRate;
            currentPos[1] += deltaY / this.mLinarRate;
            trans.setPosition(currentPos[0],currentPos[1]);
        }else{
            var deltaX = this.mHidePosition[0] - currentPos[0];
            var deltaY = this.mHidePosition[1] - currentPos[1];
            
            if(Math.abs(deltaX) < 0.01 && Math.abs(deltaY) < 0.01 ) {
                this.mLinarState = true;
                this.setVisibility(false);
            }
            
            currentPos[0] += deltaX / this.mLinarRate;
            currentPos[1] += deltaY / this.mLinarRate;
            trans.setPosition(currentPos[0],currentPos[1]);
        }
    
    GameObject.prototype.update.call(this);
};

BaseUI.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this,aCamera);
};

