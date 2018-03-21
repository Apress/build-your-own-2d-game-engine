/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Counter(hudSpriteSheet) {
    this.mSpriteSheet = hudSpriteSheet;
    this.mSpriteMapNumbers = [];

    //numbers
    this.mSpriteMapNumbers[1] = [127,256,256,384];
    this.mSpriteMapNumbers[2] = [127,256,384,512];
    this.mSpriteMapNumbers[3] = [127,256,512,640];
    this.mSpriteMapNumbers[4] = [127,256,640,768];
    this.mSpriteMapNumbers[5] = [127,256,768,896];
    this.mSpriteMapNumbers[6] = [127,256,896,1024];
    this.mSpriteMapNumbers[7] = [0,127,0,128];
    this.mSpriteMapNumbers[8] = [0,127,128,256];
    this.mSpriteMapNumbers[9] = [0,127,256,384];
    this.mSpriteMapNumbers[0] = [127,256,128,256];
    
    this.mCounter = 3;
    
    this.ones = new LightRenderable(this.mSpriteSheet);
    this.ones.setColor([1, 1, 1, 0]);
    this.ones.getXform().setPosition(-10, -10);
    this.ones.getXform().setSize(10,10);
    this.ones.setElementPixelPosArray(this.mSpriteMapNumbers[3]);
    
    //this.tens = new SpriteRenderable(this.mSpriteSheet);
    //this.tens.setColor([1, 1, 1, 0]);
    //this.tens.getXform().setPosition(-10, -10);
    //this.tens.getXform().setSize(5,5);
    //this.tens.setElementPixelPosArray(this.mSpriteMapNumbers[0]);

}

Counter.prototype.incByOne = function () {
    if(this.mCounter < 9){
        this.mCounter += 1;
        this.ones.setElementPixelPosArray(this.mSpriteMapNumbers[this.mCounter]);
    }
};

Counter.prototype.decByOne = function () {
    console.log("dec counter");
    if(this.mCounter > 0){
        this.mCounter -= 1;
        this.ones.setElementPixelPosArray(this.mSpriteMapNumbers[this.mCounter]);
    }

};

Counter.prototype.getNumber = function () {
    return this.mCounter;
};

Counter.prototype.setNumber = function (number) {
    this.mCounter = number;
    this.ones.setElementPixelPosArray(this.mSpriteMapNumbers[number]);
};

Counter.prototype.set = function (x,y,w,h) {
    var xform = this.ones.getXform();
    xform.setXPos(x);
    xform.setYPos(y);
    xform.setWidth(w);
    xform.setHeight(h);
    
};

Counter.prototype.draw = function (aCamera) {
    this.ones.draw(aCamera);
};

Counter.prototype.addLight = function(l) {
    this.ones.addLight(l);
};