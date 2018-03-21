/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Button.eButtonStatus = Object.freeze({
    eNone: 0,
    eOver: 1,
    ePressed: 2,
    eClicked: 3
});
function Button(spriteTexture, normalMap, pos, size, light) {
    
    this.left = pos[0] - size[0]/2;
    this.right = pos[0] + size[0]/2;
    this.top = pos[1] + size[1]/2;
    this.bottom = pos[1] - size[1]/2;
    
    this.mStatus = 0;
   
    if (normalMap !== null) {
        this.mDye = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mDye = new LightRenderable(spriteTexture);
    }
    
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(pos[0], pos[1]);
    this.mDye.getXform().setSize(size[0], size[1]);
    this.mDye.setElementPixelPositions(0,341,0,128);
    this.mDye.addLight(light);
    GameObject.call(this, this.mDye);
    
};
gEngine.Core.inheritPrototype(Button, GameObject);
Button.prototype.getStatus = function() { return this.mStatus; };
Button.prototype.update = function(mx, my){
    
    if(mx>this.left && mx<this.right && my>this.bottom && my<this.top) {
        if(gEngine.Input.isButtonClicked(0)){
         
           this.mStatus = Button.eButtonStatus.eClicked;  
           this.mDye.setElementPixelPositions(683,1024,0,128);  
        }
        else{
          
            this.mStatus = Button.eButtonStatus.eOver;  
            this.mDye.setElementPixelPositions(341,682,0,128);
        }
    }
    else {
     
        this.mStatus = Button.eButtonStatus.eNone;   
        this.mDye.setElementPixelPositions(0,341,0,128);
    }
};