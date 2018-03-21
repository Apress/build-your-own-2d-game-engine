/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function End_Flag(spriteTexture, atX, atY, w, h) {  
    this.mEndFlag = new SpriteAnimateRenderable(spriteTexture);
    this.mEndFlag.setColor([1, 1, 1, 0]);
    this.mEndFlag.getXform().setPosition(atX, atY);
    this.mEndFlag.getXform().setSize(w, h);
    this.mEndFlag.setSpriteSequence(256, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    128, 128,   // widthxheight in pixels
                                    1,          // number of elements in this sequence
                                    0);         // horizontal padding in between
                                    
    this.mEndFlag.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mEndFlag.setAnimationSpeed(5);
                                // show each element for mAnimSpeed updates

    GameObject.call(this, this.mEndFlag);
}
gEngine.Core.inheritPrototype(End_Flag, GameObject);


End_Flag.prototype.initialize = function()
{
};

End_Flag.prototype.update = function()
{
};

/*End_Flag.prototype.draw = function(matrix)
{
  this.mEndFlag.draw(matrix);
};*/



