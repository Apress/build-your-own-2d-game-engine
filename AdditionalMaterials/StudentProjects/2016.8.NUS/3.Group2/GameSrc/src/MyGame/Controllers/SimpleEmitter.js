/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function SimpleEmitter(position){
    /*
    粒子列表
    */
    this.mParticleArray = [];
    
    /*
    最大粒子数
    */
    this.mMaxParticleNum = 50;
    
    this.mPosition = position;
    this.mAlpha = 0;
};

SimpleEmitter.prototype.setAlpha = function(alpha){
    this.mAlpha = alpha;
};
SimpleEmitter.prototype.getAlpha = function(){
    return this.mAlpha;
};

SimpleEmitter.prototype.draw = function(aCamera){
    /*
    更新粒子
     */
    for(var i = 0; i < this.mParticleArray.length; i += 1){
        if(this.mParticleArray[i]) {
            this.mParticleArray[i].draw(aCamera);
        }
    }
};

SimpleEmitter.prototype.update = function(){
        /*
    如果没有到达最大粒子数则添加粒子数，并加入重用物体池
     */
    if(this.mMaxParticleNum > this.mParticleArray.length){
        var particle = new RandomColorSq(this.mPosition);
        particle.setBornPosition(this.mPosition[0],this.mPosition[1]);
        this.mParticleArray.push(particle);
    }
    
    /*
    更新粒子
    */
    for(var i = 0; i < this.mParticleArray.length; i += 1){
        if(this.mParticleArray[i]) {
            this.mParticleArray[i].setAlpha(this.mAlpha);
            this.mParticleArray[i].update();
        }
    }
};
