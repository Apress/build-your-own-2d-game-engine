/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine */

function ProcessBar(){
    this.mWidth=null;
    this.mHeight=null;
    this.mBg=new Renderable();
    this.mFr=new Renderable();
    this.mTmp=0;
}
ProcessBar.prototype.setColor=function(colorFr,colorBg){
    this.mBg.setColor(colorBg);
    this.mFr.setColor(colorFr);
};
ProcessBar.prototype.setPosition=function(x,y){
    this.mBg.getXform().setPosition(x,y);
    this.mFr.getXform().setPosition(x,y);
};
ProcessBar.prototype.setSize=function(width,height){
    this.mWidth=width;
    this.mHeight=height;
    this.mBg.getXform().setSize(this.mWidth,this.mHeight);
    this.mFr.getXform().setSize(this.mWidth,this.mHeight);
};
ProcessBar.prototype.update=function(percent){
    var p=percent;
    if(p>1){p=1;};

    if(p<0){
        p=-p;
        this.mFr.getXform().setPosition(this.mFr.getXform().getXPos()-this.mWidth*5/12+this.mWidth*10/12*this.mTmp/p/gEngine.GameLoop.kFPS,this.mFr.getXform().getYPos());
        this.mFr.getXform().setSize(this.mWidth/6,this.mHeight);
        this.mTmp++;
        if(this.mTmp/(p*gEngine.GameLoop.kFPS)>=1){this.mTmp=0;}
    }else{
            this.mFr.getXform().setPosition(this.mFr.getXform().getXPos()-this.mWidth*(1-p)/2,this.mFr.getXform().getYPos());
            this.mFr.getXform().setSize(this.mWidth*p,this.mHeight);
    }
};
ProcessBar.prototype.draw=function(vpMatrix){
    this.mBg.draw(vpMatrix);
    this.mFr.draw(vpMatrix);
};

