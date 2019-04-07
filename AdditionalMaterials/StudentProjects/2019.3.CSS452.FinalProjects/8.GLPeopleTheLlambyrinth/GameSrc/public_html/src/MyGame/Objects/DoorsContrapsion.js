/* File: DoorContrapsion.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
//+128 px
function DoorsContrapsion(buttonTexture, buttonNormal, doorTexture, doorNormal, obj) {
    this.mDoors = new DoorSet(doorTexture, doorNormal);
    this.mButtons = new PushButtonSet(buttonTexture, buttonNormal);
    //door x, y, w, h, r button x, y, w, h, r
    //this.addPair(75, 65, 1, 6, 90, 70, 55.5, 5, 5, 180, obj);
    //this.addPair(35, 60, 1, 6, 90, 40, 55.5, 5, 5, 180, obj);
    //this.addPair(75, 30, 1, 6, 90, 70, 34.5, 5, 5, 0, obj);
    
}

DoorsContrapsion.prototype.update = function(hero) {

    //check if button to pushed to open door 
    for (var i = 0; i < this.mDoors.size(); i++)
    {
        var button = this.mButtons.getObjectAt(i);
        if (button.pixelTouches(hero, []) && gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))  
        {
            this.mButtons.getObjectAt(i).pushButtom();      //show button as down 
            this.mDoors.getObjectAt(i).setVisable(false);  //remove door            
        }
    }
    this.mDoors.update();
    this.mButtons.update();  
};

DoorsContrapsion.prototype.draw = function(aCamera) {
    this.mDoors.draw(aCamera);
    this.mButtons.draw(aCamera);
};

DoorsContrapsion.prototype.addPair = function(dX, dY, dW, dH, dR, bX, bY, bW, bH, bR, obj) {
    this.mDoors.createDoor(dX, dY, dW, dH, dR, obj);
    this.mButtons.createButton(bX, bY, bW, bH, bR);
};

DoorsContrapsion.prototype.getDoors = function() {
    return this.mDoors;
};
DoorsContrapsion.prototype.getButtons = function() {
    return this.mButtons;
};
DoorsContrapsion.prototype.size = function() {
    return this.mDoors.size();
};