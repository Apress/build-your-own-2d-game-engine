/* File: medicine.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Medicine(medicineTexture) {
    this.kDelta = 0.4;

    this.mMedicine = new TextureRenderable(medicineTexture);
    this.mMedicine.setColor([0, 0, 0, 0]);
    
    var x = 100;
    var y = Math.floor(Math.random()*35 + 10);
    
    this.mMedicine.getXform().setPosition(x+300, y);
    this.mMedicine.getXform().setSize(10, 10);
    
    GameObject.call(this, this.mMedicine);
}
gEngine.Core.inheritPrototype(Medicine, GameObject);

Medicine.prototype.update = function () {
    var xform = this.getXform();
    xform.incXPosBy(-this.kDelta);
};