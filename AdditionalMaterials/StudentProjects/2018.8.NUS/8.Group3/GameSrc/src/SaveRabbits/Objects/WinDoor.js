/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function WinDoor(cx,cy,width,height,texture){
    
    this.winDoor = new TextureRenderable(texture);
    this.winDoor.getXform().setXPos(cx);
    this.winDoor.getXform().setYPos(cy);
    this.winDoor.getXform().setSize(width, height);
    this.winState = false;
}

gEngine.Core.inheritPrototype(WinDoor, GameObject);

WinDoor.prototype.draw = function(aCamera) {
    this.winDoor.draw(aCamera);
};
WinDoor.prototype.update = function(cheat){
    var xDis = Math.abs(this.winDoor.getXform().getXPos()-cheat.getXform().getXPos());
    var yDis = Math.abs(this.winDoor.getXform().getYPos()-cheat.getXform().getYPos());
    if(xDis<=10 && yDis<=10){
        this.winState = true;
    }
    return this.winState;
};


