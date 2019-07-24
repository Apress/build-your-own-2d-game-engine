"use strict";  // Operate in Strict mode such that variables must be declared before used!

function NiceButton(spriteTexture,callback,context) {
    this.callback=callback;
    this.mContext=context;
    this.mButton = new SpriteRenderable(spriteTexture);
    this.mButton.setColor([1, 0.91, 0.65, 0.1]);
    this.mButton.getXform().setPosition(0,0);
    this.mButton.getXform().setSize(10,10);
    this.pixelPosition = [[0,1,0,1],[0,100,0,100],[0,1000,0,1000]];
    this.setSpriteLocation(this.pixelPosition[0]);
    this.statusEnum={
        NORMAL: 0,
        HOVER: 1,
        PRESSED: 2
    }
    this.status=this.statusEnum.NORMAL;
    GameObject.call(this, this.mButton);
}
gEngine.Core.inheritPrototype(NiceButton, GameObject);

NiceButton.prototype.update=function(){
    var mousePos=getMousePosInWC();
    if(this.mButton.getXform().isIn(mousePos[0],mousePos[1])){
        if(gEngine.Input.isButtonPressed(0)){
            this.status=this.statusEnum.PRESSED;
        }else{
            this.status=this.statusEnum.HOVER;
        }
        if(gEngine.Input.isButtonReleased(0)){
            this.callback.call(this.mContext);
        }
    }else{
        this.status=this.statusEnum.NORMAL;
    }
    this.setSpriteLocation(this.pixelPosition[this.status]);
    //console.log(this.status);
};
NiceButton.prototype.draw=function(camera){
    this.mButton.draw(camera);
};
NiceButton.prototype.setSpriteLocation=function(arr){
    this.mButton.setElementPixelPositions(arr[0],arr[1],arr[2],arr[3]);
};
NiceButton.prototype.setPos=function(x,y){
    this.mButton.getXform().setPosition(x,y);
};
NiceButton.prototype.setSize=function(width,height){
    this.mButton.getXform().setSize(width,height);
};
NiceButton.prototype.setPixelPosition=function(l,r,b,t){
    this.pixelPosition[0]=[l,r,b,t];
};
NiceButton.prototype.setHoverPixelPosition=function(l,r,b,t){
    this.pixelPosition[1]=[l,r,b,t];
};
NiceButton.prototype.setPressedPixelPosition=function(l,r,b,t){
    this.pixelPosition[2]=[l,r,b,t];
};
