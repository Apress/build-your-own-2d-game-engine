/* File: Minion.js 
 *
 * Creates and initializes the Minion (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var kMinionWidth = 5;
var kMinionHeight = 6;
//胜利ar kMinionRandomSize = 5;

function Minion(spriteTexture, atX, atY, boundX, boundX1, light) {

    var w = kMinionWidth ;
    var h = kMinionHeight ;
    this.flag = 0;
    this.bx = boundX;
    this.bx1 = boundX1;
    this.direction = 1;
    this.kDelta=0.1;
    this.mMinion = new LightRenderable(spriteTexture);
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(atX, atY);
    this.mMinion.getXform().setSize(w, h);
    this.mMinion.setSpriteSequence(118,0 ,      // first element pixel position: top-left 512 is top of image, 0 is left of image
        42, 53,   // widthxheight in pixels
        3,          // number of elements in this sequence
        2);         // horizontal padding in between
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMinion.setAnimationSpeed(30);
    // show each element for mAnimSpeed updates
    this.mMinion.addLight(light);
    GameObject.call(this, this.mMinion);

    var r;
    r = new RigidRectangle(this.getXform(), w, h);

    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Minion, WASDObj);

Minion.prototype.update = function (aCamera) {
    var xform = this.getXform();
 switch(this.flag)
        {
            case 0:
                if(xform.getXPos()>=this.bx1)
                {
                    this.direction = -1;
        this.mMinion.setSpriteSequence(185,0 ,      // first element pixel position: top-left 512 is top of image, 0 is left of image
            42,53 ,   // widthxheight in pixels
            3,          // number of elements in this sequence
            2);         // horizontal padding in between
        this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
        this.mMinion.setAnimationSpeed(30);
        this.kDelta=0.1;
                    }
                else if(xform.getXPos()<=this.bx){
                    this.direction = 1;
                    this.mMinion.setSpriteSequence(118,0 ,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                        42, 53,   // widthxheight in pixels
                        3,          // number of elements in this sequence
                        2);         // horizontal padding in between
        this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
        this.mMinion.setAnimationSpeed(30);
        this.kDelta=0.1;
                }
                break;
            case -1:
            {
                this.direction = -1;
        this.mMinion.setSpriteSequence(185,0 ,      // first element pixel position: top-left 512 is top of image, 0 is left of image
            42,53 ,   // widthxheight in pixels
            3,          // number of elements in this sequence
            2);         // horizontal padding in between
        this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
        this.mMinion.setAnimationSpeed(30);
        this.kDelta=0.2;
                break;
            }
            case 1:
            {
                this.direction = 1;
                this.mMinion.setSpriteSequence(118,0 ,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                    42, 53,   // widthxheight in pixels
                    3,          // number of elements in this sequence
                    2);         // horizontal padding in between
        this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
        this.mMinion.setAnimationSpeed(30);
        this.kDelta=0.2;
                break;
            }
            }
    xform.incXPosBy(this.direction * this.kDelta);
    //if(!(this.direction) && xform.getXPos()<=33) xform.incXPosBy(this.kDelta) ;
    //if(this.direction && xform.getXPos()<=37 && xform.getXPos()>=33) xform.incXPosBy(this.kDelta) ;
    //if(!(this.direction) && xform.getXPos()>=33 && xform.getXPos()<=37) xform.incXPosBy(-this.kDelta) ;

    GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation
    this.mMinion.updateAnimation();
};
