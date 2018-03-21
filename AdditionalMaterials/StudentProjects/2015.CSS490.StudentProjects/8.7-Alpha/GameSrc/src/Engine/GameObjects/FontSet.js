/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";


function FontSet(stringSet, textHeight, color, position) {
    
    this.mSet = [];
    
    var currentY = position[1];
    
    for (var i = 0; i < stringSet.length; i++) {
        var label = new FontRenderable(stringSet[i]);
        label.setTextHeight(textHeight);
        label.setColor(color);
        label.getXform().setPosition(position[0], currentY);
        currentY = currentY - textHeight - 1
        this.mSet.push(label);
    }
}


FontSet.prototype.draw = function(camera) {
    
    for (var i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(camera);
    }
    
}