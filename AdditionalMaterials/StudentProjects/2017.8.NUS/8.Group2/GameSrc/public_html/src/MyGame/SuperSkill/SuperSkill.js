/* File: Missle.js 
 *
 * Creates and initializes a simple Brain object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2, gCue3, gCue4, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
SuperSkill.kTexture = null;
//SuperSkill.kBgTexture = null;
var gCamera = gCamera;
function SuperSkill(thisHero, TargetHero,StoneSet){
    this.Hero = thisHero;
    this.HeroType = thisHero.HeroType;
    this.calculator = 0;
//    this.mBgRend = new SpriteRenderable(SuperSkill.kBgTexture);
//    this.mBgRend.setColor([1, 1, 1, 0]);
//    this.mBgRend.getXform().setPosition(50, 60);
    this.TargetHero = TargetHero;
    this.StoneSet = StoneSet;
    this.mAniRend= new SpriteAnimateRenderable(SuperSkill.kTexture);
    this.mAniRend.setColor([1, 1, 1, 0]);
    this.mAniRend.getXform().setPosition(50, 60);
    this.mAniRend.getXform().setSize(150, 160);
    if(this.HeroType === 2){
    this.mAniRend.setSpriteSequence(1536, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    512, 512,       // widthxheight in pixels
                                    7,              // number of elements in this sequence
                                    0);             // horizontal padding in between
    }
    else if(this.HeroType === 3){
    this.mAniRend.setSpriteSequence(2048, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    512, 512,       // widthxheight in pixels
                                    7,              // number of elements in this sequence
                                    0);             // horizontal padding in between
    }
    else if(this.HeroType === 0){
    this.mAniRend.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    512, 512,       // widthxheight in pixels
                                    7,              // number of elements in this sequence
                                    0);             // horizontal padding in between
    }
    else if(this.HeroType === 1){
    this.mAniRend.setSpriteSequence(1024, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    512, 512,       // widthxheight in pixels
                                    7,              // number of elements in this sequence
                                    0);             // horizontal padding in between
    }
    
    this.mAniRend.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mAniRend.setAnimationSpeed(10);
    GameObject.call(this,this.mAniRend);    
    
    this.mExpired = false;

//    this.setCurrentFrontDir([0, 1]);
//    this.setSpeed(0.5);

}
gEngine.Core.inheritPrototype(SuperSkill, GameObject);

SuperSkill.prototype.setExpired = function() {
    this.mExpired = true;
};
SuperSkill.prototype.hasExpired = function() {
    return this.mExpired;
};
SuperSkill.prototype.update = function(){
    GameObject.prototype.update.call(this);
    this.mAniRend.updateAnimation();
    this.calculator += 1;
    if(!this.mExpired){
//    if(this.calculator ===60 && !this.mExpired){
    switch(this.HeroType){
        case 0:
            if(this.calculator <= 130){
                this.TargetHero.isfreezed =true;
            }
            else {
                this.TargetHero.isfreezed =false;
            }
            
            
            for (var i=0; i<this.StoneSet.size(); i++) {
                var obj = this.StoneSet.getObjectAt(i);      
                obj.setExpired();
            }
            break;
        case 1:
            if(this.calculator === 20||this.calculator === 40||this.calculator === 60||this.calculator === 80||this.calculator === 100||this.calculator === 120){
            this.Hero.mMissles.newAt(this.Hero.getXform().getPosition()); 
            }
            break;
        case 2:
            for (var i=0; i<this.StoneSet.size(); i++) {
                var obj = this.StoneSet.getObjectAt(i);      
                obj.setExpired();
            }
            if(this.calculator < 134){
            this.Hero.setBlockTime(10);    
            }
             if(this.calculator === 134){
            this.Hero.setBlockTime(30);    
            }
            break;
        case 3:
            for (var i=0; i<this.StoneSet.size(); i++) {
                var obj = this.StoneSet.getObjectAt(i);      
                obj.setExpired();
            }
            if(this.calculator === 60){
            this.TargetHero.decreaseHP(4);    
            }
            break;
    }
        
        
        
    }
    if(this.calculator === 135){
        
        this.setExpired();
        this.calculator = 0;
    }
};