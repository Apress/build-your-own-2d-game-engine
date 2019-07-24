"use strict";  // Operate in Strict mode such that variables must be declared before used!

function UIPicButton(callback,context,spriteTexture,camera,xform,pixelPosition) {
    this.mCallback=callback;
    this.mContext=context;
    this.kCamera = camera;
    this.mButton = new SpriteRenderable(spriteTexture);
    this.mButton.setColor([0,0,0, 0]);
    this.mButton.getXform().setPosition(xform[0],xform[1]);
    this.mButton.getXform().setSize(xform[2],xform[3]);
    this.mButton.setElementPixelPositions(pixelPosition[0],pixelPosition[1],pixelPosition[2],pixelPosition[3]);
    
    this.center=[xform[0],xform[1]];
    this.size=[xform[2],xform[3]];
    
    this.mHover = false;
    this.mClick = false;
    this.mPreHover = false;
    
   GameObject.call(this, this.mButton);
}
gEngine.Core.inheritPrototype(UIPicButton, GameObject);

UIPicButton.prototype.update=function(){
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    mousePos[0]=(mousePos[0]-500)/(1000/140)-15.5;
    mousePos[1]=(mousePos[1]-300)/(600/84)-10;
    this.mPreHover=this.mHover;
    var inCircle=(mousePos[0]-this.center[0])*(mousePos[0]-this.center[0])+(mousePos[1]-this.center[1])*(mousePos[1]-this.center[1])<this.size[0]*this.size[0];
    this.mHover = mousePos[0]>this.center[0]-this.size[0]/2&&mousePos[0]<this.center[0]+this.size[0]/2
            &&mousePos[1]>this.center[1]-this.size[1]/2&&mousePos[1]<this.center[1]+this.size[1]/2;
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(this.mHover){
            this.mClick=true;
        }
    }
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        if(this.mClick){
            this.mClick=false;
            this.mCallback();
        }
    }

}