/* File: Key.js 
 *
 * Creates and initializes a Key object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, TextureRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var kKeyWidth = 2.0;
var kKeyHeight = 4.0;

function Key(texture, atX, atY) {
        
    var w = kKeyWidth;
    var h = kKeyHeight;
    
    this.mGate = null;
    
    this.mKey = new SpriteRenderable(texture);
    this.mKey.setColor([1,1,1,0]);
    this.mKey.getXform().setPosition(atX, atY);
    this.mKey.getXform().setSize(w, h);
    
    this.isPickedUp = false;

    GameObject.call(this, this.mKey);
    
    this.glowLight = new Light();
    this.glowLight.setLightType(Light.eLightType.ePointLight);
    this.glowLight.set2DPosition(this.getXform().getPosition());
    this.glowLight.setColor([1, 1, 0, 10]);
    
    this.glowPos = vec2.clone(this.getXform().getPosition());
    this.moveGlow = new InterpolateVec2(this.glowPos, 75, 0.05);
}
gEngine.Core.inheritPrototype(Key, GameObject);

Key.prototype.setGate = function (gate) {
    this.mGate = gate;
};

Key.prototype.pickup = function () {
    if (this.mGate !== null) {
        this.mGate.unlock();
        this.isPickedUp = true;
        this.moveGlow.setFinalValue(this.mGate.getXform().getPosition());
        console.log("Unlocked gate with key");
    }
};

Key.prototype.update = function () {
    this.moveGlow.updateInterpolation();
    this.glowLight.set2DPosition(this.glowPos);
};

Key.prototype.draw = function (aCamera) {
    if (!this.isPickedUp)
        GameObject.prototype.draw.call(this, aCamera);
};