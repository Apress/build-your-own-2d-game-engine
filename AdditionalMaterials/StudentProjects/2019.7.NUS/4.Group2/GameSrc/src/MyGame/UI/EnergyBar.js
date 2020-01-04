/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function EnergyBar(spriteTexture, Xform){
    this.offset = -7.5;
    this.offsetY = 8;
    this.mBar = new SpriteRenderable(spriteTexture);
    this.mBar.getXform().setSize(16, 2);
    this.mBar.getXform().setPosition(Xform.getXPos(), Xform.getYPos() + this.offsetY);
    this.mBar.setColor([1,1,1,0]);
    this.mBar.setElementPixelPositions(512, 0, 35, 95);
    this.mPoint = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mPoint.setColor([0,0,0,1]);
    this.mPoint.getXform().setPosition(Xform.getXPos() + this.offset, Xform.getYPos() + this.offsetY);
    this.mPoint.getXform().setSize(0.2, 3);
    this.mCHXform = Xform;
    this.mVisible = false;
}

EnergyBar.prototype.draw = function(Camera){
    if (this.mVisible){
        this.mBar.draw(Camera);
        this.mPoint.draw(Camera);
    }
};

EnergyBar.prototype.update = function(n,flag){
    this.mVisible = flag;
    n = (n<60? n: 60);
    this.offset = n * 0.25 - 7.5;
    this.mBar.getXform().setPosition(this.mCHXform.getXPos(), this.mCHXform.getYPos() + this.offsetY);
    this.mPoint.getXform().setPosition(this.mBar.getXform().getXPos() + this.offset, this.mCHXform.getYPos() + this.offsetY);
};