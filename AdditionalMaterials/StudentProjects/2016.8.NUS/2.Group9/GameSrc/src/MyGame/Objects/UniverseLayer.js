/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function UniverseLayer () {
    this.numOfStar = Math.random()*2000+500;
    this.stars = [];
    this.Init();
}

UniverseLayer.prototype.Init = function () {
    
    for(var i = 0 ;i < this.numOfStar;i++){
        this.stars[i] = new Renderable();
        var size = Math.random()*4+1;
        this.stars[i].getXform().setSize(size,size);
        this.stars[i].getXform().setPosition(Math.random()*3840 - 1920,Math.random()*2160-1080);
        this.stars[i].setColor([1,1,1,Math.random()]);
    }
};

UniverseLayer.prototype.draw = function (camera) {
    for(var i = 0 ;i < this.numOfStar;i++){
        this.stars[i].draw(camera);
    }
};