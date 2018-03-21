/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function EffectCube(type,pos){
    this.IconPath = ["assets/LifeCube.png","assets/IceCube.png","assets/SpeedCube.png"];
    this.type = type;
    this.pos = pos;
    this.sprite = null;
    this.Init();
}

EffectCube.prototype.Init = function () {

    this.sprite = new GameObject(new SpriteRenderable(this.IconPath[this.type]));
    this.sprite.getXform().setPosition(this.pos[0],this.pos[1]);
    var color = this.sprite.getRenderable().getColor();
    color[3] = 1;
    this.sprite.getRenderable().setColor(color);
    this.sprite.getXform().setSize(15,15);
};

EffectCube.prototype.draw = function ( camera ){
    this.sprite.draw(camera);
};


