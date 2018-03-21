/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

// intext, x pos, y pos, size
function MenuElement(inText, x, y, s){
    this.mFontRenderable = new FontRenderable(inText);
            
    //this.startText 
    this.mFontRenderable.setColor([1, 1, 1, 0]);
    this.mFontRenderable.getXform().setPosition(x, y);
    this.mFontRenderable.setTextHeight(s);
    
    this.selected = false;
}
//gEngine.Core.inheritPrototype(MenuElement, FontRenderable);

MenuElement.prototype.ToggleSelected = function(){
    this.selected = !this.selected;
}

MenuElement.prototype.draw = function(aCamera){
    this.mFontRenderable.draw(aCamera);
}