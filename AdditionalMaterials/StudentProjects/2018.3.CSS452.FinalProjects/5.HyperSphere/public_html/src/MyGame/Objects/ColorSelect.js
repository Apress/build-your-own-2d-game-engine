/*
* ColorSelect.js
* 
*/

"use strict";

function ColorSelect() {

	this.mLeftColorButton = null;
	this.mRightColorButton = null;
	this.mColorArray = null; // Array of SquareRenderables in the Colors that Cars come in
	this.mCar = null;

	GameObject.call(this);
}
gEngine.Core.inheritPrototype(ColorSelect, GameObject); // this might be better as GameObjectSet

ColorSelect.prototype.draw = function() {

};

ColorSelect.prototype.update = function() {

};