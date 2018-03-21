/* File: GameObjectSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function GameObjectSet() {
    this.mSet = [];
    this.mTransform = new Transform();
}

//------------------------------------------------------------------------------
GameObjectSet.prototype.getXform = function() {
  return this.mTransform;
};

//------------------------------------------------------------------------------
GameObjectSet.prototype.size = function () { return this.mSet.length; };

//------------------------------------------------------------------------------
GameObjectSet.prototype.getObjectAt = function (index) {
    return this.mSet[index];
};

//------------------------------------------------------------------------------
GameObjectSet.prototype.addToSet = function (obj) {
    this.mSet.push(obj);
};

//------------------------------------------------------------------------------
GameObjectSet.prototype.removeFromSet = function (obj) {
    var index = this.mSet.indexOf(obj);
    if (index > -1)
        this.mSet.splice(index, 1);
};

//------------------------------------------------------------------------------
GameObjectSet.prototype.moveToLast = function (obj) {
    this.removeFromSet(obj);
    this.addToSet(obj);
};

//------------------------------------------------------------------------------
GameObjectSet.prototype.update = function () {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
};

//------------------------------------------------------------------------------
GameObjectSet.prototype.draw = function (aCamera) {
    var i;

    for (i = 0; i < this.mSet.length; i++) {
      this.mSet[i].drawAsChild(aCamera, this.mTransform);
    }
};

//------------------------------------------------------------------------------
GameObjectSet.prototype.drawAsChild = function (aCamera, parentXform) {
    var i = 0;

    var concatXform = mat4.create();
    var newTransform = new Transform();
    
    // Transform the child in regards to its parent.
    mat4.multiply(
      concatXform,
      parentXform.getXform(),
      this.mTransform.getXform()
    );
  
    newTransform.setXform(concatXform);
  
    for (i = 0; i < this.mSet.length; i++) {
      this.mSet[i].drawAsChild(aCamera, newTransform);
    }
};

//------------------------------------------------------------------------------
GameObjectSet.prototype.addLight = function(light) {
  var i = 0;

  for(i = 0; i < this.mSet.length; i++) {
    this.mSet[i].addLight(light);
  }
};

//------------------------------------------------------------------------------
GameObjectSet.prototype.removeLight = function(light) {
  var i = 0;

  for(i = 0; i < this.mSet.length; i++) {
    this.mSet[i].removeLight(light);
  }
};

//------------------------------------------------------------------------------
GameObjectSet.prototype.clearLights = function() {
  var i = 0;

  for(i = 0; i < this.mSet.length; i++) {
    this.mSet[i].clearLights();
  }
};
