/* global gEngine */

/**
 * Created by SmirkinDino on 2016/7/28.
 */

/*
 * 
 * 
 * 
 * 
 * 
 * 
 * By 龚楚涵 (Dino) in Singapore
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
function RandomColorSq(positon){

    /*
    显示对象
     */
    this.mBaseRenderObject = new Renderable(gEngine.DefaultResources.getConstColorShader());

    /*
     粒子出生位置
     */
    this.mParticleBornPos = positon;

    /*
    粒子的随机速度
     */
    this.mVelocity = [0,0];

    /*
    重力
     */
    this.mGravity = -0.01;

    /*
    Alpha改变步长
     */
    this.mAlpha = 0;

    /*
    是否是第一次创建
     */
    this.mbInit = false;

    /*
    生命
     */
    this.mLife = 0;

    /*
    尺寸
     */
    this.mSize = 0.2;

    /*
    旋转参数
     */
    this.mRotationSpeed = 0.0;
    
};

RandomColorSq.prototype.draw = function(vp){
    this.mBaseRenderObject.draw(vp);
};

RandomColorSq.prototype.setAlpha = function(a){
    this.mAlpha = a;
};

RandomColorSq.prototype.setBornPosition = function(x,y){
    this.mParticleBornPos[0] = x;
    this.mParticleBornPos[1] = y;
};
RandomColorSq.prototype.getBornPositionX = function(){
    return this.mParticleBornPos[0];
};
RandomColorSq.prototype.getBornPositionY = function(){
    return this.mParticleBornPos[1];
};
RandomColorSq.prototype.resetColorBall = function(){

    /*
    重置位置
     */
    this.mBaseRenderObject.getXform().setPosition(this.mParticleBornPos[0],this.mParticleBornPos[1]);

    /*
    设置大小
     */
    this.mLife = 1.0;
    this.mSize = Math.random() * 1.5;
    this.mBaseRenderObject.getXform().setSize(this.mSize,this.mSize);

    /*
    重置颜色
     */
    this.mBaseRenderObject.setColor([Math.random(), Math.random(), Math.random(), this.mAlpha]);

    /*
    重置速度
     */
    this.mVelocity = [0.2 - Math.random() * 0.4,0.4 - Math.random() * 0.6];

    /*
    重置旋转
     */
    this.mRotationSpeed = 0.10 - Math.random() * 0.20;
};

RandomColorSq.prototype.update = function(){

    /*
    如果没有初始化，则初始化
     */
    if(!this.mbInit) {
        this.resetColorBall();
        this.mbInit = true;
    }

    /*
    如果粒子生命到终点，重置球
     */
    if(this.mLife < 0) {
        this.resetColorBall();
        return;
    }

    /*
    更新速度
     */
    this.mVelocity[1] += this.mGravity;
    this.mBaseRenderObject.getXform().incXPosBy(this.mVelocity[0]);
    this.mBaseRenderObject.getXform().incYPosBy(this.mVelocity[1]);


    this.mLife -= 0.02;
    this.mBaseRenderObject.getXform().setSize(this.mSize * this.mLife,this.mSize * this.mLife);
    color = this.mBaseRenderObject.getColor();
    this.mBaseRenderObject.setColor([color[0],color[1],color[2],this.mAlpha]);

    /*
    更新旋转
     */
    this.mBaseRenderObject.getXform().incRotationByRad(this.mRotationSpeed);
};



