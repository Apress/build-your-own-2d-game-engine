/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
/**
 * A UI class use to assosiate radio buttons with each ohter
 * @param {function} callback The function to be called when the button is released
 * @param {object} context The owner of the callback function
 * @param {Array[]} position The base position for the UIRButton
 * @param {string} text The text for the UIRButton
 * @param {int} textSize The size for the text
 * @param {Array[]} textColor The color for the text
 * @param {Camera} aCamera The camera that the Radio list will be drawned on
 * @class UIRadio
 * @returns {UIRadio}
 */
function UIRadio(callback, context, position, text, textSize, textColor, aCamera){
    this.click = -1;
    this.size=textSize;
    this.basePosition=position;
    GameObjectSet.call(this);
    this.addToSet(callback, context, text, textColor, aCamera);
}

gEngine.Core.inheritPrototype(UIRadio, GameObjectSet);

/**
 * Updates all the radio buttons assigned to an instance of this class
 * @memberOf UIRadio
 */
UIRadio.prototype.update = function(){
    this.click = -1;
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
    for (i = 0; i < this.mSet.length; i++) {
        if(this.mSet[i].getClick()===true){this.click=i;}
    }
    if(this.click>=0){
        for(i=0; i < this.mSet.length; i++){
            if(i!==this.click){this.mSet[i].deselect();}
        }
    }
};

/**
 * Creates a UIRButton and adds it to the set
 * @param {function} callback The function to be called when the button is released
 * @param {object} context The owner of the callback function
 * @param {string} text The text for the UIRButton
 * @param {Array[]} textColor The color for the text
 * @param {Camera} aCamera the camera drawing the button
 * @memberOf UIRadio
 */
UIRadio.prototype.addToSet = function (callback, context, text, textColor, aCamera){
    var ypos=this.basePosition[1];
    var pixSize=this.size*(aCamera.getViewport()[2]/aCamera.getWCWidth());
    ypos=ypos-(pixSize*(this.mSet.length));
    var pos=[this.basePosition[0],ypos];
    var u = new UIRButton(callback, context, pos, text, this.size, textColor, aCamera);
    this.mSet.push(u);
};