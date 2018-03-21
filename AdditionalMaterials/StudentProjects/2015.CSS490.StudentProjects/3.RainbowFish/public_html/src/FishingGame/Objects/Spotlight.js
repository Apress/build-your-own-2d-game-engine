/*
 * @auth: Caleb Larson
 * @file: SpotlightBase.js
 * @date: 11-27-15
 * @brief: Hook class
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject, vec2: false */

"use strict";

function Spotlight(texture) {
    this.mSpotlight = new LightRenderable(texture);
    this.mSpotlight.setColor([1,1,1,0]);
    this.mSpotlight.getXform().setPosition(-5.8, -1.3);
    this.mSpotlight.getXform().setSize(2.3, 2.3);
    this.mSpotlight.getXform().setRotationInRad(0.4);
    this.mSpotlight.setElementPixelPositions(0, 1024, 0, 1024);
    GameObject.call(this, this.mSpotlight);
}
gEngine.Core.inheritPrototype(Spotlight, GameObject);
