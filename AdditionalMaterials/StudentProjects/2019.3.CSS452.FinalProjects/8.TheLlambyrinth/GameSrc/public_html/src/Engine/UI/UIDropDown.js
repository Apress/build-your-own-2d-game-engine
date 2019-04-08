/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
/**
 * A UI class use to assosiate DropDown buttons with each ohter
 * @param {Array[]} position The base location for the list
 * @param {String} text The initial text for the head button
 * @param {int} textSize the size of the text
 * @param {Array[]} textColor the color for the text
 * @param {Array[]} boxColor the color for the box
 * @class UIDropDown
 * @returns {UIDropDown}
 */
function UIDropDown(position,text,textSize,textColor,boxColor){
    GameObjectSet.call(this);
    this.basePosition=position;
    this.size=textSize;
    this.color=textColor;
    this.click = -1;
    this.visible = false;
    this.headButton = new UIDDButton(position, text, textSize, textColor, boxColor, this.flipVisible, this);
    this.arrow = new TextureRenderable("assets/UI/ddarrow.png");
    this.arrow.getXform().setSize(this.size,this.size);
    this.arrow.getXform().setZPos(3);
    this.maxWidth = this.headButton.getWidth();
    this.headButton.setWidth(this.maxWidth+textSize);
}

gEngine.Core.inheritPrototype(UIDropDown, GameObjectSet);

/**
 * Updates all the DropDown buttons assigned to an instance of this class
 * @param {Camera} aCamera The camera that is drawing the list 
 * @memberOf UIDropDown
 */
UIDropDown.prototype.update = function(aCamera){
    this.headButton.update(aCamera);
    if(this.visible===true){
        var i;
        for (i = 0; i < this.mSet.length; i++) {
            this.mSet[i].update(aCamera);
        }
        for (i = 0; i < this.mSet.length; i++) {
            if(this.mSet[i].getClick()===true){this.click=i;}
        }
    if(this.click>=0){
        this.headButton.setText(this.mSet[this.click].getText());
        this.headButton.setBoxColor(this.mSet[this.click].getBoxColor());
        this.visible=false;
        this.click=-1;
        this.arrow.getXform().incRotationByDegree(180); 
    }
    else{
        if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)&&this.headButton.getClick()===false){
            this.visible=false;
            this.arrow.getXform().incRotationByDegree(180); 
        }
    }
    }
};

/**
 * Adds an entry to the list
 * @param {String} text The text for the new button
 * @param {Array[]} textColor The color for the text
 * @param {Array[]} boxColor The color for the box
 * @param {function} callback The function that is called when this button is clicked
 * @param {object} context The object that is calling the callback function
 * @param {Camera} aCamera The camera that is drawing the list
 * @memberOf UIDropDown
 */
UIDropDown.prototype.addToSet = function (text, textColor, boxColor, callback, context, aCamera){
    var ypos=this.basePosition[1];
    var pixSize=this.size*(aCamera.getViewport()[2]/aCamera.getWCWidth());
    ypos=ypos-(pixSize*(this.mSet.length+1));
    var pos=[this.basePosition[0],ypos];
    var u = new UIDDButton(pos,text,this.size,textColor,boxColor,callback,context);
    this.mSet.push(u);
    if(u.getWidth()>this.maxWidth){
        var uWidth=u.getWidth();
        this.headButton.setWidth(uWidth+this.size);
        for (var i = 0; i < this.mSet.length; i++) {
            this.mSet[i].setWidth(uWidth);
        }
        this.maxWidth=uWidth;
    }
    else{
        u.setWidth(this.maxWidth);
    }
};
/**
 * Flips the visibility of all buttons in the list except the head button
 * @memberOf UIDropDown
 */
UIDropDown.prototype.flipVisible = function(){
    this.visible=!this.visible;
    this.arrow.getXform().incRotationByDegree(180);  
};

/**
 * Draws the DropDownList
 * @param {Camera} aCamera The camera the list will be drawon on
 * @memberOf UIDropDown
 */
UIDropDown.prototype.draw = function(aCamera){
    this.headButton.draw(aCamera);
    var pos = this.headButton.getBoxPos();
    var tmp=pos[0]+(this.maxWidth/2);
    this.arrow.getXform().setPosition(tmp,pos[1]);
    this.arrow.draw(aCamera);
    if(this.visible===true){
        var i;
        for (i = 0; i < this.mSet.length; i++) {
            this.mSet[i].draw(aCamera);
        }
    }
};

/**
 * Gets the head button of the list
 * @returns {UIDDButton}
 * @memberOf UIDropDown
 * 
 */
UIDropDown.prototype.getHeadButton = function(){
    return this.headButton;
};