/*
 * @auth: Caleb Larson
 * @file: SpotlightBase.js
 * @date: 11-27-15
 * @brief: Hook class
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject, vec2: false */

"use strict";

function SpotlightBase(texture) {
    this.mSpotlightBase = new LightRenderable(texture);
    this.mSpotlightBase.setColor([1,1,1,0]);
    this.mSpotlightBase.getXform().setPosition(-5.8, -1.3);
    this.mSpotlightBase.getXform().setSize(2, 2);
    this.mSpotlightBase.getXform().setRotationInRad(- Math.PI / 2);
    this.mSpotlightBase.setElementPixelPositions(0, 1024, 0, 1024);
    GameObject.call(this, this.mSpotlightBase);
}
gEngine.Core.inheritPrototype(SpotlightBase, GameObject);

