/* File: UIArrowSelection.js
 *      Displays the three arrow types, and whether they are
 *      Available or active
 */

function UIArrowSelection(sprites, borderSprite, position, iconSize, activeTint, inactiveTint, light) {
    this.mIconSize = iconSize;
    this.mBackdrop = new Renderable();
    UIElement.call(this, 
                    this.mBackdrop, 
                    position, 
                    vec2.fromValues(iconSize * 3, iconSize));    
    
    this.mActiveTint = activeTint;
    this.mInactiveTint = inactiveTint;
    
    this.mArrows = [];
    var p = this.getUIXform().getPosition();
    var s = this.getUIXform().getSize();
    var leftEdge = p[0] - s[0]/2;
    var i;
    for(i = 0; i < sprites.length; i++) {
        var tpos = vec2.fromValues(leftEdge + iconSize/2 + i * iconSize, p[1]);
        var s = new UITexture(sprites[i], tpos, vec2.fromValues(iconSize, iconSize));
        s.getRenderable().addLight(light);
        this.mArrows.push(s);
    }
    
    this.mActiveBorder = new UITexture(borderSprite, null, vec2.fromValues(iconSize, iconSize));
    this.mActiveBorder.getRenderable().addLight(light);
    this.select(ArrowSet.eArrowType.eDefaultArrow);
};
gEngine.Core.inheritPrototype(UIArrowSelection, UIElement);

UIArrowSelection.prototype.draw = function(aCamera) {
    
    var i;
    for(i = 0; i < this.mArrows.length; i++) {
        this.mArrows[i].draw(aCamera);
    }
    
    this.mActiveBorder.draw(aCamera);
};

UIArrowSelection.prototype.select = function(type) {
    var targetPos = this.mArrows[type].getUIXform().getPosition();
    this.mActiveBorder.mUIXform.setPosition(targetPos[0], targetPos[1]);
};

//for handling cooldowns
UIArrowSelection.prototype.setActive = function(type, active) {
    if(active)
        this.mArrows[type].mTex.setColor(this.mActiveTint);
    else
        this.mArrows[type].mTex.setColor(this.mInactiveTint);
};


