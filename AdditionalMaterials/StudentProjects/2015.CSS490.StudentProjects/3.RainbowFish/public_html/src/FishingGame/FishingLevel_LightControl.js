/*
 * @auth: Herbert Traut
 * @file: FishingLevel_LightControl.js
 * @date: 12-13-15
 * @brief: Control for Lights in FishingLevel
 */

/* global FishingLevel */

'use strict';

FishingLevel.prototype.addAllLightsTo = function(renderable){
    var j;
    
    for(j = 0; j < this.mAngler.length; j++){
        renderable.addLight(this.mAngler[j].getLight());
    }
    renderable.addLight(this.mBoat.getLight());
    renderable.addLight(this.mDirectLight);
    
};

FishingLevel.prototype.addLightToAll = function (light){

    this.mBG.getRenderable().addLight(light);
    
    var j;
    
    for(j = 0; j < this.mAngler.length; j++){
        this.mAngler[j].getRenderable().addLight(light);
    }
    
    for(j = 0; j < this.mBoatSet.size(); j++){
        this.mBoatSet.getMember(j).getRenderable().addLight(light);
    }
        
    for(j = 0; j < this.mShark.length; j++){
        this.mShark[j].getRenderable().addLight(light);
    }
        
    for(j = 0; j < this.mFish.length; j++){
        this.mFish[j].getRenderable().addLight(light);
    }
    
    for(j = 0; j < this.mCloud.length; j++){
        this.mCloud[j].getRenderable().addLight(light);
    }
    
    for(j = 0; j < this.mHooks.length; j++){
        this.mHooks[j].getRenderable().addLight(light);
    }
};
