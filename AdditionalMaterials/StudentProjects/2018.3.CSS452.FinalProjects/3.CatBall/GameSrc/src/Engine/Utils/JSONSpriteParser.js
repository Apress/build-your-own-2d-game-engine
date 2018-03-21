/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function JSONSpriteParser(sceneFilePath, img) {
    this.mSpriteJSON = JSON.parse(gEngine.ResourceMap.retrieveAsset(sceneFilePath));
    this.mSprite = img;
}

JSONSpriteParser.prototype.parsePlayerAnim = function(x, y){
    var animationArr = [];
    var frameArray = this.mSpriteJSON.frames;
    //console.log(frameArray);
    
    for(var i = 0; i < frameArray.length; i++){
        var anim = new SpriteAnimateRenderable(this.mSprite);
        anim.setAnimationSpeed(2);
        
        // for set SpriteSequence:
        /*
         *  topPixel,   // offset from top-left
            leftPixel, // offset from top-left
            elmWidthInPixel,
            elmHeightInPixel,
            numElements,      // number of elements in sequence
            wPaddingInPixel  // left/right padding
         */
        
        anim.setSpriteSequence(
                frameArray[i].frame.y,
                frameArray[i].frame.x,
                32,
                32,
                frameArray[i].frame.w / 32,
                0 //no padding
                );
        
        // not sure if this line is needed:
        //anim._initAnimation();
        anim.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
        anim.getXform().setPosition(x, y);
        anim.getXform().setSize(3, 3);
        
        animationArr.push(anim)
        //console.log(anim);
    }
    
    
    return animationArr;
}